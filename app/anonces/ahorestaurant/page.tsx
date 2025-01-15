import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Anonce from "./Anonce";

export default function page() {
   return (
      <div className="wrapper">
         <Header />
         <main>
            <Hero />
            <section className="pb-[4.375rem] md:pb-28 lg:pb-[8.75rem]">
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
                              анонсы
                           </BreadcrumbPage>
                        </BreadcrumbItem>
                     </BreadcrumbList>
                  </Breadcrumb>
                  <Anonce />
               </div>
            </section>
         </main>
         <Footer />
      </div>
   );
}
