import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const socials = [
   {
      name: "facebook",
      url: "https://www.facebook.com/",
      icon: "/social/facebook.svg",
   },
   {
      name: "twitter",
      url: "https://x.com/home",
      icon: "/social/twitter.svg",
   },
   {
      name: "linkedin",
      url: "https://www.linkedin.com/feed/",
      icon: "/social/linkedin.svg",
   },
];

export default function Footer() {
   return (
      <footer className="border-t border-black py-5 text-base sm:text-lg">
         <div className="container flex max-w-[1596px] flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-[10px] text-center sm:flex-row sm:flex-wrap">
               <Link href="/" className="text-sm hover:underline sm:text-base">
                  Условия использования
               </Link>
               <Separator
                  orientation="vertical"
                  className="hidden h-[27px] bg-black sm:block"
               />
               <Link href="/" className="text-sm hover:underline sm:text-base">
                  Политика конфиденциальности
               </Link>
            </div>
            <Social />
            <p className="flex flex-1 justify-end text-center text-sm sm:text-base">
               &copy; {new Date().getFullYear()} Holy Melon. Все права защищены.
            </p>
         </div>
      </footer>
   );
}

function Social() {
   return (
      <ul className="flex items-center gap-[10px] rounded-full border border-[#142535] bg-[#142535]/[.93] p-[10px]">
         {socials.map((social) => (
            <li key={social.name}>
               <a
                  href={social.url}
                  target="_blank"
                  className="inline-flex size-9 items-center justify-center rounded-full bg-[#142535] sm:size-10"
               >
                  <Image
                     src={social.icon}
                     width={20}
                     height={20}
                     alt={social.name}
                  />
               </a>
            </li>
         ))}
      </ul>
   );
}
