"use client";

import { ChevronDown, Volume2 } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AXDiagnosisModal } from "@/components/AXDiagnosisModal";
import { DownloadModal } from "@/components/DownloadModal";
import { GradientSphere } from "@/components/GradientSphere";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { amount: 0.5, once: false });
  const { t } = useLanguage();
  const [diagnosisOpen, setDiagnosisOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 50 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 50 });
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      mouseX.set((event.clientX - centerX) / rect.width);
      mouseY.set((event.clientY - centerY) / rect.height);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleTalk = () => {
    if (isLoading || isSpeaking) {
      return;
    }

    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      setIsSpeaking(true);
      window.setTimeout(() => setIsSpeaking(false), 2400);
    }, 600);
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-start overflow-hidden px-0 pt-36 sm:pt-40 lg:justify-center lg:overflow-visible lg:pt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden lg:overflow-visible">
        <motion.div
          className="absolute top-1/4 -right-20 h-96 w-96 rounded-full bg-[#C400FF]/10 blur-3xl"
          animate={{ opacity: [0.5, 0.3, 0.5], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-20 h-80 w-80 rounded-full bg-[#282640]/10 blur-3xl"
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      <div className="container relative z-10 mx-auto overflow-visible px-6 md:px-8">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8 lg:pl-8 xl:pl-16">
          <div className="flex min-h-[calc(100vh-12rem)] flex-col gap-8 lg:min-h-0">
            <motion.div
              ref={headingRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-xl font-black leading-tight sm:text-2xl md:text-4xl md:leading-[1.15] lg:text-5xl">
                <span>
                  {t("hero.title1")}{" "}
                  <motion.span
                    className="inline-block text-[#C400FF]"
                    initial={{ opacity: 0, rotate: -10, scale: 0.5 }}
                    animate={
                      isInView
                        ? { opacity: 1, rotate: [0, -5, 5, -3, 3, 0], scale: 1, x: [0, -3, 3, -2, 2, 0] }
                        : { opacity: 0, rotate: -10, scale: 0.5 }
                    }
                    transition={{
                      delay: 0.4,
                      duration: 0.8,
                      rotate: { delay: 0.8, duration: 0.6, ease: "easeInOut" },
                      type: "spring",
                      stiffness: 200,
                      x: { delay: 0.8, duration: 0.6, ease: "easeInOut" },
                    }}
                  >
                    AX
                  </motion.span>
                </span>
                <br />
                <span className="text-foreground">{t("hero.title2")}</span>
              </h1>
            </motion.div>

            <motion.p
              className="max-w-lg text-base text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t("hero.subtitle1")}
              <br />
              <motion.span
                className="inline-block font-semibold text-[#C400FF]"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                AX(AI Transformation)
              </motion.span>
              <span className="whitespace-nowrap">{t("hero.subtitle2")}</span>
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 md:gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button
                type="button"
                onClick={() => setDiagnosisOpen(true)}
                className="rounded-full bg-[#282640] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:opacity-90 md:px-8 md:py-4 md:text-base"
              >
                {t("hero.cta1")}
              </button>
              <button
                type="button"
                onClick={() => setDownloadOpen(true)}
                className="rounded-full border-2 border-border bg-background px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105 hover:border-[#C400FF]/50 md:px-8 md:py-4 md:text-base"
              >
                {t("hero.cta2")}
              </button>
            </motion.div>

            <motion.div
              className="flex flex-col items-center overflow-visible pb-24 pt-4 lg:hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.div className="relative cursor-pointer" onClick={handleTalk} whileTap={{ scale: 0.95 }}>
                <GradientSphere isHovered={isHovered} isSpeaking={isSpeaking} mouseX={0} mouseY={0} size={110} />
              </motion.div>
              <motion.div
                className="mt-3 flex items-center gap-2 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 px-3 py-1.5 backdrop-blur-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      className="h-3 w-3 rounded-full border-2 border-cyan-400 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                    />
                    <span className="text-[10px] font-medium text-cyan-500">{t("hero.preparing")}</span>
                  </>
                ) : isSpeaking ? (
                  <>
                    <Volume2 className="h-3 w-3 text-cyan-500" />
                    <span className="text-[10px] font-medium text-cyan-500">{t("hero.speaking")}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-3 w-3 text-cyan-500" />
                    <span className="text-[10px] font-medium text-cyan-500">{t("hero.clickToTalk")}</span>
                  </>
                )}
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            ref={containerRef}
            className="relative z-50 hidden h-[400px] items-center justify-center md:h-[450px] lg:flex"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            style={{ overflow: "visible", perspective: "1200px" }}
          >
            <motion.div
              className="relative cursor-pointer"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onClick={handleTalk}
              onHoverEnd={() => setIsHovered(false)}
              onHoverStart={() => setIsHovered(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GradientSphere
                isHovered={isHovered}
                isSpeaking={isSpeaking}
                mouseX={smoothMouseX}
                mouseY={smoothMouseY}
                size={420}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <span className="text-sm font-medium text-muted-foreground">{t("hero.scroll")}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}>
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </motion.div>

      <AXDiagnosisModal open={diagnosisOpen} onOpenChange={setDiagnosisOpen} />
      <DownloadModal open={downloadOpen} onOpenChange={setDownloadOpen} />
    </section>
  );
}
