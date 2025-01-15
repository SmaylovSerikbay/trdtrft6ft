"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import decor from "/public/hero/decor.svg";

interface HeroData {
  image: string;
  brightness: number;
  scrollerTexts: string[];
}

const scrollerTexts = [
  "Уникальность",
  "Качество",
  "Атмосфера",
  "Стиль",
  "Комфорт",
  "Впечатления",
  "Вкус",
  "Традиции",
  "Инновации",
];

export default function HeroBrands() {
  const [heroData, setHeroData] = useState<HeroData>({
    image: "/hero/brands-hero.jpg",
    brightness: 0.3,
    scrollerTexts: []
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/hero/brands');
        const data = await response.json();
        if (data) {
          setHeroData({
            image: data.image || "/hero/brands-hero.jpg",
            brightness: data.brightness || 0.3,
            scrollerTexts: data.scrollerTexts || []
          });
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
      }
    };

    fetchHeroData();
  }, []);

  return (
    <section className="pb-7 md:pb-10 lg:pb-14">
      <div className="hero-img relative">
        <div className="relative w-full h-[843px]">
          <Image
            src={heroData.image}
            alt="Наши бренды"
            fill
            priority
            className="object-cover"
            style={{ filter: `brightness(${heroData.brightness})` }}
          />
          
        </div>
      </div>
      <InfiniteScroller texts={heroData.scrollerTexts as never[]} />
    </section>
  );
}

function InfiniteScroller({ texts = [] }) {
  const displayTexts = texts.length > 0 ? texts : scrollerTexts;
  
  return (
    <div className="scroller-container">
      <div className="scroller">
        {/* Первый набор текстов */}
        {displayTexts.map((text, index) => (
          <div key={`first-${index}`} className="scroller-item">
            <div className="size-7 sm:size-10">
              <Image src={decor} alt="decor" width={40} height={40} />
            </div>
            <span className="scroller-text">{text}</span>
          </div>
        ))}
        {/* Дублируем набор текстов для бесконечной анимации */}
        {displayTexts.map((text, index) => (
          <div key={`second-${index}`} className="scroller-item">
            <div className="size-7 sm:size-10">
              <Image src={decor} alt="decor" width={40} height={40} />
            </div>
            <span className="scroller-text">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 