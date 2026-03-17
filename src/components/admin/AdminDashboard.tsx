"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Star, TrendingUp, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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
