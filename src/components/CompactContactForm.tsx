"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  getCompactContactSchema,
  submitContactInquiry,
  topicOptions,
  type CompactContactFormData,
} from "@/components/contact-form-shared";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { createClient } from "@/lib/supabase/client";

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-xs text-rose-300">{message}</p>;
}

export function CompactContactForm() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supabase] = useState(() => createClient());
  const schema = useMemo(() => getCompactContactSchema(t), [t]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CompactContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: "",
      name: "",
      phone: "",
      email: "",
      topic: "",
      message: "",
      privacyAgree: false,
    },
  });

  const onSubmit = async (data: CompactContactFormData) => {
    setIsSubmitting(true);

    try {
      await submitContactInquiry({
        supabase,
        data: {
          inquiry_type: "contact",
          company: data.company,
          name: data.name,
          phone: data.phone,
          email: data.email,
          topic: data.topic,
          message: data.message || null,
          privacy_agreed: data.privacyAgree,
          marketing_agreed: false,
          company_type: null,
          department: null,
          position: null,
          visit_path: "홈페이지 CTA",
          source_url: window.location.href,
          user_agent: navigator.userAgent,
        },
      });

      toast.success(t("form.contact.success.title"), {
        description: t("form.contact.success.desc"),
      });
      reset();
    } catch (error) {
      console.error("Compact contact form submission error:", error);
      toast.error(t("form.contact.error.title"), {
        description: t("form.contact.error.desc"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">
            {t("form.contact.company._value")} <span className="text-rose-500">*</span>
          </label>
          <Input
            {...register("company")}
            placeholder={t("form.contact.company.placeholder")}
            aria-invalid={!!errors.company}
            className="mt-2 h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm shadow-none"
          />
          <FieldError message={errors.company?.message} />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            {t("form.contact.name._value")} <span className="text-rose-500">*</span>
          </label>
          <Input
            {...register("name")}
            placeholder={t("form.contact.name.placeholder")}
            aria-invalid={!!errors.name}
            className="mt-2 h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm shadow-none"
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            {t("form.contact.phone._value")} <span className="text-rose-500">*</span>
          </label>
          <Input
            {...register("phone")}
            placeholder={t("form.contact.phone.placeholder")}
            aria-invalid={!!errors.phone}
            className="mt-2 h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm shadow-none"
          />
          <FieldError message={errors.phone?.message} />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            {t("form.contact.email._value")} <span className="text-rose-500">*</span>
          </label>
          <Input
            {...register("email")}
            type="email"
            placeholder={t("form.contact.email.placeholder")}
            aria-invalid={!!errors.email}
            className="mt-2 h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm shadow-none"
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">
          {t("form.contact.topic._value")} <span className="text-rose-500">*</span>
        </label>
        <Controller
          name="topic"
          control={control}
          render={({ field }) => (
            <>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  aria-invalid={!!errors.topic}
                  className="mt-2 h-12 w-full rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm"
                >
                  <SelectValue placeholder={t("form.contact.topic.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {topicOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-sm">
                      {t(option.labelKey)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError message={errors.topic?.message} />
            </>
          )}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">{t("form.contact.message._value")}</label>
        <Textarea
          {...register("message")}
          placeholder={t("form.contact.message.placeholder")}
          aria-invalid={!!errors.message}
          className="mt-2 min-h-24 rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-none"
        />
        <FieldError message={errors.message?.message} />
      </div>

      <div className="rounded-2xl bg-slate-50 p-3.5">
        <Controller
          name="privacyAgree"
          control={control}
          render={({ field }) => (
            <div>
              <label className="flex items-start gap-3">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                  className="mt-0.5 data-checked:border-slate-900 data-checked:bg-slate-900"
                />
                <span className="text-xs leading-5 text-slate-600">
                  <span className="font-medium text-slate-800">
                    {t("form.contact.privacy._value")}
                  </span>
                  <span className="mt-0.5 block">{t("form.contact.privacy.desc")}</span>
                </span>
              </label>
              <FieldError message={errors.privacyAgree?.message} />
            </div>
          )}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        <span>{isSubmitting ? t("form.contact.submitting") : t("cta.form.submit")}</span>
      </button>
    </form>
  );
}
