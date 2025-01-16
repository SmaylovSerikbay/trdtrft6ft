"use client";

import { getYandexDiskImageUrl } from "@/lib/yandex-disk";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export function SafeImage({ src, alt, className, width, height }: SafeImageProps) {
  const [imageSrc, setImageSrc] = useState<string>('/placeholder.jpg');

  useEffect(() => {
    if (src.includes('disk.yandex.ru')) {
      getYandexDiskImageUrl(src).then(setImageSrc);
    } else {
      setImageSrc(src);
    }
  }, [src]);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 300}
      height={height || 200}
      className={className}
      unoptimized
    />
  );
} 