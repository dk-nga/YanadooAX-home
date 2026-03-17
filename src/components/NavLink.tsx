import { Link } from "@/i18n/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function NavLink({ href, children, className }: NavLinkProps) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
