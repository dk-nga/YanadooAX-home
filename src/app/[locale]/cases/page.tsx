import { CasesPage } from "@/components/site/cases-page";
import { getGhostPosts } from "@/lib/ghost";

export default async function CasesRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  let posts = [];
  let hasError = false;

  try {
    const response = await getGhostPosts(1, 100);
    posts = response.posts;
  } catch {
    hasError = true;
  }

  return <CasesPage posts={posts} hasError={hasError} />;
}
