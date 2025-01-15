"use client";

import { UploadCloud } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value?: string;
}

export function ImageUpload({ onChange, value }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setIsUploading(true);
      const file = acceptedFiles[0];

      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onChange(data.url);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  }, [onChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-2">
        <UploadCloud className="h-8 w-8 text-gray-400" />
        <p className="text-sm text-gray-600">
          {isUploading ? 'Uploading...' : 'Drag & drop or click to upload'}
        </p>
      </div>
    </div>
  );
} 