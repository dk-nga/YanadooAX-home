"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { AXDiagnosisModal } from "@/components/AXDiagnosisModal";
import {
  companyTypeOptions,
  getFullContactSchema,
  submitContactInquiry,
  topicOptions,
  visitPathOptions,
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
import { useContactWidget } from "@/contexts/ContactWidgetContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { createClient } from "@/lib/supabase/client";

function stripLocalePrefix(pathname: string) {
  const normalized = pathname.replace(/^\/(ko|ja)(?=\/|$)/, "");
  return normalized === "" ? "/" : normalized;
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

export function ContactWidget() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { closeContactWidget, isOpen, modalType, openContactWidget } = useContactWidget();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlternate, setShowAlternate] = useState(false);
  const [supabase] = useState(() => createClient());
  const normalizedPathname = stripLocalePrefix(pathname);
  const shouldHideButton =
    normalizedPathname === "/cases" ||
    normalizedPathname === "/ax-partners" ||
    normalizedPathname.startsWith("/admin");

  useEffect(() => {
    if (isOpen) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setShowAlternate((current) => !current);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [isOpen]);

  const contactSchema = useMemo(() => getFullContactSchema(t), [t]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      company: "",
      companyType: "",
      name: "",
      phone: "",
      department: "",
      position: "",
      email: "",
      topic: "",
      visitPath: "",
      message: "",
      privacyAgree: false,
      marketingAgree: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      await submitContactInquiry({
        data: {
          inquiry_type: "contact",
          company: data.company,
          company_type: data.companyType,
        name: data.name,
        phone: data.phone,
        department: data.department,
        position: data.position,
        email: data.email,
        topic: data.topic,
        visit_path: data.visitPath,
          message: data.message || null,
          privacy_agreed: data.privacyAgree,
          marketing_agreed: data.marketingAgree || false,
          source_url: window.location.href,
          user_agent: navigator.userAgent,
        },
      });

      toast.success(t("form.contact.success.title"), {
        description: t("form.contact.success.desc"),
      });
      reset();
      closeContactWidget();
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error(t("form.contact.error.title"), {
        description: t("form.contact.error.desc"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && !shouldHideButton ? (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={openContactWidget}
            className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full shadow-lg"
            style={{
              perspective: "600px",
              background: "linear-gradient(135deg, #F8B529, #C400FF)",
              boxShadow: "0 10px 25px -5px rgba(141, 54, 235, 0.4)",
            }}
          >
            <AnimatePresence mode="wait">
              {showAlternate ? (
                <motion.div
                  key="icon"
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -90 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-3xl font-black text-white"
                >
                  ?
                </motion.div>
              ) : (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col items-center justify-center leading-tight text-white"
                >
                  <span className="text-[10px] font-medium tracking-wide">AI</span>
                  <span className="text-xs font-bold">Ready?</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AXDiagnosisModal
        open={isOpen && modalType === "diagnosis"}
        onOpenChange={(open) => {
          if (!open) {
            closeContactWidget();
          }
        }}
      />

      <AnimatePresence>
        {isOpen && modalType === "contact" ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeContactWidget}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 z-50 flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:inset-auto md:right-6 md:top-6 md:bottom-6 md:w-[480px]"
            >
              <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 md:px-6 md:py-4">
                <h2 className="text-base font-bold text-gray-900 md:text-lg">{t("form.contact.title")}</h2>
                <button
                  type="button"
                  onClick={closeContactWidget}
                  className="rounded-full p-2 transition-colors hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                <div className="mb-4 md:mb-6">
                  <h3 className="mb-1 text-lg font-bold text-gray-900 md:mb-2 md:text-xl">
                    {t("form.contact.heading")}
                  </h3>
                  <p className="text-xs text-gray-600 md:text-sm">{t("form.contact.desc1")}</p>
                  <p className="mt-1 text-xs text-gray-600 md:text-sm">{t("form.contact.desc2")}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    <div>
                      <label className="text-xs text-gray-700 md:text-sm">
                        {t("form.contact.company._value")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        {...register("company")}
                        placeholder={t("form.contact.company.placeholder")}
                        aria-invalid={!!errors.company}
                        className="mt-1 h-9 border-gray-200 bg-gray-50 text-sm md:h-10"
                      />
                      <FieldError message={errors.company?.message} />
                    </div>

                    <div>
                      <label className="text-xs text-gray-700 md:text-sm">
                        {t("form.contact.companyType._value")} <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="companyType"
                        control={control}
                        render={({ field }) => (
                          <>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger
                                aria-invalid={!!errors.companyType}
                                className="mt-1 h-9 w-full border-gray-200 bg-gray-50 text-sm md:h-10"
                              >
                                <SelectValue placeholder={t("form.contact.companyType.placeholder")} />
                              </SelectTrigger>
                              <SelectContent>
                                {companyTypeOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value} className="text-sm">
                                    {t(option.labelKey)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FieldError message={errors.companyType?.message} />
                          </>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    <div>
                      <label className="text-xs text-gray-700 md:text-sm">
                        {t("form.contact.name._value")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        {...register("name")}
                        placeholder={t("form.contact.name.placeholder")}
                        aria-invalid={!!errors.name}
                        className="mt-1 h-9 border-gray-200 bg-gray-50 text-sm md:h-10"
                      />
                      <FieldError message={errors.name?.message} />
                    </div>

                    <div>
                      <label className="text-xs text-gray-700 md:text-sm">
                        {t("form.contact.phone._value")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        {...register("phone")}
                        placeholder={t("form.contact.phone.placeholder")}
                        aria-invalid={!!errors.phone}
                        className="mt-1 h-9 border-gray-200 bg-gray-50 text-sm md:h-10"
                      />
                      <FieldError message={errors.phone?.message} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    <div>
                      <label className="text-xs text-gray-700 md:text-sm">
                        {t("form.contact.department._value")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        {...register("department")}
                        placeholder={t("form.contact.department.placeholder")}
                        aria-invalid={!!errors.department}
                        className="mt-1 h-9 border-gray-200 bg-gray-50 text-sm md:h-10"
                      />
                      <FieldError message={errors.department?.message} />
                    </div>

                    <div>
                      <label className="text-xs text-gray-700 md:text-sm">
                        {t("form.contact.position._value")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        {...register("position")}
                        placeholder={t("form.contact.position.placeholder")}
                        aria-invalid={!!errors.position}
                        className="mt-1 h-9 border-gray-200 bg-gray-50 text-sm md:h-10"
                      />
                      <FieldError message={errors.position?.message} />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-700 md:text-sm">
                      {t("form.contact.email._value")} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder={t("form.contact.email.placeholder")}
                      aria-invalid={!!errors.email}
                      className="mt-1 h-9 border-gray-200 bg-gray-50 text-sm md:h-10"
                    />
                    <FieldError message={errors.email?.message} />
                  </div>

                  <div>
                    <label className="text-xs text-gray-700 md:text-sm">
                      {t("form.contact.topic._value")} <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="topic"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger
                              aria-invalid={!!errors.topic}
                              className="mt-1 h-9 w-full border-gray-200 bg-gray-50 text-sm md:h-10"
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
                    <label className="text-xs text-gray-700 md:text-sm">
                      {t("form.contact.visitPath._value")} <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="visitPath"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger
                              aria-invalid={!!errors.visitPath}
                              className="mt-1 h-9 w-full border-gray-200 bg-gray-50 text-sm md:h-10"
                            >
                              <SelectValue placeholder={t("form.contact.visitPath.placeholder")} />
                            </SelectTrigger>
                            <SelectContent>
                              {visitPathOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value} className="text-sm">
                                  {t(option.labelKey)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FieldError message={errors.visitPath?.message} />
                        </>
                      )}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-700 md:text-sm">{t("form.contact.message._value")}</label>
                    <p className="mt-1 text-[11px] leading-5 text-gray-500 md:text-xs">
                      {t("form.contact.message.desc")}
                    </p>
                    <Textarea
                      {...register("message")}
                      placeholder={t("form.contact.message.placeholder")}
                      aria-invalid={!!errors.message}
                      className="mt-2 min-h-28 border-gray-200 bg-gray-50 text-sm"
                    />
                    <FieldError message={errors.message?.message} />
                  </div>

                  <div className="space-y-3 rounded-lg bg-gray-50 p-3 md:p-4">
                    <Controller
                      name="privacyAgree"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <label className="flex items-start gap-3">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => field.onChange(checked === true)}
                              className="mt-0.5 data-checked:border-[#282640] data-checked:bg-[#282640]"
                            />
                            <span className="text-xs leading-5 text-gray-700 md:text-sm">
                              <span className="font-medium">
                                {t("form.contact.privacy._value")}
                              </span>
                              <span className="mt-0.5 block text-gray-500">{t("form.contact.privacy.desc")}</span>
                            </span>
                          </label>
                          <FieldError message={errors.privacyAgree?.message} />
                        </div>
                      )}
                    />

                    <Controller
                      name="marketingAgree"
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-start gap-3">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked === true)}
                            className="mt-0.5 data-checked:border-[#282640] data-checked:bg-[#282640]"
                          />
                          <span className="text-xs leading-5 text-gray-700 md:text-sm">
                            <span className="font-medium">{t("form.contact.marketing._value")}</span>
                            <span className="mt-0.5 block text-gray-500">{t("form.contact.marketing.desc")}</span>
                          </span>
                        </label>
                      )}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#282640] px-4 text-sm font-bold text-white transition-colors hover:bg-[#282640]/90 disabled:cursor-not-allowed disabled:opacity-70 md:h-14 md:text-lg"
                  >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin md:h-5 md:w-5" /> : <Send className="h-4 w-4 md:h-5 md:w-5" />}
                    <span>{isSubmitting ? t("form.contact.submitting") : t("form.contact.submit")}</span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
