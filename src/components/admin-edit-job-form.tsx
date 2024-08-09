'use client';

import { FormError } from '@/components/form-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { jobUpdate } from '@/lib/actions';
import { Job } from '@prisma/client';
import Link from 'next/link';
import { useFormState } from 'react-dom';

export function EditJobForm({ job }: { job: Job }) {
  const jobUpdateWithId = jobUpdate.bind(null, job.id);
  const [error, action] = useFormState(jobUpdateWithId, undefined);

  return (
    <form action={action} className="space-y-4 max-w-screen-lg">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" type="text" name="title" defaultValue={job.title} />
        {error?.title && <FormError>{error.title}</FormError>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={job.content as string}
        />
        {error?.content && <FormError>{error.content}</FormError>}
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="published"
          name="published"
          defaultChecked={job.published}
        />
        <Label htmlFor="published">Published</Label>
      </div>

      <div className="space-x-4">
        <Button type="submit">Save</Button>
        <Button variant="destructive" asChild>
          <Link href="/dashboard/jobs" role="button">
            Cancel
          </Link>
        </Button>
      </div>
    </form>
  );
}
