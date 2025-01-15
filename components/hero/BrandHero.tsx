"use client";

import { PLACEHOLDERS } from "@/app/admin/brands/constants";
import { ImageWithFallback } from "../ui/ImageWithFallback";

interface BrandHeroProps {
  imageSrc: string | null;
  title: string;
  description: string;
}

export function BrandHero({ imageSrc, title, description }: BrandHeroProps) {
  return (
    <section className="relative h-screen">
      <ImageWithFallback
        src={imageSrc}
        fallbackSrc={PLACEHOLDERS.HERO}
        alt={title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-6xl font-bold mb-4">{title}</h1>
        <p className="text-xl">{description}</p>
      </div>
    </section>
  );
} 