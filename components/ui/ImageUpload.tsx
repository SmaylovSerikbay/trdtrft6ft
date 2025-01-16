"use client";

import { Plus, X } from "lucide-react";
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
    formData.append('file', acceptedFiles[0]);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const result = await response.json();
      if (result.url) {
        onChange(result.url);
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  }, [onChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1
  });

  return (
    <div className="relative">
      <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer">
        <input {...getInputProps()} />
        {value ? (
          <div className="relative aspect-video w-full">
            <Image 
              src={value} 
              alt="Upload" 
              fill 
              className="object-cover rounded-lg" 
              unoptimized 
            />
          </div>
        ) : (
          <div className="aspect-video w-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <Plus className="h-8 w-8" />
              <span>Добавить изображение</span>
            </div>
          </div>
        )}
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