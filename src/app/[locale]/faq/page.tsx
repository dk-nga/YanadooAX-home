import type { Metadata } from "next";
import { FAQSection } from "@/components/FAQSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactWidget } from "@/components/ContactWidget";
import { ContactWidgetProvider } from "@/contexts/ContactWidgetContext";

export const metadata: Metadata = {
  title: "FAQ | Yanadoo AX — 자주 묻는 질문",
  description:
    "1:1 무료 진단, AI 교육과 AX 컨설팅의 차이, 도입 기간, 비용 등 자주 묻는 질문을 확인하세요. Yanadoo AX는 실제 현업에 붙는 AI 자동화 솔루션을 설계합니다.",
};

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <ContactWidgetProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-[112px]">
          <FAQSection />
        </main>
        <Footer />
        <ContactWidget />
      </div>
    </ContactWidgetProvider>
  );
}
