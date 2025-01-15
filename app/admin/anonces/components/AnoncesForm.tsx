"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Anonce {
  id: string;
  title: string;
  text: string;
}

interface Section {
  id: string;
  header: string;
  anonces: Anonce[];
}

interface AnoncesFormProps {
  onClose: () => void;
  isNewSection?: boolean;
  sectionId?: string;
  editingAnonce?: Anonce | null;
  editingSection?: Section | null;
}

interface FormData {
  header: string;
  title: string;
  text: string;
  sectionId: string;
}

export function AnoncesForm({ 
  onClose, 
  isNewSection: isNew = false,
  sectionId, 
  editingAnonce,
  editingSection: editingSec = null
}: AnoncesFormProps) {
  const [formData, setFormData] = useState<FormData>({
    header: editingSec?.header || (isNew ? "Готовимся к захватывающему событию: уже [дата] мы ждем вас на [название мероприятия]. Вас ждут [основные элементы: мастер-классы, выступления, сюрпризы]!" : ""),
    title: "",
    text: "",
    sectionId: sectionId || "",
  });

  useEffect(() => {
    if (editingAnonce) {
      setFormData(prev => ({
        ...prev,
        title: editingAnonce.title,
        text: editingAnonce.text,
      }));
    }
  }, [editingAnonce]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      if (isNew || editingSec) {
        const url = editingSec 
          ? `/api/anonce-sections/${editingSec.id}`
          : "/api/anonce-sections";

        const method = editingSec ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ header: formData.header }),
        });

        if (!response.ok) throw new Error(editingSec ? "Ошибка обновления секции" : "Ошибка создания секции");
        
        if (isNew) {
          const section = await response.json();
          formData.sectionId = section.id;
        }
      }

      if (!editingSec) {
        const url = editingAnonce 
          ? `/api/anonces/${editingAnonce.id}`
          : "/api/anonces";

        const method = editingAnonce ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Ошибка сохранения");
      }
      
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">
          {editingSec ? "Редактировать секцию" : editingAnonce ? "Редактировать анонс" : isNew ? "Создать новую секцию" : "Добавить анонс"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {(isNew || editingSec) && (
            <div>
              <label className="block text-sm font-medium mb-1">Заголовок секции</label>
              <Textarea
                name="header"
                value={formData.header}
                onChange={handleChange}
                required={Boolean(isNew || editingSec)}
              />
            </div>
          )}
          {!editingSec && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Заголовок анонса</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Текст анонса</label>
                <Textarea
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit">Сохранить</Button>
          </div>
        </form>
      </div>
    </div>
  );
} 