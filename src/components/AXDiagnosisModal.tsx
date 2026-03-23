"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type AXDiagnosisModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AXDiagnosisModal({
  open,
  onOpenChange,
}: AXDiagnosisModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-orange-100 bg-white shadow-2xl sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>AX 무료 진단</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm leading-7 text-stone-600">
          <p>교육 중심 조직 전환 관점에서 실무 적용 우선순위와 도입 범위를 정리합니다.</p>
          <ul className="space-y-2">
            <li>팀별 적용 가능 과제 정리</li>
            <li>교육과 구축 병행 방식 정의</li>
            <li>현업 운영 정착을 위한 초기 실행안 구성</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
