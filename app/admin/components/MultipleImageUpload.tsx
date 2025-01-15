"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";

interface MultipleImageUploadProps {
  disabled?: boolean;
  onChange: (urls: string[]) => void;
  onRemove: (url: string) => void;
  value: string[];
  title?: string;
  description?: string;
}

export function MultipleImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
  title = "Изображения",
  description
}: MultipleImageUploadProps) {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Преобразуем FileList в массив
    const fileArray = Array.from(files);

    // Создаем временные URL для предпросмотра
    const urls = fileArray.map(file => URL.createObjectURL(file));
    
    // Добавляем новые URL к существующим
    onChange([...value, ...urls]);
  }, [onChange, value]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-medium">{title}</h4>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id={`image-upload-${title}`}
            disabled={disabled}
          />
          <label htmlFor={`image-upload-${title}`}>
            <Button
              type="button"
              variant="secondary"
              disabled={disabled}
              className="cursor-pointer"
            >
              Загрузить изображения
            </Button>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {value.map((url, index) => (
          <div 
            key={url} 
            className="relative aspect-square rounded-lg overflow-hidden group border border-gray-200"
          >
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute top-2 right-2">
                <Button
                  type="button"
                  onClick={() => onRemove(url)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <p className="absolute bottom-2 left-2 text-white text-sm">
                {title} {index + 1}
              </p>
            </div>
            <Image
              fill
              className="object-cover"
              alt={`${title} ${index + 1}`}
              src={url}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 