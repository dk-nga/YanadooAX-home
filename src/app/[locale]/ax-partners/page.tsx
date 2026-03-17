import { AXPartnersPage as AXPartnersContent } from "@/components/site/ax-partners-page";

export default async function AXPartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return <AXPartnersContent />;
}
