"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const result = await response.json();
      if (result.success && result.files.length > 0) {
        onChange(result.files[0]); // Берем первый загруженный файл
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1
  });

  // Функция для получения URL изображения
  const getImageUrl = (url: string | null): string => {
    if (!url || url === '') return '/placeholder.jpg';
    
    // Если это Cloudinary URL, возвращаем как есть
    if (url.includes('cloudinary.com')) {
      return url;
    }
    
    // Если начинается с http или https, возвращаем как есть
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // Если начинается с /, возвращаем как есть
    if (url.startsWith('/')) {
      return url;
    }
    
    // Для локальных файлов добавляем /uploads/
    return `/uploads/${url}`;
  };

  return (
    <div className="relative">
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer"
      >
        <input {...getInputProps()} />
        <div className="relative aspect-video w-full">
          <Image
            src={getImageUrl(value)}
            alt="Upload"
            fill
            className="object-cover rounded-lg"
            unoptimized
          />
        </div>
      </div>
      {value && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
} 