"use client";

import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ImageUpload({
  value,
  onChange,
  disabled,
  placeholder = "/placeholder.jpg"
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setLoading(true);
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);

      console.log('Uploading file:', file.name);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка загрузки");
      }

      const data = await response.json();
      console.log('Upload response:', data);

      if (data.url) {
        const imageUrl = data.url.startsWith('/') ? data.url : `/uploads/${data.url}`;
        onChange(imageUrl);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  }, [onChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 1,
    disabled: disabled || loading,
  });

  return (
    <div className="relative">
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition cursor-pointer"
      >
        <input {...getInputProps()} />
        {value ? (
          <div className="relative w-full aspect-video">
            <Image
              src={value}
              alt="Uploaded"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="w-10 h-10 text-gray-400" />
            <p className="text-sm text-gray-500">
              {loading ? "Загрузка..." : "Перетащите изображение сюда или кликните для выбора"}
            </p>
          </div>
        )}
      </div>
      {value && !disabled && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={(e) => {
            e.stopPropagation();
            onChange("");
          }}
        >
          <X className="w-4 h-4 mr-2" />
          Удалить
        </Button>
      )}
    </div>
  );
} 