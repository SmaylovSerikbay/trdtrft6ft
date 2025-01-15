"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Brand } from "./types";

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return brands.map(brand => ({
      id: brand.id,
      name: brand.name,
      title: brand.title || undefined,
      description: brand.description || '',
      slug: brand.slug,
      heroImage: brand.heroImage || undefined,
      workingHours: typeof brand.workingHours === 'string' 
        ? JSON.parse(brand.workingHours) 
        : { weekdays: '', weekends: '' },
      mainGallery: typeof brand.mainGallery === 'string'
        ? JSON.parse(brand.mainGallery)
        : [],
      navigationTags: typeof brand.navigationTags === 'string'
        ? JSON.parse(brand.navigationTags)
        : [],
      brandHistory: typeof brand.brandHistory === 'string'
        ? JSON.parse(brand.brandHistory)
        : { title: '', description: '' },
      features: typeof brand.features === 'string'
        ? JSON.parse(brand.features)
        : [],
      specialOffers: typeof brand.specialOffers === 'string'
        ? JSON.parse(brand.specialOffers)
        : [],
      bottomGallery: typeof brand.bottomGallery === 'string'
        ? JSON.parse(brand.bottomGallery)
        : [],
      gallery: {
        title: brand.title || '',
        description: brand.description || '',
        images: typeof brand.mainGallery === 'string'
          ? JSON.parse(brand.mainGallery)
          : []
      },
      userId: brand.userId || undefined
    }));
  } catch (error) {
    console.error("[GET_BRANDS]", error);
    throw new Error("Failed to fetch brands");
  }
}

export async function createBrand(data: Partial<Brand>) {
  try {
    const createInput: Prisma.BrandCreateInput = {
      name: data.name || "Новый бренд",
      slug: data.slug || "",
      title: data.title || "",
      description: data.description || "",
      welcomeText: data.welcomeText || "",
      address: data.address || "",
      mapLink: data.mapLink || "",
      phone: data.phone || "",
      whatsapp: data.whatsapp || "",
      email: data.email || "",
      heroImage: data.heroImage || "",
      workingHours: JSON.stringify(data.workingHours || { weekdays: "", weekends: "" }),
      mainGallery: JSON.stringify(data.mainGallery || []),
      navigationTags: JSON.stringify(data.navigationTags || []),
      brandHistory: JSON.stringify(data.brandHistory || { title: "", description: "" }),
      features: JSON.stringify(data.features || []),
      specialOffers: JSON.stringify(data.specialOffers || []),
      bottomGallery: JSON.stringify(data.bottomGallery || []),
      user: data.userId ? { connect: { id: data.userId } } : undefined
    };

    const brand = await prisma.brand.create({
      data: createInput
    });

    return brand;
  } catch (error) {
    console.error("[CREATE_BRAND]", error);
    throw new Error("Failed to create brand");
  }
}

export async function updateBrand(id: string, data: Partial<Brand>) {
  try {
    const updateInput: Prisma.BrandUpdateInput = {
      name: data.name,
      slug: data.slug,
      title: data.title,
      description: data.description,
      welcomeText: data.welcomeText,
      address: data.address,
      mapLink: data.mapLink,
      phone: data.phone,
      whatsapp: data.whatsapp,
      email: data.email,
      heroImage: data.heroImage,
      workingHours: data.workingHours ? JSON.stringify(data.workingHours) : undefined,
      mainGallery: data.mainGallery ? JSON.stringify(data.mainGallery) : undefined,
      navigationTags: data.navigationTags ? JSON.stringify(data.navigationTags) : undefined,
      brandHistory: data.brandHistory ? JSON.stringify(data.brandHistory) : undefined,
      features: data.features ? JSON.stringify(data.features) : undefined,
      specialOffers: data.specialOffers ? JSON.stringify(data.specialOffers) : undefined,
      bottomGallery: data.bottomGallery ? JSON.stringify(data.bottomGallery) : undefined,
      user: data.userId ? { connect: { id: data.userId } } : undefined
    };

    const brand = await prisma.brand.update({
      where: { id },
      data: updateInput
    });

    return brand;
  } catch (error) {
    console.error("[UPDATE_BRAND]", error);
    throw new Error("Failed to update brand");
  }
}

export async function deleteBrand(id: string) {
  try {
    await prisma.brand.delete({
      where: { id },
    });

    revalidatePath("/admin/brands");
    return { success: true };
  } catch (error) {
    console.error("Error deleting brand:", error);
    return { success: false, error: "Failed to delete brand" };
  }
} 