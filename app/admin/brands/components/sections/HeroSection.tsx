"use client";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Input } from "@/components/ui/input";
import { getImageUrl } from "../../utils";
import { SectionCard } from "../ui/SectionCard";
import { SectionHeader } from "../ui/SectionHeader";

interface HeroSectionProps {
  data: {
    heroImage?: string;
    title?: string;
    description?: string;
  };
  onChange: (data: { heroImage?: string; title?: string; description?: string }) => void;
  errors?: Record<string, string[]>;
}

export function HeroSection({ data, onChange, errors }: HeroSectionProps) {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Hero секция"
        description="Загрузите главное изображение и добавьте заголовок"
      />

      <SectionCard>
        <div className="grid gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Hero изображение</label>
              <ImageUpload
                value={getImageUrl(data.heroImage ?? null)}
                onChange={(url) => {
                  onChange({ ...data, heroImage: url });
                }}
                
                onRemove={() => onChange({ ...data, heroImage: '' })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Заголовок</label>
              <Input
                value={data.title || ''}
                onChange={(e) => onChange({ ...data, title: e.target.value })}
                placeholder="Введите заголовок"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Описание</label>
              <Input
                value={data.description || ''}
                onChange={(e) => onChange({ ...data, description: e.target.value })}
                placeholder="Введите описание"
              />
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
} 