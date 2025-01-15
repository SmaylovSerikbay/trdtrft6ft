"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import decor from "/public/hero/decor.svg";

interface HeroProps {
   imageSrc?: string;
   brightness?: number;
   className?: string;
}

interface HeroData {
   image: string;
   brightness: number;
   scrollerTexts: string[];
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

export default function Hero({
   imageSrc = "/hero/hero-bg.jpg",
   brightness = 0.3,
   className,
}: HeroProps) {
   const [heroData, setHeroData] = useState<HeroData>({
      image: imageSrc,
      brightness: brightness,
      scrollerTexts: []
   });

   useEffect(() => {
      const fetchHeroData = async () => {
         try {
            const response = await fetch('/api/hero/main');
            const data = await response.json();
            console.log('Fetched hero data:', data);
            if (data) {
               setHeroData({
                  image: data.image || imageSrc,
                  brightness: data.brightness || brightness,
                  scrollerTexts: data.scrollerTexts || []
               });
            }
         } catch (error) {
            console.error('Error fetching hero data:', error);
         }
      };

      fetchHeroData();
   }, [imageSrc, brightness]);

   return (
      <section className="pb-7 md:pb-10 lg:pb-14">
         <div>
            <Image
               src={heroData.image}
               width={1920}
               height={843}
               alt="hero"
               className={cn("w-full object-cover", className)}
               style={{ filter: `brightness(${heroData.brightness})` }}
               priority
            />
         </div>
         <InfiniteScroller texts={heroData.scrollerTexts} />
      </section>
   );
}

function InfiniteScroller({ texts = [] }) {
   const displayTexts = texts.length > 0 ? texts : scrollerTexts;
   
   return (
      <div className="w-full overflow-hidden bg-black dark:border-y dark:border-[#1c1c21]">
         <div className="scroller">
            {[...Array(2)].map((_, groupIndex) => (
               <div key={groupIndex} className="flex min-w-full">
                  {displayTexts.map((text, index) => (
                     <div
                        key={`${groupIndex}-${index}`}
                        className="flex items-center space-x-6 whitespace-nowrap px-6 py-3 sm:space-x-8 sm:px-8 sm:py-4"
                     >
                        <div className="size-7 sm:size-10">
                           <Image src={decor} alt="decor" width={40} height={40} />
                        </div>
                        <span className="text-sm uppercase text-white sm:text-lg">
                           {text}
                        </span>
                     </div>
                  ))}
               </div>
            ))}
         </div>
      </div>
   );
}
