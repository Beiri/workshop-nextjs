import { Button } from '@/components/ui/button';
import Link from 'next/link';
type AdminEmptyProps = {
  title: string;
  href: string;
  buttonText: string;
};

export function AdminEmpty({ title, href, buttonText }: AdminEmptyProps) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        <Button className="mt-4" asChild>
          <Link href={href}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
}
