"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type DownloadModalProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isOpen?: boolean;
  onClose?: () => void;
  fileName?: string;
};

export function DownloadModal({
  open,
  onOpenChange,
  isOpen,
  onClose,
}: DownloadModalProps) {
  const resolvedOpen = open ?? isOpen ?? false;
  const resolvedOnOpenChange =
    onOpenChange ??
    ((nextOpen: boolean) => {
      if (!nextOpen) {
        onClose?.();
      }
    });

  return (
    <Dialog open={resolvedOpen} onOpenChange={resolvedOnOpenChange}>
      <DialogContent className="border-orange-100 bg-white shadow-2xl sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>서비스 소개서 다운로드</DialogTitle>
        </DialogHeader>
        <p className="text-sm leading-7 text-stone-600">
          실제 다운로드 폼과 파일 자산 연결은 다음 단계에서 붙입니다. 현재는
          Vite 프로젝트의 전환 포인트를 Next.js 컴포넌트로 먼저 분리했습니다.
        </p>
      </DialogContent>
    </Dialog>
  );
}
