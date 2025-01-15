"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function YandexDiskUploader({ onUploadComplete }: { onUploadComplete: (folderPath: string) => void }) {
  const [folderName, setFolderName] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!files || !folderName) return;

    setIsUploading(true);
    try {
      // Создаем папку
      const createFolderResponse = await fetch('/api/yandex-disk/create-folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: `/reports/${folderName}` })
      });

      if (!createFolderResponse.ok) throw new Error('Failed to create folder');

      // Загружаем файлы
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', `/reports/${folderName}/${file.name}`);

        const response = await fetch('/api/yandex-disk/upload', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error(`Failed to upload ${file.name}`);
      });

      await Promise.all(uploadPromises);
      
      // Уведомляем родительский компонент
      onUploadComplete(`/reports/${folderName}`);
      
      // Очищаем форму
      setFolderName("");
      setFiles(null);
      
      toast.success("Файлы успешно загружены");
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Ошибка при загрузке файлов");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Название папки</label>
        <Input
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="event-name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Фотографии</label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setFiles(e.target.files)}
        />
      </div>
      <Button
        onClick={handleUpload}
        disabled={isUploading || !files || !folderName}
      >
        {isUploading ? 'Загрузка...' : 'Загрузить на Яндекс.Диск'}
      </Button>
    </div>
  );
} 