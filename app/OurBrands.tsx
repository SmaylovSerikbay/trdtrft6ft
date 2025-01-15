"use client";

import { cn } from "@/lib/utils";
import { Brand } from "@prisma/client";
import { ArrowDown, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface OurBrandsProps {
   brands: Brand[];
}

const getImageUrl = (path: string | null): string => {
   if (!path) return '/images/placeholder.jpg';
   if (path.startsWith('http://') || path.startsWith('https://')) return path;
   if (path.startsWith('/')) return path;
   if (path.includes('uploads/uploads/')) {
      return `/${path.replace('uploads/uploads/', 'uploads/')}`;
   }
   return `/uploads/${path}`;
};

export default function OurBrands({ brands }: OurBrandsProps) {
   const [expandedIndex, setExpandedIndex] = useState(0);
   const displayedBrands = brands.slice(0, 4);

   return (
      <section className="pb-[2.375rem] pt-6 md:pb-[4.75rem] md:pt-12">
         <div className="container">
            <h2 className="mb-10 text-2xl font-bold uppercase leading-none sm:mb-12 md:mb-16 md:text-4xl lg:mb-20">
               Наши бренды
            </h2>
         </div>
         <div className="container max-w-[101.75rem]">
            <div className="flex h-[600px] flex-col gap-8 overflow-hidden sm:h-[650px] sm:gap-[2.625rem] xl:flex-row">
               {displayedBrands.map((brand, index) => (
                  <div
                     key={brand.id}
                     onMouseEnter={() => setExpandedIndex(index)}
                     onMouseLeave={() => setExpandedIndex(0)}
                     className={cn(
                        "relative flex flex-col overflow-hidden rounded-3xl transition-all duration-300 ease-out md:rounded-[3.125rem]",
                        expandedIndex === index || (index === 0 && expandedIndex === 0) 
                           ? "grow max-xl:basis-60 xl:w-[55%]"
                           : "xl:w-[15%]",
                        index === 0 && "xl:min-w-[15%]"
                     )}
                  >
                     <Image
                        src={getImageUrl(brand.heroImage)}
                        width={270}
                        height={870}
                        className={cn(
                           "aspect-[200/870] size-full object-cover max-xl:absolute max-xl:inset-[0] max-xl:-z-[1] 2xl:aspect-[270/870]",
                           "transition-transform duration-300 ease-out",
                           expandedIndex === index || (index === 0 && expandedIndex === 0)
                              ? "scale-100"
                              : "scale-110"
                        )}
                        alt={brand.name}
                        unoptimized
                     />
                     <div className="text-white max-xl:mt-auto max-xl:flex max-xl:items-center max-xl:justify-between max-xl:px-12 max-xl:py-8 max-sm:px-9 max-sm:py-6 xl:absolute xl:bottom-16 xl:left-10 xl:right-11">
                        <div
                           className={cn(
                              "transform transition-all duration-300 ease-out",
                              expandedIndex === index || (index === 0 && expandedIndex === 0)
                                 ? "translate-x-0 opacity-100"
                                 : "translate-x-4 opacity-0"
                           )}
                        >
                           <h3 className="mb-2 text-xl sm:text-3xl xl:text-4xl 2xl:text-[3.4375rem]">
                              {brand.name}
                           </h3>
                           <div className="flex items-center gap-3">
                              <MapPin />
                              <span className="text-sm md:text-2xl 2xl:text-[2rem]">
                                 {brand.address}
                              </span>
                           </div>
                        </div>
                        <Link
                           href={`/${brand.slug}`}
                           className={cn(
                              "inline-flex size-14 -rotate-45 items-center justify-center rounded-full bg-[#142535] transition-all duration-300 ease-out hover:-rotate-[135deg] xl:absolute xl:bottom-0",
                              expandedIndex === index || (index === 0 && expandedIndex === 0)
                                 ? "xl:right-0 opacity-100"
                                 : "xl:right-1/2 xl:translate-x-1/2 opacity-0"
                           )}
                        >
                           <ArrowDown size={30} />
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}
