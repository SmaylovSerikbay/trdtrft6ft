import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero-restaurant";
import AhoRestaurant from "@/components/AHO-restaurant";
import "@/styles/styles.css"; // Подключаем глобальный CSS

export default function AHOPage() {
   return (
      <div className="wrapper">
         <Header />
         <main>
            <Hero
               imageSrc="/AHO-restaurant/aho-bg.png"
               title="РЕСТОРАН AHO "
               description="ваш остров вдохновения и вкуса в центре города"
            />
            <AhoRestaurant />
         </main>
         <Footer />
      </div>
   );
}
