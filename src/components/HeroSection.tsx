"use client";

import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AXDiagnosisModal } from "@/components/AXDiagnosisModal";
import { DownloadModal } from "@/components/DownloadModal";
import { useScrollContainer } from "@/contexts/ScrollContainerContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();
  const [diagnosisOpen, setDiagnosisOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [hasScrollStarted, setHasScrollStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollContainerRef = useScrollContainer();

  useEffect(() => {
    const container = scrollContainerRef?.current;

    if (!container) {
      return;
    }

    const handleScroll = () => {
      if (container.scrollTop > 8) {
        setHasScrollStarted(true);
      }
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [scrollContainerRef]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (hasScrollStarted) {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [hasScrollStarted]);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-background px-0 pt-28 text-foreground sm:pt-32 lg:pt-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.05),transparent_20%),radial-gradient(circle_at_100%_100%,rgba(196,0,255,0.08),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0.98))]" />
      <div className="pointer-events-none absolute left-1/2 top-12 h-40 w-40 -translate-x-1/2 rounded-full bg-black/5 blur-[90px]" />

      <div className="container relative z-10 mx-auto flex min-h-screen max-w-[1380px] flex-col px-5 pb-12 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-8 pt-10 text-center sm:gap-10 lg:pt-14">
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-balance text-4xl font-black tracking-[-0.06em] text-black sm:text-6xl lg:text-7xl lg:leading-[0.96]">
              {t("hero.title1")}
              <br />
              <span className="bg-gradient-to-r from-[#282640] to-[#C400FF] bg-clip-text text-transparent">
                {t("hero.title2")}
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-sm leading-7 text-black/60 sm:text-lg">
              {t("hero.subtitle1")} {t("hero.subtitle2")}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={() => setDiagnosisOpen(true)}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#282640] px-7 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02] hover:opacity-95"
            >
              {t("hero.cta1")}
            </button>
            <button
              type="button"
              onClick={() => setDownloadOpen(true)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-black/12 bg-white px-7 text-sm font-semibold text-black transition-colors duration-300 hover:bg-black/[0.03]"
            >
              <Play className="h-4 w-4 fill-current" />
              {t("hero.cta2")}
            </button>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto mt-8 w-full max-w-6xl sm:mt-10 lg:mt-12"
          initial={{ opacity: 0, y: 32 }}
          animate={{
            opacity: 1,
            y: hasScrollStarted ? 0 : 56,
            scale: hasScrollStarted ? 1 : 0.94,
          }}
          transition={{
            delay: 0.32,
            duration: hasScrollStarted ? 0.7 : 0.9,
            ease: "easeOut",
          }}
        >
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute -left-10 -top-8 h-32 w-32 rounded-full border border-[#282640]/12 bg-[radial-gradient(circle,rgba(40,38,64,0.16)_0%,rgba(40,38,64,0.08)_45%,rgba(40,38,64,0)_100%)] blur-2xl sm:h-44 sm:w-44 lg:-left-16 lg:-top-10 lg:h-52 lg:w-52" />
            <div className="absolute right-[-1.5rem] top-1/3 h-36 w-36 rounded-full border border-[#C400FF]/16 bg-[radial-gradient(circle,rgba(196,0,255,0.18)_0%,rgba(196,0,255,0.08)_45%,rgba(196,0,255,0)_100%)] blur-2xl sm:h-48 sm:w-48 lg:right-[-3rem] lg:h-64 lg:w-64" />
            <div className="absolute right-14 top-10 h-16 w-16 rounded-full border border-[#F8B529]/20 bg-[radial-gradient(circle,rgba(248,181,41,0.18)_0%,rgba(248,181,41,0.06)_55%,rgba(248,181,41,0)_100%)] blur-xl sm:h-24 sm:w-24" />
          </div>

          <div className="relative z-10 overflow-hidden rounded-[30px] border border-black/8 bg-white p-2 shadow-[0_24px_90px_rgba(0,0,0,0.12)] sm:rounded-[36px] sm:p-3">
            <div className="overflow-hidden rounded-[24px] border border-black/8 bg-black">
              <video
                ref={videoRef}
                className="block aspect-[16/9] w-full object-cover"
                loop
                muted
                playsInline
                preload="auto"
                controls={false}
                src="/home-ui-demo-hq.mp4"
                aria-label="Yanadoo AX hero demo video"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <AXDiagnosisModal open={diagnosisOpen} onOpenChange={setDiagnosisOpen} />
      <DownloadModal open={downloadOpen} onOpenChange={setDownloadOpen} />
    </section>
  );
}
