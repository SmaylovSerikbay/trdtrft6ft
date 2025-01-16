import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { NextResponse } from "next/server";

// Добавляем динамические опции
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Проверяем обязательные поля
    if (!data.name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    // Подготавливаем данные для сохранения
    const brandData = {
      ...data,
      // Безопасно преобразуем JSON поля
      gallery: data.gallery ? JSON.stringify(data.gallery) : null,
      workingHours: data.workingHours ? JSON.stringify(data.workingHours) : null,
      mainGallery: data.mainGallery ? JSON.stringify(data.mainGallery) : null,
      navigationTags: data.navigationTags ? JSON.stringify(data.navigationTags) : null,
      brandHistory: data.brandHistory ? JSON.stringify(data.brandHistory) : null,
      features: data.features ? JSON.stringify(data.features) : null,
      specialOffers: data.specialOffers ? JSON.stringify(data.specialOffers) : null,
      bottomGallery: data.bottomGallery ? JSON.stringify(data.bottomGallery) : null,
    };

    const brand = await prisma.brand.create({
      data: brandData
    });

    // Ревалидация всех необходимых путей
    revalidatePath('/');
    revalidatePath('/brands');
    revalidatePath('/admin/brands');

    return NextResponse.json({ success: true, data: brand });
  } catch (error) {
    console.error('Error creating brand:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to create brand" 
      }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(brands, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch brands" },
      { status: 500 }
    );
  }
} 