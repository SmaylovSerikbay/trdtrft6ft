import BrandPage from "@/components/BrandPage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero-restaurant";
import { getBrandBySlug } from "@/lib/brands";
import "@/styles/styles.css";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ brandSlug: string }>;
}

export default async function BrandRoute({ params }: PageProps) {
  const resolvedParams = await params;
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
          title={brand.name || ''}
          description={brand.description || ''}
        />
        <BrandPage brand={brand} />
      </main>
      <Footer />
    </div>
  );
} 