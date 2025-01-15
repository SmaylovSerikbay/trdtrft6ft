"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PhotoReport {
   id: string;
   title: string;
   city: string;
   venue: string;
   photographer: string;
   preview: string;
   publishedAt: Date;
}

export default function Reports() {
   const [reports, setReports] = useState<PhotoReport[]>([]);
   const [visibleImages] = useState(6);
   const [pages, setPages] = useState(1);
   const [isLoading, setIsLoading] = useState(false);
   const [selectedCity, setSelectedCity] = useState<string>("");
   const [selectedVenue, setSelectedVenue] = useState<string>("");
   const [selectedPhotographer, setSelectedPhotographer] = useState<string>("");
   const [isRangeMode, setIsRangeMode] = useState(false);
   const [dateRange, setDateRange] = useState<{
      from: Date | undefined;
      to: Date | undefined;
   }>({
      from: undefined,
      to: undefined,
   });

   // Получаем уникальные значения из данных
   const uniqueCities = Array.from(new Set(reports.map(r => r.city))).sort();
   const uniqueVenues = Array.from(new Set(reports.map(r => r.venue))).sort();
   const uniquePhotographers = Array.from(new Set(reports.map(r => r.photographer))).sort();

   const endVisibleImages = pages * visibleImages;

   function handleLoadMore() {
      setPages((prev) => prev + 1);
   }

   function handleReset() {
      setSelectedCity("");
      setSelectedVenue("");
      setSelectedPhotographer("");
      setDateRange({ from: undefined, to: undefined });
      setIsRangeMode(false);
      setPages(1);
   }

   useEffect(() => {
      async function fetchReports() {
         try {
            setIsLoading(true);
            const response = await fetch('/api/reports');
            if (!response.ok) throw new Error('Failed to fetch reports');
            const data = await response.json();
            setReports(data);
         } catch (error) {
            console.error('Error fetching reports:', error);
         } finally {
            setIsLoading(false);
         }
      }

      fetchReports();
   }, []);

   // Обновляем useEffect для сброса пагинации
   useEffect(() => {
      setPages(1);
   }, [selectedCity, selectedVenue, selectedPhotographer, dateRange]);

   const filteredReports = reports.filter(report => {
      if (selectedCity && report.city !== selectedCity) return false;
      if (selectedVenue && report.venue !== selectedVenue) return false;
      if (selectedPhotographer && report.photographer !== selectedPhotographer) return false;
      
      if (dateRange.from) {
         const reportDate = new Date(report.publishedAt);
         // Устанавливаем время в 00:00:00 для корректного сравнения дат
         reportDate.setHours(0, 0, 0, 0);
         const fromDate = new Date(dateRange.from);
         fromDate.setHours(0, 0, 0, 0);

         if (isRangeMode && dateRange.to) {
            // Режим диапазона дат
            const toDate = new Date(dateRange.to);
            toDate.setHours(23, 59, 59, 999);
            return reportDate >= fromDate && reportDate <= toDate;
         } else {
            // Режим одной даты
            return reportDate.getTime() === fromDate.getTime();
         }
      }
      
      return true;
   });

   if (isLoading) return <Loader />;

   return (
      <>
         <div className="mb-8 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
               <div className="flex flex-col gap-2">
                  <Popover>
                     <PopoverTrigger asChild>
                        <Button
                           variant="outline"
                           className={cn(
                              "w-[300px] justify-start text-left font-normal rounded-none border-l-0 border-r-0 border-t-0 border-black dark:border-white",
                              !dateRange.from && "text-muted-foreground"
                           )}
                        >
                           <CalendarIcon className="mr-2 h-4 w-4" />
                           {dateRange.from ? (
                              isRangeMode && dateRange.to ? (
                                 <>
                                    {format(dateRange.from, "dd.MM.yyyy", { locale: ru })} -{" "}
                                    {format(dateRange.to, "dd.MM.yyyy", { locale: ru })}
                                 </>
                              ) : (
                                 format(dateRange.from, "dd.MM.yyyy", { locale: ru })
                              )
                           ) : (
                              "Выберите дату"
                           )}
                        </Button>
                     </PopoverTrigger>
                     <PopoverContent className="w-auto p-0" align="start">
                        <div className="p-3 border-b">
                           <div className="flex items-center space-x-2">
                              <Switch
                                 id="range-mode"
                                 checked={isRangeMode}
                                 onCheckedChange={setIsRangeMode}
                              />
                              <Label htmlFor="range-mode">Диапазон дат</Label>
                           </div>
                        </div>
                        <Calendar
                           initialFocus
                           mode={isRangeMode ? "range" : "single"}
                           defaultMonth={dateRange.from}
                           selected={isRangeMode ? {
                              from: dateRange.from,
                              to: dateRange.to,
                           } : dateRange.from}
                           onSelect={(value) => {
                              if (isRangeMode) {
                                 const range = value as { from: Date | undefined; to: Date | undefined };
                                 setDateRange(range || { from: undefined, to: undefined });
                              } else {
                                 const date = value as Date;
                                 setDateRange({ from: date, to: undefined });
                              }
                           }}
                           numberOfMonths={isRangeMode ? 2 : 1}
                           locale={ru}
                        />
                     </PopoverContent>
                  </Popover>
               </div>

               <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-[240px] rounded-none border-l-0 border-r-0 border-t-0 border-black dark:border-white">
                     <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectGroup>
                        {uniqueCities.map((city) => (
                           <SelectItem 
                              key={city} 
                              value={city}
                              className="text-base uppercase"
                           >
                              {city}
                           </SelectItem>
                        ))}
                     </SelectGroup>
                  </SelectContent>
               </Select>

               <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                  <SelectTrigger className="w-[240px] rounded-none border-l-0 border-r-0 border-t-0 border-black dark:border-white">
                     <SelectValue placeholder="Выберите заведение" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectGroup>
                        {uniqueVenues.map((venue) => (
                           <SelectItem 
                              key={venue} 
                              value={venue}
                              className="text-base uppercase"
                           >
                              {venue}
                           </SelectItem>
                        ))}
                     </SelectGroup>
                  </SelectContent>
               </Select>

               <Select value={selectedPhotographer} onValueChange={setSelectedPhotographer}>
                  <SelectTrigger className="w-[240px] rounded-none border-l-0 border-r-0 border-t-0 border-black dark:border-white">
                     <SelectValue placeholder="Выберите фотографа" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectGroup>
                        {uniquePhotographers.map((photographer) => (
                           <SelectItem 
                              key={photographer} 
                              value={photographer}
                              className="text-base"
                           >
                              {photographer}
                           </SelectItem>
                        ))}
                     </SelectGroup>
                  </SelectContent>
               </Select>

               {(selectedCity || selectedVenue || selectedPhotographer || dateRange.from || dateRange.to) && (
                  <Button 
                     variant="outline"
                     onClick={handleReset}
                     className="ml-auto rounded-none border-l-0 border-r-0 border-t-0 border-black dark:border-white"
                  >
                     Сбросить фильтры
                  </Button>
               )}
            </div>

            {filteredReports.length === 0 && (
               <div className="text-center text-muted-foreground">
                  Репортажи не найдены
               </div>
            )}
         </div>

         <div className="mb-14 grid auto-rows-[300px] grid-cols-3 gap-5 min-[480px]:grid-cols-6 sm:mb-16 md:mb-20 md:auto-rows-[500px] lg:mb-28 lg:grid-cols-9 xl:mb-[8.4375rem] xl:grid-cols-12">
            {filteredReports
               .slice(0, endVisibleImages)
               .map((report) => (
                  <Link
                     key={report.id}
                     href={`/reports/${report.id}`}
                     className="group relative col-span-3 text-white"
                  >
                     <img
                        src={report.preview}
                        width={420}
                        height={500}
                        className="size-full rounded-[1.25rem] object-cover brightness-50"
                        alt={report.title}
                     />
                     <p className="absolute left-5 top-6 rounded-[1.25rem] bg-[#212020]/[.7] px-[1.5625rem] py-[.375rem] text-base backdrop-blur-[56px] 2xl:left-[2.375rem] 2xl:top-10 2xl:text-xl">
                        {report.city}
                     </p>
                     <div className="absolute bottom-6 left-5 2xl:left-[2.375rem]">
                        <p className="max-w-[12.8125rem] font-bold uppercase transition-transform group-hover:translate-x-2 xl:text-xl 2xl:text-3xl">
                           {report.title}
                        </p>
                        <time className="text-base 2xl:text-xl">
                           {format(new Date(report.publishedAt), "dd MMMM yyyy", { locale: ru })}
                        </time>
                     </div>
                  </Link>
               ))}
         </div>

         {endVisibleImages < filteredReports.length && (
            <div className="mb-28 text-center">
               <Button
                  onClick={handleLoadMore}
                  className="h-auto rounded-[3.125rem] border border-[#3D3D3D] bg-[#212020] px-7 py-4 text-lg font-bold md:py-5 md:text-xl lg:px-10 lg:text-2xl xl:px-[3.125rem] dark:text-white dark:hover:bg-neutral-800"
               >
                  Загрузить еще
               </Button>
            </div>
         )}
      </>
   );
}
