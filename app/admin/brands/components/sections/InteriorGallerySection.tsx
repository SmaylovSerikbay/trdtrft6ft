"use client";

import { ImageUpload } from "../../../components/ImageUpload";
import { Brand } from "../../types";
import { getImageUrl } from "../../utils";

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
  // Парсим JSON строку в массив
  const bottomGallery = (() => {
    try {
      return typeof data.bottomGallery === 'string' 
        ? JSON.parse(data.bottomGallery) 
        : Array.isArray(data.bottomGallery) 
          ? data.bottomGallery 
          : [];
    } catch {
      return [];
    }
  })();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Галерея интерьера</label>
        <div className="grid grid-cols-2 gap-4">
          {bottomGallery.map((image:string, index:number) => (
            <div key={index} className="relative">
              <ImageUpload
                value={getImageUrl(image)}
                onChange={(url) => {
                  const newGallery = [...bottomGallery];
                  newGallery[index] = url;
                  onChange({ bottomGallery: newGallery });
                }}
                disabled={false}
                placeholder="/images/placeholder.jpg"
              />
            </div>
          ))}
          <div>
            <ImageUpload
              value=""
              onChange={(url) => {
                onChange({ bottomGallery: [...bottomGallery, url] });
              }}
              disabled={false}
              placeholder="/images/placeholder.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 