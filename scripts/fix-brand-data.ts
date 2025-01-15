import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixBrandData() {
  try {
    const brands = await prisma.brand.findMany();

    for (const brand of brands) {
      console.log(`\nFixing brand: ${brand.name}`);

      // Исправляем каждое JSON поле
      const fixedData = {
        mainGallery: ensureValidJSON(brand.mainGallery, []),
        bottomGallery: ensureValidJSON(brand.bottomGallery, []),
        workingHours: ensureValidJSON(brand.workingHours, { weekdays: '', weekends: '' }),
        navigationTags: ensureValidJSON(brand.navigationTags, []),
        brandHistory: ensureValidJSON(brand.brandHistory, { title: '', description: '' }),
        features: ensureValidJSON(brand.features, []),
        specialOffers: ensureValidJSON(brand.specialOffers, [])
      };

      // Обновляем данные в базе
      await prisma.brand.update({
        where: { id: brand.id },
        data: {
          ...brand,
          ...fixedData
        }
      });

      console.log('Fixed data:', fixedData);
    }

    console.log('\nAll brands have been fixed!');
  } catch (error) {
    console.error('Error fixing data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

function ensureValidJSON(value: any, defaultValue: any): string {
  if (!value) return JSON.stringify(defaultValue);
  
  if (typeof value === 'string') {
    try {
      JSON.parse(value);
      return value;
    } catch {
      return JSON.stringify(defaultValue);
    }
  }
  
  return JSON.stringify(value || defaultValue);
}

fixBrandData()
  .catch(console.error)
  .finally(() => process.exit(0)); 