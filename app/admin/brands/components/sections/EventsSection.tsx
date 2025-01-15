"use client";

import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { Brand } from "../../types";
import { FormError } from "../ui/FormError";
import { SectionCard } from "../ui/SectionCard";
import { SectionHeader } from "../ui/SectionHeader";

interface EventsSectionProps {
  data: Brand;
  onChange: (data: Partial<Brand>) => void;
  errors?: Record<string, string[]>;
}

export function EventsSection({ data, onChange, errors }: EventsSectionProps) {
  const addEvent = () => {
    onChange({
      events: [...data.events, { title: "", description: "", date: "", image: "" }]
    });
  };

  const removeEvent = (index: number) => {
    onChange({
      events: data.events.filter((_, i) => i !== index)
    });
  };

  const updateEvent = (index: number, updates: Partial<typeof data.events[0]>) => {
    const newEvents = [...data.events];
    newEvents[index] = { ...newEvents[index], ...updates };
    onChange({ events: newEvents });
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="События"
        description="Специальные события ресторана"
      />

      <SectionCard>
        <div className="space-y-4">
          {data.events.map((event, index) => (
            <div key={index} className="grid gap-4 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1 grid gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Название события
                    </label>
                    <Input
                      value={event.title}
                      onChange={(e) => updateEvent(index, { title: e.target.value })}
                      placeholder="ЯРКИЕ ВЫХОДНЫЕ С SANDWAVE PARTIES"
                    />
                    <FormError message={errors?.[`events.${index}.title`]?.[0]} />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Описание события
                    </label>
                    <Textarea
                      value={event.description}
                      onChange={(e) => updateEvent(index, { description: e.target.value })}
                      rows={4}
                      placeholder="Каждую субботу в воскресенье нашей музыкальной программой в ночи музыки и танцев."
                    />
                    <FormError message={errors?.[`events.${index}.description`]?.[0]} />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      День и время
                    </label>
                    <Input
                      value={event.date}
                      onChange={(e) => updateEvent(index, { date: e.target.value })}
                      placeholder="Каждую субботу и воскресенье"
                    />
                    <FormError message={errors?.[`events.${index}.date`]?.[0]} />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Изображение события
                    </label>
                    <ImageUpload
                      value={event.image}
                      onChange={(url) => updateEvent(index, { image: url })}
                    />
                    <FormError message={errors?.[`events.${index}.image`]?.[0]} />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeEvent(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addEvent}
          >
            <Plus className="h-4 w-4 mr-2" />
            Добавить событие
          </Button>
        </div>
      </SectionCard>
    </div>
  );
} 