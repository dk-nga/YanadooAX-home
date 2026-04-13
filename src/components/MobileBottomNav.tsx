"use client";

import { useEffect, useState } from "react";
import { useScrollContainer } from "@/contexts/ScrollContainerContext";

const TABS = [
  { id: "problems",         label: "해결 문제" },
  { id: "interactive-demo", label: "AX 체험" },
  { id: "results",          label: "실제사례" },
  { id: "industry",         label: "업종별" },
  { id: "role",             label: "직무별" },
];

// 헤더(~112px) + 서브nav(~38px) 합계
const TOP_OFFSET = 155;

export function MobileBottomNav() {
  const [active, setActive] = useState("");
  const containerRef = useScrollContainer();

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      let current = "";
      for (const tab of TABS) {
        const el = document.getElementById(tab.id);
        if (el) {
          const top = el.getBoundingClientRect().top - containerRect.top;
          if (top <= TOP_OFFSET + 80) current = tab.id;
        }
      }
      setActive(current);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    const container = containerRef?.current;
    if (!el || !container) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const targetTop = container.scrollTop + (elRect.top - containerRect.top) - TOP_OFFSET;
    container.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-28 left-0 right-0 z-40 border-b border-black/8 bg-white/95 backdrop-blur-md md:hidden">
      <div className="flex">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-center transition-colors ${
                isActive ? "text-[#C400FF]" : "text-slate-400"
              }`}
            >
              {isActive && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-[#C400FF]" />
              )}
              <span className="text-[10px] font-semibold leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
