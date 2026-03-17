import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yanadoo AX - AI 업무 자동화 전문 기업 | AX(AI Experience) 솔루션",
  description:
    "Yanadoo AX는 기업 맞춤형 AI 업무 자동화 솔루션을 제공합니다. 보고서 자동화, AI 챗봇, 데이터 분석 대시보드 등 실질적인 비즈니스 성과를 만들어냅니다. AX 무료 진단 신청하세요.",
  keywords: [
    "AI 업무 자동화",
    "AI 도입",
    "생성형 AI",
    "기업 AI 솔루션",
    "AX",
    "AI Experience",
    "Yanadoo AX",
    "업무 자동화",
    "AI 챗봇",
    "보고서 자동화",
    "RAG",
    "AI 컨설팅",
    "AI 진단",
    "AI 설계",
    "AI 구축",
    "AI 정착",
    "AI 프레임워크",
    "AI 프로세스",
    "AI 프로젝트",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
