"use client";

import { Download, Forward } from "lucide-react";
import IconButton from "@/components/ui/IconButton";
import Image from "next/image";

export default function Anonce() {
   return (
      <div className="flex flex-col-reverse items-center justify-between gap-7 lg:flex-row">
         <div className="lg:basis-[44.5rem]">
            <h1 className="mb-10 text-4xl uppercase sm:text-5xl md:text-7xl lg:mb-[5.8125rem] 2xl:text-8xl">
               aho restaurant
            </h1>
            <div className="mb-10 space-y-10 text-xl lg:mb-[4.5625rem] 2xl:text-2xl">
               <div className="space-y-6">
                  <p className="text-[#676768]">Дата проведения:</p>
                  <time dateTime="2024-09-05" className="block">
                     5 Сентября, 2024
                  </time>
               </div>
               <div className="space-y-6">
                  <p className="text-[#676768]">Анонс:</p>
                  <p>
                     Улица Ленина, дом 123, квартира 45 Москва, Россия, 101000
                  </p>
               </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-[3.3125rem] gap-y-6">
               <span className="text-xl 2xl:text-2xl">Поделиться</span>
               <div className="flex items-center gap-x-6">
                  <IconButton icon={Forward} />
                  <IconButton icon={Download} />
               </div>
            </div>
         </div>
         <div>
            <div className="relative">
               <Image
                  src="/anoncesPage/aho/01.jpeg"
                  width={855}
                  height={702}
                  alt="aho"
                  className="aspect-[855/702] size-full rounded-[1.25rem]"
               />
               <p className="absolute left-5 top-8 rounded-[1.25rem] bg-[#212020]/[.7] px-10 py-[.4375rem] text-white sm:left-9 sm:top-[50px] sm:px-[5.25rem] sm:text-2xl">
                  Астана
               </p>
            </div>
         </div>
      </div>
   );
}
