import { BlogListPage } from "@/components/site/blog-list-page";
import { getGhostPosts } from "@/lib/ghost";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  let posts = [];
  let hasError = false;

  try {
    const response = await getGhostPosts(1, 12);
    posts = response.posts;
  } catch {
    hasError = true;
  }

  return <BlogListPage posts={posts} hasError={hasError} />;
}
