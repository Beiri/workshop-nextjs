import { EditPostForm } from '@/components/admin-edit-post-form';
import prisma from '@/db/db';
import { notFound } from 'next/navigation';

export default async function PostsEdit({
  params,
}: {
  params: { id: number };
}) {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <>
      <h1>Create Post</h1>
      <EditPostForm post={post} />
    </>
  );
}
