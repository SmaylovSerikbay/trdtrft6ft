import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { BrandForm } from "../components/BrandForm";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { brandId: string };
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Управление брендом'
  };
}

async function getBrand(id: string | null) {
  if (!id || id === 'new') return null;

  try {
    const dbBrand = await prisma.brand.findUnique({
      where: { id }
    });

    if (!dbBrand) return null;

    // Функция для безопасного парсинга JSON
    const safeParseJSON = <T,>(data: any, defaultValue: T): T => {
      if (!data) return defaultValue;
      try {
        return typeof data === 'string' ? JSON.parse(data) : data;
      } catch {
        return defaultValue;
      }
    };

    return {
      ...dbBrand,
      workingHours: safeParseJSON(dbBrand.workingHours, { weekdays: "", weekends: "" }),
      mainGallery: safeParseJSON(dbBrand.mainGallery, []),
      navigationTags: safeParseJSON(dbBrand.navigationTags, []),
      brandHistory: safeParseJSON(dbBrand.brandHistory, { title: "", description: "" }),
      features: safeParseJSON(dbBrand.features, []),
      specialOffers: safeParseJSON(dbBrand.specialOffers, []),
      bottomGallery: safeParseJSON(dbBrand.bottomGallery, [])
    };
  } catch (error) {
    console.error('Error loading brand:', error);
    return null;
  }
}

export default async function Page({ searchParams, params }: PageProps) {
  const id = searchParams?.id as string || params?.brandId;
  const brand = await getBrand(id);

  return <BrandForm initialData={brand} />;
} 