"use client";

import { Camera, Download, Forward } from "lucide-react";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import IconButton from "@/components/ui/IconButton";
import { formatDate } from "@/utils/helpers";
import { formatDateTime } from "@/utils/helpers";

interface ContentHeaderProps {
   title: string;
   downloadLink: string;
   created: Date;
}

export default function ContentHeader({
   title,
   downloadLink,
   created,
}: ContentHeaderProps) {
   return (
      <>
         <Breadcrumb className="mb-5 sm:mb-10">
            <BreadcrumbList className="uppercase text-black sm:text-base dark:text-white">
               <BreadcrumbItem>
                  <BreadcrumbLink
                     href="/"
                     className="font-bold hover:underline"
                  >
                     главная страница
                  </BreadcrumbLink>
               </BreadcrumbItem>
               <BreadcrumbSeparator>/</BreadcrumbSeparator>
               <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold">{title}</BreadcrumbPage>
               </BreadcrumbItem>
            </BreadcrumbList>
         </Breadcrumb>
         <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-16 min-[830px]:flex-row lg:mb-24 lg:items-center">
            <div>
               <h1 className="mb-[.625rem] text-3xl font-bold uppercase sm:text-4xl lg:text-5xl">
                  {title}
               </h1>
               <p className="text-lg capitalize lg:text-xl">
                  <time dateTime={formatDateTime(created)}>
                     {formatDate(created)}
                  </time>
                  , Астана
               </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-5 lg:gap-x-[4.375rem]">
               <div className="flex items-center gap-x-[1.375rem]">
                  <Camera className="size-11 lg:size-[3.4375rem]" />
                  <p className="text-lg font-bold uppercase lg:text-xl">
                     фотограф <br /> иванович иван
                  </p>
               </div>
               <div className="flex items-center gap-6">
                  <IconButton
                     icon={Forward}
                     iconClassName="size-8 lg:size-10"
                     className="size-14 lg:size-[4.375rem]"
                  />
                  <IconButton
                     icon={Download}
                     iconClassName="size-8 lg:size-10"
                     className="size-14 lg:size-[4.375rem]"
                     href={downloadLink}
                  />
               </div>
            </div>
         </div>
      </>
   );
}
