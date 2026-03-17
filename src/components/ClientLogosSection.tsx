"use client";

import { motion } from "framer-motion";
import logoFull from "@/assets/logo-full.svg";
import { useLanguage } from "@/contexts/LanguageContext";

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

export function ClientLogosSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden overflow-x-hidden bg-gradient-to-b from-[#32305f] via-[#3a376d] to-[#44407a] py-24 md:py-28">
      <div
        className="absolute h-64 w-64 rounded-full bg-gradient-to-r from-[#F8B529]/40 to-[#C400FF]/40 blur-3xl"
        style={{ left: "5%", top: "10%" }}
      />
      <div
        className="absolute h-48 w-48 rounded-full bg-gradient-to-r from-[#282640]/30 to-[#C400FF]/30 blur-3xl"
        style={{ bottom: "15%", right: "10%" }}
      />

      <div className="container relative z-10 mx-auto overflow-hidden px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="mb-1 text-xs text-gray-200 md:mb-2 md:text-lg">{t("clients.subtitle")}</p>
          <h2 className="mb-3 text-lg font-bold text-white md:mb-4 md:text-3xl">
            <span className="relative inline-block rounded-md bg-white px-2 py-0.5 text-sm font-bold text-gray-900 md:rounded-lg md:px-3 md:py-1 md:text-3xl">
              {t("clients.highlight")}
            </span>
            <span className="text-sm text-white md:text-3xl">{t("clients.title")}</span>
          </h2>
          <img src={logoFull.src} alt="Yanadoo AX" className="mx-auto h-6 md:h-14" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-3xl p-[2px]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#F8B529] via-[#282640] to-[#C400FF] opacity-60" />
            <div className="relative rounded-2xl bg-[#f8f9fc] p-4 md:rounded-3xl md:p-12">
              <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-5 md:mb-8 md:gap-8">
                {clients.slice(0, 5).map((client, index) => (
                  <motion.div
                    key={client.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex h-10 items-center justify-center px-2 md:h-20 md:px-4"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-6 max-w-full object-contain grayscale transition-all duration-300 hover:grayscale-0 md:max-h-12"
                    />
                  </motion.div>
                ))}
              </div>
              <div className="mx-auto grid max-w-[80%] grid-cols-2 gap-3 sm:grid-cols-4 md:gap-8">
                {clients.slice(5, 9).map((client, index) => (
                  <motion.div
                    key={client.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index + 5) * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex h-10 items-center justify-center px-2 md:h-20 md:px-4"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-6 max-w-full object-contain grayscale transition-all duration-300 hover:grayscale-0 md:max-h-12"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
