import BrandPage from "@/components/BrandPage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero-restaurant";
import { getBrandBySlug } from "@/lib/brands";
import "@/styles/styles.css";
import { notFound } from "next/navigation";

export default async function BrandRoute({
  params,
}: {
  params: { brandSlug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const brandSlug = resolvedParams.brandSlug;

  if (!brandSlug) {
    notFound();
  }

  const brand = await getBrandBySlug(brandSlug);

  if (!brand) {
    return notFound();
  }

  const heroImage = brand.heroImage || '';

  const getHeroImage = (path: string | null): string => {
    if (!path) return '/images/placeholder-hero.jpg';
    if (path.includes('uploads/uploads/')) {
      return `/${path.replace('uploads/uploads/', 'uploads/')}`;
    }
    if (path.startsWith('/')) return path;
    return `/uploads/${path}`;
  };

  return (
    <div className="wrapper">
      <Header />
      <main>
        <Hero
          imageSrc={getHeroImage(heroImage)}
          title={brand.name?.toUpperCase()}
          description={brand.description?.toLowerCase()}
        />
        <BrandPage brand={brand} />
      </main>
      <Footer />
    </div>
  );
} 