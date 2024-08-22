import prisma from '@/db/db';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { Post, User } from '@prisma/client';
import { jobDelete, postDelete, userDelete } from '@/lib/actions';
import { Metadata } from 'next';
import { AdminEmpty } from '@/components/admin-empty';

export const metadata: Metadata = {
  title: 'Users | Workshop Next.js',
};

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  if (users.length === 0) {
    return (
      <AdminEmpty
        title="You have no Users"
        href="/dashboard/users/create"
        buttonText="Add User"
      />
    );
  }

  return <UsersTable users={users} />;
}

export function UsersTable({ users }: { users: Array<User> }) {
  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>Users</CardTitle>
        <Button>
          <Link href="/dashboard/users/create">Create User</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const userDeleteWithId = userDelete.bind(null, user.id);

              return (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link
                            className="cursor-pointer"
                            href={`/dashboard/users/${user.id}/edit`}
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <form action={userDeleteWithId}>
                            <button type="submit" className="w-full text-start">
                              Delete
                            </button>
                          </form>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>{users.length}</strong> users
        </div>
      </CardFooter>
    </Card>
  );
}
