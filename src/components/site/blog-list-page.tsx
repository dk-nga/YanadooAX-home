"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { ja, ko } from "date-fns/locale";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogFooter } from "@/components/BlogFooter";
import { ContactWidget } from "@/components/ContactWidget";
import { Header } from "@/components/Header";
import { ContactWidgetProvider } from "@/contexts/ContactWidgetContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { GhostPost } from "@/lib/ghost";

type BlogListPageProps = {
  posts: GhostPost[];
  hasError?: boolean;
};

const heroBlobs = [
  {
    className: "absolute",
    style: {
      width: "50%",
      height: "120%",
      left: "-10%",
      top: "-20%",
      background: "rgba(40, 38, 64, 0.06)",
      borderRadius: "9999px",
      filter: "blur(60px)",
    },
    animate: {
      x: [0, 20, 0],
      scale: [1, 1.05, 1],
    },
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
  {
    className: "absolute",
    style: {
      width: "60%",
      height: "100%",
      right: "-15%",
      top: "0%",
      background: "rgba(196, 0, 255, 0.08)",
      borderRadius: "9999px",
      filter: "blur(60px)",
    },
    animate: {
      x: [0, -15, 0],
      y: [0, 10, 0],
    },
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
  {
    className: "absolute",
    style: {
      width: "40%",
      height: "80%",
      right: "20%",
      bottom: "-20%",
      background: "rgba(248, 181, 41, 0.12)",
      borderRadius: "9999px",
      filter: "blur(60px)",
    },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
  {
    className: "absolute",
    style: {
      width: "35%",
      height: "70%",
      left: "30%",
      top: "-10%",
      background: "rgba(40, 38, 64, 0.05)",
      borderRadius: "9999px",
      filter: "blur(50px)",
    },
    animate: {
      y: [0, 15, 0],
    },
    transition: {
      duration: 14,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
];

export function BlogListPage({ posts, hasError = false }: BlogListPageProps) {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const dateLocale = language === "ja" ? ja : ko;

  const categories = useMemo(() => {
    const tagSet = new Map<string, string>();

    posts.forEach((post) => {
      post.tags?.forEach((tag) => {
        if (!tagSet.has(tag.slug)) {
          tagSet.set(tag.slug, tag.name);
        }
      });
    });

    return Array.from(tagSet, ([slug, name]) => ({ slug, name }));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") {
      return posts;
    }

    return posts.filter((post) => post.tags?.some((tag) => tag.slug === selectedCategory));
  }, [posts, selectedCategory]);

  return (
    <ContactWidgetProvider>
      <div className="min-h-screen bg-background">
        <Header />

        <section className="relative pt-20 md:pt-[72px]">
          <div
            className="relative h-[160px] overflow-hidden md:h-[320px]"
            style={{
              background: "#f3f4f8",
            }}
          >
            {heroBlobs.map((blob, index) => (
              <motion.div key={index} {...blob} />
            ))}

            <div className="relative z-10 flex h-full max-w-7xl flex-col justify-center px-4 pt-4 sm:px-6 lg:px-8 md:mx-auto md:pt-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-2 text-xl font-bold text-foreground md:mb-4 md:text-4xl"
              >
                {t("blog.heroTitle")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-2xl text-xs text-muted-foreground md:text-base"
              >
                {t("blog.heroSubtitle")}
              </motion.p>
            </div>
          </div>
        </section>

        <main className="py-8 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {categories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 md:mb-10"
              >
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="h-auto flex-wrap justify-start gap-2 bg-transparent p-0 md:gap-1 md:bg-muted/50 md:p-1">
                    <TabsTrigger
                      value="all"
                      className="rounded-full border border-black/20 px-3 py-1.5 text-xs data-[state=active]:border-[#282640] data-[state=active]:bg-[#282640] data-[state=active]:text-white md:rounded-md md:px-4 md:py-2 md:text-sm"
                    >
                      {t("blog.categoryAll")}
                    </TabsTrigger>
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category.slug}
                        value={category.slug}
                        className="rounded-full border border-black/20 px-3 py-1.5 text-xs data-[state=active]:border-[#282640] data-[state=active]:bg-[#282640] data-[state=active]:text-white md:rounded-md md:px-4 md:py-2 md:text-sm"
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </motion.div>
            )}

            {hasError && (
              <div className="py-20 text-center">
                <p className="text-muted-foreground">{t("blog.error")}</p>
              </div>
            )}

            {!hasError && filteredPosts.length > 0 && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl md:mb-4 md:aspect-[16/10]">
                        {post.feature_image ? (
                          <img
                            src={post.feature_image}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="h-full w-full bg-[#e8e8f2]" />
                        )}
                      </div>

                      <div className="space-y-2 md:space-y-3">
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag.id}
                                variant="outline"
                                className="rounded-full border-black/20 px-2 py-0.5 text-[10px] text-muted-foreground md:px-3 md:py-1 md:text-xs"
                              >
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <h2
                          className={cn(
                            "line-clamp-2 text-base font-bold text-foreground transition-all md:text-xl",
                            "group-hover:text-[#282640]",
                          )}
                        >
                          {post.title}
                        </h2>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground md:gap-4 md:text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                            {format(new Date(post.published_at), "MMM d, yyyy", { locale: dateLocale })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 md:h-4 md:w-4" />
                            {post.reading_time} {t("blog.minRead")}
                          </span>
                        </div>

                        <div className="hidden items-center gap-2 text-sm font-medium transition-all group-hover:gap-3 md:flex">
                          <span className="text-[#282640]">{t("blog.readMore")}</span>
                          <ArrowRight className="h-4 w-4 text-[#C400FF] transition-colors group-hover:text-[#282640]" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}

            {!hasError && filteredPosts.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-muted-foreground">{t("blog.empty")}</p>
              </div>
            )}
          </div>
        </main>

        <BlogFooter />
        <ContactWidget />
      </div>
    </ContactWidgetProvider>
  );
}
