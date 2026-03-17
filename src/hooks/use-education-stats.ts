"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type EducationStat = Database["public"]["Tables"]["education_stats"]["Row"];

type EditValues = {
  stat_value: string;
  stat_suffix: string;
  stat_label: string;
};

const emptyEditValues: EditValues = {
  stat_value: "",
  stat_suffix: "",
  stat_label: "",
};

export function useEducationStats() {
  const [supabase] = useState(createClient);
  const [stats, setStats] = useState<EducationStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<EditValues>(emptyEditValues);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("education_stats")
        .select("*")
        .order("display_order", { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      setStats(data || []);
    } catch (fetchError) {
      console.error("Error fetching education stats:", fetchError);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const startEditing = (stat: EducationStat) => {
    setEditingId(stat.id);
    setEditValues({
      stat_value: stat.stat_value,
      stat_suffix: stat.stat_suffix || "",
      stat_label: stat.stat_label,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValues(emptyEditValues);
  };

  const updateStat = async (id: string) => {
    setSavingId(id);

    try {
      const { data, error: updateError } = await supabase
        .from("education_stats")
        .update({
          stat_value: editValues.stat_value,
          stat_suffix: editValues.stat_suffix || null,
          stat_label: editValues.stat_label,
        })
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      setStats((current) =>
        current.map((stat) => (stat.id === id ? data : stat))
      );
      cancelEditing();
      return data;
    } finally {
      setSavingId(null);
    }
  };

  return {
    stats,
    loading,
    error,
    editingId,
    savingId,
    editValues,
    setEditValues,
    startEditing,
    cancelEditing,
    updateStat,
    refetch: fetchStats,
  };
}
