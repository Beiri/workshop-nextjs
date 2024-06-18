'use client';

import { FormError } from '@/components/form-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { postsCreate } from '@/lib/actions';
import Link from 'next/link';
import { useFormState } from 'react-dom';

export default function PostsCreate() {
  const [error, action] = useFormState(postsCreate, undefined);

  return (
    <>
      <h1>Create Posts</h1>
      <form action={action} className="space-y-4 max-w-screen-lg">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" type="text" name="title" />
          {error?.title && <FormError>{error.title}</FormError>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea id="content" name="content" />
          {error?.content && <FormError>{error.content}</FormError>}
        </div>

        <div className="flex items-center gap-2">
          <Switch id="published" name="published" />
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
    </>
  );
}
