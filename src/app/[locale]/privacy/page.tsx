import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "개인정보 처리방침 | Yanadoo AX",
  description: "Yanadoo AX 개인정보 처리방침. 고객 정보 보호 및 관리 정책.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="개인정보처리방침">
      <div className="prose prose-lg max-w-none text-foreground/80">
        <p className="mb-6 text-xl font-semibold">주식회사 Yanadoo AX</p>
        <hr className="my-6" />
        <p>
          주식회사 <strong>Yanadoo AX</strong>(이하 <strong>&quot;회사&quot;</strong>)는
          개인정보보호 관련 법령에 따라 준수하여야 할 개인정보보호 규정을
          준수하며, 관련 법령에 의거한 개인정보 처리방침을 정하여 정보주체의
          권익 보호에 최선을 다하고 있습니다.
        </p>
        <p>
          이 개인정보 처리방침에서 사용하는 용어의 의미는 관련 법령 및 회사의
          이용약관에서 정한 바에 따르며, 그 밖의 사항은 일반적인 상관례에
          따릅니다.
        </p>
        <hr className="my-6" />
        <h2 className="mb-4 mt-8 text-xl font-bold">제1조 (처리하는 개인정보의 항목)</h2>
        <p>
          회사는 정보주체가 입력한 정보를 기반으로 서비스의 제공, 원활한
          고객상담, 뉴스레터 발송 등을 위하여 필요한 최소한의 개인정보를
          수집하고 있습니다.
        </p>
        <ol className="list-decimal space-y-1 pl-6">
          <li>정보주체 이름</li>
          <li>이메일</li>
          <li>기업명</li>
          <li>연락처</li>
          <li>직급(선택사항)</li>
        </ol>
        <hr className="my-6" />
        <h2 className="mb-4 mt-8 text-xl font-bold">제2조 (개인정보의 수집 방법)</h2>
        <p>회사는 다음과 같은 방법으로 개인정보를 수집합니다.</p>
        <ol className="list-decimal space-y-1 pl-6">
          <li>
            정보주체가 작성한 각종 문의, 신청, 상담, 뉴스레터 구독 등의{" "}
            <strong>작성폼(Form) 제출을 통해 수집</strong>
          </li>
          <li>기기 정보, 서비스 이용 기록 등 생성 정보는 서비스 이용과정에서 자동으로 수집</li>
        </ol>
        <p className="mt-4 text-sm">
          ※ 회사는 <strong>소셜 간편 로그인(구글 등)을 통한 개인정보 수집을 하지 않습니다.</strong>
        </p>
        <hr className="my-6" />
        <h2 className="mb-4 mt-8 text-xl font-bold">제3조 (개인정보의 수집 및 이용 목적)</h2>
        <p>
          회사는 서비스 제공, 회원 관리, 뉴스레터 및 마케팅 정보 제공 등의
          목적으로 필요 최소한의 개인정보를 수집·이용합니다. 개인정보는 명시한
          목적 범위 내에서만 처리되며, 목적 변경 시 관련 법령에 따라 별도의
          동의를 받습니다.
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-6">
          <li>
            <strong>서비스 제공</strong>
            <p className="ml-6 text-sm">상담 응대, 자료 제공, 서비스 안내 등</p>
          </li>
          <li>
            <strong>회원 및 고객 관리</strong>
            <p className="ml-6 text-sm">문의 응대, 원활한 의사소통, 공지사항 전달, 민원 처리 등</p>
          </li>
          <li>
            <strong>서비스 개선 및 신규 서비스 개발</strong>
            <p className="ml-6 text-sm">서비스 이용 기록 분석, 콘텐츠 및 서비스 개선</p>
          </li>
          <li>
            <strong>마케팅 및 광고성 정보 제공</strong>
            <p className="ml-6 text-sm">뉴스레터 발송, 서비스 업데이트 안내, 이벤트·프로모션 정보 제공</p>
            <p className="ml-6 text-sm">광고성 이메일 발송 시 제목에 <strong>(광고)</strong> 표시 및 수신거부 방법 명시</p>
          </li>
        </ol>
        <hr className="my-6" />
        <h2 className="mb-4 mt-8 text-xl font-bold">제4조 (개인정보 보유 및 이용기간)</h2>
        <p>회사는 개인정보의 수집 및 이용 목적이 달성된 후 지체 없이 파기합니다.</p>
        <p className="mt-4">단, 관계 법령에 따라 아래와 같이 일정 기간 보관할 수 있습니다.</p>
        <ul className="mt-2 list-disc space-y-1 pl-6">
          <li>계약 또는 청약철회 기록: 5년</li>
          <li>대금결제 및 재화 등의 공급 기록: 5년</li>
          <li>소비자 불만 및 분쟁 처리 기록: 3년</li>
          <li>통신사실확인자료: 3개월</li>
          <li>표시·광고 관련 기록: 6개월</li>
        </ul>
        <hr className="my-6" />
        <h2 className="mb-4 mt-8 text-xl font-bold">제5조 (개인정보의 안전성 확보 조치)</h2>
        <p>회사는 개인정보 보호를 위해 다음과 같은 조치를 취합니다.</p>
        <ol className="mt-2 list-decimal space-y-1 pl-6">
          <li>관리적 조치: 내부관리계획 수립 및 직원 교육</li>
          <li>기술적 조치: 접근권한 관리, 암호화, 보안 프로그램 설치</li>
          <li>물리적 조치: 전산실 및 자료보관실 접근통제</li>
        </ol>
        <hr className="my-6" />
        <h2 className="mb-4 mt-8 text-xl font-bold">제6조 (정보주체의 권리 및 행사방법)</h2>
        <p>
          정보주체는 개인정보 열람, 정정, 삭제, 처리정지를 요청할 수 있으며,
          이메일 등을 통해 회사에 요청할 수 있습니다. 회사는 지체 없이
          조치합니다.
        </p>
        <hr className="my-6" />
        <h2 className="mb-4 mt-8 text-xl font-bold">제7조 (개인정보의 파기)</h2>
        <p>
          개인정보는 목적 달성 후 지체 없이 파기하며, 전자적 파일은 복구
          불가능한 방식으로 삭제하고, 종이 문서는 분쇄 또는 소각합니다.
        </p>
        <hr className="my-6" />
        <h2 className="mb-4 mt-8 text-xl font-bold">제8조 (개인정보 처리의 위탁)</h2>
        <p>회사는 서비스 운영을 위해 개인정보 처리 업무를 다음과 같이 위탁할 수 있습니다.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border px-4 py-2 text-left">위탁받는 자</th>
                <th className="border border-border px-4 py-2 text-left">위탁 업무 내용</th>
                <th className="border border-border px-4 py-2 text-left">위탁 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-2">Amazon Web Services</td>
                <td className="border border-border px-4 py-2">정보시스템 운영</td>
                <td className="border border-border px-4 py-2">위탁 종료 시까지</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-2">이메일/CRM 도구</td>
                <td className="border border-border px-4 py-2">뉴스레터 발송 및 고객관리</td>
                <td className="border border-border px-4 py-2">위탁 종료 시까지</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr className="my-6" />
        <h2 className="mb-4 mt-8 text-xl font-bold">제9조 (개인정보의 제3자 제공)</h2>
        <p>회사는 정보주체의 동의 또는 법령에 근거한 경우에만 개인정보를 제3자에게 제공합니다.</p>
        <hr className="my-6" />
        <h2 className="mb-4 mt-8 text-xl font-bold">제10조 (쿠키 및 웹스토리지의 사용)</h2>
        <p>
          회사는 맞춤형 서비스 제공을 위해 쿠키 및 웹스토리지를 사용할 수
          있으며, 정보주체는 브라우저 설정을 통해 이를 거부할 수 있습니다.
        </p>
        <hr className="my-6" />
        <h2 className="mb-4 mt-8 text-xl font-bold">제11조 (개인정보 보호책임자)</h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>개인정보 보호책임자: <strong>김도경</strong></li>
          <li>소속 및 직책: 주식회사 Yanadoo AX / 대표</li>
          <li>
            연락처(이메일):{" "}
            <a href="mailto:contact@yanadoo.com" className="text-primary hover:underline">
              contact@yanadoo.com
            </a>
          </li>
        </ul>
        <hr className="my-6" />
        <h2 className="mb-4 mt-8 text-xl font-bold">제12조 (개인정보 열람청구)</h2>
        <p>
          정보주체는 개인정보보호법 제35조에 따라 개인정보 열람을 요청할 수
          있으며, 회사는 이를 신속히 처리합니다.
        </p>
        <hr className="my-6" />
        <h2 className="mb-4 mt-8 text-xl font-bold">제13조 (권익침해 구제방법)</h2>
        <p>정보주체는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에 분쟁해결이나 상담 등을 신청할 수 있습니다.</p>
        <ul className="mt-2 list-disc space-y-1 pl-6">
          <li>개인정보분쟁조정위원회: (국번없이) 1833-6972</li>
          <li>개인정보침해신고센터: (국번없이) 118</li>
          <li>대검찰청 사이버수사과: (국번없이) 1301</li>
          <li>경찰청 사이버안전국: (국번없이) 182</li>
        </ul>
        <hr className="my-6" />
        <h2 className="mb-4 mt-8 text-xl font-bold">제14조 (기타)</h2>
        <p>서비스 내 링크된 외부 사이트에는 본 개인정보 처리방침이 적용되지 않습니다.</p>
        <hr className="my-6" />
        <h2 className="mb-4 mt-8 text-xl font-bold">부칙</h2>
        <p>본 개인정보 처리방침은 <strong>2026년 1월 27일부터 적용됩니다.</strong></p>
      </div>
    </LegalPage>
  );
}
