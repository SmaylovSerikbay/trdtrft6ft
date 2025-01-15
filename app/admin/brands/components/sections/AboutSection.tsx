"use client";

import { ImageUpload } from "@/components/ui/ImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Brand } from "../../types";
import { FormError } from "../ui/FormError";
import { SectionCard } from "../ui/SectionCard";
import { SectionHeader } from "../ui/SectionHeader";

interface AboutSectionProps {
  data: Brand;
  onChange: (data: Partial<Brand>) => void;
  errors?: Record<string, string[]>;
}

export function AboutSection({ data, onChange, errors }: AboutSectionProps) {
  return (
    <div className="space-y-6">
      <SectionHeader 
        title="О нас"
        description="Информация о ресторане"
      />

      <SectionCard>
        <div className="grid gap-6">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Заголовок
            </label>
            <Input
              value={data.aboutTitle}
              onChange={(e) => onChange({ aboutTitle: e.target.value })}
              placeholder="Добро пожаловать в AHO"
            />
            <FormError message={errors?.["aboutTitle"]?.[0]} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Описание
            </label>
            <Textarea
              value={data.aboutText}
              onChange={(e) => onChange({ aboutText: e.target.value })}
              rows={4}
              placeholder="Место, где культурные мотивы, древние моменты и завораживающие детали..."
            />
            <FormError message={errors?.["aboutText"]?.[0]} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Изображение
            </label>
            <ImageUpload
              value={data.aboutImage}
              onChange={(url) => onChange({ aboutImage: url })}
            />
            <FormError message={errors?.["aboutImage"]?.[0]} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
} 