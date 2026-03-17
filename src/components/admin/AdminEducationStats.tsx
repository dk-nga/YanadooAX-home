"use client";

import { Loader2, Save, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEducationStats } from "@/hooks/use-education-stats";

export function AdminEducationStats() {
  const {
    stats,
    loading,
    error,
    editingId,
    editValues,
    setEditValues,
    startEditing,
    cancelEditing,
    updateStat,
    savingId,
  } = useEducationStats();

  const handleSave = async (id: string) => {
    try {
      await updateStat(id);
      toast.success("통계가 업데이트되었습니다.");
    } catch (updateError) {
      console.error("Error updating education stat:", updateError);
      toast.error("통계 저장 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
      </div>
    );
  }

  if (error) {
    return <div className="py-12 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-purple-50 p-2">
          <TrendingUp className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">교육 성과 통계</h2>
          <p className="text-sm text-slate-500">
            Education 페이지에 표시되는 성과 지표를 관리합니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            {editingId === stat.id ? (
              <div className="space-y-4">
                <Field label="수치">
                  <Input
                    value={editValues.stat_value}
                    onChange={(event) =>
                      setEditValues((current) => ({
                        ...current,
                        stat_value: event.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="단위 (예: /5.0, %, 명)">
                  <Input
                    value={editValues.stat_suffix}
                    onChange={(event) =>
                      setEditValues((current) => ({
                        ...current,
                        stat_suffix: event.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="라벨">
                  <Input
                    value={editValues.stat_label}
                    onChange={(event) =>
                      setEditValues((current) => ({
                        ...current,
                        stat_label: event.target.value,
                      }))
                    }
                  />
                </Field>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleSave(stat.id)}
                    disabled={savingId === stat.id}
                    className="flex-1"
                  >
                    {savingId === stat.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Save className="mr-1 h-4 w-4" />
                        저장
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={cancelEditing}
                    className="flex-1"
                  >
                    취소
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-2 flex items-baseline gap-1">
                  <span className="bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-3xl font-black text-transparent">
                    {stat.stat_value}
                  </span>
                  <span className="text-lg font-bold text-slate-400">{stat.stat_suffix}</span>
                </div>
                <p className="mb-4 text-sm text-slate-600">{stat.stat_label}</p>
                <Button size="sm" variant="outline" onClick={() => startEditing(stat)} className="w-full">
                  수정
                </Button>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="mb-4 text-sm font-medium text-slate-700">미리보기</h3>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="mb-2 flex items-baseline justify-center">
                <span className="bg-gradient-to-r from-[#F8B529] to-[#C400FF] bg-clip-text text-4xl font-black text-transparent">
                  {stat.stat_value}
                </span>
                <span className="bg-gradient-to-r from-[#F8B529]/60 to-[#C400FF]/60 bg-clip-text text-lg font-bold text-transparent">
                  {stat.stat_suffix}
                </span>
              </div>
              <p className="text-sm text-slate-500">{stat.stat_label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label className="text-xs text-slate-500">{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
