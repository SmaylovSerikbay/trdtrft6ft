"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Brand } from "../../types";

interface ContactsSectionProps {
  data: Brand;
  onChange: (data: Partial<Brand>) => void;
}

export function ContactsSection({ data, onChange }: ContactsSectionProps) {
  const updateContacts = (updates: Partial<Brand['contacts']>) => {
    onChange({
      contacts: { ...data.contacts, ...updates }
    });
  };

  const updateWorkingHours = (updates: Partial<Brand['contacts']['workingHours']>) => {
    updateContacts({
      workingHours: { ...data.contacts.workingHours, ...updates }
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Заголовок</label>
            <Input
              value={data.contacts.title}
              onChange={(e) => updateContacts({ title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Описание</label>
            <Textarea
              value={data.contacts.description}
              onChange={(e) => updateContacts({ description: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Адрес</label>
            <Input
              value={data.contacts.address}
              onChange={(e) => updateContacts({ address: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Телефон</label>
            <Input
              value={data.contacts.phone}
              onChange={(e) => updateContacts({ phone: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={data.contacts.email}
              onChange={(e) => updateContacts({ email: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Режим работы (Будни)</label>
            <Input
              value={data.contacts.workingHours.weekdays}
              onChange={(e) => updateWorkingHours({ weekdays: e.target.value })}
              placeholder="12:00-23:00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Режим работы (Выходные)</label>
            <Input
              value={data.contacts.workingHours.weekends}
              onChange={(e) => updateWorkingHours({ weekends: e.target.value })}
              placeholder="12:00-00:00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ссылка на карту</label>
            <Input
              value={data.contacts.mapLink}
              onChange={(e) => updateContacts({ mapLink: e.target.value })}
              placeholder="https://yandex.ru/maps/-/example"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Instagram</label>
            <Input
              value={data.contacts.instagramLink}
              onChange={(e) => updateContacts({ instagramLink: e.target.value })}
              placeholder="https://instagram.com/example"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 