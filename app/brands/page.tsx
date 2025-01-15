import Brands from "@/components/Brands";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroBrands from "@/components/Hero-brands";
import { prisma } from "@/lib/prisma";

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

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="wrapper">
      <Header />
      <main>
        <HeroBrands />
        <Brands brands={brands} />
      </main>
      <Footer />
    </div>
  );
}
