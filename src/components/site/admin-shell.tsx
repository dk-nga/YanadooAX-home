import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

type AdminShellProps = {
  locale: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/files", label: "Files" },
  { href: "/admin/education-stats", label: "Education Stats" },
];

export function AdminShell({
  locale,
  title,
  description,
  children,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-50">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-0 lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-stone-800 bg-stone-950/90 p-6 lg:border-r lg:border-b-0">
          <Link href={`/${locale}`} className="block">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">
              {siteConfig.domainLabel}
            </p>
            <h1 className="mt-2 text-xl font-semibold">{siteConfig.brand} Admin</h1>
          </Link>
          <nav className="mt-8 space-y-2 text-sm text-stone-300">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="block rounded-xl border border-stone-800 px-4 py-3 transition hover:border-orange-500/50 hover:bg-stone-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.16),transparent_28%),linear-gradient(180deg,#1c1917_0%,#292524_100%)] p-6 md:p-10">
          <div className="rounded-[2rem] border border-stone-800 bg-stone-900/70 p-8 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-300">
              Admin Route
            </p>
            <h2 className="mt-3 text-3xl font-semibold">{title}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-300">
              {description}
            </p>
            <div className="mt-8">{children}</div>
          </div>
        </section>
      </div>
    </div>
  );
}

type AdminRoutePageProps = {
  locale: string;
  title: string;
  description: string;
  items?: string[];
};

export function AdminRoutePage({
  locale,
  title,
  description,
  items = [],
}: AdminRoutePageProps) {
  return (
    <AdminShell locale={locale} title={title} description={description}>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-[1.5rem] border border-stone-800 bg-stone-950/50 p-5 text-sm text-stone-300"
          >
            {item}
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
