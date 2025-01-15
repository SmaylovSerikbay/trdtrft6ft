"use server";

import { prisma } from "@/lib/prisma";
import { Brand } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Проверяем тип данных и парсим только если это строка
    return brands.map(brand => ({
      ...brand,
      workingHours: typeof brand.workingHours === 'string' 
        ? JSON.parse(brand.workingHours || '{}') 
        : brand.workingHours || {},
      mainGallery: typeof brand.mainGallery === 'string'
        ? JSON.parse(brand.mainGallery || '[]')
        : brand.mainGallery || [],
      navigationTags: typeof brand.navigationTags === 'string'
        ? JSON.parse(brand.navigationTags || '[]')
        : brand.navigationTags || [],
      brandHistory: typeof brand.brandHistory === 'string'
        ? JSON.parse(brand.brandHistory || '{}')
        : brand.brandHistory || {},
      features: typeof brand.features === 'string'
        ? JSON.parse(brand.features || '[]')
        : brand.features || [],
      specialOffers: typeof brand.specialOffers === 'string'
        ? JSON.parse(brand.specialOffers || '[]')
        : brand.specialOffers || [],
      bottomGallery: typeof brand.bottomGallery === 'string'
        ? JSON.parse(brand.bottomGallery || '[]')
        : brand.bottomGallery || []
    }));
  } catch (error) {
    console.error("[GET_BRANDS]", error);
    throw new Error("Failed to fetch brands");
  }
}

export async function createBrand(data: Partial<Brand>) {
  try {
    const brand = await prisma.brand.create({
      data: {
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
        workingHours: data.workingHours || "",
        mainGallery: data.mainGallery || "[]",
        navigationTags: data.navigationTags || "[]",
        brandHistory: data.brandHistory || "",
        features: data.features || "[]",
        specialOffers: data.specialOffers || "[]",
        bottomGallery: data.bottomGallery || "[]",
        userId: data.userId || "",
      },
    });

    revalidatePath("/admin/brands");
    revalidatePath(`/admin/brands/${brand.id}`);
    revalidatePath(`/${brand.slug}`);

    return { success: true, data: brand };
  } catch (error) {
    console.error("Error creating brand:", error);
    return { success: false, error: "Failed to create brand" };
  }
}

export async function updateBrand(id: string, data: Partial<Brand>) {
  try {
    const brand = await prisma.brand.update({
      where: { id },
      data: {
        ...data,
        mainGallery: data.mainGallery || "[]",
        navigationTags: data.navigationTags || "[]",
        features: data.features || "[]",
        specialOffers: data.specialOffers || "[]",
        bottomGallery: data.bottomGallery || "[]",
      },
    });

    revalidatePath("/admin/brands");
    revalidatePath(`/admin/brands/${id}`);
    revalidatePath(`/${brand.slug}`);

    return { success: true, data: brand };
  } catch (error) {
    console.error("Error updating brand:", error);
    return { success: false, error: "Failed to update brand" };
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