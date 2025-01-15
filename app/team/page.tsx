import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Team from "./Team";

export default function page() {
   return (
      <div className="wrapper">
         <Header />
         <main>
            <Hero imageSrc="/staff/hero-bg.jpg" className="" />
            <Team />
         </main>
         <Footer />
      </div>
   );
}
