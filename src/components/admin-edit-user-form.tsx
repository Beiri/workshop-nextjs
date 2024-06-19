'use client';

import { FormError } from '@/components/form-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { userUpdate } from '@/lib/actions';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useFormState } from 'react-dom';

export function EditUserForm({ user }: { user: User }) {
  const userUpdateWithId = userUpdate.bind(null, user.id);
  const [error, action] = useFormState(userUpdateWithId, undefined);

  return (
    <form action={action} className="space-y-4 max-w-screen-lg">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" defaultValue={user.email} />
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
  );
}
