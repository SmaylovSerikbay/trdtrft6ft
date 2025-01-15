"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useTheme } from "./theme-provider";

const AHOrestaurant: React.FC = () => {
   const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
   const { theme } = useTheme();

   const features = [
      {
         title: "ЯРКИЕ ВЫХОДНЫЕ С SANDWAVE PARTIES",
         description:
            "Каждую субботу и воскресенье наши шоу-программы переносят гостей в мир музыки и танцев.",
      },
      {
         title: "VIP-ЗОНА ДЛЯ УЕДИНЕННОГО ОТДЫХА",
         description:
            "Уютная комната до 25 человек идеально подходит для особых встреч.",
      },
      {
         title: "РАЗНООБРАЗНОЕ МЕНЮ",
         description:
            "Обширное барное и основное меню, дополненное специальными предложениями.",
      },
      {
         title: "ДЫМНЫЕ КОКТЕЙЛИ SPECIALS",
         description: "Эксклюзивные сочетания вкусов для истинных ценителей.",
      },
   ];

   const specialOffers = [
      {
         title: "HOOKAH SPECIAL",
         description:
            "Дымная чаша + комплимент от кухни и бара всего за 6000 тенге.",
      },
      {
         title: "SPECIAL OFFER",
         description: "Скидка 20% на все блюда из меню.",
      },
      {
         title: "CELEBRATE WITH ANO",
         description:
            "В день рождения вас ждет скидка 15% и комплимент от кухни.",
      },
      {
         title: "МАЛЬЧИШНИК И ДЕВИЧНИК",
         description: "Скидка 10% на весь чек + поздравление от команды АНО.",
      },
      {
         title: "WINE DOWN THURSDAY",
         description: "Каждый четверг наслаждайтесь скидкой 20% на вино.",
      },
      {
         title: "SAVOR THE MOMENT",
         description: "Каждую среду второй коктейль в подарок.",
      },
   ];

   return (
      <>
         <div className="aho-block bg-white text-black dark:bg-black dark:text-white">
            <div className="breadcrumbs">
               <span>ГЛАВНАЯ СТРАНИЦА</span> / <span>БРЕНДЫ</span> /{" "}
               <span>АНО</span>
            </div>

            <div className="aho-section">
               <div className="aho-top-section">
                  <div className="restaurant-info">
                     {/* Звёздочки */}
                     <div className="category-stars">
                        <img src="/AHO-restaurant/5-stars.png" alt="5 stars" />
                     </div>

                     {/* Заголовок */}
                     <h1 className="restaurant-title">РЕСТОРАН АНО</h1>
                     <p className="restaurant-subtitle">
                        ВАШ ОСТРОВ ВДОХНОВЕНИЯ И ВКУСА В ЦЕНТРЕ ГОРОДА
                     </p>

                     {/* Описание */}
                     <p className="restaurant-description">
                        Добро пожаловать в АНО, место, где культурные мотивы,
                        пряные ароматы и завораживающие ритмы афро-хауса
                        сливаются воедино, создавая уникальную атмосферу отдыха
                        и наслаждения.
                     </p>

                     {/* Адрес */}
                     <div className="restaurant-links">
                        <div className="restaurant-address">
                           <img
                              src={
                                 theme !== "dark"
                                    ? "/AHO-restaurant/location.png"
                                    : "/brands/location-logo-white.png"
                              }
                              alt="Location"
                           />
                           <span>
                              {" "}
                              <a href="https://2gis.kz/astana/geo/70030076493117994">
                                 УЛИЦА АКМЕШИТ 1А, АСТАНА, КАЗАХСТАН
                              </a>
                           </span>
                        </div>

                        {/* 2GIS */}
                        <div className="restaurant-link">
                           <img
                              src={
                                 theme !== "dark"
                                    ? "/AHO-restaurant/2gis-location.png"
                                    : "/AHO-restaurant/2gis-location-white.png"
                              }
                              alt="2GIS"
                           />
                           <div>
                              <p>МЫ В 2GIS </p>
                              <a
                                 href="https://2gis.kz/astana/firm/70000001089234583?m=71.424314%2C51.121191%2F16"
                                 target="_blank"
                                 rel="noopener noreferrer"
                              >
                                 https://2gis.kz/astana/firm/70000001089234583?m=71.424314%2C51.121191%2F16
                              </a>
                           </div>
                        </div>

                        {/* Контакты */}
                        <div className="restaurant-contacts">
                           <img
                              src={
                                 theme !== "dark"
                                    ? "/AHO-restaurant/contacts.png"
                                    : "/AHO-restaurant/contacts-white.png"
                              }
                              alt="Contacts"
                           />
                           <div>
                              <p>Контакты</p>
                              <span>+7 777 899 99 99</span>
                              <a href="https://wa.me/77080809999?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9F%D0%B8%D1%88%D1%83%20%D0%B8%D0%B7%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%202%D0%93%D0%98%D0%A1">
                                 Whatsapp
                              </a>
                           </div>
                        </div>

                        {/* Часы работы */}
                        <div className="restaurant-hours">
                           <img
                              src={
                                 theme !== "dark"
                                    ? "/AHO-restaurant/work-time.png"
                                    : "/AHO-restaurant/work-time-white.png"
                              }
                              alt="Working hours"
                           />
                           <div>
                              <p>ЧАСЫ РАБОТЫ</p>

                              <div className="work-time">
                                 <p>
                                    <span>Понедельник - Пятница</span>
                                    <span>12:00-03:00</span>
                                 </p>
                                 <p>
                                    <span>Суббота - Воскресенье</span>
                                    <span>12:00-04:00</span>
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="swiper-block">
                  <Swiper
                     style={
                        {
                           "--swiper-navigation-color": "#fff",
                           "--swiper-pagination-color": "#fff",
                           maxWidth: "777px",
                        } as React.CSSProperties
                     }
                     spaceBetween={5}
                     navigation={true}
                     thumbs={{ swiper: thumbsSwiper }}
                     modules={[FreeMode, Navigation, Thumbs]}
                     className="mySwiper2" // Класс из глобального CSS
                  >
                     <SwiperSlide>
                        <img src="/AHO-restaurant/AHO-1.png" alt="Nature 1" />
                     </SwiperSlide>
                     <SwiperSlide>
                        <img src="/AHO-restaurant/AHO-2.png" alt="Nature 2" />
                     </SwiperSlide>
                     <SwiperSlide>
                        <img src="/AHO-restaurant/AHO-3.png" alt="Nature 3" />
                     </SwiperSlide>
                     <SwiperSlide>
                        <img src="/AHO-restaurant/AHO-4.png" alt="Nature 4" />
                     </SwiperSlide>
                     <SwiperSlide>
                        <img src="/AHO-restaurant/AHO-5.png" alt="Nature 5" />
                     </SwiperSlide>
                  </Swiper>
                  <Swiper
                     onSwiper={setThumbsSwiper}
                     spaceBetween={5}
                     slidesPerView={5}
                     freeMode={true}
                     watchSlidesProgress={true}
                     modules={[FreeMode, Navigation, Thumbs]}
                     className="mySwiper" // Класс из глобального CSS
                  >
                     <SwiperSlide>
                        <img src="/AHO-restaurant/AHO-1.png" alt="Nature 1" />
                     </SwiperSlide>
                     <SwiperSlide>
                        <img src="/AHO-restaurant/AHO-2.png" alt="Nature 2" />
                     </SwiperSlide>
                     <SwiperSlide>
                        <img src="/AHO-restaurant/AHO-3.png" alt="Nature 3" />
                     </SwiperSlide>
                     <SwiperSlide>
                        <img src="/AHO-restaurant/AHO-4.png" alt="Nature 4" />
                     </SwiperSlide>
                     <SwiperSlide>
                        <img src="/AHO-restaurant/AHO-5.png" alt="Nature 5" />
                     </SwiperSlide>
                  </Swiper>
               </div>
            </div>
            <div className="brand-history">
               <h1>BRAND HISTORY</h1>
               <p>
                  Путники, отыскавшие оазис жизни – АНО, поведали нам, что в
                  пустыне, когда ночь окутывает мир своим темным покрывалом,
                  звезды начинают свой величественный танец, рассеяв свет по
                  бескрайним пескам.
               </p>
               <p>
                  Лишь те, кто смотрит на них с открытым сердцем, способны
                  увидеть магическую связь звезд с человеческой душой. Эти
                  небесные проводники помогают раскрыть наше истинное «я»,
                  превращая ночь в пустыне во вселенную бесконечных
                  возможностей, которая открывается тем, кто осмелится войти в
                  нее.
               </p>
               <p>
                  Noor Al Sahara by АНО приглашает вас следовать за этими
                  путеводными звездами и открыть свет, который скрыт в каждом из
                  вас.
               </p>
               <p>
                  Эта ночь развернется в двух главах – время поиска и время
                  открытия. Каждый момент будет отражать ритм звезд в их
                  космическом танце, а каждый гость почувствует себя частью
                  бескрайнего космоса, который зовет открыть и познать себя.
               </p>
            </div>

            <div className="container">
               {/* Основные блоки */}
               <section className="features">
                  {features.map((feature, index) => (
                     <div
                        key={index}
                        className="feature-item"
                        style={{
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           gap: "14px",
                           textAlign: "center",
                        }}
                     >
                        <div style={{ fontSize: "30px" }}></div>
                        <div>
                           <h3>{feature.title}</h3>
                           <p>{feature.description}</p>
                        </div>
                     </div>
                  ))}
               </section>

               <div className="aho-bottom-section">
                  <section className="special-offers">
                     <h2>СПЕЦИАЛЬНЫЕ ПРЕДЛОЖЕНИЯ В АНО!</h2>
                     {specialOffers.map((offer, index) => (
                        <div key={index} className="offer-item">
                           <h3>{offer.title}</h3>
                           <p>{offer.description}</p>
                        </div>
                     ))}
                  </section>

                  {/* Галерея */}
                  <section className="gallery">
                     <div className="gallery-item large">
                        <img
                           src="/AHO-restaurant/bottom-img-1.png"
                           alt="Большое изображение"
                        />
                     </div>
                     <div className="gallery-item small">
                        <img
                           src="/AHO-restaurant/bottom-img-2.png"
                           alt="Маленькое изображение 1"
                        />
                     </div>
                     <div className="gallery-item small">
                        <img
                           src="/AHO-restaurant/bottom-img-3.png"
                           alt="Маленькое изображение 2"
                        />
                     </div>
                  </section>
               </div>

               {/* Специальные предложения */}
            </div>
         </div>
      </>
   );
};

export default AHOrestaurant;
