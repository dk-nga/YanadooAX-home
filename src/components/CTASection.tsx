"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { DownloadModal } from "@/components/DownloadModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContactWidget } from "@/contexts/ContactWidgetContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, transition: { duration: 0.7 }, y: 0 },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 }, y: 0 },
};

export function CTASection() {
  const { t } = useLanguage();
  const { openDiagnosisModal } = useContactWidget();
  const [downloadOpen, setDownloadOpen] = useState(false);

  return (
    <section id="about" className="relative flex min-h-screen items-center overflow-hidden overflow-x-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8B529]/5 via-background to-[#C400FF]/10" />
      <motion.div
        className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-[#C400FF]/20 blur-3xl"
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 h-80 w-80 rounded-full bg-[#282640]/20 blur-3xl"
        animate={{ opacity: [0.5, 0.3, 0.5], scale: [1.2, 1, 1.2] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="container relative z-10 mx-auto overflow-hidden px-4 md:px-6">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5, once: false }}
        >
          <motion.h2 className="mb-4 text-2xl font-black md:mb-6 md:text-6xl" variants={itemVariants}>
            {t("cta.title1")}{" "}
            <span className="bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">
              {t("cta.title2")}
            </span>
            {t("cta.title3")}
          </motion.h2>
          <motion.p
            className="mx-auto mb-8 max-w-2xl whitespace-pre-line text-sm text-muted-foreground md:mb-10 md:text-xl"
            variants={itemVariants}
          >
            {t("cta.subtitle")}
          </motion.p>
          <motion.div className="flex flex-col justify-center gap-4 sm:flex-row" variants={containerVariants}>
            <motion.button
              type="button"
              onClick={openDiagnosisModal}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#282640] px-6 py-3 text-base font-semibold text-white transition-all hover:bg-[#282640]/90 md:px-8 md:py-4 md:text-lg"
              variants={buttonVariants}
              whileHover={{ gap: "12px", scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("cta.button1")}
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setDownloadOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-border px-6 py-3 text-base font-semibold transition-all hover:border-[#C400FF]/50 md:px-8 md:py-4 md:text-lg"
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("cta.button2")}
            </motion.button>
          </motion.div>
          <DownloadModal open={downloadOpen} onOpenChange={setDownloadOpen} />
        </motion.div>
      </div>
    </section>
  );
}
