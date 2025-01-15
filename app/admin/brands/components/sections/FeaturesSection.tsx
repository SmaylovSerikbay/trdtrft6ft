"use client";

import { Input } from "@/components/ui/input";
import { Feature } from "../../types";
import { parseJsonField } from "../../utils";
import { SectionCard } from "../ui/SectionCard";
import { SectionHeader } from "../ui/SectionHeader";

interface FeaturesSectionProps {
  data: {
    features?: Feature[] | string;
  };
  onChange: (data: { features: Feature[] }) => void;
  errors?: Record<string, string[]>;
}

export function FeaturesSection({ data, onChange, errors }: FeaturesSectionProps) {
  // Парсим features из JSON если это строка
  const features = Array.isArray(data.features) 
    ? data.features 
    : parseJsonField(data.features as string, []);

  const handleFeatureChange = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = {
      ...newFeatures[index],
      [field]: value
    };
    onChange({ features: newFeatures });
  };

  const handleFeatureRemove = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    onChange({ features: newFeatures });
  };

  const addFeature = () => {
    onChange({
      features: [
        ...features,
        { title: "", description: "" }
      ]
    });
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Особенности"
        description="Добавьте особенности вашего бренда"
      />

      <SectionCard>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="grid gap-4 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1 grid gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Заголовок
                    </label>
                    <Input
                      value={feature.title}
                      onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                      placeholder="Например: Уникальный дизайн"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Описание
                    </label>
                    <Input
                      value={feature.description}
                      onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                      placeholder="Опишите особенность"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleFeatureRemove(index)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addFeature}
            className="w-full p-4 text-sm text-primary hover:underline"
          >
            Добавить особенность
          </button>
        </div>
      </SectionCard>
    </div>
  );
} 