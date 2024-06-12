'use server';
import { auth, signIn } from '@/auth';
import prisma from '@/db/db';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function jobCreate(prevState: unknown, formData: FormData) {
  const parsedData = z
    .object({
      title: z.string().min(1, { message: 'Title field is required.' }),
      content: z.string().min(1, { message: 'Content field is required.' }),
      published: z.coerce.boolean(),
    })
    .safeParse(Object.fromEntries(formData.entries()));

  if (!parsedData.success) {
    return parsedData.error.formErrors.fieldErrors;
  }

  const session = await auth();

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (user) {
      await prisma.jobs.create({
        data: {
          ...parsedData.data,
          authorId: user.id,
        },
      });

      redirect('/dashboard/jobs');
    }
  } else {
    redirect('/login');
  }
}
