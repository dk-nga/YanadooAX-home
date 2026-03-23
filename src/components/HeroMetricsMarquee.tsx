"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

type MetricItem = {
  value: string;
  label: string;
  note: string;
};

const metricsByLanguage: Record<"ko" | "ja", MetricItem[]> = {
  ko: [
    { value: "92%", label: "재구매·심화 교육 희망", note: "education_stats" },
    { value: "4.6/5.0", label: "평균 교육 만족도", note: "education_stats" },
    { value: "243명", label: "누적 기업교육 수강생", note: "education_stats" },
    { value: "12주", label: "정착 중심 AX 파트너십", note: "ax-partners" },
    { value: "6개", label: "AX-Level 측정 지표", note: "education evidence" },
    { value: "4단계", label: "Yanadoo AX 실행 프레임워크", note: "home framework" },
  ],
  ja: [
    { value: "92%", label: "再受講・発展教育希望", note: "education_stats" },
    { value: "4.6/5.0", label: "平均教育満足度", note: "education_stats" },
    { value: "243名", label: "累計法人研修受講者", note: "education_stats" },
    { value: "12週", label: "定着重視のAXパートナーシップ", note: "ax-partners" },
    { value: "6項目", label: "AX-Level測定指標", note: "education evidence" },
    { value: "4段階", label: "Yanadoo AX実行フレームワーク", note: "home framework" },
  ],
};

export function HeroMetricsMarquee({ className }: { className?: string }) {
  const { language } = useLanguage();
  const metrics = metricsByLanguage[language];
  const marqueeItems = [...metrics, ...metrics];

  return (
    <section className={cn("relative px-4 pb-10 md:px-6 md:pb-12", className)}>
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/65 bg-[linear-gradient(135deg,rgba(255,255,255,0.9)_0%,rgba(255,248,229,0.88)_45%,rgba(250,243,255,0.92)_100%)] shadow-[0_30px_90px_rgba(40,38,64,0.08)] backdrop-blur-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background via-background/80 to-transparent md:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background via-background/80 to-transparent md:w-28" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C400FF]/35 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#F8B529]/45 to-transparent" />

          <div className="flex items-center gap-3 border-b border-black/5 px-5 py-3 text-[11px] font-semibold tracking-[0.24em] text-[#282640]/60 uppercase md:px-8">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#F8B529] to-[#C400FF]" />
            <span>{language === "ja" ? "AX Signals" : "AX Signals"}</span>
          </div>

          <div className="overflow-hidden py-4 md:py-5">
            <div className="hero-metrics-marquee flex w-max items-center gap-3 md:gap-4">
              {marqueeItems.map((item, index) => (
                <article
                  key={`${item.value}-${item.label}-${index}`}
                  className="group flex min-w-[220px] items-center gap-4 rounded-full border border-[#282640]/8 bg-white/78 px-4 py-3 shadow-[0_12px_30px_rgba(40,38,64,0.06)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 md:min-w-[280px] md:px-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(248,181,41,0.18)_0%,rgba(196,0,255,0.14)_100%)] ring-1 ring-[#C400FF]/10 md:h-14 md:w-14">
                    <span className="bg-gradient-to-r from-[#282640] via-[#6A2FCB] to-[#C400FF] bg-clip-text text-lg font-black tracking-tight text-transparent md:text-xl">
                      {item.value}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground md:text-base">{item.label}</p>
                    <p className="mt-0.5 text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                      {item.note}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes hero-metrics-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .hero-metrics-marquee {
          animation: hero-metrics-marquee 34s linear infinite;
          will-change: transform;
        }

        .hero-metrics-marquee:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-metrics-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
