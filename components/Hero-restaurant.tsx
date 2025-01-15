"use client";

import Image from "next/image";
import decor from "/public/hero/decor.svg";

interface HeroProps {
  imageSrc: string;
  title: string;
  description: string;
}

const scrollerTexts = [
  "Атмосфера",
  "Стиль",
  "Музыка",
  "энергетика",
  "уют",
  "События",
  "впечатления",
  "Эмоции",
  "комфорт",
];

export default function Hero({ imageSrc, title, description }: HeroProps) {
  // Функция для получения URL изображения
  const getImageUrl = (path: string): string => {
    if (!path) return '/images/placeholder-hero.jpg';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    if (path.startsWith('/')) return path;
    return path.startsWith('uploads/') ? `/${path}` : `/uploads/${path}`;
  };

  return (
    <section className="pb-7 md:pb-10 lg:pb-14">
      <div className="hero-img relative">
        <div className="relative w-full h-[843px]">
          <Image
            src={getImageUrl(imageSrc)}
            alt={title}
            fill
            priority
            className="object-cover brightness-[.61]"
            unoptimized
          />
        </div>
        
        <div className="hero-title absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold mb-4 sm:text-5xl md:text-6xl">{title}</h1>
          <p className="text-lg sm:text-xl md:text-2xl">{description}</p>
        </div>
      </div>
      <InfiniteScroller />
    </section>
  );
}

function InfiniteScroller({ texts = [] }) {
  const displayTexts = texts.length > 0 ? texts : scrollerTexts;
  
  return (
    <div className="scroller-container">
      <div className="scroller">
        {displayTexts.map((text, index) => (
          <div key={`text-${index}`} className="scroller-item">
            <div className="w-7 h-7 sm:w-10 sm:h-10">
              <Image src={decor} alt="decor" width={40} height={40} />
            </div>
            <span className="scroller-text">{text}</span>
          </div>
        ))}
        {displayTexts.map((text, index) => (
          <div key={`text-repeat-${index}`} className="scroller-item">
            <div className="w-7 h-7 sm:w-10 sm:h-10">
              <Image src={decor} alt="decor" width={40} height={40} />
            </div>
            <span className="scroller-text">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
