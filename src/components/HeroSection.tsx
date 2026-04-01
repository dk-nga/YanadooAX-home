"use client";

import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AXDiagnosisModal } from "@/components/AXDiagnosisModal";
import { DownloadModal } from "@/components/DownloadModal";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();
  const [diagnosisOpen, setDiagnosisOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.currentTime = 0;
    void video.play().catch(() => undefined);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-background px-0 pt-28 text-foreground sm:pt-32 lg:pt-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.05),transparent_20%),radial-gradient(circle_at_100%_100%,rgba(196,0,255,0.08),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0.98))]" />

      <div className="container relative z-10 mx-auto flex min-h-screen max-w-[1380px] flex-col px-5 pb-12 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-5xl flex-none flex-col items-center justify-start gap-6 pt-8 text-center sm:flex-1 sm:justify-center sm:gap-10 lg:pt-14">
          <motion.div
            className="w-full space-y-5"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="mx-auto w-full max-w-[28rem] text-[2rem] font-black leading-[1.2] tracking-[-0.06em] text-black sm:max-w-none sm:text-balance sm:text-6xl sm:leading-[1.08] lg:text-7xl lg:leading-[1.02]">
              <span className="whitespace-nowrap">{t("hero.title1")}</span>
              <br />
              <span className="bg-gradient-to-r from-[#282640] to-[#C400FF] bg-clip-text text-transparent">
                {t("hero.title2")}
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-sm leading-7 text-black/60 sm:text-lg">
              {t("hero.subtitle1")}
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              {t("hero.subtitle2")}
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
          className="relative mx-auto mt-5 w-full max-w-6xl sm:mt-7 lg:mt-12"
          initial={{ opacity: 0, y: 32 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            delay: 0.32,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <div className="relative z-10 overflow-hidden rounded-[30px] border border-black/8 bg-white p-2 shadow-[0_24px_90px_rgba(0,0,0,0.12)] sm:rounded-[36px] sm:p-3">
            <div className="overflow-hidden rounded-[24px] border border-black/8 bg-black">
              <video
                ref={videoRef}
                className="block aspect-[16/9] w-full object-cover"
                loop
                muted
                playsInline
                autoPlay
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
