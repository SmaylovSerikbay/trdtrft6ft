"use client";

import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Brand } from "../../types";

interface GallerySectionProps {
  data: Brand;
  onChange: (data: Partial<Brand>) => void;
}

export function GallerySection({ data, onChange }: GallerySectionProps) {
  const updateGallery = (updates: Partial<Brand['gallery']>) => {
    onChange({
      gallery: { ...data.gallery, ...updates }
    });
  };

  const addImage = () => {
    updateGallery({
      images: [...data.gallery.images, ""]
    });
  };

  const removeImage = (index: number) => {
    updateGallery({
      images: data.gallery.images.filter((_, i) => i !== index)
    });
  };

  const updateImage = (index: number, url: string) => {
    const newImages = [...data.gallery.images];
    newImages[index] = url;
    updateGallery({ images: newImages });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Заголовок</label>
            <Input
              value={data.gallery.title}
              onChange={(e) => updateGallery({ title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Описание</label>
            <Textarea
              value={data.gallery.description}
              onChange={(e) => updateGallery({ description: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Изображения</label>
          <Button type="button" variant="outline" size="sm" onClick={addImage}>
            <Plus className="h-4 w-4 mr-2" />
            Добавить
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {data.gallery.images.map((image, index) => (
            <div key={index} className="relative">
              <ImageUpload
                value={image}
                onChange={(url) => updateImage(index, url)}
                onRemove={() => removeImage(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 