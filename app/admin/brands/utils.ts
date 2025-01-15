import { Brand } from "./types";

export function createEmptyBrand(): Brand {
  return {
    name: "",
    title: "",
    description: "",
    welcomeText: "",
    address: "",
    mapLink: "",
    phone: "",
    whatsapp: "",
    email: "",
    slug: "",
    workingHours: {
      weekdays: "",
      weekends: ""
    },
    mainGallery: [],
    navigationTags: [],
    brandHistory: {
      title: "",
      description: ""
    },
    features: [],
    specialOffers: [],
    bottomGallery: []
  };
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-');
}

export function isValidImageUrl(url: string): boolean {
  if (!url) return false;

  // Для data: URLs (превью)
  if (url.startsWith('data:image/')) return true;

  // Для blob: URLs (загрузка файлов)
  if (url.startsWith('blob:')) return true;

  // Для относительных путей
  if (url.startsWith('/')) return true;

  // Для абсолютных URL
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getImageUrl(url: string | null | undefined): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return '/images/placeholder.jpg';
  }

  const trimmedUrl = url.trim();

  // Если URL уже содержит полный путь, возвращаем как есть
  if (trimmedUrl.startsWith('data:') || 
      trimmedUrl.startsWith('blob:') || 
      trimmedUrl.startsWith('http://') || 
      trimmedUrl.startsWith('https://') ||
      trimmedUrl.startsWith('/')) {
    return trimmedUrl;
  }

  // Добавляем префикс /uploads/ только если его нет
  return `/uploads/${trimmedUrl}`;
}

export function parseJsonField<T>(field: unknown, defaultValue: T): T {
  if (!field) return defaultValue;
  
  try {
    if (typeof field === 'string') {
      return JSON.parse(field);
    }
    return field as T;
  } catch {
    return defaultValue;
  }
}

export function serializeJsonField<T>(field: T): string {
  return JSON.stringify(field);
} 