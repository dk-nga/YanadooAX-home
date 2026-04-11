"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Star, TrendingUp, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type NavVisibility = {
  partners: boolean;
  education: boolean;
  cases: boolean;
  about: boolean;
  blog: boolean;
};

const DEFAULT_NAV: NavVisibility = {
  partners: false,
  education: false,
  cases: false,
  about: false,
  blog: false,
};

const NAV_LABELS: { key: keyof NavVisibility; label: string }[] = [
  { key: "partners", label: "AX 파트너즈" },
  { key: "education", label: "AI 교육" },
  { key: "cases", label: "고객사례" },
  { key: "about", label: "회사소개" },
  { key: "blog", label: "블로그" },
];

type Stats = {
  totalInquiries: number;
  contactCount: number;
  diagnosisCount: number;
  downloadCount: number;
  testimonialCount: number;
};

const initialStats: Stats = {
  totalInquiries: 0,
  contactCount: 0,
  diagnosisCount: 0,
  downloadCount: 0,
  testimonialCount: 0,
};

export function AdminDashboard() {
  const [supabase] = useState(createClient);
  const [stats, setStats] = useState<Stats>(initialStats);
  const [loading, setLoading] = useState(true);
  const [navVisibility, setNavVisibility] = useState<NavVisibility>(DEFAULT_NAV);
  const [navSaving, setNavSaving] = useState(false);
  const [navError, setNavError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: inquiries, error: inquiriesError } = await supabase
          .from("inquiries")
          .select("inquiry_type");

        if (inquiriesError) {
          throw inquiriesError;
        }

        const { count: testimonialCount, error: testimonialError } = await supabase
          .from("testimonials")
          .select("*", { count: "exact", head: true });

        if (testimonialError) {
          throw testimonialError;
        }

        setStats({
          totalInquiries: inquiries?.length || 0,
          contactCount:
            inquiries?.filter((item) => item.inquiry_type === "contact").length || 0,
          diagnosisCount:
            inquiries?.filter((item) => item.inquiry_type === "diagnosis").length || 0,
          downloadCount:
            inquiries?.filter((item) => item.inquiry_type === "download").length || 0,
          testimonialCount: testimonialCount || 0,
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [supabase]);

  useEffect(() => {
    const fetchNavSettings = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data } = await (supabase as any)
          .from("site_settings")
          .select("value")
          .eq("key", "nav_visibility")
          .single();
        if (data?.value) {
          setNavVisibility(data.value as NavVisibility);
        }
      } catch {
        // table not yet created
      }
    };
    fetchNavSettings();
  }, [supabase]);

  const handleNavToggle = async (key: keyof NavVisibility, value: boolean) => {
    const next = { ...navVisibility, [key]: value };
    setNavVisibility(next);
    setNavSaving(true);
    setNavError(null);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from("site_settings")
        .upsert({ key: "nav_visibility", value: next, updated_at: new Date().toISOString() });
      if (error) throw error;
    } catch (e) {
      setNavError("저장 실패. Supabase에 site_settings 테이블이 필요합니다.");
      console.error(e);
    } finally {
      setNavSaving(false);
    }
  };

  const statCards = [
    {
      title: "전체 문의",
      value: stats.totalInquiries,
      icon: MessageSquare,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "일반 문의",
      value: stats.contactCount,
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "AX 진단 신청",
      value: stats.diagnosisCount,
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "자료 다운로드",
      value: stats.downloadCount,
      icon: MessageSquare,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "후기",
      value: stats.testimonialCount,
      icon: Star,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 h-4 w-1/2 animate-pulse rounded bg-slate-200" />
            <div className="h-8 w-1/3 animate-pulse rounded bg-slate-200" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">{stat.title}</span>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon
                  className={`h-5 w-5 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">메뉴 표시 설정</h2>
          {navSaving && <span className="text-xs text-slate-400">저장 중...</span>}
          {navError && <span className="text-xs text-red-500">{navError}</span>}
        </div>
        <p className="mb-4 text-sm text-slate-500">
          ON으로 설정한 메뉴만 헤더 네비게이션에 표시됩니다.
        </p>
        <div className="flex flex-wrap gap-6">
          {NAV_LABELS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleNavToggle(key, !navVisibility[key])}
              className="flex items-center gap-3"
            >
              <span
                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
                  navVisibility[key] ? "bg-[#C400FF]" : "bg-slate-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    navVisibility[key] ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </span>
              <span className="text-sm font-medium text-slate-700">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">빠른 안내</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-blue-50 p-4">
            <h3 className="mb-1 font-medium text-blue-900">문의 관리</h3>
            <p className="text-sm text-blue-700">
              접수된 문의를 확인하고 처리 상태를 관리하세요.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50 p-4">
            <h3 className="mb-1 font-medium text-purple-900">후기 관리</h3>
            <p className="text-sm text-purple-700">
              고객 후기를 추가, 수정, 삭제할 수 있습니다.
            </p>
          </div>
          <div className="rounded-lg bg-green-50 p-4">
            <h3 className="mb-1 font-medium text-green-900">파일 관리</h3>
            <p className="text-sm text-green-700">
              로고, 이미지 등 스토리지 파일을 관리하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
