import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixJsonData() {
  try {
    const brands = await prisma.brand.findMany();

    for (const brand of brands) {
      console.log(`\nChecking brand: ${brand.name}`);

      // Проверяем и исправляем каждое поле
      const mainGallery = parseOrCreate(brand.mainGallery, []);
      const bottomGallery = parseOrCreate(brand.bottomGallery, []);
      const workingHours = parseOrCreate(brand.workingHours, { weekdays: '', weekends: '' });
      const navigationTags = parseOrCreate(brand.navigationTags, []);
      const brandHistory = parseOrCreate(brand.brandHistory, { title: '', description: '' });
      const features = parseOrCreate(brand.features, []);
      const specialOffers = parseOrCreate(brand.specialOffers, []);

      // Обновляем данные в базе
      await prisma.brand.update({
        where: { id: brand.id },
        data: {
          mainGallery: JSON.stringify(mainGallery),
          bottomGallery: JSON.stringify(bottomGallery),
          workingHours: JSON.stringify(workingHours),
          navigationTags: JSON.stringify(navigationTags),
          brandHistory: JSON.stringify(brandHistory),
          features: JSON.stringify(features),
          specialOffers: JSON.stringify(specialOffers)
        }
      });

      console.log('Updated fields for brand:', brand.name);
    }

    console.log('\nAll brands have been fixed!');
  } catch (error) {
    console.error('Error fixing data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

function parseOrCreate<T>(value: any, defaultValue: T): T {
  if (!value) return defaultValue;

  try {
    // Если это уже строка JSON, пробуем распарсить
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
    // Если это массив или объект, возвращаем как есть
    if (typeof value === 'object') {
      return value;
    }
  } catch (e) {
    console.log('Parse error, using default value');
  }

  return defaultValue;
}

fixJsonData()
  .catch(console.error)
  .finally(() => process.exit(0)); 