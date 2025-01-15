import RecentEvents from "@/app/RecentEvents";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { prisma } from "@/lib/prisma";
import Anonces from "./Anonces";
import OurBrands from "./OurBrands";

async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return brands;
  } catch (error) {
    console.error('Error loading brands:', error);
    return [];
  }
}

export default async function Home() {
  const heroSection = await prisma.heroSection.findFirst({
    where: { page: "home" },
  });
  const brands = await getBrands();

  return (
    <div className="wrapper">
      <Header />
      <main>
        <Hero 
          imageSrc={heroSection?.image || "/hero/hero-bg.jpg"}
          brightness={heroSection?.brightness}
        />
        <RecentEvents />
        <OurBrands brands={brands} />
        <Anonces />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}
