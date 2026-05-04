"use client";

import logoFull from "@/assets/logo-full.svg";
import { Link } from "@/i18n/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="snap-start overflow-hidden bg-[#2f2c49] pb-24 pt-12 text-white/82 md:pb-12">
      <div className="container mx-auto overflow-hidden px-4 md:px-6">
        <div className="mb-12">
          <img src={logoFull.src} alt="Yanadoo AX" className="mb-6 h-8 brightness-0 invert" />
          <div className="space-y-2 text-base leading-relaxed text-white/72">
            <p className="font-semibold text-white">{t("footer.company")}</p>
            <p>{t("footer.bizno")}</p>
            <p>{t("footer.ceo")}</p>
            <p>{t("footer.address")}</p>
            <p>{t("footer.eduReg")}</p>
          </div>
          <div className="mt-8 text-lg leading-relaxed text-white/78">
            <p className="font-semibold text-white">{t("footer.customerCenter")}</p>
            <p>{t("footer.hours")}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/18 pt-8 md:flex-row">
          <p className="text-xs text-white/56">{t("footer.copyright")}</p>
          <div className="flex gap-2 text-xs text-white/56">
            <Link href="/privacy" className="transition-colors hover:text-white">
              {t("footer.privacy")}
            </Link>
            <span>|</span>
            <Link href="/terms" className="transition-colors hover:text-white">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
