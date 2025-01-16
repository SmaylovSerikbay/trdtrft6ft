"use client";

import { PLACEHOLDER_IMAGE } from "@/app/admin/brands/constants";
import Image from "next/image";
import { useState } from "react";

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
      src={src}
      alt={alt}
      {...props}
      onError={() => setError(true)}
      unoptimized={src.startsWith('data:') || src.startsWith('blob:')}
    />
  );
} 