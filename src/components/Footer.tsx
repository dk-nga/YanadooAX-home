import logoFull from "@/assets/logo-full.svg";
import { Link } from "@/i18n/navigation";

export function Footer() {
  return (
    <footer className="snap-start overflow-hidden bg-[#2f2c49] pb-24 pt-12 text-white/82 md:pb-12">
      <div className="container mx-auto overflow-hidden px-4 md:px-6">
        <div className="mb-12">
          <img src={logoFull.src} alt="Yanadoo AX" className="mb-6 h-8 brightness-0 invert" />
          <div className="space-y-2 text-base leading-relaxed text-white/72">
            <p className="font-semibold text-white">주식회사 야나두 (야나두 원격평생교육원)</p>
            <p>사업자등록번호: 129-86-23477 · 통신판매업: 신고번호 제2018-서울강남-02139호</p>
            <p>대표: 김정수, 김민철 · 개인정보보호 책임자: 이정훈</p>
            <p>주소: 서울시 강남구 봉은사로 619 JBK Tower 4,5층</p>
            <p>원격 평생교육 시설신고: 서울특별시 강남 서초교육지원청 (제 원516호)</p>
          </div>
          <div className="mt-8 text-lg leading-relaxed text-white/78">
            <p className="font-semibold text-white">야나두 고객센터: 1600-0563 (유료)</p>
            <p>평일 09:00~18:00 (12:00~13:00 점심시간)</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/18 pt-8 md:flex-row">
          <p className="text-xs text-white/56">© Copyrights by Yanadoo AX. All Rights Reserved.</p>
          <div className="flex gap-2 text-xs text-white/56">
            <Link href="/privacy" className="transition-colors hover:text-white">
              개인정보 처리방침
            </Link>
            <span>|</span>
            <Link href="/terms" className="transition-colors hover:text-white">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
