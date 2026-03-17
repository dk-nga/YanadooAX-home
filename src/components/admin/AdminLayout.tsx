"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, type ReactNode } from "react";
import {
  FolderOpen,
  LayoutDashboard,
  Loader2,
  LogOut,
  MessageSquare,
  Star,
  TrendingUp,
} from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import logoFull from "@/assets/logo-full.svg";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "대시보드", href: "/admin", icon: LayoutDashboard },
  { title: "문의 관리", href: "/admin/inquiries", icon: MessageSquare },
  { title: "후기 관리", href: "/admin/testimonials", icon: Star },
  { title: "교육 통계", href: "/admin/education-stats", icon: TrendingUp },
  { title: "파일 관리", href: "/admin/files", icon: FolderOpen },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, loading, signOut } = useAuth();
  const isLoginRoute = pathname === `/${locale}/admin/login`;

  useEffect(() => {
    const isCurrentLoginRoute = pathname === `/${locale}/admin/login`;

    if (!isCurrentLoginRoute && !loading && (!user || !isAdmin)) {
      router.replace(`/${locale}/admin/login`);
    }
  }, [isAdmin, loading, locale, pathname, router, user]);

  if (isLoginRoute) {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    await signOut();
    router.replace(`/${locale}/admin/login`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="border-b border-slate-100 px-6 py-5">
            <Link href="/" className="block">
              <img src={logoFull.src} alt="Yanadoo AX" className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex-1 px-4 py-6">
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              관리 메뉴
            </p>
            <nav className="mt-4 space-y-1.5">
              {menuItems.map((item) => {
                const targetPath = `/${locale}${item.href}`;
                const isActive =
                  item.href === "/admin"
                    ? pathname === targetPath
                    : pathname.startsWith(targetPath);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors",
                      isActive
                        ? "bg-gradient-to-r from-[#F8B529]/20 to-[#C400FF]/10 font-medium text-[#282640]"
                        : "text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="border-t border-slate-100 px-4 py-4">
            <p className="truncate px-2 text-sm text-slate-500">{user.email}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="mt-3 w-full justify-start gap-2 text-slate-600 hover:border-red-200 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              로그아웃
            </Button>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="border-b border-slate-200 bg-white px-5 py-4 md:px-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 lg:hidden">
                  Yanadoo AX Admin
                </p>
                <h1 className="text-lg font-semibold text-slate-900">
                  {menuItems.find((item) =>
                    item.href === "/admin"
                      ? pathname === `/${locale}${item.href}`
                      : pathname.startsWith(`/${locale}${item.href}`)
                  )?.title || "관리자"}
                </h1>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="gap-2 lg:hidden"
              >
                <LogOut className="h-4 w-4" />
                로그아웃
              </Button>
            </div>
          </header>
          <main className="flex-1 p-5 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
