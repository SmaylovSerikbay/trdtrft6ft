import { type Theme } from "next-themes";

declare module "next-themes" {
  interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
    attribute?: string;
    value?: { [themeName: string]: string };
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
  }
} 