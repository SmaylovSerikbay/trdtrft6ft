"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
  src: string | null | undefined;
  fallbackSrc: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function ImageWithFallback({
  src,
  fallbackSrc,
  alt,
  className,
  fill,
  width = 1920,
  height = 1080
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const imgSrc = error || !src ? fallbackSrc : src;

  if (!imgSrc) {
    return null;
  }

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      <Image
        src={imgSrc}
        alt={alt}
        className={className}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        onError={() => setError(true)}
      />
    </div>
  );
} 