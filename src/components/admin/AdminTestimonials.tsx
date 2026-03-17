"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { GripVertical, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import type { Database } from "@/lib/supabase/types";
import { createClient } from "@/lib/supabase/client";

type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];

const CATEGORY_OPTIONS = [
  { value: "home", label: "홈 (AX 시스템)", icon: "🏠" },
  { value: "education", label: "교육 페이지", icon: "📚" },
  { value: "cases", label: "사례 페이지", icon: "💼" },
  { value: "ax-partners", label: "AX 파트너스", icon: "🤝" },
];

const emptyForm = {
  title: "",
  subtitle: "",
  content: "",
  author_name: "",
  author_title: "",
  author_company_size: "",
  author_avatar_url: "",
  language: "ko",
  category: "home",
  display_order: 0,
  is_active: true,
};

type TestimonialFormState = typeof emptyForm;

export function AdminTestimonials() {
  const [supabase] = useState(createClient);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TestimonialFormState>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        throw error;
      }

      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast.error("후기 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const openCreateDialog = () => {
    setEditingId(null);
    setFormData({
      ...emptyForm,
      display_order: testimonials.length + 1,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      title: testimonial.title,
      subtitle: testimonial.subtitle,
      content: testimonial.content,
      author_name: testimonial.author_name,
      author_title: testimonial.author_title,
      author_company_size: testimonial.author_company_size || "",
      author_avatar_url: testimonial.author_avatar_url || "",
      language: testimonial.language,
      category: testimonial.category,
      display_order: testimonial.display_order,
      is_active: testimonial.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content || !formData.author_name) {
      toast.error("제목, 내용, 작성자명은 필수입니다.");
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        title: formData.title,
        subtitle: formData.subtitle,
        content: formData.content,
        author_name: formData.author_name,
        author_title: formData.author_title,
        author_company_size: formData.author_company_size || null,
        author_avatar_url: formData.author_avatar_url || null,
        language: formData.language,
        category: formData.category,
        display_order: formData.display_order,
        is_active: formData.is_active,
      };

      if (editingId) {
        const { error } = await supabase
          .from("testimonials")
          .update(payload)
          .eq("id", editingId);

        if (error) {
          throw error;
        }

        toast.success("후기가 수정되었습니다.");
      } else {
        const { error } = await supabase.from("testimonials").insert(payload);

        if (error) {
          throw error;
        }

        toast.success("새 후기가 추가되었습니다.");
      }

      setIsDialogOpen(false);
      setEditingId(null);
      await fetchTestimonials();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      toast.error("후기 저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) {
      return;
    }

    setIsDeleting(true);

    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", deleteId);

      if (error) {
        throw error;
      }

      setTestimonials((current) => current.filter((item) => item.id !== deleteId));
      toast.success("후기가 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("후기 삭제에 실패했습니다.");
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
      <div className="flex items-center justify-between">
        <p className="text-slate-500">총 {testimonials.length}개의 후기</p>
        <Button onClick={openCreateDialog} className="gap-2">
          <Plus className="h-4 w-4" />
          새 후기 추가
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-16">순서</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>작성자</TableHead>
              <TableHead className="w-28">카테고리</TableHead>
              <TableHead className="w-20">언어</TableHead>
              <TableHead className="w-20">상태</TableHead>
              <TableHead className="w-24">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-slate-500">
                  후기가 없습니다. 새 후기를 추가해주세요.
                </TableCell>
              </TableRow>
            ) : (
              testimonials.map((testimonial) => (
                <TableRow key={testimonial.id} className="hover:bg-slate-50">
                  <TableCell className="text-slate-500">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-slate-300" />
                      {testimonial.display_order}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{testimonial.title}</p>
                      <p className="max-w-xs truncate text-sm text-slate-500">
                        {testimonial.subtitle}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{testimonial.author_name}</p>
                      <p className="text-sm text-slate-500">{testimonial.author_title}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {CATEGORY_OPTIONS.find((option) => option.value === testimonial.category)?.icon}{" "}
                      {CATEGORY_OPTIONS.find((option) => option.value === testimonial.category)?.label ||
                        testimonial.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{testimonial.language.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        testimonial.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-slate-100 text-slate-600"
                      }
                    >
                      {testimonial.is_active ? "활성" : "비활성"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(testimonial)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(testimonial.id)}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "후기 수정" : "새 후기 추가"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="제목 *">
                <Input
                  value={formData.title}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, title: event.target.value }))
                  }
                  placeholder="예: 컨설팅이 아닌 실제 시스템 구축"
                />
              </Field>
              <Field label="부제목">
                <Input
                  value={formData.subtitle}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, subtitle: event.target.value }))
                  }
                  placeholder="예: PoC에서 끝나지 않는 진짜 AX"
                />
              </Field>
            </div>

            <Field label="내용 *">
              <Textarea
                value={formData.content}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, content: event.target.value }))
                }
                placeholder="후기 내용을 입력하세요..."
                rows={4}
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="작성자명 *">
                <Input
                  value={formData.author_name}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      author_name: event.target.value,
                    }))
                  }
                  placeholder="예: 홍길동"
                />
              </Field>
              <Field label="작성자 직함">
                <Input
                  value={formData.author_title}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      author_title: event.target.value,
                    }))
                  }
                  placeholder="예: DX 담당 매니저"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="회사 규모">
                <Input
                  value={formData.author_company_size}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      author_company_size: event.target.value,
                    }))
                  }
                  placeholder="예: 직원수 500+"
                />
              </Field>
              <Field label="프로필 이미지 URL">
                <Input
                  value={formData.author_avatar_url}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      author_avatar_url: event.target.value,
                    }))
                  }
                  placeholder="https://..."
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="카테고리 *">
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((current) => ({ ...current, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.icon} {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="언어">
                <Select
                  value={formData.language}
                  onValueChange={(value) =>
                    setFormData((current) => ({ ...current, language: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ko">한국어</SelectItem>
                    <SelectItem value="ja">일본어</SelectItem>
                    <SelectItem value="en">영어</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="표시 순서">
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      display_order: Number.parseInt(event.target.value, 10) || 0,
                    }))
                  }
                />
              </Field>
              <Field label="활성화">
                <div className="flex h-10 items-center">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) =>
                      setFormData((current) => ({ ...current, is_active: checked }))
                    }
                  />
                </div>
              </Field>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  저장 중...
                </>
              ) : (
                "저장"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(deleteId)} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>후기를 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 되돌릴 수 없습니다. 해당 후기가 영구적으로 삭제됩니다.
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

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
