export type NavItem = {
  href: string;
  label: string;
};

export type SiteConfig = {
  brand: string;
  domainLabel: string;
  tagline: string;
  heroTitle: string;
  heroDescription: string;
  accentClassName: string;
  panelClassName: string;
  navItems: NavItem[];
  footerText: string;
};

export const siteConfig: SiteConfig = {
  brand: "Yanadoo AX",
  domainLabel: "yanadoo-ax",
  tagline: "Practical AX design for education-led enterprise transformation.",
  heroTitle: "실행 중심 AX 여정을 설계하는 Yanadoo AX",
  heroDescription:
    "기존 Vite 기반 홈페이지를 최신 Next.js App Router 구조로 이전하기 위한 1차 골격입니다. Yanadoo AX의 교육·진단·구축 톤을 유지할 수 있도록 별도 테마와 독립 파일 구조를 적용했습니다.",
  accentClassName:
    "from-amber-300 via-orange-500 to-rose-600 text-white shadow-[0_24px_80px_rgba(234,88,12,0.28)]",
  panelClassName:
    "border-orange-200/70 bg-white/78 supports-[backdrop-filter]:bg-white/64",
  navItems: [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/cases", label: "Cases" },
    { href: "/education", label: "Education" },
    { href: "/ax-partners", label: "AX Partners" },
  ],
  footerText:
    "Yanadoo AX migration baseline. Locale routing, public pages, and admin entry points are prepared for section-by-section migration.",
};
