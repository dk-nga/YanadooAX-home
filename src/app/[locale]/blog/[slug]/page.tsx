import { BlogPostPage } from "@/components/site/blog-post-page";
import { getGhostPost } from "@/lib/ghost";

export default async function BlogPostRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  let post = null;
  let hasError = false;

  try {
    post = await getGhostPost(slug);
  } catch {
    hasError = true;
  }

  return <BlogPostPage post={post} hasError={hasError} />;
}
