import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

type PublicShellProps = {
  locale: string;
  title: string;
  description: string;
  eyebrow?: string;
  children?: React.ReactNode;
};

export function PublicShell({
  locale,
  title,
  description,
  eyebrow,
  children,
}: PublicShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.18),transparent_42%),linear-gradient(180deg,#fff8ef_0%,#ffffff_42%,#fffaf5_100%)] text-stone-950">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href={`/${locale}`} className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-700">
              {siteConfig.domainLabel}
            </span>
            <span className="text-lg font-semibold text-stone-950">
              {siteConfig.brand}
            </span>
          </Link>
          <nav className="hidden gap-6 text-sm font-medium text-stone-700 md:flex">
            {siteConfig.navItems.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href}`}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 md:px-8 md:py-16">
        <section
          className={`overflow-hidden rounded-[2rem] border p-8 md:p-12 ${siteConfig.panelClassName}`}
        >
          <div
            className={`mb-8 rounded-[1.75rem] bg-gradient-to-br p-8 md:p-10 ${siteConfig.accentClassName}`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
              {eyebrow ?? siteConfig.tagline}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/82 md:text-base">
              {description}
            </p>
          </div>
          {children}
        </section>
      </main>

      <footer className="border-t border-orange-100 bg-white/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-stone-600 md:flex-row md:items-center md:justify-between">
          <p>{siteConfig.footerText}</p>
          <Link href={`/${locale}/admin/login`} className="font-medium text-orange-700">
            Admin Login
          </Link>
        </div>
      </footer>
    </div>
  );
}

type PublicRoutePageProps = {
  locale: string;
  title: string;
  description: string;
  eyebrow?: string;
  bullets?: string[];
};

export function PublicRoutePage({
  locale,
  title,
  description,
  eyebrow,
  bullets = [],
}: PublicRoutePageProps) {
  return (
    <PublicShell
      locale={locale}
      title={title}
      description={description}
      eyebrow={eyebrow}
    >
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[1.5rem] border border-orange-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-950">Migration Notes</h2>
          <p className="mt-3 text-sm leading-7 text-stone-600">
            이 페이지는 기존 React Router 경로를 Next.js App Router 파일 시스템
            라우트로 바꾸기 위한 시작점입니다. Yanadoo AX는 교육과 현업 적용
            메시지가 강하므로, 이후 단계에서 섹션 카피와 비주얼 톤을 별도로
            이 안에 이식합니다.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-orange-100 bg-orange-50/70 p-6">
          <h2 className="text-lg font-semibold text-stone-950">Scope</h2>
          <ul className="mt-3 space-y-3 text-sm leading-6 text-stone-700">
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </PublicShell>
  );
}
