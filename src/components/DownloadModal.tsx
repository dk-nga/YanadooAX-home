"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PERSONAL_EMAIL_DOMAINS, submitContactInquiry } from "@/components/contact-form-shared";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const schema = z.object({
  company: z.string().min(1, "기업/기관명을 입력해주세요").max(100),
  name: z.string().min(1, "성함을 입력해주세요").max(50),
  email: z
    .string()
    .email("올바른 이메일 주소를 입력해주세요")
    .max(255)
    .refine(
      (email) => {
        const domain = email.split("@")[1]?.toLowerCase();
        return !!domain && !PERSONAL_EMAIL_DOMAINS.includes(domain);
      },
      { message: "회사 이메일 주소를 입력해주세요 (gmail, naver 등 개인 메일 불가)" }
    ),
  phone: z.string().min(1, "연락처를 입력해주세요").max(20),
  privacyAgree: z.boolean().refine((v) => v === true, { message: "개인정보 수집에 동의해주세요" }),
});

type FormData = z.infer<typeof schema>;

type DownloadModalProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isOpen?: boolean;
  onClose?: () => void;
  fileName?: string;
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

export function DownloadModal({ open, onOpenChange, isOpen, onClose }: DownloadModalProps) {
  const resolvedOpen = open ?? isOpen ?? false;
  const resolvedOnOpenChange =
    onOpenChange ??
    ((nextOpen: boolean) => {
      if (!nextOpen) onClose?.();
    });

  const [submitted, setSubmitted] = useState(false);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { company: "", name: "", email: "", phone: "", privacyAgree: false },
  });

  const privacyAgree = watch("privacyAgree");

  const onSubmit = async (data: FormData) => {
    await submitContactInquiry({
      data: {
        inquiry_type: "download",
        company: data.company,
        name: data.name,
        email: data.email,
        phone: data.phone,
        privacy_agreed: data.privacyAgree,
        source_url: window.location.href,
        user_agent: navigator.userAgent,
      },
    });
    setSubmitted(true);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      reset();
      setSubmitted(false);
    }
    resolvedOnOpenChange(next);
  };

  return (
    <Dialog open={resolvedOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="border-none bg-white shadow-2xl sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-black text-[#282640]">서비스 소개서 받기</DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#F8B529] to-[#C400FF]">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-[#282640]">이메일로 발송됐습니다!</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                입력하신 이메일 주소로 소개서를 전달했습니다.
                <br />
                스팸함도 확인해 주세요.
              </p>
            </div>
            <button
              onClick={() => handleOpenChange(false)}
              className="mt-2 rounded-xl bg-[#282640] px-8 py-2.5 text-sm font-bold text-white hover:bg-[#282640]/90"
            >
              닫기
            </button>
          </div>
        ) : (
          <>
            <p className="-mt-2 text-sm text-slate-500">회사 이메일로 서비스 소개서를 보내드립니다.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700">
                    기업/기관명 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    {...register("company")}
                    placeholder="회사명"
                    className="mt-1 h-10 border-gray-200 bg-gray-50 text-sm"
                  />
                  <FieldError message={errors.company?.message} />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">
                    성함 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    {...register("name")}
                    placeholder="홍길동"
                    className="mt-1 h-10 border-gray-200 bg-gray-50 text-sm"
                  />
                  <FieldError message={errors.name?.message} />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700">
                  회사 이메일 <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="name@company.com"
                  className="mt-1 h-10 border-gray-200 bg-gray-50 text-sm"
                />
                <FieldError message={errors.email?.message} />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("phone")}
                  placeholder="010-0000-0000"
                  className="mt-1 h-10 border-gray-200 bg-gray-50 text-sm"
                />
                <FieldError message={errors.phone?.message} />
              </div>

              <div className="rounded-lg bg-gray-50 p-3">
                <label className="flex cursor-pointer items-start gap-3">
                  <Checkbox
                    checked={privacyAgree}
                    onCheckedChange={(c) => setValue("privacyAgree", c === true, { shouldValidate: true })}
                    className="mt-0.5 data-checked:border-[#282640] data-checked:bg-[#282640]"
                  />
                  <span className="text-xs leading-5 text-gray-700">
                    <span className="font-medium">[필수] 개인정보 수집·이용 동의</span>
                    <span className="mt-0.5 block text-gray-500">
                      수집 항목: 회사명, 성함, 이메일, 연락처 / 목적: 소개서 발송 및 서비스 안내 / 보유 기간: 동의 철회 시까지
                    </span>
                  </span>
                </label>
                <FieldError message={errors.privacyAgree?.message} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F8B529] to-[#C400FF] text-sm font-bold text-white disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                {isSubmitting ? "발송 중..." : "소개서 이메일로 받기"}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
