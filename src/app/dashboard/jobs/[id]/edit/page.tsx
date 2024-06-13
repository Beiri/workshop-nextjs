import { EditJobForm } from '@/components/admin-edit-job-form';
import prisma from '@/db/db';
import { notFound } from 'next/navigation';

export default async function JobsEdit({ params }: { params: { id: number } }) {
  const job = await prisma.jobs.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <>
      <h1>Create Job</h1>
      <EditJobForm job={job} />
    </>
  );
}
