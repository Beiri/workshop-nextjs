'use server';
import { auth, signIn } from '@/auth';
import prisma from '@/db/db';
import { hash } from 'bcrypt';
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
      await prisma.job.create({
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
  await prisma.job.delete({
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

  await prisma.job.update({
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

export async function usersCreate(prevState: unknown, formData: FormData) {
  const parsedData = z
    .object({
      email: z.string().email(),
      password: z
        .string()
        .min(6, { message: 'Password must contain at least 6 character(s)' }),
    })
    .safeParse(Object.fromEntries(formData.entries()));

  if (!parsedData.success) {
    return parsedData.error.formErrors.fieldErrors;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: parsedData.data.email,
    },
  });

  if (user) {
    throw new Error('User already exists');
  }

  await prisma.user.create({
    data: {
      email: parsedData.data.email,
      password: await hash(parsedData.data.password, 10),
    },
  });

  redirect('/dashboard/users');
}

export async function userDelete(id: number) {
  await prisma.user.delete({
    where: {
      id,
    },
  });

  revalidatePath('/dashboard/users');
}

export async function userUpdate(
  id: number,
  prevState: unknown,
  formData: FormData
) {
  const parsedData = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
    })
    .safeParse(Object.fromEntries(formData.entries()));

  if (!parsedData.success) {
    return parsedData.error.formErrors.fieldErrors;
  }

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      email: parsedData.data.email,
      password: await hash(parsedData.data.password, 10),
    },
  });

  redirect('/dashboard/users');
}

export async function categoriesCreate(prevState: unknown, formData: FormData) {
  const parsedData = z
    .object({
      name: z.string().min(1, { message: 'name field is required.' }),
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
      await prisma.category.create({
        data: {
          ...parsedData.data,
          authorId: user.id,
        },
      });

      redirect('/dashboard/categories');
    }
  } else {
    redirect('/login');
  }
}

export async function categoryDelete(id: number) {
  await prisma.category.delete({
    where: {
      id,
    },
  });

  revalidatePath('/dashboard/categories');
}

export async function categoryUpdate(
  id: number,
  prevState: unknown,
  formData: FormData
) {
  const parsedData = z
    .object({
      name: z.string().min(1, { message: 'name field is required.' }),
    })
    .safeParse(Object.fromEntries(formData.entries()));

  if (!parsedData.success) {
    return parsedData.error.formErrors.fieldErrors;
  }

  await prisma.category.update({
    where: {
      id,
    },
    data: {
      ...parsedData.data,
    },
  });

  redirect('/dashboard/categories');
}
