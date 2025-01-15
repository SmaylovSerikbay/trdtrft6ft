"use client";

import { Input } from "@/components/ui/input";
import { SpecialOffer } from "../../types";
import { parseJsonField } from "../../utils";
import { SectionCard } from "../ui/SectionCard";
import { SectionHeader } from "../ui/SectionHeader";

interface SpecialOffersSectionProps {
  data: {
    specialOffers?: SpecialOffer[] | string;
  };
  onChange: (data: { specialOffers: SpecialOffer[] }) => void;
  errors?: Record<string, string[]>;
}

export function SpecialOffersSection({ data, onChange, errors }: SpecialOffersSectionProps) {
  // Парсим specialOffers из JSON если это строка
  const specialOffers = Array.isArray(data.specialOffers) 
    ? data.specialOffers 
    : parseJsonField(data.specialOffers as string, []);

  const handleOfferChange = (index: number, field: keyof SpecialOffer, value: string) => {
    const newOffers = [...specialOffers];
    newOffers[index] = {
      ...newOffers[index],
      [field]: value
    };
    onChange({ specialOffers: newOffers });
  };

  const handleOfferRemove = (index: number) => {
    const newOffers = specialOffers.filter((_, i) => i !== index);
    onChange({ specialOffers: newOffers });
  };

  const addOffer = () => {
    onChange({
      specialOffers: [
        ...specialOffers,
        { title: "", description: "" }
      ]
    });
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Специальные предложения"
        description="Добавьте специальные предложения вашего бренда"
      />

      <SectionCard>
        <div className="space-y-4">
          {specialOffers.map((offer, index) => (
            <div key={index} className="grid gap-4 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1 grid gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Заголовок
                    </label>
                    <Input
                      value={offer.title}
                      onChange={(e) => handleOfferChange(index, "title", e.target.value)}
                      placeholder="Например: Счастливые часы"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Описание
                    </label>
                    <Input
                      value={offer.description}
                      onChange={(e) => handleOfferChange(index, "description", e.target.value)}
                      placeholder="Опишите специальное предложение"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOfferRemove(index)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addOffer}
            className="w-full p-4 text-sm text-primary hover:underline"
          >
            Добавить предложение
          </button>
        </div>
      </SectionCard>
    </div>
  );
} 