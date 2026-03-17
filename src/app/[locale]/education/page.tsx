import { EducationPage } from "@/components/site/education-page";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type EducationStat = Database["public"]["Tables"]["education_stats"]["Row"];

async function getEducationStats(): Promise<EducationStat[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("education_stats")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to fetch education stats", error);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error("Unexpected error fetching education stats", error);
    return [];
  }
}

export default async function EducationRoute() {
  const stats = await getEducationStats();

  return <EducationPage stats={stats} />;
}
