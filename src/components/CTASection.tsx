"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CompactContactForm } from "@/components/CompactContactForm";
import { DownloadModal } from "@/components/DownloadModal";
import { useLanguage } from "@/contexts/LanguageContext";

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

export function CTASection() {
  const { t } = useLanguage();
  const [downloadOpen, setDownloadOpen] = useState(false);

  return (
    <section
      id="about"
      className="relative flex min-h-dvh items-center overflow-hidden overflow-x-hidden pt-10 pb-10 md:pt-14 md:pb-14 lg:pb-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(248,181,41,0.12),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(196,0,255,0.10),_transparent_36%),linear-gradient(180deg,_#f8f6f2_0%,_#ffffff_48%,_#f6f3ff_100%)]" />
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
          className="mx-auto max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.25, once: true }}
        >
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-[2rem] bg-[#0d0d10] px-7 py-7 text-white shadow-[0_32px_80px_rgba(15,15,20,0.26)] md:px-10 md:py-8"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(117,167,255,0.22),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(248,181,41,0.16),_transparent_28%)]" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
                  {t("cta.form.eyebrow")}
                </p>
                <h2 className="mt-6 text-xl font-black leading-[1.1] sm:text-2xl md:text-[2.625rem]">
                  {t("cta.form.title1")}
                  <br />
                  <span className="text-[#7db2ff]">{t("cta.form.title2")}</span>
                </h2>
                <p className="mt-6 max-w-md whitespace-pre-line text-sm leading-7 text-white/64 md:text-base">
                  {t("cta.form.description")}
                </p>
                <ul className="mt-8 space-y-3 text-sm text-white/72">
                  <li>{t("cta.form.point1")}</li>
                  <li>{t("cta.form.point2")}</li>
                  <li>{t("cta.form.point3")}</li>
                </ul>
                <div className="mt-8 flex flex-wrap gap-8 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-3xl font-black">24h</p>
                    <p className="mt-1 text-xs text-white/45">{t("cta.form.stat1")}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black">1:1</p>
                    <p className="mt-1 text-xs text-white/45">{t("cta.form.stat2")}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black">Free</p>
                    <p className="mt-1 text-xs text-white/45">{t("cta.form.stat3")}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-[2rem] border border-slate-200/80 bg-white/96 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.10)] backdrop-blur md:p-6"
            >
              <div className="mb-5 border-b border-slate-100 pb-4">
                <h3 className="text-2xl font-black text-slate-950">{t("cta.form.formTitle")}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{t("cta.form.formDescription")}</p>
              </div>

              <CompactContactForm />

              <button
                type="button"
                onClick={() => setDownloadOpen(true)}
                className="mt-4 w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                {t("cta.button2")}
              </button>
            </motion.div>
          </div>
          <DownloadModal open={downloadOpen} onOpenChange={setDownloadOpen} />
        </motion.div>
      </div>
    </section>
  );
}
