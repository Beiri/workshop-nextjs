'use client';

import { FormError } from '@/components/form-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { categoryUpdate } from '@/lib/actions';
import { Category } from '@prisma/client';
import Link from 'next/link';
import { useFormState } from 'react-dom';

export function EditCategoryForm({ category }: { category: Category }) {
  const categoryUpdateWithId = categoryUpdate.bind(null, category.id);
  const [error, action] = useFormState(categoryUpdateWithId, undefined);

  return (
    <form action={action} className="space-y-4 max-w-screen-lg">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Textarea
          id="name"
          name="name"
          defaultValue={category.name as string}
        />
        {error?.name && <FormError>{error.name}</FormError>}
      </div>

      <div className="space-x-4">
        <Button type="submit">Save</Button>
        <Button variant="destructive" asChild>
          <Link href="/dashboard/categories" role="button">
            Cancel
          </Link>
        </Button>
      </div>
    </form>
  );
}
