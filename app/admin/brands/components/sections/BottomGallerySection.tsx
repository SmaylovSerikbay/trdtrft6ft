"use client";

import { ImageUpload } from "@/components/ui/ImageUpload";
import { SectionCard } from "../ui/SectionCard";
import { SectionHeader } from "../ui/SectionHeader";

interface BottomGallerySectionProps {
  data: {
    bottomGallery?: string[];
  };
  onChange: (data: { bottomGallery: string[] }) => void;
  errors?: Record<string, string[]>;
}

export function BottomGallerySection({ data, onChange, errors }: BottomGallerySectionProps) {
  const images = Array.isArray(data.bottomGallery) ? data.bottomGallery : [];

  const handleImageChange = (index: number, url: string) => {
    const newImages = [...images];
    newImages[index] = url;
    onChange({ bottomGallery: newImages });
  };

  const handleImageRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange({ bottomGallery: newImages });
  };

  const addImage = () => {
    onChange({ bottomGallery: [...images, ""] });
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Нижняя галерея"
        description="Галерея изображений в нижней части страницы"
      />

      <SectionCard>
        <div className="grid gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Изображения
              </label>
              {images.length < 3 && (
                <button
                  type="button"
                  onClick={addImage}
                  className="text-sm text-primary hover:underline"
                >
                  Добавить изображение
                </button>
              )}
            </div>

            <div className="grid gap-4">
              {images.map((url, index) => (
                <div key={index} className="relative">
                  <ImageUpload
                    value={url}
                    onChange={(newUrl) => handleImageChange(index, newUrl)}
                    onRemove={() => handleImageRemove(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
} 