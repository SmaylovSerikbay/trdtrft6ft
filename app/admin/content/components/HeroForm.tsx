"use client";

import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

interface HeroFormProps {
  onClose: () => void;
}

interface HeroData {
  id?: string;
  page: string;
  image: string;
  brightness: number;
  scrollerTexts: string[];
}

export function HeroForm({ onClose }: HeroFormProps) {
  const [formData, setFormData] = useState<HeroData>({
    page: "main",
    image: "",
    brightness: 0.30,
    scrollerTexts: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/hero/main");
      const data = await response.json();
      if (data) {
        setFormData({
          ...data,
          page: "main",
          scrollerTexts: Array.isArray(data.scrollerTexts) ? data.scrollerTexts : []
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/hero/main", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          scrollerTexts: formData.scrollerTexts.filter(Boolean)
        }),
      });

      if (!response.ok) throw new Error("Ошибка сохранения");
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Редактировать Hero секцию</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Фоновое изображение</label>
            <ImageUpload
              value={formData.image}
              onChange={(url) => {
                setFormData(prev => ({
                  ...prev,
                  image: url
                }));
              }}
              onRemove={() => {
                setFormData(prev => ({
                  ...prev,
                  image: ""
                }));
              }}
            />
            <div className="mt-2 text-sm text-gray-500">
              {formData.image ? (
                <p>Текущее изображение: {formData.image}</p>
              ) : (
                <p>Изображение не выбрано</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Яркость изображения: {Math.round(formData.brightness * 100)}%
            </label>
            <Slider
              value={[formData.brightness]}
              onValueChange={([value]) => setFormData({ ...formData, brightness: value })}
              min={0}
              max={1}
              step={0.01}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Бегущая строка (разделите слова запятыми)
            </label>
            <Input
              value={formData.scrollerTexts.join(", ")}
              onChange={(e) => {
                const texts = e.target.value
                  .split(",")
                  .map(text => text.trim());
                setFormData({
                  ...formData,
                  scrollerTexts: texts
                });
              }}
              placeholder="Атмосфера, Стиль, Музыка"
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