'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';

export function AdminNavigationLink({
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, 'className'>) {
  const pathname = usePathname();

  return (
    <>
      <Link
        {...props}
        className={cn(
          'hover:text-foreground',
          pathname !== props.href && 'text-muted-foreground'
        )}
      >
        {children}
      </Link>
    </>
  );
}
