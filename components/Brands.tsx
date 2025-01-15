"use client";

import { Brand } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { useTheme } from "./theme-provider";
import { ImageWithFallback } from "./ui/ImageWithFallback";

const Logo: React.FC = () => {
   const { theme } = useTheme();
   const logoSrc = theme !== "dark" 
     ? "/brands/location-logo.png" 
     : "/brands/location-logo-white.png";

   return (
      <ImageWithFallback
         src={logoSrc}
         fallbackSrc="/brands/location-logo.png"
         alt="location"
         width={16}
         height={16}
         className="w-4 h-4"
      />
   );
};

const VenuesBlock: React.FC<{ brands: Brand[] }> = ({ brands = [] }) => {
   return (
      <section className="venues-section">
         <h2 className="venues-title">ЗАВЕДЕНИЯ</h2>
         <div className="venues-grid">
            {brands?.map((brand) => (
               <Link 
                  key={brand.id}
                  href={brand.slug ? `/${brand.slug}` : '#'}
                  className="venue-card group"
               >
                  <div className="venue-content">
                     <div className="venue-image">
                        <ImageWithFallback
                           src={getImageUrl(brand.mainImage || brand.heroImage)}
                           fallbackSrc="/images/placeholder.jpg"
                           alt={(brand as Brand).name}
                           className="w-full h-full object-cover"
                           fill
                        />
                     </div>
                     <div className="venue-info">
                        <h3 className="venue-title">
                           {(brand as Brand).name}
                        </h3>
                        <div className="venue-location">
                           <Logo />
                           <p className="venue-address">
                              {(brand as Brand).address || 'Адрес уточняется'}
                           </p>
                        </div>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </section>
   );
};

// Функция для получения корректного URL изображения
const getImageUrl = (path: string | null): string => {
  if (!path) return '/images/placeholder.jpg';
  
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  if (path.startsWith('/')) {
    return path;
  }

  if (path.includes('uploads/uploads/')) {
    return `/${path.replace('uploads/uploads/', 'uploads/')}`;
  }
  
  return `/uploads/${path}`;
};

export default VenuesBlock;
