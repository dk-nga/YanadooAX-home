import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAILS = ["dk@nextgenai.kr", "jack@nextgenai.kr"];
const BROCHURE_URL = process.env.BROCHURE_URL ?? "";

type InquiryInsert = Database["public"]["Tables"]["inquiries"]["Insert"];

const INQUIRY_TYPE_LABEL: Record<string, string> = {
  contact: "일반 문의",
  diagnosis: "AX 진단 신청",
  download: "소개서 다운로드",
};

function buildNotifyHtml(data: InquiryInsert): string {
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

function buildBrochureHtml(data: InquiryInsert): string {
  const brochureSection = BROCHURE_URL
    ? `
      <div style="margin:24px 0;text-align:center">
        <a href="${BROCHURE_URL}"
           style="display:inline-block;background:linear-gradient(135deg,#F8B529,#C400FF);color:#fff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:10px;text-decoration:none">
          📄 서비스 소개서 다운로드
        </a>
      </div>
    `
    : `<p style="color:#555;font-size:14px;text-align:center;margin:24px 0">소개서 링크를 곧 별도로 안내드리겠습니다.</p>`;

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:linear-gradient(135deg,#282640,#3a315f 55%,#C400FF);padding:28px;border-radius:12px 12px 0 0">
        <h1 style="margin:0;color:#fff;font-size:22px;font-weight:900">Yanadoo AX 서비스 소개서</h1>
        <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px">${data.name}님, 신청해 주셔서 감사합니다!</p>
      </div>
      <div style="background:#fff;border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px;padding:28px">
        <p style="color:#333;font-size:15px;line-height:1.7;margin:0 0 8px">안녕하세요, <strong>${data.name}</strong>님.</p>
        <p style="color:#333;font-size:15px;line-height:1.7;margin:0 0 20px">
          <strong>${data.company}</strong>에서 Yanadoo AX에 관심 가져주셔서 감사합니다.<br>
          요청하신 서비스 소개서를 아래 버튼으로 다운로드하실 수 있습니다.
        </p>
        ${brochureSection}
        <hr style="border:none;border-top:1px solid #f0f0f0;margin:24px 0">
        <p style="color:#888;font-size:13px;line-height:1.7;margin:0">
          추가 문의 사항이 있으시면 언제든지 <a href="mailto:dk@nextgenai.kr" style="color:#C400FF">dk@nextgenai.kr</a>로 연락 주세요.<br>
          1~2 영업일 내 담당 컨설턴트가 연락드리겠습니다.
        </p>
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

    const type = INQUIRY_TYPE_LABEL[body.inquiry_type] ?? body.inquiry_type;

    // 2. 내부 알림 이메일
    await resend.emails.send({
      from: "Yanadoo AX <noreply@nextgenai.kr>",
      to: NOTIFY_EMAILS,
      subject: `[YanadooAX] 새 ${type} - ${body.company} ${body.name}`,
      html: buildNotifyHtml(body),
    });

    // 3. 소개서 다운로드 요청 시 신청자에게 회신
    if (body.inquiry_type === "download" && body.email) {
      await resend.emails.send({
        from: "Yanadoo AX <noreply@nextgenai.kr>",
        to: [body.email],
        subject: "[Yanadoo AX] 서비스 소개서를 보내드립니다",
        html: buildBrochureHtml(body),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[inquiry] error:", e);
    return NextResponse.json(
      { ok: false, message: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
