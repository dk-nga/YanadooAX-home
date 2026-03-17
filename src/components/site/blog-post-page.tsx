"use client";

import { format } from "date-fns";
import { ja, ko } from "date-fns/locale";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { ContactWidget } from "@/components/ContactWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ContactWidgetProvider } from "@/contexts/ContactWidgetContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { GhostPost } from "@/lib/ghost";

type BlogPostPageProps = {
  post: GhostPost | null;
  hasError?: boolean;
};

export function BlogPostPage({ post, hasError = false }: BlogPostPageProps) {
  const { language, t } = useLanguage();
  const dateLocale = language === "ja" ? ja : ko;

  return (
    <ContactWidgetProvider>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pb-20 pt-32">
          <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("blog.backToList")}
              </Link>
            </motion.div>

            {hasError || !post ? (
              <div className="py-12 text-center">
                <h1 className="mb-4 text-2xl font-bold text-foreground">
                  {hasError ? t("blog.error") : t("blog.notFound")}
                </h1>
                <Link href="/blog" className="text-primary hover:underline">
                  {t("blog.backToList")}
                </Link>
              </div>
            ) : (
              <>
                <motion.header
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="rounded-full bg-[#282640]/10 px-3 py-1 text-xs font-medium text-[#282640]"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                    {post.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                    {post.authors?.[0] && (
                      <div className="flex items-center gap-2">
                        {post.authors[0].profile_image ? (
                          <img
                            src={post.authors[0].profile_image}
                            alt={post.authors[0].name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                        <span>{post.authors[0].name}</span>
                      </div>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(post.published_at), "MMMM d, yyyy", { locale: dateLocale })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.reading_time} {t("blog.minRead")}
                    </span>
                  </div>
                </motion.header>

                {post.feature_image && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                  >
                    <img
                      src={post.feature_image}
                      alt={post.title}
                      className="max-h-[500px] w-full rounded-2xl object-cover"
                    />
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={cn(
                    "prose prose-lg max-w-none",
                    "prose-headings:font-bold prose-headings:text-foreground",
                    "prose-h2:mb-6 prose-h2:mt-12 prose-h2:text-2xl md:prose-h2:text-3xl",
                    "prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-xl md:prose-h3:text-2xl",
                    "prose-p:mb-6 prose-p:leading-relaxed prose-p:text-muted-foreground",
                    "prose-a:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
                    "prose-strong:font-semibold prose-strong:text-foreground",
                    "prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6",
                    "prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6",
                    "prose-li:mb-2 prose-li:leading-relaxed prose-li:text-muted-foreground",
                    "prose-img:my-8 prose-img:rounded-xl",
                    "prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-foreground",
                    "prose-pre:rounded-xl prose-pre:bg-muted prose-pre:p-4",
                    "prose-blockquote:my-8 prose-blockquote:rounded-r-lg prose-blockquote:border-l-4 prose-blockquote:border-[#C400FF] prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground",
                    "prose-hr:my-12 prose-hr:border-border",
                  )}
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
              </>
            )}
          </article>
        </main>

        <Footer />
        <ContactWidget />
      </div>
    </ContactWidgetProvider>
  );
}
