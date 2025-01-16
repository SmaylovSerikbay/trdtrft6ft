"use client";

import { ImageUpload } from "@/components/ui/ImageUpload";
import { Brand } from "../../types";

interface InteriorGallerySectionProps {
  data: Brand;
  onChange: (data: Partial<Brand>) => void;
  errors?: Record<string, string[]>;
}

export function InteriorGallerySection({
  data,
  onChange,
  errors
}: InteriorGallerySectionProps) {
  const bottomGallery = Array.isArray(data.bottomGallery) ? data.bottomGallery : [];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Галерея интерьера</label>
        <div className="grid grid-cols-2 gap-4">
          {bottomGallery.map((image: string, index: number) => (
            <div key={index} className="relative">
              <ImageUpload
                value={image}
                onChange={(url) => {
                  const newGallery = [...bottomGallery];
                  newGallery[index] = url;
                  onChange({ bottomGallery: newGallery });
                }}
                onRemove={() => {
                  const newGallery = bottomGallery.filter((_, i) => i !== index);
                  onChange({ bottomGallery: newGallery });
                }}
              />
            </div>
          ))}
          <div>
            <ImageUpload
              value=""
              onChange={(url) => {
                onChange({ bottomGallery: [...bottomGallery, url] });
              }}
              onRemove={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 