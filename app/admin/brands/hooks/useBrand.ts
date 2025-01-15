import { slugify } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';
import { DEFAULT_BRAND } from '../constants';
import { Brand } from '../types';

export const useBrand = (initialBrand?: Brand) => {
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState<Brand>(initialBrand || DEFAULT_BRAND);

  const updateBrand = (updates: Partial<Brand>) => {
    setBrand(prev => ({ ...prev, ...updates }));
  };

  const saveBrand = async () => {
    try {
      setLoading(true);
      const url = brand.id ? `/api/brands/${brand.id}` : '/api/brands';
      const method = brand.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...brand,
          slug: slugify(brand.name)
        })
      });

      if (!response.ok) throw new Error();

      const savedBrand = await response.json();
      setBrand(savedBrand);
      toast.success(brand.id ? 'Бренд обновлен' : 'Бренд создан');
      return savedBrand;
    } catch (error) {
      toast.error('Ошибка при сохранении');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    brand,
    loading,
    updateBrand,
    saveBrand
  };
}; 