"use client";

import { ImageUpload } from "@/components/ui/ImageUpload";
import * as Icons from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Brand } from "../types";
import { createEmptyBrand, generateSlug } from "../utils";
import { FeaturesSection } from "./sections/FeaturesSection";
import { HistorySection } from "./sections/HistorySection";
import { InteriorGallerySection } from "./sections/InteriorGallerySection";
import { MainGallerySection } from "./sections/MainGallerySection";
import { MainSection } from "./sections/MainSection";
import { SpecialOffersSection } from "./sections/SpecialOffersSection";
import { WorkingHoursSection } from "./sections/WorkingHoursSection";


const tabs = [
  { id: "main", label: "Основное", icon: Icons.Settings },
  { id: "hero", label: "Hero", icon: Icons.Image },
  { id: "mainGallery", label: "Основная галерея", icon: Icons.Images },
  { id: "workingHours", label: "Время работы", icon: Icons.Clock },
  { id: "history", label: "История", icon: Icons.History },
  { id: "features", label: "Особенности", icon: Icons.Star },
  { id: "offers", label: "Спецпредложения", icon: Icons.Gift },
  { id: "interiorGallery", label: "Галерея интерьера", icon: Icons.Camera },
] as const;

interface BrandFormProps {
  initialData?: Brand | null;
  onSubmit?: (data: Brand) => Promise<void>;
}

const formSchema = z.object({
  name: z.string().min(1),
  title: z.string().optional(),
  description: z.string().optional(),
  welcomeText: z.string().optional(),
  address: z.string().optional(),
  mapLink: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().optional(),
  slug: z.string(),
  workingHours: z.any(),
  mainGallery: z.any(),
  navigationTags: z.any(),
  brandHistory: z.any(),
  features: z.any(),
  specialOffers: z.any(),
  bottomGallery: z.any(),
  heroImage: z.string().optional()
});

export function BrandForm({ initialData, onSubmit }: BrandFormProps) {
  const router = useRouter();
  const [data, setData] = useState<Brand>(initialData || createEmptyBrand());
  const [activeTab, setActiveTab] = useState<typeof tabs[number]["id"]>("main");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  const onTabClick = (tabId: typeof tabs[number]["id"]) => {
    setActiveTab(tabId);
  };

  const onChange = (updates: Partial<Brand>) => {
    setData((prev) => {
      const newData = { ...prev, ...updates };
      // Автоматически генерируем slug из имени
      if (updates.name) {
        newData.slug = generateSlug(updates.name);
      }
      return newData;
    });
  };

  const onSave = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/brands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save brand');
      }

      if (!result.success) {
        throw new Error(result.error || 'Failed to save brand');
      }

      router.push('/admin/brands');
      router.refresh();
    } catch (error) {
      console.error('Error saving brand:', error);
      setError(error instanceof Error ? error.message : 'Failed to save brand');
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Загрузка файлов на сервер
    const uploadFiles = async () => {
      const formData = new FormData();
      acceptedFiles.forEach(file => {
        formData.append('files', file);
      });

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');

        const data = await response.json();
        // Обновляем галерею с новыми файлами
        const newFiles = data.files.map((file: string) => file);
        onChange({ mainGallery: [...(data.mainGallery || []), ...newFiles] });
      } catch (error) {
        console.error('Upload error:', error);
      }
    };

    uploadFiles();
  }, [onChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-64 border-r p-4 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab.id)}
              className={`w-full flex items-center gap-2 p-2 rounded text-sm ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "main" && (
          <MainSection data={data} onChange={onChange} errors={validationErrors} />
        )}
        {activeTab === "hero" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Hero изображение</label>
              <ImageUpload
                value={data.heroImage || ""}
                onChange={(url) => onChange({ heroImage: url })}
                onRemove={() => onChange({ heroImage: "" })}
              />
            </div>
          </div>
        )}
        {activeTab === "mainGallery" && (
          <MainGallerySection
            data={data}
            onChange={(galleryData) => setData({ ...data, ...galleryData })}
            errors={validationErrors}
          />
        )}
        {activeTab === "workingHours" && (
          <WorkingHoursSection 
            data={data} 
            onChange={onChange} 
            errors={validationErrors} 
          />
        )}
        {activeTab === "history" && (
          <HistorySection data={data} onChange={onChange} errors={validationErrors} />
        )}
        {activeTab === "features" && (
          <FeaturesSection data={data} onChange={onChange} errors={validationErrors} />
        )}
        {activeTab === "offers" && (
          <SpecialOffersSection data={data} onChange={onChange} errors={validationErrors} />
        )}
        {activeTab === "interiorGallery" && (
          <InteriorGallerySection
            data={data}
            onChange={(galleryData) => setData({ ...data, ...galleryData })}
            errors={validationErrors}
          />
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-500 rounded">
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onSave}
            disabled={isLoading}
            className={`bg-primary text-primary-foreground px-4 py-2 rounded ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  );
} 