"use client";

import { ImageUpload } from "../../../components/ImageUpload";
import { Brand } from "../../types";
import { getImageUrl } from "../../utils";

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
  const mainGallery = (() => {
    try {
      return typeof data.mainGallery === 'string' 
        ? JSON.parse(data.mainGallery) 
        : Array.isArray(data.mainGallery) 
          ? data.mainGallery 
          : [];
    } catch {
      return [];
    }
  })();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Основная галерея</label>
        <div className="grid grid-cols-2 gap-4">
          {mainGallery.map((image:string, index:number) => (
            <div key={index} className="relative">
              <ImageUpload
                value={getImageUrl(image)}
                onChange={(url) => {
                  const newGallery = [...mainGallery];
                  newGallery[index] = url;
                  onChange({ mainGallery: newGallery });
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
                onChange({ mainGallery: [...mainGallery, url] });
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