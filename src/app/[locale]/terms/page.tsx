import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "서비스 이용약관 | Yanadoo AX",
  description: "Yanadoo AX 서비스 이용약관. 서비스 이용에 관한 권리 및 의무사항.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage title="서비스 이용약관">
      <div className="prose prose-sm max-w-none text-sm text-foreground/80">
        <p className="mb-4 font-medium">주식회사 Yanadoo AX</p>
        <p className="mb-6 text-xs text-foreground/60">
          본 서비스 이용약관(이하 &quot;본 약관&quot;)은 주식회사 Yanadoo AX(이하
          &quot;회사&quot;)가 운영하는 홈페이지 및 이를 통해 제공되는 정보 제공, 문의 접수,
          리드 수집 등의 서비스(이하 &quot;서비스&quot;)의 이용과 관련하여 회사와 이용자 간의
          권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>
        <p className="mb-6 text-xs text-foreground/60">
          본 약관에 동의하지 않는 경우 서비스 이용이 제한될 수 있습니다.
        </p>
        <hr className="my-4" />
        <h2 className="mb-3 mt-6 text-base font-bold">제1조 (용어의 정의)</h2>
        <ul className="list-disc space-y-2 pl-6 text-xs">
          <li><strong>&quot;서비스&quot;</strong>란 회사가 운영하는 공식 홈페이지 및 이를 통해 제공되는 정보 제공, 문의 접수, 자료 요청, 상담 신청 등 일체의 온라인 서비스를 의미합니다.</li>
          <li><strong>&quot;이용자&quot;</strong>란 회사의 홈페이지에 접속하여 본 약관에 따라 서비스를 이용하는 모든 개인 또는 법인을 의미합니다.</li>
          <li><strong>&quot;리드 정보&quot;</strong>란 이용자가 서비스 이용 과정에서 회사에 제공하는 이름, 이메일, 연락처, 회사명 등 문의 및 상담을 위해 제공된 정보를 의미합니다.</li>
        </ul>
        <hr className="my-4" />
        <h2 className="mb-3 mt-6 text-base font-bold">제2조 (약관의 게시 및 개정)</h2>
        <ul className="list-disc space-y-1 pl-6 text-xs">
          <li>회사는 본 약관의 내용을 이용자가 쉽게 확인할 수 있도록 홈페이지에 게시합니다.</li>
          <li>회사는 관련 법령을 위반하지 않는 범위에서 본 약관을 개정할 수 있습니다.</li>
          <li>약관이 개정되는 경우 회사는 개정 내용 및 적용 일자를 홈페이지를 통해 사전에 공지합니다.</li>
        </ul>
        <hr className="my-4" />
        <h2 className="mb-3 mt-6 text-base font-bold">제3조 (서비스의 내용)</h2>
        <p className="mb-2 text-xs">회사는 이용자에게 다음과 같은 서비스를 제공합니다.</p>
        <ul className="list-disc space-y-1 pl-6 text-xs">
          <li>회사 및 서비스에 대한 정보 제공</li>
          <li>문의 접수 및 상담 신청</li>
          <li>자료 요청, 뉴스레터 신청 등 리드 수집 기능</li>
          <li>기타 회사가 정하는 부가 서비스</li>
        </ul>
        <hr className="my-4" />
        <h2 className="mb-3 mt-6 text-base font-bold">제4조 (서비스 이용)</h2>
        <p className="mb-2 text-xs">이용자는 회사의 홈페이지를 자유롭게 이용할 수 있습니다. 다만, 다음 각 호의 행위는 금지됩니다.</p>
        <ul className="list-disc space-y-1 pl-6 text-xs">
          <li>허위 정보 또는 타인의 정보를 이용하여 문의를 접수하는 행위</li>
          <li>회사의 운영을 방해하거나 홈페이지의 정상적인 이용을 저해하는 행위</li>
          <li>법령 또는 공서양속에 반하는 행위</li>
        </ul>
        <hr className="my-4" />
        <h2 className="mb-3 mt-6 text-base font-bold">제5조 (지적재산권)</h2>
        <ul className="list-disc space-y-1 pl-6 text-xs">
          <li>홈페이지에 게시된 모든 콘텐츠(텍스트, 이미지, 로고, 디자인 등)에 대한 저작권 및 지적재산권은 회사에 귀속됩니다.</li>
          <li>이용자는 회사의 사전 서면 동의 없이 이를 복제, 배포, 상업적으로 이용할 수 없습니다.</li>
        </ul>
        <hr className="my-4" />
        <h2 className="mb-3 mt-6 text-base font-bold">제6조 (개인정보 보호)</h2>
        <ul className="list-disc space-y-1 pl-6 text-xs">
          <li>회사는 이용자가 제공한 개인정보를 관련 법령 및 회사의 개인정보처리방침에 따라 처리합니다.</li>
          <li>개인정보의 수집, 이용, 보관 및 파기에 관한 사항은 개인정보처리방침을 따릅니다.</li>
        </ul>
        <hr className="my-4" />
        <h2 className="mb-3 mt-6 text-base font-bold">제7조 (면책)</h2>
        <ul className="list-disc space-y-1 pl-6 text-xs">
          <li>회사는 천재지변, 시스템 장애 등 불가항력적인 사유로 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.</li>
          <li>회사는 이용자가 제공한 정보의 정확성에 대해 책임을 지지 않습니다.</li>
          <li>회사는 홈페이지를 통해 제공되는 정보가 이용자의 특정 목적에 적합함을 보증하지 않습니다.</li>
        </ul>
        <hr className="my-4" />
        <h2 className="mb-3 mt-6 text-base font-bold">제8조 (준거법 및 관할)</h2>
        <ul className="list-disc space-y-1 pl-6 text-xs">
          <li>본 약관은 대한민국 법률을 준거법으로 합니다.</li>
          <li>본 서비스와 관련하여 발생한 분쟁은 회사의 본점 소재지를 관할하는 법원을 전속 관할로 합니다.</li>
        </ul>
        <hr className="my-4" />
        <h2 className="mb-3 mt-6 text-base font-bold">부칙</h2>
        <p className="text-xs">본 약관은 <strong>2026년 1월 30일부터 적용됩니다.</strong></p>
      </div>
    </LegalPage>
  );
}
