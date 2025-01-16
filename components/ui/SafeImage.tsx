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
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState(src);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (src.includes('disk.yandex.ru')) {
        try {
          const response = await fetch(`/api/yandex-disk/get-url?path=${encodeURIComponent(src)}`);
          if (!response.ok) throw new Error('Failed to get image URL');
          const data = await response.json();
          setImageUrl(data.url);
        } catch (error) {
          console.error('Error fetching image URL:', error);
          setError(true);
        }
      }
    };

    fetchImageUrl();
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
      src={imageUrl}
      alt={alt}
      {...props}
      onError={() => setError(true)}
      unoptimized={imageUrl.startsWith('data:') || imageUrl.startsWith('blob:')}
    />
  );
} 