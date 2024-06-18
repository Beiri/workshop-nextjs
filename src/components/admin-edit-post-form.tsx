'use client';

import { FormError } from '@/components/form-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { postUpdate } from '@/lib/actions';
import { Post } from '@prisma/client';
import Link from 'next/link';
import { useFormState } from 'react-dom';

export function EditPostForm({ post }: { post: Post }) {
  const postUpdateWithId = postUpdate.bind(null, post.id);
  const [error, action] = useFormState(postUpdateWithId, undefined);

  return (
    <form action={action} className="space-y-4 max-w-screen-lg">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" type="text" name="title" defaultValue={post.title} />
        {error?.title && <FormError>{error.title}</FormError>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={post.content as string}
        />
        {error?.content && <FormError>{error.content}</FormError>}
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="published"
          name="published"
          defaultChecked={post.published}
        />
        <Label htmlFor="published">Published</Label>
      </div>

      <div className="space-x-4">
        <Button type="submit">Save</Button>
        <Button variant="destructive" asChild>
          <Link href="/dashboard/posts" role="button">
            Cancel
          </Link>
        </Button>
      </div>
    </form>
  );
}
