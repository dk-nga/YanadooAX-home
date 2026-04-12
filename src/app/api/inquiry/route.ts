import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAILS = ["dk@nextgenai.kr", "jack@nextgenai.kr"];

type InquiryInsert = Database["public"]["Tables"]["inquiries"]["Insert"];

const INQUIRY_TYPE_LABEL: Record<string, string> = {
  contact: "일반 문의",
  diagnosis: "AX 진단 신청",
  download: "자료 다운로드",
};

function buildEmailHtml(data: InquiryInsert): string {
  const type = INQUIRY_TYPE_LABEL[data.inquiry_type] ?? data.inquiry_type;
  const rows = [
    ["유형", type],
    ["회사명", data.company],
    ["기업형태", data.company_type],
    ["이름", data.name],
    ["연락처", data.phone],
    ["부서", data.department],
    ["직책", data.position],
    ["이메일", data.email],
    ["관심 주제", data.topic],
    ["유입 경로", data.visit_path],
    ["메시지", data.message],
    ["URL", data.source_url],
  ]
    .filter(([, v]) => v)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#555;white-space:nowrap;border-bottom:1px solid #f0f0f0">${label}</td><td style="padding:6px 12px;color:#222;border-bottom:1px solid #f0f0f0">${value}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:linear-gradient(135deg,#F8B529,#C400FF);padding:24px 28px;border-radius:12px 12px 0 0">
        <h1 style="margin:0;color:#fff;font-size:20px">📬 새 문의가 접수됐습니다</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px">${type} · ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</p>
      </div>
      <div style="background:#fff;border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px;padding:8px 0">
        <table style="width:100%;border-collapse:collapse">
          ${rows}
        </table>
      </div>
      <p style="margin:16px 0 0;font-size:12px;color:#aaa;text-align:center">Yanadoo AX · yanadoo-ax.com</p>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body: InquiryInsert = await req.json();

    // 1. Supabase에 저장
    const supabase = await createClient();
    const { error: dbError } = await supabase.from("inquiries").insert(body);
    if (dbError) throw new Error(dbError.message);

    // 2. Resend로 이메일 발송
    const type = INQUIRY_TYPE_LABEL[body.inquiry_type] ?? body.inquiry_type;
    await resend.emails.send({
      from: "Yanadoo AX <noreply@nextgenai.kr>",
      to: NOTIFY_EMAILS,
      subject: `[YanadooAX] 새 ${type} - ${body.company} ${body.name}`,
      html: buildEmailHtml(body),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[inquiry] error:", e);
    return NextResponse.json(
      { ok: false, message: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
