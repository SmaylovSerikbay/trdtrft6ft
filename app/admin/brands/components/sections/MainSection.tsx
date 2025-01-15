"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Brand } from "../../types";
import { generateSlug } from "../../utils";
import { FormError } from "../ui/FormError";
import { SectionCard } from "../ui/SectionCard";
import { SectionHeader } from "../ui/SectionHeader";

interface MainSectionProps {
  data: Brand;
  onChange: (data: Partial<Brand>) => void;
  errors?: Record<string, string[]>;
}

export function MainSection({ data, onChange, errors }: MainSectionProps) {
  const handleNameChange = (name: string) => {
    onChange({
      name,
      slug: generateSlug(name)
    });
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Основная информация"
        description="Базовые данные о ресторане"
      />

      <SectionCard>
        <div className="grid gap-6">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Название
            </label>
            <Input
              value={data.name || ''}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="РЕСТОРАН АНО"
            />
            <FormError message={errors?.["name"]?.[0]} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Подзаголовок
            </label>
            <Input
              value={data.description || ''}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="ВАШ ОСТРОВ ВДОХНОВЕНИЯ И ВКУСА В ЦЕНТРЕ ГОРОДА"
            />
            <FormError message={errors?.["description"]?.[0]} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Приветственный текст
            </label>
            <Textarea
              value={data.welcomeText || ''}
              onChange={(e) => onChange({ welcomeText: e.target.value })}
              rows={4}
              placeholder="Добро пожаловать в АНО..."
            />
            <FormError message={errors?.["welcomeText"]?.[0]} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Адрес
            </label>
            <Input
              value={data.address || ''}
              onChange={(e) => onChange({ address: e.target.value })}
              placeholder="УЛИЦА АКМЕШИТ 1А, АСТАНА, КАЗАХСТАН"
            />
            <FormError message={errors?.["address"]?.[0]} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Ссылка на карту
            </label>
            <Input
              value={data.mapLink || ''}
              onChange={(e) => onChange({ mapLink: e.target.value })}
              placeholder="https://2gis.kz/astana/..."
            />
            <FormError message={errors?.["mapLink"]?.[0]} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Телефон
            </label>
            <Input
              value={data.phone || ''}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+7 (777) 777-77-77"
            />
            <FormError message={errors?.["phone"]?.[0]} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              WhatsApp
            </label>
            <Input
              value={data.whatsapp || ''}
              onChange={(e) => onChange({ whatsapp: e.target.value })}
              placeholder="+77777777777"
            />
            <FormError message={errors?.["whatsapp"]?.[0]} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
} 