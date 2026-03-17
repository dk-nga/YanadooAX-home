import { HomePageClient } from "@/components/HomePageClient";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return <HomePageClient />;
}
