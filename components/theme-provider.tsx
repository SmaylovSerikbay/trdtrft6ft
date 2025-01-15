"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// Экспортируем useTheme из next-themes для использования во всем приложении
export { useTheme } from "next-themes";

