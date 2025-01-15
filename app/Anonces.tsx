"use client";

import { useTheme } from "@/components/theme-provider";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Anonce {
   id: string;
   title: string;
   text: string;
}

interface Section {
   id: string;
   header: string;
   anonces: Anonce[];
}

export default function Anonces() {
   const { theme } = useTheme();
   const [sections, setSections] = useState<Section[]>([]);

   useEffect(() => {
      fetchSections();
   }, []);

   const fetchSections = async () => {
      try {
         const response = await fetch("/api/anonce-sections");
         const data = await response.json();
         setSections(data);
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <section id="anonces" className="scroll-mt-4 pb-[2.375rem] pt-10 sm:pb-[4.75rem] sm:pt-[4.75rem]">
         <div className="container">
            <h2 className="mb-6 text-2xl font-bold uppercase leading-[137.209302%] min-[480px]:text-3xl sm:mb-8 md:text-4xl">
               Анонсы
            </h2>
            
            <div className="space-y-12">
               {sections.map((section) => (
                  <div key={section.id}>
                     <p className="mb-6 text-sm sm:text-base md:text-lg lg:text-xl">
                        {section.header}
                     </p>
                     <ul className="space-y-[.625rem]">
                        {section.anonces.map((anonce) => (
                           <li
                              key={anonce.id}
                              className="flex items-center gap-2 rounded-xl border border-[#1c1c21] px-3 py-2 transition-colors sm:gap-[.875rem] sm:px-4 sm:py-3 dark:border-white"
                           >
                              <div className="shrink-0">
                                 <Image
                                    src={theme !== "dark" ? "/anonces/decor-light.svg" : "/anonces/decor-dark.svg"}
                                    width={40}
                                    height={40}
                                    className="size-7 sm:size-10"
                                    alt="icon"
                                 />
                              </div>
                              <div className="uppercase text-[#060606] dark:text-white">
                                 <p className="sm:text- text-sm md:text-base">
                                    {anonce.title}
                                 </p>
                                 <p className="text-xs font-light sm:text-sm">
                                    {anonce.text}
                                 </p>
                              </div>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}
