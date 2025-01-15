"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";

export function ToggleTheme() {
   const { theme, setTheme } = useTheme();

   return (
      <Button
         variant="icon"
         size="icon"
         className="bg-[#010e2a]/[.92] max-md:size-10 max-md:rounded-2xl dark:bg-white"
         onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
         <Sun className="rotate-0 scale-100 text-white transition-all dark:-rotate-90 dark:scale-0" />
         <Moon className="absolute rotate-90 scale-0 text-black transition-all dark:rotate-0 dark:scale-100" />
         <span className="sr-only">Toggle theme</span>
      </Button>
   );
}
