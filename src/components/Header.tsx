"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Globe, ArrowRight } from "lucide-react";
import logoFull from "@/assets/logo-full.svg";
import { Link, usePathname } from "@/i18n/navigation";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { useContactWidget } from "@/contexts/ContactWidgetContext";
import { createClient } from "@/lib/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavVisibility = {
  partners: boolean;
  education: boolean;
  cases: boolean;
  about: boolean;
  blog: boolean;
};

const DEFAULT_VISIBILITY: NavVisibility = {
  partners: false,
  education: false,
  cases: false,
  about: false,
  blog: false,
};

const languages: { code: Language; name: string; flag: string }[] = [
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
];

function AnnouncementBanner() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAXPartners = pathname === "/ax-partners";
  const isEducation = pathname === "/education";
  const isCases = pathname === "/cases";
  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/");

  const getBannerContent = () => {
    if (isHome) {
      return {
        badge: "New",
        text: (
          <>
            <span className="hidden md:inline">🏢 </span>
            <span className="font-bold text-[#fbbf24]">&quot;AI 도입&quot;</span>이 아니라{" "}
            <span className="font-bold text-[#ef4444]">&quot;AX 전환&quot;</span>이 궁금하다면
          </>
        ),
        badgeStyle: "bg-gradient-to-r from-[#F8B529] to-[#C400FF]",
        href: "/ax-partners",
      };
    }
    if (isAXPartners) {
      return {
        badge: "2026",
        text: (
          <>
            우리 조직 <span className="font-bold text-[#282640]">AX</span> 수준은? 무료 진단
          </>
        ),
        badgeStyle: "bg-gradient-to-r from-[#F8B529] to-[#C400FF]",
        href: "#hero",
      };
    }
    if (isEducation) {
      return {
        badge: "New",
        text: (
          <>
            <span className="hidden md:inline">🎓 </span>실무자가 직접 만드는 자동화 교육
            <span className="hidden md:inline">, 커리큘럼 확인하기</span>
          </>
        ),
        badgeStyle: "bg-gradient-to-r from-[#F8B529] to-[#C400FF]",
        href: "#curriculum",
      };
    }
    if (isCases) {
      return {
        badge: "2026",
        text: (
          <>
            <span className="hidden md:inline">🚀 </span>&quot;우리도 가능할까?&quot; 무료 진단
            <span className="hidden md:inline">으로 확인하세요</span>
          </>
        ),
        badgeStyle: "bg-[#dc2626]",
        href: "#",
      };
    }
    if (isBlog) {
      return {
        badge: "New",
        text: (
          <>
            <span className="hidden md:inline">이 글, </span>우리 회사에 적용할 수 있을까? 무료{" "}
            <span className="font-bold text-[#282640]">AX</span> 진단
          </>
        ),
        badgeStyle: "bg-gradient-to-r from-[#F8B529] to-[#C400FF]",
        href: "/ax-partners",
      };
    }
    return {
      badge: "New",
      text: t("banner.announcement"),
      badgeStyle: "bg-[#ff3b5c]",
      href: "#",
    };
  };

  const bannerContent = getBannerContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="bg-[#0a0a0a] border-b border-white/10"
    >
      <a
        href={bannerContent.href}
        className="group flex items-center justify-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/5"
      >
        <span className={`${bannerContent.badgeStyle} rounded px-2 py-0.5 text-xs font-bold text-white`}>
          {bannerContent.badge}
        </span>
        <span className="text-sm font-medium text-white/90">{bannerContent.text}</span>
        <ArrowRight className="h-4 w-4 text-white/60 transition-transform group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [navVisibility, setNavVisibility] = useState<NavVisibility>(DEFAULT_VISIBILITY);
  const { language, setLanguage, t } = useLanguage();
  const { openContactWidget } = useContactWidget();

  useEffect(() => {
    const fetchNavSettings = async () => {
      try {
        const supabase = createClient();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data } = await (supabase as any)
          .from("site_settings")
          .select("value")
          .eq("key", "nav_visibility")
          .single();
        if (data?.value) {
          setNavVisibility(data.value as NavVisibility);
        }
      } catch {
        // table not yet created — keep defaults (all hidden)
      }
    };
    fetchNavSettings();
  }, []);

  // 항상 표시되는 섹션 스크롤 메뉴
  const sectionItems = [
    { id: "problems", name: "해결 가능한 문제" },
    { id: "interactive-demo", name: "AX 체험" },
    { id: "results", name: "실제사례" },
    { id: "industry", name: "업종별" },
    { id: "role", name: "직무별" },
  ];

  // Admin에서 ON/OFF하는 추가 메뉴
  const allExtraItems = [
    { key: "partners" as const, name: t("nav.partners"), href: "/ax-partners" },
    { key: "education" as const, name: t("nav.education"), href: "/education" },
    { key: "cases" as const, name: t("nav.cases"), href: "/cases" },
    { key: "about" as const, name: t("nav.about"), href: "/#about" },
    { key: "blog" as const, name: t("nav.blog"), href: "/blog" },
  ];
  const extraMenuItems = allExtraItems.filter((item) => navVisibility[item.key]);

  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <AnnouncementBanner />

      <div className="border-b border-black/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <motion.div
                className="flex cursor-pointer items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src={logoFull.src} alt="Yanadoo AX" className="h-6 w-auto md:h-8" />
              </motion.div>
            </Link>

            <nav className="ml-8 hidden items-center gap-1 md:flex">
              {sectionItems.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleSectionClick(e, item.id)}
                  className="group relative rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.4 }}
                  >
                    {item.name}
                  </motion.span>
                  <span className="absolute -bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#F8B529] to-[#C400FF] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <span className="mx-1 h-4 w-px bg-border" />
              <Link
                href="/faq"
                className="group relative rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                >
                  {t("nav.faq")}
                </motion.span>
                <span className="absolute -bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#F8B529] to-[#C400FF] transition-all duration-300 group-hover:w-full" />
              </Link>
              {extraMenuItems.length > 0 && (
                <span className="mx-1 h-4 w-px bg-border" />
              )}
              {extraMenuItems.map((item, index) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="group relative rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * (sectionItems.length + index), duration: 0.4 }}
                  >
                    {item.name}
                  </motion.span>
                  <span className="absolute -bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#F8B529] to-[#C400FF] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="hidden flex-1 md:flex" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  className="mr-4 hidden h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-foreground/90 md:flex"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <Globe className="h-5 w-5" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-[100] min-w-[140px] border border-border bg-popover shadow-lg">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`cursor-pointer ${language === lang.code ? "bg-accent" : ""}`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <motion.button
              onClick={openContactWidget}
              className="hidden rounded-lg bg-[#282640] px-6 py-2.5 text-base font-semibold text-white transition-opacity hover:opacity-90 md:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {t("nav.contact")}
            </motion.button>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={openContactWidget}
                className="rounded-lg bg-[#282640] px-4 py-2 text-sm font-semibold text-white hover:bg-[#282640]/90"
              >
                {t("nav.contact")}
              </button>
              <button className="p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          <motion.nav
            initial={false}
            animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-3 pt-3 pb-2">
              <Link
                href="/faq"
                className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.faq")}
              </Link>
              {extraMenuItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex gap-2 py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${
                      language === lang.code ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.nav>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
