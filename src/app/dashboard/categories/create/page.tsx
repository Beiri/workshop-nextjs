'use client';

import { FormError } from '@/components/form-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { categoriesCreate } from '@/lib/actions';
import Link from 'next/link';
import { useFormState } from 'react-dom';

export default function CategoriesCreate() {
  const [error, action] = useFormState(categoriesCreate, undefined);

  return (
    <>
      <h1>Create Categories</h1>
      <form action={action} className="space-y-4 max-w-screen-lg">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Textarea id="name" name="name" />
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
    </>
  );
}
