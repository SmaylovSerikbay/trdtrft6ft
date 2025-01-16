"use client";

import { PLACEHOLDER_IMAGE } from "@/app/admin/brands/constants";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}

export function SafeImage({ src, alt, ...props }: SafeImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (src.includes('disk.yandex.ru')) {
      // Добавляем timestamp для предотвращения кэширования
      const timestamp = new Date().getTime();
      fetch(`/api/yandex-disk/download?path=${encodeURIComponent(src)}&t=${timestamp}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to load image');
          return response.blob();
        })
        .then(blob => {
          const url = URL.createObjectURL(blob);
          setImageSrc(url);
        })
        .catch(() => {
          setError(true);
        });
    }
  }, [src]);

  if (!src || error) {
    return (
      <Image
        src={PLACEHOLDER_IMAGE}
        alt={alt}
        {...props}
        unoptimized
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      {...props}
      onError={() => setError(true)}
      unoptimized={imageSrc.startsWith('data:') || imageSrc.startsWith('blob:')}
    />
  );
} 