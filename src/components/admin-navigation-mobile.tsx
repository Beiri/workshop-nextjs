'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from './ui/button';
import { Menu, Package2 } from 'lucide-react';
import Link from 'next/link';
import { AdminNavigationLink } from './admin-navigation-link';
import { useState } from 'react';

type AdminNavigationMobileProps = {
  name: string;
  href: string;
}[];

export function AdminNavigationMobile({
  links,
}: {
  links: AdminNavigationMobileProps;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {links.map((link) => (
            <AdminNavigationLink
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </AdminNavigationLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
