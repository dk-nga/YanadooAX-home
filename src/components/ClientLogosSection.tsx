"use client";

const STORAGE_URL = "https://rsigybhusvrnkllhurhv.supabase.co/storage/v1/object/public/client-logos";

const clients = [
  { name: "OP.GG", logo: `${STORAGE_URL}/op.gg.png` },
  { name: "삼화제작소", logo: `${STORAGE_URL}/samhwa.png` },
  { name: "세정글로벌", logo: `${STORAGE_URL}/sejungglobal.png` },
  { name: "에듀윌", logo: `${STORAGE_URL}/eduwill.png` },
  { name: "잇존어페럴", logo: `${STORAGE_URL}/itzon.png` },
  { name: "대법원", logo: `${STORAGE_URL}/court.svg` },
  { name: "메이플미디어", logo: `${STORAGE_URL}/maplemedia.png` },
  { name: "Grandeclip", logo: `${STORAGE_URL}/grandeclip.png` },
  { name: "Stayfolio", logo: `${STORAGE_URL}/stayfolio.png` },
];

// 3벌 복제 — 끝에서 끊김 없이 루프
const marqueeClients = [...clients, ...clients, ...clients];

export function ClientLogosSection() {
  return (
    <div className="relative border-y border-black/6 bg-white py-4">
      <p className="mb-3 text-center text-xs font-semibold tracking-[0.22em] text-black/30 uppercase">
        도입 기업
      </p>

      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent sm:w-14" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent sm:w-14" />

      <div className="overflow-hidden">
        <div className="client-logos-marquee flex w-max items-center gap-6 px-6 sm:gap-10 sm:px-10">
          {marqueeClients.map((client, i) => (
            <img
              key={`${client.name}-${i}`}
              src={client.logo}
              alt={client.name}
              className="h-7 max-w-[100px] object-contain grayscale opacity-50 transition-all duration-300 hover:opacity-90 hover:grayscale-0 md:h-9"
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes client-logos-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .client-logos-marquee {
          animation: client-logos-marquee 30s linear infinite;
          will-change: transform;
        }
        .client-logos-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .client-logos-marquee { animation: none; }
        }
      `}</style>
    </div>
  );
}
