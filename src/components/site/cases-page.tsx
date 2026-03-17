"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { ja, ko } from "date-fns/locale";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import { BlogFooter } from "@/components/BlogFooter";
import { ContactWidget } from "@/components/ContactWidget";
import { DownloadModal } from "@/components/DownloadModal";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactWidgetProvider, useContactWidget } from "@/contexts/ContactWidgetContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "@/i18n/navigation";
import type { GhostPost } from "@/lib/ghost";

const POSTS_PER_PAGE = 9;

const industryCategories = [
  { slug: "ecommerce", ko: "이커머스", ja: "Eコマース" },
  { slug: "manufacturing", ko: "제조업", ja: "製造業" },
  { slug: "education", ko: "교육", ja: "教育" },
  { slug: "content", ko: "콘텐츠", ja: "コンテンツ" },
  { slug: "fashion-beauty", ko: "패션&뷰티", ja: "ファッション&ビューティー" },
  { slug: "marketing", ko: "마케팅", ja: "マーケティング" },
];

function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let startTime = 0;
    let animationFrame = 0;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [duration, end, isInView]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

type CasesPageProps = {
  posts: GhostPost[];
  hasError?: boolean;
};

function CasesPageContent({ posts, hasError = false }: CasesPageProps) {
  const { language, t } = useLanguage();
  const { openContactWidget } = useContactWidget();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const dateLocale = language === "ja" ? ja : ko;
  const industrySlugs = industryCategories.map((category) => category.slug);

  const filteredPosts = useMemo(() => {
    const postsWithIndustryTags = posts.filter((post) =>
      post.tags?.some((tag) => industrySlugs.includes(tag.slug)),
    );

    if (selectedCategory === "all") {
      return postsWithIndustryTags;
    }

    return postsWithIndustryTags.filter((post) =>
      post.tags?.some((tag) => tag.slug === selectedCategory),
    );
  }, [industrySlugs, posts, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [currentPage, filteredPosts]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-24 md:pt-28">
        <div
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 30%, #1e1145 60%, #0d0d24 100%)",
          }}
        >
          <motion.div
            className="absolute"
            style={{
              width: "60%",
              height: "140%",
              right: "-20%",
              top: "-30%",
              background:
                "radial-gradient(ellipse at center, rgba(141, 54, 235, 0.2) 0%, transparent 60%)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute"
            style={{
              width: "50%",
              height: "100%",
              left: "-10%",
              bottom: "-20%",
              background:
                "radial-gradient(ellipse at center, rgba(22, 92, 255, 0.15) 0%, transparent 55%)",
            }}
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1200 500"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="yaCasesCurveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C400FF" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#C400FF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#282640" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="yaCasesCurveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#282640" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#C400FF" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="yaCasesCurveGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C400FF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#282640" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="yaCasesTriangleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C400FF" />
                <stop offset="100%" stopColor="#282640" />
              </linearGradient>
            </defs>

            <motion.path
              d="M-100,450 Q300,350 500,250 T900,100 T1300,50"
              fill="none"
              stroke="url(#yaCasesCurveGrad1)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            <motion.path
              d="M-50,500 Q350,400 550,300 T950,150 T1350,100"
              fill="none"
              stroke="url(#yaCasesCurveGrad2)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.2, delay: 0.2, ease: "easeOut" }}
            />
            <motion.path
              d="M1200,0 Q1000,100 900,200 Q700,350 400,400 Q100,450 -100,350"
              fill="none"
              stroke="url(#yaCasesCurveGrad3)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
            />
            <motion.path
              d="M1100,-50 Q900,150 700,200 Q500,250 300,350 Q100,450 -50,400"
              fill="none"
              stroke="url(#yaCasesCurveGrad1)"
              strokeWidth="1"
              strokeDasharray="8 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
            />
            <motion.path
              d="M1050,200 Q1150,250 1100,350"
              fill="none"
              stroke="url(#yaCasesCurveGrad2)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            />
            <motion.path
              d="M50,150 Q-50,250 100,350"
              fill="none"
              stroke="url(#yaCasesCurveGrad3)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
            />
          </svg>

          <div className="absolute right-0 top-1/4 h-32 w-32 opacity-10 md:h-48 md:w-48">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <polygon
                points="50,10 90,90 10,90"
                fill="none"
                stroke="url(#yaCasesTriangleGrad)"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-16">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(141, 54, 235, 0.08) 0%, rgba(22, 92, 255, 0.05) 30%, transparent 60%)",
              }}
            />

            <div className="relative z-10 mb-8 text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-3 text-xl leading-tight font-bold text-white md:text-3xl lg:text-4xl"
              >
                {t("cases.heroTitle")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-2xl text-sm text-white/70 md:text-lg"
              >
                {t("cases.heroSubtitle")}
              </motion.p>
            </div>

            <div className="mb-8 flex flex-col gap-3 md:flex-row md:gap-4">
              {[
                {
                  label: t("cases.kpi1Label"),
                  value: 50,
                  suffix: "+",
                  unit: language === "ja" ? "件" : "개",
                },
                { label: t("cases.kpi2Label"), value: 90, suffix: "%", unit: "" },
                { label: t("cases.kpi3Label"), value: 80, suffix: "%+", unit: "" },
              ].map((kpi, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm transition-colors duration-300 hover:bg-white/15 md:flex-1 md:flex-col md:items-start"
                >
                  <p className="text-sm text-white/80 md:text-base">{kpi.label}</p>
                  <p className="text-xl font-bold text-white md:text-2xl">
                    <AnimatedCounter end={kpi.value} suffix={kpi.suffix} />
                    {kpi.unit ? (
                      <span className="ml-1 text-base font-medium text-white/80 md:text-lg">
                        {kpi.unit}
                      </span>
                    ) : null}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="md:text-center"
            >
              <Button
                size="lg"
                onClick={() => setIsDownloadModalOpen(true)}
                className="rounded-lg bg-[#282640] px-6 py-5 text-sm font-semibold text-white hover:bg-[#282640]/90 md:text-base"
              >
                {t("cases.downloadCta")}
                <Download className="ml-2 h-4 w-4 group-hover:animate-bounce" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <main className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 text-left text-xl font-bold md:mb-3 md:text-center md:text-3xl"
          >
            <span className="text-[#282640]">Case Study</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-5 text-left text-sm text-muted-foreground md:mb-6 md:text-center md:text-base"
          >
            {language === "ja"
              ? "Yanadoo AXが見つけた実践的なAI活用事例をご覧ください。"
              : "Yanadoo AX가 찾아본 AI 실전 사례들을 살펴보세요."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 md:mb-10"
          >
            <Tabs
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value);
                setCurrentPage(1);
              }}
            >
              <TabsList className="h-auto flex-wrap justify-start gap-1 bg-muted/50 p-1 md:justify-center">
                <TabsTrigger
                  value="all"
                  className="rounded-full px-3 py-1.5 text-xs data-[state=active]:bg-[#282640] data-[state=active]:text-white md:px-4 md:py-2 md:text-sm"
                >
                  {language === "ja" ? "すべて" : "전체"}
                </TabsTrigger>
                {industryCategories.map((category) => (
                  <TabsTrigger
                    key={category.slug}
                    value={category.slug}
                    className="rounded-full px-3 py-1.5 text-xs data-[state=active]:bg-[#282640] data-[state=active]:text-white md:px-4 md:py-2 md:text-sm"
                  >
                    {language === "ja" ? category.ja : category.ko}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>

          {hasError ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">{t("cases.error")}</p>
            </div>
          ) : paginatedPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {paginatedPosts.map((post, index) => {
                  const industryTags = post.tags.filter((tag) => industrySlugs.includes(tag.slug));
                  const primaryIndustryTag = industryTags[0];
                  const primaryIndustryCategory = industryCategories.find(
                    (category) => category.slug === primaryIndustryTag?.slug,
                  );

                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="group overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <div className="relative aspect-[16/10] overflow-hidden">
                          {post.feature_image ? (
                            <img
                              src={post.feature_image}
                              alt={post.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                          )}

                          {primaryIndustryCategory ? (
                            <div className="absolute top-3 left-3">
                              <Badge className="border-none bg-black/60 text-white backdrop-blur-sm">
                                {language === "ja"
                                  ? primaryIndustryCategory.ja
                                  : primaryIndustryCategory.ko}
                              </Badge>
                            </div>
                          ) : null}
                        </div>

                        <div className="space-y-3 p-5">
                          {industryTags.length > 0 ? (
                            <div className="mt-1 flex flex-wrap gap-2">
                              {industryTags.slice(0, 2).map((tag) => {
                                const category = industryCategories.find(
                                  (industryCategory) => industryCategory.slug === tag.slug,
                                );
                                const displayName =
                                  language === "ja" ? category?.ja : category?.ko;

                                return (
                                  <Badge
                                    key={tag.id}
                                    variant="outline"
                                    className="border-black/10 bg-black/[0.03] text-foreground/80"
                                  >
                                    {displayName || tag.name}
                                  </Badge>
                                );
                              })}
                            </div>
                          ) : null}

                          <h2 className="line-clamp-2 text-xl font-bold text-foreground transition-all group-hover:bg-gradient-to-r group-hover:from-[#F8B529] group-hover:to-[#C400FF] group-hover:bg-clip-text group-hover:text-transparent">
                            {post.title}
                          </h2>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {format(new Date(post.published_at), "MMM d, yyyy", {
                                locale: dateLocale,
                              })}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  );
                })}
              </div>

              {totalPages > 1 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-12 flex items-center justify-center gap-2"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((previous) => Math.max(1, previous - 1))}
                    disabled={currentPage === 1}
                    className="h-10 w-10"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "h-10 w-10 border-none bg-[#282640] text-white hover:bg-[#282640]/90"
                            : "h-10 w-10"
                        }
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((previous) => Math.min(totalPages, previous + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="h-10 w-10"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              ) : null}
            </>
          ) : (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">{t("cases.empty")}</p>
            </div>
          )}
        </div>
      </main>

      <section className="bg-[#0d0d24] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-2 text-3xl leading-tight font-bold text-white md:text-4xl">
                {t("cases.ctaTitle1")}
              </h2>
              <h2 className="mb-8 text-3xl leading-tight font-bold md:text-4xl">
                <span className="bg-gradient-to-br from-[#F8B529] to-[#C400FF] bg-clip-text text-transparent">
                  {t("cases.ctaTitle2")}
                </span>
              </h2>
              <Button
                size="lg"
                onClick={openContactWidget}
                className="bg-[#282640] px-8 font-semibold text-white hover:bg-[#282640]/90"
              >
                {t("cases.ctaButton")}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-0"
            >
              {[
                { label: t("cases.service1"), href: "#" },
                { label: t("cases.service2"), href: "#" },
                { label: t("cases.service3"), href: "/blog" },
              ].map((item, index) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={index}
                    href={item.href}
                    className="group -mx-2 flex items-center justify-between border-t border-white/10 px-2 py-5 transition-colors hover:bg-white/5"
                  >
                    <span className="font-medium text-white/90">{item.label}</span>
                    <span className="flex items-center gap-1 text-white/50 transition-all group-hover:translate-x-1 group-hover:text-white/90">
                      {t("cases.goTo")} <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ) : (
                  <button
                    key={index}
                    type="button"
                    onClick={openContactWidget}
                    className="group -mx-2 flex w-full items-center justify-between border-t border-white/10 px-2 py-5 text-left transition-colors hover:bg-white/5"
                  >
                    <span className="font-medium text-white/90">{item.label}</span>
                    <span className="flex items-center gap-1 text-white/50 transition-all group-hover:translate-x-1 group-hover:text-white/90">
                      {t("cases.goTo")} <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                ),
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <BlogFooter />
      <ContactWidget />
      <DownloadModal open={isDownloadModalOpen} onOpenChange={setIsDownloadModalOpen} />
    </div>
  );
}

export function CasesPage(props: CasesPageProps) {
  return (
    <ContactWidgetProvider>
      <CasesPageContent {...props} />
    </ContactWidgetProvider>
  );
}
