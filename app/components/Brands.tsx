"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const router = useRouter();

  const fetchBrands = async () => {
    try {
      const timestamp = new Date().getTime(); // Добавляем timestamp для предотвращения кэширования
      const response = await fetch(`/api/brands?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch brands');
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  // Первоначальная загрузка
  useEffect(() => {
    fetchBrands();
  }, []);

  // Подписка на событие создания бренда
  useEffect(() => {
    const handleBrandCreated = () => {
      fetchBrands();
      router.refresh();
    };

    window.addEventListener('brand-created', handleBrandCreated);
    return () => window.removeEventListener('brand-created', handleBrandCreated);
  }, [router]);

  
} 