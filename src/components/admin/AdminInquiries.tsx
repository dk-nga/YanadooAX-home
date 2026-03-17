"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Eye, Filter, Loader2, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Database } from "@/lib/supabase/types";
import { createClient } from "@/lib/supabase/client";

type Inquiry = Database["public"]["Tables"]["inquiries"]["Row"];

const inquiryTypeLabels: Record<string, string> = {
  contact: "일반 문의",
  diagnosis: "AX 진단",
  download: "자료 다운로드",
};

const inquiryTypeColors: Record<string, string> = {
  contact: "bg-blue-100 text-blue-800",
  diagnosis: "bg-purple-100 text-purple-800",
  download: "bg-green-100 text-green-800",
};

export function AdminInquiries() {
  const [supabase] = useState(createClient);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const { data, error } = await supabase
          .from("inquiries")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setInquiries(data || []);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
        toast.error("문의 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [supabase]);

  const filteredInquiries = useMemo(
    () =>
      inquiries.filter((inquiry) => {
        const matchesSearch =
          inquiry.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType =
          typeFilter === "all" || inquiry.inquiry_type === typeFilter;
        return matchesSearch && matchesType;
      }),
    [inquiries, searchTerm, typeFilter]
  );

  const handleDelete = async () => {
    if (!deleteId) {
      return;
    }

    setIsDeleting(true);

    try {
      const { error } = await supabase.from("inquiries").delete().eq("id", deleteId);

      if (error) {
        throw error;
      }

      setInquiries((current) => current.filter((item) => item.id !== deleteId));
      toast.success("문의가 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      toast.error("문의 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="회사명, 이름, 이메일로 검색..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="유형 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="contact">일반 문의</SelectItem>
            <SelectItem value="diagnosis">AX 진단</SelectItem>
            <SelectItem value="download">자료 다운로드</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-28">유형</TableHead>
              <TableHead>회사명</TableHead>
              <TableHead>이름</TableHead>
              <TableHead className="hidden md:table-cell">이메일</TableHead>
              <TableHead className="hidden lg:table-cell">접수일</TableHead>
              <TableHead className="w-24">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-slate-500">
                  문의가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry.id} className="hover:bg-slate-50">
                  <TableCell>
                    <Badge className={inquiryTypeColors[inquiry.inquiry_type]}>
                      {inquiryTypeLabels[inquiry.inquiry_type]}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{inquiry.company}</TableCell>
                  <TableCell>{inquiry.name}</TableCell>
                  <TableCell className="hidden text-slate-500 md:table-cell">
                    {inquiry.email}
                  </TableCell>
                  <TableCell className="hidden text-slate-500 lg:table-cell">
                    {format(new Date(inquiry.created_at), "yyyy.MM.dd HH:mm", {
                      locale: ko,
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(inquiry.id)}
                        className="text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={Boolean(selectedInquiry)} onOpenChange={() => setSelectedInquiry(null)}>
        <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              문의 상세
              {selectedInquiry ? (
                <Badge className={inquiryTypeColors[selectedInquiry.inquiry_type]}>
                  {inquiryTypeLabels[selectedInquiry.inquiry_type]}
                </Badge>
              ) : null}
            </DialogTitle>
          </DialogHeader>
          {selectedInquiry ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <DetailField label="회사명" value={selectedInquiry.company} />
                <DetailField label="이름" value={selectedInquiry.name} />
                <DetailField label="이메일" value={selectedInquiry.email} />
                <DetailField label="연락처" value={selectedInquiry.phone || "-"} />
                {selectedInquiry.department ? (
                  <DetailField label="부서" value={selectedInquiry.department} />
                ) : null}
                {selectedInquiry.position ? (
                  <DetailField label="직급" value={selectedInquiry.position} />
                ) : null}
              </div>

              {selectedInquiry.inquiry_type === "contact" ? (
                <>
                  {selectedInquiry.company_type ? (
                    <DetailField label="기업 유형" value={selectedInquiry.company_type} />
                  ) : null}
                  {selectedInquiry.topic ? (
                    <DetailField label="문의 주제" value={selectedInquiry.topic} />
                  ) : null}
                  {selectedInquiry.message ? (
                    <DetailField
                      label="메시지"
                      value={selectedInquiry.message}
                      multiline
                    />
                  ) : null}
                </>
              ) : null}

              {selectedInquiry.inquiry_type === "diagnosis" ? (
                <>
                  {selectedInquiry.employee_count ? (
                    <DetailField label="직원 수" value={selectedInquiry.employee_count} />
                  ) : null}
                  {selectedInquiry.ai_status ? (
                    <DetailField label="AI 도입 상태" value={selectedInquiry.ai_status} />
                  ) : null}
                  {selectedInquiry.pain_points?.length ? (
                    <BadgeList label="문제점" items={selectedInquiry.pain_points} />
                  ) : null}
                  {selectedInquiry.target_areas?.length ? (
                    <BadgeList label="관심 분야" items={selectedInquiry.target_areas} />
                  ) : null}
                  {selectedInquiry.budget ? (
                    <DetailField label="예산" value={selectedInquiry.budget} />
                  ) : null}
                  {selectedInquiry.timeline ? (
                    <DetailField label="희망 시작 시기" value={selectedInquiry.timeline} />
                  ) : null}
                </>
              ) : null}

              {selectedInquiry.inquiry_type === "download" ? (
                <>
                  {selectedInquiry.ai_level ? (
                    <DetailField label="AI 활용 수준" value={selectedInquiry.ai_level} />
                  ) : null}
                  {selectedInquiry.ai_interests?.length ? (
                    <BadgeList label="관심 분야" items={selectedInquiry.ai_interests} />
                  ) : null}
                  {selectedInquiry.download_file ? (
                    <DetailField
                      label="다운로드 파일"
                      value={selectedInquiry.download_file}
                    />
                  ) : null}
                </>
              ) : null}

              <div className="border-t pt-4">
                <div className="flex gap-4 text-sm text-slate-500">
                  <span>개인정보 동의: {selectedInquiry.privacy_agreed ? "✓" : "✗"}</span>
                  <span>마케팅 동의: {selectedInquiry.marketing_agreed ? "✓" : "✗"}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  접수일:{" "}
                  {format(new Date(selectedInquiry.created_at), "yyyy년 MM월 dd일 HH:mm", {
                    locale: ko,
                  })}
                </p>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(deleteId)} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>문의를 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 되돌릴 수 없습니다. 해당 문의가 영구적으로 삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "삭제"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function DetailField({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={multiline ? "whitespace-pre-wrap text-slate-900" : "text-slate-900"}>
        {value}
      </p>
    </div>
  );
}

function BadgeList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="mt-1 flex flex-wrap gap-1">
        {items.map((item) => (
          <Badge key={item} variant="outline">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
