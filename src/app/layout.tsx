import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./[locale]/globals.css";

export const metadata: Metadata = {
  title: "Yanadoo AX - AI 업무 자동화 전문 기업 | AX(AI Experience) 솔루션",
  description:
    "Yanadoo AX는 기업 맞춤형 AI 업무 자동화 솔루션과 교육 중심 AX 프로그램을 제공합니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
