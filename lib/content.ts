import { prisma } from "./prisma";

interface HeroSection {
  image: string;
  brightness: number;
  scrollerTexts: string[];
}

export async function getHeroSection(page: string): Promise<HeroSection | null> {
  try {
    const heroSection = await prisma.heroSection.findFirst({
      where: {
        page,
      },
      select: {
        image: true,
        brightness: true,
        scrollerTexts: true,
      },
    });

    if (!heroSection || !heroSection.image) return null;
    return heroSection as HeroSection;
  } catch (error) {
    console.error("[GET_HERO_SECTION]", error);
    return null;
  }
}

export async function updateHeroSection(page: string, data: Partial<HeroSection>) {
  try {
    const heroSection = await prisma.heroSection.upsert({
      where: {
        page,
      },
      update: data,
      create: {
        page,
        ...data,
      },
    });

    return heroSection;
  } catch (error) {
    console.error("[UPDATE_HERO_SECTION]", error);
    throw new Error("Failed to update hero section");
  }
} 