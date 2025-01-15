import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/DatePicker";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";

const anonces = [
   {
      id: crypto.randomUUID(),
      src: "/anoncesPage/01.jpeg",
      href: "/anonces/ahorestaurant",
      width: 567,
      height: 500,
      city: "Астана",
      title: "aho restaurant",
      date: "5 Сентября, 2024",
   },
   {
      id: crypto.randomUUID(),
      src: "/anoncesPage/01.jpeg",
      href: "/anonces/ahorestaurant",
      width: 567,
      height: 500,
      city: "Астана",
      title: "aho restaurant",
      date: "5 Сентября, 2024",
   },
   {
      id: crypto.randomUUID(),
      src: "/anoncesPage/01.jpeg",
      href: "/anonces/ahorestaurant",
      width: 567,
      height: 500,
      city: "Астана",
      title: "aho restaurant",
      date: "5 Сентября, 2024",
   },
   {
      id: crypto.randomUUID(),
      src: "/anoncesPage/01.jpeg",
      href: "/anonces/ahorestaurant",
      width: 567,
      height: 500,
      city: "Астана",
      title: "aho restaurant",
      date: "5 Сентября, 2024",
   },
   {
      id: crypto.randomUUID(),
      src: "/anoncesPage/01.jpeg",
      href: "/anonces/ahorestaurant",
      width: 567,
      height: 500,
      city: "Астана",
      title: "aho restaurant",
      date: "5 Сентября, 2024",
   },
   {
      id: crypto.randomUUID(),
      src: "/anoncesPage/01.jpeg",
      href: "/anonces/ahorestaurant",
      width: 567,
      height: 500,
      city: "Астана",
      title: "aho restaurant",
      date: "5 Сентября, 2024",
   },
];

export default function Anonces() {
   return (
      <>
         <div className="mb-[3.125rem] flex flex-col flex-wrap items-center gap-6 sm:flex-row sm:gap-x-8 md:gap-x-12 lg:gap-x-16 xl:gap-x-[5.3125rem]">
            <DatePicker />
            <Select>
               <SelectTrigger className="rounded-none border-l-0 border-r-0 border-t-0 border-black px-0 text-base font-bold uppercase sm:basis-[15.625rem] md:text-[1.375rem] dark:border-white">
                  <SelectValue placeholder="место" />
               </SelectTrigger>
               <SelectContent>
                  <SelectGroup className="uppercase">
                     <SelectItem
                        className="pl-4 text-sm md:text-2xl"
                        value="aho restaurant"
                     >
                        Ресторан AHO
                     </SelectItem>
                     <SelectItem
                        className="pl-4 text-sm md:text-2xl"
                        value="berezka"
                     >
                        berezka
                     </SelectItem>
                     <SelectItem
                        className="pl-4 text-sm md:text-2xl"
                        value="myata"
                     >
                        мята
                     </SelectItem>
                     <SelectItem
                        className="pl-4 text-sm md:text-2xl"
                        value="bla bla bar"
                     >
                        bla bla bar
                     </SelectItem>
                     <SelectItem
                        className="pl-4 text-sm md:text-2xl"
                        value="shishka"
                     >
                        shishka
                     </SelectItem>
                  </SelectGroup>
               </SelectContent>
            </Select>
            <Select>
               <SelectTrigger className="rounded-none border-l-0 border-r-0 border-t-0 border-black px-0 text-left text-base font-bold uppercase sm:basis-[15.625rem] md:text-[1.375rem] dark:border-white">
                  <SelectValue placeholder="город" />
               </SelectTrigger>
               <SelectContent>
                  <SelectGroup className="uppercase">
                     <SelectItem
                        className="pl-4 text-sm md:text-2xl"
                        value="almaty"
                     >
                        Алматы
                     </SelectItem>
                     <SelectItem
                        className="pl-4 text-sm md:text-2xl"
                        value="astana"
                     >
                        Астана (Нур-Султан)
                     </SelectItem>
                     <SelectItem
                        className="pl-4 text-sm md:text-2xl"
                        value="oskemen"
                     >
                        Усть-Каменогорск (Öskemen)
                     </SelectItem>
                     <SelectItem
                        className="pl-4 text-sm md:text-2xl"
                        value="atyrau"
                     >
                        Атырау
                     </SelectItem>
                     <SelectItem
                        className="pl-4 text-base md:text-2xl"
                        value="shymkent"
                     >
                        Шымкент
                     </SelectItem>
                     <SelectItem
                        className="pl-4 text-base md:text-2xl"
                        value="baku"
                     >
                        Баку (Азербайджан)
                     </SelectItem>
                  </SelectGroup>
               </SelectContent>
            </Select>
            <Select>
               <SelectTrigger className="rounded-none border-l-0 border-r-0 border-t-0 border-black px-0 text-left text-base font-bold uppercase sm:basis-[25rem] md:text-[1.375rem] dark:border-white">
                  <SelectValue placeholder="фотограф" />
               </SelectTrigger>
               <SelectContent>
                  <SelectGroup className="uppercase">
                     <SelectItem
                        className="pl-4 text-sm md:text-2xl"
                        value="Smirnov Pavel Nikolayevich"
                     >
                        Смирнов Павел Николаевич
                     </SelectItem>
                     <SelectItem
                        className="pl-4 text-sm md:text-2xl"
                        value="Kuznetsova Mariya Vladimirovna"
                     >
                        Кузнецова Мария Владимировна
                     </SelectItem>
                     <SelectItem
                        className="pl-4 text-sm md:text-2xl"
                        value="Sokolova Anna Petrovna"
                     >
                        Соколова Анна Петровна
                     </SelectItem>
                     <SelectItem
                        className="pl-4 text-sm md:text-2xl"
                        value="Morozova Ivan Ivanovna"
                     >
                        Морозова Иван Ивановна
                     </SelectItem>
                  </SelectGroup>
               </SelectContent>
            </Select>
         </div>
         <div className="mb-10 grid auto-rows-[250px] grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-5 min-[482px]:grid-cols-[repeat(auto-fit,minmax(450px,1fr))] md:mb-[4.8125rem] lg:auto-rows-[500px]">
            {anonces.map((anonce) => (
               <Link
                  key={anonce.id}
                  href={anonce.href}
                  className="group relative text-white"
               >
                  <Image
                     src={anonce.src}
                     width={anonce.width}
                     height={anonce.height}
                     className="aspect-[567/500] size-full rounded-[1.25rem] object-cover"
                     alt={anonce.title}
                  />
                  <p className="absolute left-5 top-6 rounded-[1.25rem] bg-[#212020]/[.7] px-[1.5625rem] py-[.375rem] text-base backdrop-blur-[56px] 2xl:left-[2.375rem] 2xl:top-10 2xl:text-xl">
                     {anonce.city}
                  </p>
                  <div className="absolute bottom-6 left-5 2xl:left-[2.375rem]">
                     <p className="max-w-[12.8125rem] font-bold uppercase transition-transform group-hover:translate-x-2 xl:text-xl 2xl:text-3xl">
                        {anonce.title}
                     </p>
                     <time
                        dateTime="2024-09-05"
                        className="text-base 2xl:text-xl"
                     >
                        {anonce.date}
                     </time>
                  </div>
               </Link>
            ))}
         </div>
         <div className="mb-6 text-center md:mb-14 lg:mb-24">
            <Button className="h-auto rounded-[3.125rem] border border-[#3D3D3D] bg-[#212020] px-5 py-3 text-lg font-bold text-white md:py-5 md:text-xl lg:px-10 lg:text-2xl xl:px-[3.125rem] dark:hover:bg-neutral-800">
               Показать еще
            </Button>
         </div>
      </>
   );
}
