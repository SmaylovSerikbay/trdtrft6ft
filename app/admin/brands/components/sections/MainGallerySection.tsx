"use client";

import { ImageUpload } from "@/components/ui/ImageUpload";
import { Brand } from "../../types";

interface MainGallerySectionProps {
  data: Brand;
  onChange: (data: Partial<Brand>) => void;
  errors?: Record<string, string[]>;
}

export function MainGallerySection({
  data,
  onChange,
  errors
}: MainGallerySectionProps) {
  const mainGallery = Array.isArray(data.mainGallery) ? data.mainGallery : [];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Основная галерея</label>
        <div className="grid grid-cols-2 gap-4">
          {mainGallery.map((image: string, index: number) => (
            <div key={index} className="relative">
              <ImageUpload
                value={image}
                onChange={(url) => {
                  const newGallery = [...mainGallery];
                  newGallery[index] = url;
                  onChange({ mainGallery: newGallery });
                }}
                onRemove={() => {
                  const newGallery = mainGallery.filter((_, i) => i !== index);
                  onChange({ mainGallery: newGallery });
                }}
              />
            </div>
          ))}
          <div>
            <ImageUpload
              value=""
              onChange={(url) => {
                onChange({ mainGallery: [...mainGallery, url] });
              }}
              onRemove={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 