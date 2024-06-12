export function FormError({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="text-destructive text-sm">{children}</div>;
}
