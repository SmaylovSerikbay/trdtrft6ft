import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reports from "./Reports";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

export default function page() {
   return (
      <div className="wrapper">
         <Header />
         <main>
            <section className="pt-5 md:pt-[6.125rem]">
               <div className="container">
                  <Breadcrumb className="mb-10 sm:mb-[3.5625rem]">
                     <BreadcrumbList className="uppercase text-black sm:text-base dark:text-white">
                        <BreadcrumbItem>
                           <BreadcrumbLink
                              href="/"
                              className="font-bold hover:underline"
                           >
                              главная страница
                           </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        <BreadcrumbItem>
                           <BreadcrumbPage className="font-bold">
                              Фото и видео
                           </BreadcrumbPage>
                        </BreadcrumbItem>
                     </BreadcrumbList>
                  </Breadcrumb>
                  <h1 className="mb-4 text-2xl font-bold uppercase sm:mb-[2.125rem] sm:text-5xl">
                     репортажи
                  </h1>
                  <Separator className="mb-5 bg-black sm:mb-16" />
                  <Reports />
               </div>
            </section>
         </main>
         <Footer />
      </div>
   );
}
