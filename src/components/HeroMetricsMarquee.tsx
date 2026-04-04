"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

type MetricItem = {
  value: string;
  label: string;
};

const metricsByLanguage: Record<"ko" | "ja", MetricItem[]> = {
  ko: [
    { value: "+440.5%", label: "S사 전체 트래픽 성장 (3개월)" },
    { value: "+2,580.7%", label: "Threads 단일 채널 성장" },
    { value: "×12", label: "SNS 경유 매출 J-Curve" },
    { value: "50%↓", label: "콘텐츠 제작시간 단축" },
    { value: "200건+", label: "상세페이지 자동 생성 /일" },
    { value: "5분", label: "계약서 자동 처리 속도" },
    { value: "8h→40분", label: "주간 보고서 작성 시간" },
  ],
  ja: [
    { value: "+440.5%", label: "S社 全体トラフィック成長（3か月）" },
    { value: "+2,580.7%", label: "Threads単一チャネル成長" },
    { value: "×12", label: "SNS経由売上 J-Curve" },
    { value: "50%↓", label: "コンテンツ制作時間短縮" },
    { value: "200件+", label: "商品詳細ページ自動生成 /日" },
    { value: "5分", label: "契約書 自動処理速度" },
    { value: "8h→40分", label: "週次レポート作成時間" },
  ],
};

export function HeroMetricsMarquee({ className }: { className?: string }) {
  const { language } = useLanguage();
  const metrics = metricsByLanguage[language];
  const marqueeItems = [...metrics, ...metrics];

  return (
    <div className={cn("relative px-0", className)}>
      <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(248,244,252,0.92))] shadow-[0_18px_46px_rgba(40,38,64,0.08)] backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(248,181,41,0.05),rgba(255,255,255,0.03),rgba(196,0,255,0.06))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C400FF]/18 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#F8B529]/22 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#f8f4fc] via-[#f8f4fc]/88 to-transparent md:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#f8f4fc] via-[#f8f4fc]/88 to-transparent md:w-20" />
        <div className="overflow-hidden py-4 md:py-5">
          <div className="hero-metrics-marquee flex w-max items-center gap-0">
            {marqueeItems.map((item, index) => {
              const isBlue = index % 3 === 0 || index % 3 === 1;
              const isPurple = index % 3 === 2;

              return (
                <article
                  key={`${item.value}-${item.label}-${index}`}
                  className="group flex min-w-[250px] items-center gap-5 border-r border-[#282640]/10 px-5 py-1 last:border-r-0 md:min-w-[410px] md:px-14"
                >
                  <span
                    className={cn(
                      "shrink-0 text-[2rem] font-black tracking-[-0.04em] md:text-[2.2rem]",
                      isPurple
                        ? "text-[#5b3fe3]"
                        : isBlue
                          ? "text-[#3565c6]"
                          : "text-[#46a556]"
                    )}
                  >
                    {item.value}
                  </span>
                  <p className="max-w-[160px] text-[15px] font-semibold leading-[1.35] text-[#6d7280] md:max-w-[220px] md:text-[1rem]">
                    {item.label}
                  </p>
                </article>
              );
            })}
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
    </div>
  );
}
