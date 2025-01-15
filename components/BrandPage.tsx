"use client";

import { ICONS } from "@/app/admin/brands/constants";
import { Brand } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTheme } from "./theme-provider";

interface BrandPageProps {
  brand: Brand;
}

export default function BrandPage({ brand }: BrandPageProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const { theme } = useTheme();

  // Обновим функцию парсинга JSON
  const safeParseJSON = <T,>(data: any, defaultValue: T): T => {
    if (!data) return defaultValue;
    
    try {
      if (typeof data === 'string') {
        return JSON.parse(data) as T;
      }
      // Если данные уже являются объектом, возвращаем их как есть
      if (typeof data === 'object') {
        return data as T;
      }
      return defaultValue;
    } catch {
      return defaultValue;
    }
  };

  // Парсинг данных
  const mainGallery = safeParseJSON<string[]>(brand.mainGallery, []);
  const bottomGallery = safeParseJSON<string[]>(brand.bottomGallery, []);
  const workingHours = safeParseJSON<{ weekdays: string; weekends: string }>(
    brand.workingHours,
    { weekdays: '', weekends: '' }
  );
  const brandHistory = safeParseJSON<{ title: string; description: string }>(
    brand.brandHistory,
    { title: '', description: '' }
  );
  const features = safeParseJSON<Array<{ title: string; description: string }>>(
    brand.features,
    []
  );
  const specialOffers = safeParseJSON<Array<{ title: string; description: string }>>(
    brand.specialOffers,
    []
  );

  // Функция для получения URL изображения
  const getImageUrl = (path: string | null | undefined): string => {
    if (!path) return '/images/placeholder-hero.jpg';
    // Убираем все лишние uploads из пути
    const cleanPath = path.replace(/^(\/?)uploads\/+/, '');
    return `/uploads/${cleanPath}`;
  };

  return (
    <div className="aho-block bg-white text-black dark:bg-black dark:text-white">
      <div className="breadcrumbs">
        <span>ГЛАВНАЯ СТРАНИЦА</span> / <span>БРЕНДЫ</span> / <span>{brand.name}</span>
      </div>

      <div className="aho-section">
        <div className="aho-top-section">
          <div className="restaurant-info">
            <h1 className="restaurant-title">{brand.name}</h1>
            <p className="restaurant-subtitle">{brand.welcomeText}</p>
            <p className="restaurant-description">{brand.description}</p>

            <div className="restaurant-links">
              {/* Адрес */}
              <div className="restaurant-address">
                <Image
                  src={theme !== "dark" ? ICONS.LOCATION.LIGHT : ICONS.LOCATION.DARK}
                  alt="Location"
                  width={16}
                  height={16}
                  unoptimized
                />
                <span>
                  <a href={brand.mapLink} target="_blank" rel="noopener noreferrer">
                    {brand.address}
                  </a>
                </span>
              </div>

              {/* 2GIS */}
              <div className="restaurant-link">
                <Image
                  src={theme !== "dark" ? ICONS.MAP.LIGHT : ICONS.MAP.DARK}
                  alt="2GIS"
                  width={16}
                  height={16}
                  unoptimized
                />
                <div>
                  <p>МЫ В 2GIS</p>
                  <a href={brand.mapLink} target="_blank" rel="noopener noreferrer">
                    {brand.mapLink}
                  </a>
                </div>
              </div>

              {/* Контакты */}
              <div className="restaurant-contacts">
                <Image
                  src={theme !== "dark" ? ICONS.CONTACTS.LIGHT : ICONS.CONTACTS.DARK}
                  alt="Contacts"
                  width={16}
                  height={16}
                  unoptimized
                />
                <div>
                  <p>Контакты</p>
                  <span>{brand.phone}</span>
                  <a href={`https://wa.me/${brand.whatsapp}`}>Whatsapp</a>
                </div>
              </div>

              {/* Часы работы */}
              <div className="restaurant-hours">
                <Image
                  src={theme !== "dark" ? ICONS.WORK_TIME.LIGHT : ICONS.WORK_TIME.DARK}
                  alt="Working hours"
                  width={16}
                  height={16}
                  unoptimized
                />
                <div>
                  <p>ЧАСЫ РАБОТЫ</p>
                  <div className="work-time">
                    <p>
                      <span>Понедельник - Пятница</span>
                      <span>{workingHours.weekdays || 'Не указано'}</span>
                    </p>
                    <p>
                      <span>Суббота - Воскресенье</span>
                      <span>{workingHours.weekends || 'Не указано'}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Галерея */}
        {mainGallery.length > 0 && (
          <div className="swiper-block">
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
                maxWidth: "777px",
              } as React.CSSProperties}
              spaceBetween={5}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              {mainGallery.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className="relative aspect-video">
                    <Image
                      src={getImageUrl(url)}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={5}
              slidesPerView={5}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {mainGallery.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className="relative aspect-video">
                    <Image
                      src={getImageUrl(url)}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      {/* История бренда */}
      {brandHistory.title && brandHistory.description && (
        <div className="brand-history">
          <h1>{brandHistory.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: brandHistory.description }} />
        </div>
      )}

      {/* Особенности */}
      {features.length > 0 && (
        <section className="features">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Специальные предложения и галерея */}
      <div className="aho-bottom-section">
        {specialOffers.length > 0 && (
          <section className="special-offers">
            <h2>СПЕЦИАЛЬНЫЕ ПРЕДЛОЖЕНИЯ</h2>
            <div className="offers-grid">
              {specialOffers.map((offer, index) => (
                <div key={index} className="offer-item">
                  <h3>{offer.title}</h3>
                  <p>{offer.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {bottomGallery.length > 0 && (
          <section className="gallery">
            {bottomGallery.map((url, index) => (
              <div key={index} className="gallery-item">
                <img src={getImageUrl(url)} alt={`Gallery ${index + 1}`} />
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}