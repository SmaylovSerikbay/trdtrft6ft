"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import decor from "/public/about-us/decor/01.svg";
import decorDark from "/public/about-us/decor/decor-dark.svg";

interface AboutData {
  title: string;
  description: string;
  email: string;
  gisLink: string;
  instagramLink: string;
  logo: string;
  logoDark: string;
}

export default function AboutUs() {
  const { theme } = useTheme();
  const [aboutData, setAboutData] = useState<AboutData>({
    title: "о нас",
    description: "Cтремление всей жизни запечатлеть необычное в обычном, заморозить мимолетные моменты времени и поделиться красотой мира, какой мы все видим. Вдохновление в каждом уголке в этой разнообразной истории.",
    email: "holymelonmanagementgroup@gmail.com",
    gisLink: "https://2gis.ru/",
    instagramLink: "https://www.instagram.com/holymelon.mgmt/#",
    logo: "/about-us/logo.png",
    logoDark: "/about-us/logo-dark.png"
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/content/about");
      const data = await response.json();
      if (data) {
        setAboutData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="about" className="pb-11 pt-[2.375rem] sm:pb-[5.625rem] sm:pt-[4.75rem] md:pb-28 lg:pb-32 xl:pb-40 2xl:pb-[11.25rem]">
      <div className="container">
        <div className="mb-4 border-b border-black font-bold uppercase sm:mb-9 md:mb-12 dark:border-white">
          <div className="mb-1 text-sm leading-[135%] sm:text-xl">
            {aboutData.title}
          </div>
          <h2 className="text-2xl leading-[137.931034%] sm:text-3xl md:text-4xl lg:text-5xl">
            наша компания
          </h2>
        </div>
        <div className="flex flex-col-reverse items-center justify-between gap-y-9 max-sm:text-base max-[480px]:text-sm lg:gap-x-10 xl:flex-row xl:gap-x-16 2xl:gap-x-[5.3125rem]">
          <div className="xl:basis-[703px]">
            <p className="mb-8 text-base sm:mb-14 md:mb-[4.625rem]">
              {aboutData.description}
            </p>
            <div className="mb-4 flex items-center gap-[10px] sm:mb-7 md:mb-10">
              {theme !== "dark" ? (
                <Image
                  src={decor}
                  alt="декор"
                  className="size-7 sm:size-10"
                />
              ) : (
                <Image
                  src={decorDark}
                  alt="декор"
                  className="size-7 sm:size-10"
                />
              )}
              <p className="text-xl sm:text-2xl">Контакты</p>
            </div>
            <address className="not-italic">
              <p className="text-xl">Почта</p>
              <a
                href={`mailto:${aboutData.email}`}
                className="mb-8 inline-block text-base hover:underline"
              >
                {aboutData.email}
              </a>
              <div className="flex flex-wrap items-center gap-7 xl:gap-x-10 2xl:gap-x-[5.6875rem]">
                <div className="flex items-start gap-x-3">
                  <Image
                    src="/about-us/icons/tiktok.png"
                    width={30}
                    height={30}
                    className="size-[1.875rem]"
                    alt="2GIS"
                  />
                  <div>
                    <p className="text-base">Мы в Tik-tok</p>
                    <a
                      href={aboutData.gisLink}
                      target="_blank"
                      className="text-base underline hover:no-underline"
                    >
                      {aboutData.gisLink}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-x-3">
                  <Image
                    src="/about-us/icons/instagram.png"
                    width={30}
                    height={30}
                    className="size-[1.875rem]"
                    alt="instagram"
                  />
                  <div>
                    <p className="text-base">Мы в INSTAGRAM</p>
                    <a
                      href={aboutData.instagramLink}
                      target="_blank"
                      className="text-base underline hover:no-underline"
                    >
                      @holymelon.mgmt
                    </a>
                  </div>
                </div>
              </div>
            </address>
          </div>
          <div className="flex grow justify-center rounded-[40px] bg-[#fbfbfb] py-5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] max-xl:w-full sm:py-[3.3125rem] xl:min-w-[43.75rem] dark:bg-black dark:shadow-[inset_0_2px_10px_2px_rgba(255,255,255,0.5)]">
            <Image
              src={theme !== "dark" ? aboutData.logo : aboutData.logoDark}
              width={450}
              height={405}
              alt="логотип holy melon"
              className="aspect-[450/405] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
