"use client";

import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export default function Search() {
   const [isSearchOpen, setIsSearchOpen] = useState(false);
   const searchRef = useRef<HTMLInputElement>(null!);

   useEffect(() => {
      if (isSearchOpen) searchRef.current.focus();
   }, [isSearchOpen]);

   return isSearchOpen ? (
      <div
         className={cn("relative z-[2] lg:w-64", {
            "max-sm:fixed max-sm:left-0 max-sm:top-[6.25rem] max-sm:w-full":
               isSearchOpen,
         })}
      >
         <Input
            onBlur={() => setIsSearchOpen(false)}
            ref={searchRef}
            placeholder="Введите запрос"
            type="search"
            className="rounded-[.3125rem] border-none bg-[#d9d9d9] py-3 pl-7 pr-[3.125rem] text-black placeholder:text-[#8b8585]"
         />
         <button
            type="submit"
            className="absolute inset-y-0 end-0 flex h-full w-[3.125rem] items-center justify-center rounded-e-[.3125rem] text-black ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
         >
            <SearchIcon />
         </button>
      </div>
   ) : (
      <button
         type="submit"
         onClick={() => setIsSearchOpen((s) => !s)}
         className="z-[2] inline-flex size-[3.125rem] items-center justify-center rounded-[1.25rem] bg-[#E8E8E8] dark:bg-[#373737] max-md:size-10 max-md:rounded-2xl"
      >
         <SearchIcon size={25} aria-hidden="true" />
      </button>
   );
}
