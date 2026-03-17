"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  ChevronRight,
  Copy,
  ExternalLink,
  File,
  FolderOpen,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";
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
import { Button } from "@/components/ui/button";
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
import { createClient } from "@/lib/supabase/client";

type StorageFile = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  metadata: {
    size?: number;
    mimetype?: string;
  } | null;
};

const STORAGE_BUCKETS = ["university-logos", "client-logos", "education-partners"];

export function AdminFiles() {
  const [supabase] = useState(createClient);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedBucket, setSelectedBucket] = useState(STORAGE_BUCKETS[0]);
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteFile, setDeleteFile] = useState<StorageFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchFiles = useCallback(async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase.storage.from(selectedBucket).list("", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

      if (error) {
        throw error;
      }

      setFiles((data as StorageFile[]) || []);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("파일 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [selectedBucket, supabase]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);

    try {
      const { error } = await supabase.storage.from(selectedBucket).upload(file.name, file, {
        cacheControl: "3600",
        upsert: true,
      });

      if (error) {
        throw error;
      }

      toast.success(`${file.name} 파일이 업로드되었습니다.`);
      await fetchFiles();
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("파일 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleDelete = async () => {
    if (!deleteFile) {
      return;
    }

    setIsDeleting(true);

    try {
      const { error } = await supabase.storage.from(selectedBucket).remove([deleteFile.name]);

      if (error) {
        throw error;
      }

      setFiles((current) => current.filter((item) => item.name !== deleteFile.name));
      toast.success("파일이 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("파일 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
      setDeleteFile(null);
    }
  };

  const getPublicUrl = (fileName: string) => {
    const { data } = supabase.storage.from(selectedBucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const copyUrl = async (fileName: string) => {
    await navigator.clipboard.writeText(getPublicUrl(fileName));
    toast.success("파일 URL이 클립보드에 복사되었습니다.");
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) {
      return "-";
    }
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-slate-400" />
          <Select value={selectedBucket} onValueChange={setSelectedBucket}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STORAGE_BUCKETS.map((bucket) => (
                <SelectItem key={bucket} value={bucket}>
                  {bucket}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="gap-2"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            파일 업로드
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-1 text-sm text-slate-500">
        <span>Storage</span>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-slate-900">{selectedBucket}</span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-12" />
                <TableHead>파일명</TableHead>
                <TableHead className="w-24">크기</TableHead>
                <TableHead className="hidden w-40 md:table-cell">수정일</TableHead>
                <TableHead className="w-32">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-slate-500">
                    파일이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                files.map((file) => {
                  const publicUrl = getPublicUrl(file.name);
                  const isImage = file.metadata?.mimetype?.startsWith("image/");

                  return (
                    <TableRow key={file.id} className="hover:bg-slate-50">
                      <TableCell>
                        {isImage ? (
                          <div className="h-10 w-10 overflow-hidden rounded bg-slate-100">
                            <img
                              src={publicUrl}
                              alt={file.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded bg-slate-100">
                            <File className="h-5 w-5 text-slate-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{file.name}</TableCell>
                      <TableCell className="text-slate-500">
                        {formatFileSize(file.metadata?.size)}
                      </TableCell>
                      <TableCell className="hidden text-slate-500 md:table-cell">
                        {format(new Date(file.updated_at), "yyyy.MM.dd HH:mm", {
                          locale: ko,
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyUrl(file.name)}
                            title="URL 복사"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(publicUrl, "_blank", "noopener,noreferrer")}
                            title="새 탭에서 열기"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteFile(file)}
                            title="삭제"
                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <AlertDialog open={Boolean(deleteFile)} onOpenChange={() => setDeleteFile(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>파일을 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{deleteFile?.name}&quot; 파일을 삭제합니다. 이 작업은 되돌릴 수 없습니다.
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
