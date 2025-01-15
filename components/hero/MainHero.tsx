"use client";

import { PLACEHOLDERS } from "@/app/admin/brands/constants";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "../ui/ImageWithFallback";

interface MainHeroProps {
  image: string;
  brightness?: number;
  scrollerTexts?: string[];
}

export function MainHero({ image, brightness = 0.5, scrollerTexts = [] }: MainHeroProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    if (scrollerTexts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentTextIndex((prev: number) => (prev + 1) % scrollerTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [scrollerTexts]);

  return (
    <section className="relative h-screen">
      <ImageWithFallback
        src={image}
        fallbackSrc={PLACEHOLDERS.HERO}
        alt="Hero"
        fill
        className="object-cover"
      />
      <div 
        className="absolute inset-0 bg-black" 
        style={{ opacity: 1 - brightness }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          {scrollerTexts.length > 0 && (
            <p 
              className="text-4xl font-bold transition-opacity duration-500"
              key={currentTextIndex}
            >
              {scrollerTexts[currentTextIndex]}
            </p>
          )}
        </div>
      </div>
    </section>
  );
} 