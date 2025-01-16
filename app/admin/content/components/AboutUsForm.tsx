"use client";

import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

interface AboutUsFormProps {
  onClose: () => void;
}

export function AboutUsForm({ onClose }: AboutUsFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    email: "",
    gisLink: "",
    instagramLink: "",
    logo: "",
    logoDark: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/content/about");
      const data = await response.json();
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/content/about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Ошибка сохранения");
      
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Редактировать секцию "О нас"</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Заголовок</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Описание</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ссылка на 2GIS</label>
            <Input
              value={formData.gisLink}
              onChange={(e) => setFormData({ ...formData, gisLink: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ссылка на Instagram</label>
            <Input
              value={formData.instagramLink}
              onChange={(e) => setFormData({ ...formData, instagramLink: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Логотип (светлая тема)</label>
            <ImageUpload
              value={formData.logo}
              onChange={(url) => setFormData({ ...formData, logo: url })}
              onRemove={() => setFormData({ ...formData, logo: "" })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Логотип (темная тема)</label>
            <ImageUpload
              value={formData.logoDark}
              onChange={(url) => setFormData({ ...formData, logoDark: url })}
              onRemove={() => setFormData({ ...formData, logoDark: "" })}
            />
          </div>
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