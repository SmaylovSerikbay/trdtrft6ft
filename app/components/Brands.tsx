"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Добавляем опцию для отключения кэширования
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const router = useRouter();

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/brands', {
        cache: 'no-store',
        next: { revalidate: 0 }
      });
      if (!response.ok) throw new Error('Failed to fetch brands');
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    fetchBrands();

    // Подписываемся на обновления
    const interval = setInterval(fetchBrands, 5000); // Проверяем каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

  // Добавляем обработчик для принудительного обновления
  const handleRefresh = () => {
    fetchBrands();
    router.refresh();
  };

  useEffect(() => {
    // Подписываемся на событие обновления
    window.addEventListener('brand-created', handleRefresh);
    return () => window.removeEventListener('brand-created', handleRefresh);
  }, []);

  // ... остальной код компонента
} 