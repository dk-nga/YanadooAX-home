"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContactWidget } from "@/contexts/ContactWidgetContext";

export function FAQSection() {
  const { t } = useLanguage();
  const { openContactWidget } = useContactWidget();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const items = Array.from({ length: 7 }, (_, i) => ({
    q: t(`faq.items.${i}.q`),
    a: t(`faq.items.${i}.a`),
  }));

  // JSON-LD FAQ schema for AEO
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section id="faq" className="relative bg-[#f9f8ff] py-12 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container mx-auto max-w-3xl px-5 sm:px-8">
        {/* 헤더 */}
        <div className="mb-10 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#C400FF]">
            {t("faq.badge")}
          </span>
          <h2 className="mt-3 text-2xl font-black leading-tight text-[#10182b] md:text-4xl">
            {t("faq.title")}
          </h2>
          <p className="mt-3 text-sm text-slate-500 md:text-base">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* 아코디언 */}
        <div className="space-y-3">
          {items.map(({ q, a }, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                  isOpen
                    ? "border-[#C400FF]/20 bg-white shadow-[0_4px_24px_rgba(196,0,255,0.08)]"
                    : "border-stone-200 bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className={`text-sm font-bold leading-snug md:text-base ${isOpen ? "text-[#282640]" : "text-slate-700"}`}>
                    {q}
                  </span>
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-black transition-all duration-300 ${
                      isOpen
                        ? "bg-[#C400FF] text-white rotate-45"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <p className="border-t border-[#C400FF]/10 px-5 pb-5 pt-4 text-sm leading-7 text-slate-500 md:text-base">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 rounded-2xl border border-[#C400FF]/15 bg-gradient-to-br from-[#282640] to-[#3a2060] p-6 text-center text-white md:p-8"
        >
          <p className="text-sm font-semibold text-white/60">더 궁금한 게 있으신가요?</p>
          <p className="mt-2 text-lg font-black md:text-xl">
            30분 무료 진단으로 직접 확인해보세요
          </p>
          <button
            onClick={openContactWidget}
            className="mt-5 rounded-xl bg-gradient-to-r from-[#F8B529] to-[#C400FF] px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            무료 진단 신청하기 →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
