"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContactWidget } from "@/contexts/ContactWidgetContext";

export function HeroSection() {
  const { t } = useLanguage();
  const { openDiagnosisModal } = useContactWidget();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play().catch(() => undefined);
  }, []);

  const scrollToResults = () => {
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-background pt-28 text-foreground sm:pt-32 lg:pt-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.04),transparent_20%),radial-gradient(circle_at_100%_100%,rgba(196,0,255,0.07),transparent_18%)]" />

      <div className="container relative z-10 mx-auto flex min-h-screen max-w-[1380px] items-center px-5 pb-16 sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_600px] xl:grid-cols-[1fr_680px]">

          {/* Left — copy */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
          >
            {/* Tag */}
            <span className="inline-flex w-fit rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-semibold text-black/50 shadow-sm">
              {t("hero.tag")}
            </span>

            {/* Title */}
            <h1 className="text-[1.9rem] font-black leading-[1.1] tracking-[-0.04em] text-black sm:text-5xl lg:text-[4rem] xl:text-[4.5rem]">
              {t("hero.title1")}
              <br />
              {t("hero.title2")}
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#F8B529] via-[#C400FF] to-[#282640] bg-clip-text text-transparent">
                  {t("hero.title3")}
                </span>
                <span className="absolute -inset-x-2 bottom-1 top-0 -z-0 rounded-lg bg-gradient-to-r from-[#F8B529]/10 to-[#C400FF]/10" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base font-semibold leading-relaxed text-black/70 sm:text-lg">
              {t("hero.subtitle1")}
              <br />
              {t("hero.subtitle2")}
            </p>

            {/* Body */}
            <p className="whitespace-pre-line text-sm leading-7 text-black/50 sm:text-base">
              {t("hero.body")}
            </p>

            {/* CTAs */}
            <div className="flex flex-row flex-wrap gap-2">
              <button
                type="button"
                onClick={openDiagnosisModal}
                className="inline-flex flex-1 min-h-11 items-center justify-center rounded-xl bg-[#282640] px-4 text-xs font-semibold text-white transition-transform duration-300 hover:scale-[1.02] hover:opacity-95 sm:flex-none sm:min-h-12 sm:px-7 sm:text-sm"
              >
                {t("hero.cta1")}
              </button>
              <button
                type="button"
                onClick={scrollToResults}
                className="inline-flex flex-1 min-h-11 items-center justify-center rounded-xl border border-black/12 bg-white px-4 text-xs font-semibold text-black transition-colors duration-300 hover:bg-black/[0.03] sm:flex-none sm:min-h-12 sm:px-7 sm:text-sm"
              >
                {t("hero.cta2")}
              </button>
            </div>
          </motion.div>

          {/* Right — video */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-[#F8B529]/10 to-[#C400FF]/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[24px] border border-black/8 bg-white p-2 shadow-[0_24px_80px_rgba(0,0,0,0.14)]">
              <div className="overflow-hidden rounded-[18px] border border-black/6 bg-black">
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

          {/* Mobile video — full width below text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
            className="lg:hidden"
          >
            <div className="overflow-hidden rounded-[20px] border border-black/8 bg-white p-2 shadow-[0_16px_60px_rgba(0,0,0,0.1)]">
              <div className="overflow-hidden rounded-[14px] border border-black/6 bg-black">
                <video
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
      </div>

    </section>
  );
}
