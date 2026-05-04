"use client";

import { useEffect, useState, useMemo } from "react";
import { useScrollContainer } from "@/contexts/ScrollContainerContext";
import { useLanguage } from "@/contexts/LanguageContext";

// Header (announcement banner ~40px + nav ~72px) + a bit of buffer
const HEADER_OFFSET = 120;

export function SectionNav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const containerRef = useScrollContainer();
  const { t } = useLanguage();

  const SECTIONS = useMemo(() => [
    { id: "problems", label: t("nav.problems"), sublabel: t("nav.problemsSub") },
    { id: "interactive-demo", label: t("nav.demo"), sublabel: t("nav.demoSub") },
    { id: "results", label: t("nav.results"), sublabel: t("nav.resultsSub") },
    { id: "industry", label: t("nav.industry"), sublabel: t("nav.industrySub") },
    { id: "role", label: t("nav.role"), sublabel: t("nav.roleSub") },
  ], [t]);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      let current = "";

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const relativeTop = rect.top - containerRect.top;
          if (relativeTop <= HEADER_OFFSET + 80) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef, SECTIONS]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    const container = containerRef?.current;
    if (!el || !container) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const relativeTop = elRect.top - containerRect.top;
    const targetScrollTop = container.scrollTop + relativeTop - HEADER_OFFSET - 60;

    container.scrollTo({ top: targetScrollTop, behavior: "smooth" });
  };

  return (
    <div className="sticky top-[100px] z-40 border-b border-black/8 bg-white/95 backdrop-blur-md shadow-sm md:top-[112px]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex overflow-x-auto scrollbar-hide">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex flex-none flex-col items-center gap-0.5 border-b-2 px-4 py-3 text-left transition-all duration-200 md:px-6 ${
                  isActive
                    ? "border-[#C400FF] text-[#C400FF]"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                <span className="whitespace-nowrap text-sm font-semibold leading-tight">
                  {section.label}
                </span>
                <span className="whitespace-nowrap text-xs text-slate-400">{section.sublabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
