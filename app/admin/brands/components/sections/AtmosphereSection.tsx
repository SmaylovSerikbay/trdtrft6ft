"use client";

import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { Brand } from "../../types";
import { FormError } from "../ui/FormError";
import { IconPicker } from "../ui/IconPicker";
import { SectionCard } from "../ui/SectionCard";
import { SectionHeader } from "../ui/SectionHeader";

interface AtmosphereSectionProps {
  data: Brand;
  onChange: (data: Partial<Brand>) => void;
  errors?: Record<string, string[]>;
}

export function AtmosphereSection({ data, onChange, errors }: AtmosphereSectionProps) {
  const updateAtmosphere = (updates: Partial<typeof data.atmosphere>) => {
    onChange({
      atmosphere: {
        ...data.atmosphere,
        ...updates
      }
    });
  };

  const addImage = () => {
    updateAtmosphere({
      images: [...data.atmosphere.images, ""]
    });
  };

  const removeImage = (index: number) => {
    updateAtmosphere({
      images: data.atmosphere.images.filter((_, i) => i !== index)
    });
  };

  const updateImage = (index: number, url: string) => {
    const newImages = [...data.atmosphere.images];
    newImages[index] = url;
    updateAtmosphere({ images: newImages });
  };

  const addFeature = () => {
    updateAtmosphere({
      features: [...data.atmosphere.features, { title: "", description: "", icon: "Star" }]
    });
  };

  const removeFeature = (index: number) => {
    updateAtmosphere({
      features: data.atmosphere.features.filter((_, i) => i !== index)
    });
  };

  const updateFeature = (index: number, updates: Partial<typeof data.atmosphere.features[0]>) => {
    const newFeatures = [...data.atmosphere.features];
    newFeatures[index] = { ...newFeatures[index], ...updates };
    updateAtmosphere({ features: newFeatures });
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Атмосфера"
        description="Атмосфера ресторана"
      />

      <SectionCard>
        <div className="grid gap-6">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Заголовок
            </label>
            <Input
              value={data.atmosphere.title}
              onChange={(e) => updateAtmosphere({ title: e.target.value })}
              placeholder="Эта ночь разверзается в двух стихиях"
            />
            <FormError message={errors?.["atmosphere.title"]?.[0]} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Описание
            </label>
            <Textarea
              value={data.atmosphere.description}
              onChange={(e) => updateAtmosphere({ description: e.target.value })}
              rows={4}
              placeholder="Время поиска и время открытия. Каждый момент будет отражать ритм звезд в их космическом танце, а каждый гость почувствует себя частью бесконечного космоса, который зовет открыть и познать себя."
            />
            <FormError message={errors?.["atmosphere.description"]?.[0]} />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium mb-1.5 block">
              Галерея изображений
            </label>
            <div className="grid grid-cols-2 gap-4">
              {data.atmosphere.images.map((image, index) => (
                <div key={index} className="relative">
                  <ImageUpload
                    value={image}
                    onChange={(url) => updateImage(index, url)}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <FormError message={errors?.[`atmosphere.images.${index}`]?.[0]} />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="h-[200px]"
                onClick={addImage}
              >
                <Plus className="h-4 w-4 mr-2" />
                Добавить
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium mb-1.5 block">
              Особенности атмосферы
            </label>
            {data.atmosphere.features.map((feature, index) => (
              <div key={index} className="grid gap-4 p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1 grid gap-4">
                    <div>
                      <Input
                        placeholder="Название особенности"
                        value={feature.title}
                        onChange={(e) => updateFeature(index, { title: e.target.value })}
                      />
                      <FormError message={errors?.[`atmosphere.features.${index}.title`]?.[0]} />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Описание особенности"
                        value={feature.description}
                        onChange={(e) => updateFeature(index, { description: e.target.value })}
                      />
                      <FormError message={errors?.[`atmosphere.features.${index}.description`]?.[0]} />
                    </div>
                    <div>
                      <IconPicker
                        label="Иконка"
                        value={feature.icon}
                        onChange={(icon) => updateFeature(index, { icon })}
                      />
                      <FormError message={errors?.[`atmosphere.features.${index}.icon`]?.[0]} />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFeature(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addFeature}
            >
              <Plus className="h-4 w-4 mr-2" />
              Добавить особенность
            </Button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
} 