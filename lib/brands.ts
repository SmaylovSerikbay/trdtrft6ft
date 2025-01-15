import { prisma } from "./prisma";

export async function getBrandBySlug(slug: string | undefined) {
  if (!slug) return null;
  
  try {
    const brand = await prisma.brand.findUnique({
      where: {
        slug: slug.toLowerCase()
      }
    });

    if (!brand) return null;

    // Проверяем и парсим JSON поля
    return {
      ...brand,
      // Рабочие часы
      workingHours: typeof brand.workingHours === 'string'
        ? JSON.parse(brand.workingHours)
        : brand.workingHours || { weekdays: '', weekends: '' },
      
      // Галереи
      mainGallery: typeof brand.mainGallery === 'string'
        ? JSON.parse(brand.mainGallery)
        : brand.mainGallery || [],
      bottomGallery: typeof brand.bottomGallery === 'string'
        ? JSON.parse(brand.bottomGallery)
        : brand.bottomGallery || [],
      
      // Навигационные теги
      navigationTags: typeof brand.navigationTags === 'string'
        ? JSON.parse(brand.navigationTags)
        : brand.navigationTags || [],
      
      // История бренда
      brandHistory: typeof brand.brandHistory === 'string'
        ? JSON.parse(brand.brandHistory)
        : brand.brandHistory || { title: '', description: '' },
      
      // Особенности и предложения
      features: typeof brand.features === 'string'
        ? JSON.parse(brand.features)
        : brand.features || [],
      specialOffers: typeof brand.specialOffers === 'string'
        ? JSON.parse(brand.specialOffers)
        : brand.specialOffers || []
    };
  } catch (error) {
    console.error("[GET_BRAND_BY_SLUG]", error);
    return null;
  }
} 