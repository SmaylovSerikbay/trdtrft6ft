"use client";

import { Input } from "@/components/ui/input";
import { SectionCard } from "../ui/SectionCard";
import { SectionHeader } from "../ui/SectionHeader";

interface WorkingHoursSectionProps {
  data: {
    workingHours?: {
      weekdays: string;
      weekends: string;
    };
  };
  onChange: (data: any) => void;
  errors?: Record<string, string[]>;
}

export function WorkingHoursSection({ data, onChange, errors }: WorkingHoursSectionProps) {
  const workingHours = data.workingHours || { weekdays: "", weekends: "" };

  const handleChange = (field: 'weekdays' | 'weekends', value: string) => {
    onChange({
      workingHours: {
        ...workingHours,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Время работы"
        description="Укажите часы работы заведения"
      />

      <SectionCard>
        <div className="grid gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Понедельник - Пятница</label>
              <Input
                value={workingHours.weekdays}
                onChange={(e) => handleChange('weekdays', e.target.value)}
                placeholder="Например: 10:00 - 22:00"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Суббота - Воскресенье</label>
              <Input
                value={workingHours.weekends}
                onChange={(e) => handleChange('weekends', e.target.value)}
                placeholder="Например: 11:00 - 23:00"
              />
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
} 