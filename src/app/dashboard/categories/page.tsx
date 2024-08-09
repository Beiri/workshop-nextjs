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
import { Category } from '@prisma/client';
import { categoryDelete } from '@/lib/actions';
import { Metadata } from 'next';
import { AdminEmpty } from '@/components/admin-empty';

export const metadata: Metadata = {
  title: 'Categories | Workshop Next.js',
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany();

  if (categories.length === 0) {
    return (
      <AdminEmpty
        title="You have no Categories"
        href="/dashboard/categories/create"
        buttonText="Add Category"
      />
    );
  }

  return <CategoriesTable categories={categories} />;
}

export function CategoriesTable({
  categories,
}: {
  categories: Array<Category>;
}) {
  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>Categories</CardTitle>
        <Button>
          <Link href="/dashboard/categories/create">Create Category</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => {
              const categoryDeleteWithId = categoryDelete.bind(
                null,
                category.id
              );

              return (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
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
                            href={`/dashboard/categories/${category.id}/edit`}
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <form action={categoryDeleteWithId}>
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
          Showing <strong>1-10</strong> of <strong>{categories.length}</strong>{' '}
          categories
        </div>
      </CardFooter>
    </Card>
  );
}
