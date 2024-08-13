import { EditCategoryForm } from '@/components/admin-edit-category-form';
import prisma from '@/db/db';
import { notFound } from 'next/navigation';

export default async function CategoriesEdit({
  params,
}: {
  params: { id: number };
}) {
  const category = await prisma.category.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <>
      <h1>Create Category</h1>
      <EditCategoryForm category={category} />
    </>
  );
}
