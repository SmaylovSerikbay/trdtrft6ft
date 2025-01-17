import { Providers } from "@/components/providers";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { aeroport } from "@/lib/fonts";
import "@/styles/styles.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
   title: "Holy Melon",
   description: "Holy Melon Admin Panel",
   referrer: "no-referrer-when-downgrade"
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={aeroport.className}>
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
            >
               <SessionProvider>
                  <Providers>
                     {children}
                     <Toaster position="top-center" />
                  </Providers>
               </SessionProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}
