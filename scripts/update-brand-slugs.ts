import { PrismaClient } from '@prisma/client';
import { slugify } from '../lib/utils';

const prisma = new PrismaClient();

async function updateBrandSlugs() {
  const brands = await prisma.brand.findMany();
  
  for (const brand of brands) {
    await prisma.brand.update({
      where: { id: brand.id },
      data: { slug: slugify(brand.name) }
    });
  }
}

updateBrandSlugs()
  .catch(console.error)
  .finally(() => prisma.$disconnect()); 