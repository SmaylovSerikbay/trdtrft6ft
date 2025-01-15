"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

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

export function AnoncesForm({ 
  onClose, 
  isNewSection, 
  sectionId, 
  editingAnonce,
  editingSection 
}: AnoncesFormProps) {
  const [formData, setFormData] = useState({
    header: editingSection?.header || (isNewSection ? "Готовимся к захватывающему событию: уже [дата] мы ждем вас на [название мероприятия]. Вас ждут [основные элементы: мастер-классы, выступления, сюрпризы]!" : ""),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isNewSection || editingSection) {
        const url = editingSection 
          ? `/api/anonce-sections/${editingSection.id}`
          : "/api/anonce-sections";

        const method = editingSection ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ header: formData.header }),
        });

        if (!response.ok) throw new Error(editingSection ? "Ошибка обновления секции" : "Ошибка создания секции");
        
        if (isNewSection) {
          const section = await response.json();
          formData.sectionId = section.id;
        }
      }

      if (!editingSection) {
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">
          {editingSection ? "Редактировать секцию" : editingAnonce ? "Редактировать анонс" : isNewSection ? "Создать новую секцию" : "Добавить анонс"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {(isNewSection || editingSection) && (
            <div>
              <label className="block text-sm font-medium mb-1">Заголовок секции</label>
              <Textarea
                value={formData.header}
                onChange={(e) => setFormData({ ...formData, header: e.target.value })}
                required={isNewSection || editingSection}
              />
            </div>
          )}
          {!editingSection && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Заголовок анонса</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Текст анонса</label>
                <Textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
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