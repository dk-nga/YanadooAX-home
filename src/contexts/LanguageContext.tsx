"use client";

import { useLocale, useMessages } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export type Language = "ko" | "ja";

function getNestedValue(source: unknown, key: string): string {
  const value = key.split(".").reduce<unknown>((current, segment) => {
    if (current && typeof current === "object" && segment in (current as Record<string, unknown>)) {
      return (current as Record<string, unknown>)[segment];
    }

    return undefined;
  }, source);

  return typeof value === "string" ? value : key;
}

export function useLanguage() {
  const locale = useLocale() as Language;
  const pathname = usePathname();
  const router = useRouter();
  const messages = useMessages();

  return {
    language: locale,
    setLanguage: (language: Language) => {
      router.replace(pathname, { locale: language });
    },
    t: (key: string) => getNestedValue(messages, key),
  };
}
