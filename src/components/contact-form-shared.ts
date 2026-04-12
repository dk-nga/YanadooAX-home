"use client";

import { z } from "zod";
import type { Database } from "@/lib/supabase/types";

type Translator = (key: string) => string;

export const companyTypeOptions = [
  { value: "대기업", labelKey: "form.contact.companyType.large" },
  { value: "중견기업", labelKey: "form.contact.companyType.mid" },
  { value: "중소기업", labelKey: "form.contact.companyType.small" },
  { value: "스타트업", labelKey: "form.contact.companyType.startup" },
  { value: "공공기관", labelKey: "form.contact.companyType.public" },
  { value: "교육기관", labelKey: "form.contact.companyType.edu" },
  { value: "기타", labelKey: "form.contact.companyType.other" },
];

export const topicOptions = [
  { value: "AI 기초 교육", labelKey: "form.contact.topic.basic" },
  { value: "생성형 AI 활용", labelKey: "form.contact.topic.genai" },
  { value: "AI 업무 자동화", labelKey: "form.contact.topic.automation" },
  { value: "AI 전략 컨설팅", labelKey: "form.contact.topic.strategy" },
  { value: "맞춤형 교육", labelKey: "form.contact.topic.custom" },
  { value: "기타", labelKey: "form.contact.topic.other" },
];

export const visitPathOptions = [
  { value: "검색엔진", labelKey: "form.contact.visitPath.search" },
  { value: "소셜미디어", labelKey: "form.contact.visitPath.social" },
  { value: "지인추천", labelKey: "form.contact.visitPath.referral" },
  { value: "뉴스/기사", labelKey: "form.contact.visitPath.news" },
  { value: "이전교육참여", labelKey: "form.contact.visitPath.previous" },
  { value: "기타", labelKey: "form.contact.visitPath.other" },
];

export const getFullContactSchema = (t: Translator) =>
  z.object({
    company: z.string().min(1, t("form.validation.company")).max(100),
    companyType: z.string().min(1, t("form.validation.companyType")),
    name: z.string().min(1, t("form.validation.name")).max(50),
    phone: z.string().min(1, t("form.validation.phone")).max(20),
    department: z.string().min(1, t("form.validation.department")).max(50),
    position: z.string().min(1, t("form.validation.position")).max(50),
    email: z.string().email(t("form.validation.email")).max(255),
    topic: z.string().min(1, t("form.validation.topic")),
    visitPath: z.string().min(1, t("form.validation.visitPath")),
    message: z.string().max(2000).optional(),
    privacyAgree: z.boolean().refine((value) => value === true, {
      message: t("form.validation.privacy"),
    }),
    marketingAgree: z.boolean().optional(),
  });

export const getCompactContactSchema = (t: Translator) =>
  z.object({
    company: z.string().min(1, t("form.validation.company")).max(100),
    name: z.string().min(1, t("form.validation.name")).max(50),
    phone: z.string().min(1, t("form.validation.phone")).max(20),
    email: z.string().email(t("form.validation.email")).max(255),
    topic: z.string().min(1, t("form.validation.topic")),
    message: z.string().max(2000).optional(),
    privacyAgree: z.boolean().refine((value) => value === true, {
      message: t("form.validation.privacy"),
    }),
  });

export type FullContactFormData = z.infer<ReturnType<typeof getFullContactSchema>>;
export type CompactContactFormData = z.infer<ReturnType<typeof getCompactContactSchema>>;

type InquiryInsert = Database["public"]["Tables"]["inquiries"]["Insert"];

export async function submitContactInquiry({ data }: { data: InquiryInsert }) {
  const res = await fetch("/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? "문의 접수에 실패했습니다.");
  }
}
