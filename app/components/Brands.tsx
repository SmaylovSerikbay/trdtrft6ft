"use client";

import { useEffect, useState } from "react";

// Добавляем опцию для отключения кэширования
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await fetch('/api/brands', {
        cache: 'no-store' // Отключаем кэширование на клиенте
      });
      const data = await response.json();
      setBrands(data);
    };

    fetchBrands();
  }, []);

  // ... остальной код компонента
} 