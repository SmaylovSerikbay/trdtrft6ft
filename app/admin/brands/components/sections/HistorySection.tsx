"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Brand } from "../../types";
import { FormError } from "../ui/FormError";
import { SectionCard } from "../ui/SectionCard";
import { SectionHeader } from "../ui/SectionHeader";

interface HistorySectionProps {
  data: Brand;
  onChange: (data: Partial<Brand>) => void;
  errors?: Record<string, string[]>;
}

export function HistorySection({ data, onChange, errors }: HistorySectionProps) {
  const handleChange = (updates: Partial<{ title: string; description: string }>) => {
    onChange({
      brandHistory: {
        ...data.brandHistory,
        ...updates
      }
    });
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="История бренда"
        description="История и описание бренда"
      />

      <SectionCard>
        <div className="grid gap-6">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Заголовок
            </label>
            <Input
              value={data.brandHistory?.title || ''}
              onChange={(e) => handleChange({ title: e.target.value })}
              placeholder="BRAND HISTORY"
            />
            <FormError message={errors?.["brandHistory.title"]?.[0]} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Описание
            </label>
            <Textarea
              value={data.brandHistory?.description || ''}
              onChange={(e) => handleChange({ description: e.target.value })}
              rows={10}
              placeholder="Путники, отыскавшие оазис жизни – АНО, поведали нам..."
            />
            <FormError message={errors?.["brandHistory.description"]?.[0]} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
} 