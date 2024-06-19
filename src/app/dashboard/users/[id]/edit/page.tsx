import { EditUserForm } from '@/components/admin-edit-user-form';
import prisma from '@/db/db';
import { notFound } from 'next/navigation';

export default async function UsersEdit({
  params,
}: {
  params: { id: number };
}) {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <>
      <h1>Edit User</h1>
      <EditUserForm user={user} />
    </>
  );
}
