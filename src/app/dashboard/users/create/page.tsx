'use client';

import { FormError } from '@/components/form-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { usersCreate } from '@/lib/actions';
import Link from 'next/link';
import { useFormState } from 'react-dom';

export default function UsersCreate() {
  const [error, action] = useFormState(usersCreate, undefined);

  return (
    <>
      <h1>Create Users</h1>
      <form action={action} className="space-y-4 max-w-screen-lg">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" />
          {error?.email && <FormError>{error.email}</FormError>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" />
          {error?.password && <FormError>{error.password}</FormError>}
        </div>

        <div className="space-x-4">
          <Button type="submit">Save</Button>
          <Button variant="destructive" asChild>
            <Link href="/dashboard/users" role="button">
              Cancel
            </Link>
          </Button>
        </div>
      </form>
    </>
  );
}
