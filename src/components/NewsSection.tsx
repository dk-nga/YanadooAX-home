"use client";

import { ChevronRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const newsItems = [
  {
    category: "뉴스1",
    date: "2025.09",
    id: 1,
    link: "#",
    title: "2025 뉴스1 미래유통혁신포럼 패널토론 - 'AX 시대, 유통의 패러다임 전환'",
  },
  {
    category: "채널코퍼레이션",
    date: "2025.09",
    id: 2,
    link: "https://channelcon.io/",
    title: "채널코퍼레이션, '채널콘 2025' 개최 - AI: REAL CASES ONLY",
  },
  {
    category: "EBS",
    date: "2026.01",
    id: 3,
    link: "#",
    title: "[EBS 클래스e] 신년 특집 'AI, 모든 것의 미래, 모든 이의 미래'",
  },
];

export function NewsSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden overflow-x-hidden bg-[#282640] pb-24 pt-8 md:pb-32 md:pt-12">
      <div className="container relative z-10 mx-auto overflow-hidden px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold md:text-5xl">
            <span className="italic text-[#C400FF]">{t("news.title1")}</span>
            <span className="text-white">{t("news.title2")}</span>
            <br />
            <span className="text-white">{t("news.title3")}</span>
            <span className="text-[#F8B529]">AX</span>
            <span className="text-white">{t("news.title4")}</span>
          </h2>
        </motion.div>

        <div className="space-y-3 md:space-y-4">
          {newsItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : undefined}
              rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.01, x: 5 }}
              className="group block"
            >
              <div className="relative rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 md:rounded-2xl md:p-8">
                <div className="mb-2 flex items-center gap-2 md:mb-4 md:gap-3">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60 md:px-4 md:py-1.5 md:text-sm">
                    {item.date}
                  </span>
                  <span className="rounded-full bg-[#282640] px-3 py-1 text-xs font-medium text-white md:px-4 md:py-1.5 md:text-sm">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 md:gap-4">
                  <h3 className="line-clamp-2 text-sm font-medium text-white transition-all duration-300 group-hover:text-[#C400FF] md:text-xl">
                    {item.title}
                  </h3>
                  <ChevronRight className="h-5 w-5 flex-shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#C400FF] md:h-6 md:w-6" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <a href="#" className="group inline-flex items-center gap-2 text-white/60 transition-colors duration-300 hover:text-white">
            <span className="text-lg font-medium">{t("news.viewAll")}</span>
            <ExternalLink className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
