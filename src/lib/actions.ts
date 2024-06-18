'use server';
import { auth, signIn } from '@/auth';
import prisma from '@/db/db';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
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

export async function jobDelete(id: number) {
  await prisma.jobs.delete({
    where: {
      id,
    },
  });

  revalidatePath('/dashboard/jobs');
}

export async function jobUpdate(
  id: number,
  prevState: unknown,
  formData: FormData
) {
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

  await prisma.jobs.update({
    where: {
      id,
    },
    data: {
      ...parsedData.data,
    },
  });

  redirect('/dashboard/jobs');
}

export async function postsCreate(prevState: unknown, formData: FormData) {
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
      await prisma.post.create({
        data: {
          ...parsedData.data,
          authorId: user.id,
        },
      });

      redirect('/dashboard/posts');
    }
  } else {
    redirect('/login');
  }
}

export async function postDelete(id: number) {
  await prisma.post.delete({
    where: {
      id,
    },
  });

  revalidatePath('/dashboard/posts');
}

export async function postUpdate(
  id: number,
  prevState: unknown,
  formData: FormData
) {
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

  await prisma.post.update({
    where: {
      id,
    },
    data: {
      ...parsedData.data,
    },
  });

  redirect('/dashboard/posts');
}
