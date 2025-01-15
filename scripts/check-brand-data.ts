import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkBrandData() {
  try {
    // Получаем все бренды
    const brands = await prisma.brand.findMany();

    brands.forEach((brand) => {
      console.log('\n=== Brand:', brand.name, '===');
      console.log('ID:', brand.id);
      console.log('Slug:', brand.slug);
      
      // Проверяем JSON поля
      try {
        const mainGallery = JSON.parse(brand.mainGallery as string || '[]');
        console.log('Main Gallery:', mainGallery.length, 'images');
        console.log('Gallery URLs:', mainGallery);
      } catch (e) {
        console.log('Invalid mainGallery JSON');
      }

      try {
        const bottomGallery = JSON.parse(brand.bottomGallery as string || '[]');
        console.log('Bottom Gallery:', bottomGallery.length, 'images');
        console.log('Gallery URLs:', bottomGallery);
      } catch (e) {
        console.log('Invalid bottomGallery JSON');
      }

      try {
        const features = JSON.parse(brand.features as string || '[]');
        console.log('Features:', features.length, 'items');
      } catch (e) {
        console.log('Invalid features JSON');
      }

      try {
        const specialOffers = JSON.parse(brand.specialOffers as string || '[]');
        console.log('Special Offers:', specialOffers.length, 'items');
      } catch (e) {
        console.log('Invalid specialOffers JSON');
      }

      console.log('Working Hours:', brand.workingHours);
      console.log('Brand History:', brand.brandHistory);
    });

  } catch (error) {
    console.error('Error checking data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkBrandData(); 