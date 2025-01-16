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

export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.id) {
      return NextResponse.json(
        { error: "Brand ID is required" },
        { status: 400 }
      );
    }

    const brandData = {
      ...data,
      gallery: data.gallery ? JSON.stringify(data.gallery) : null,
      workingHours: data.workingHours ? JSON.stringify(data.workingHours) : null,
      mainGallery: data.mainGallery ? JSON.stringify(data.mainGallery) : null,
      navigationTags: data.navigationTags ? JSON.stringify(data.navigationTags) : null,
      brandHistory: data.brandHistory ? JSON.stringify(data.brandHistory) : null,
      features: data.features ? JSON.stringify(data.features) : null,
      specialOffers: data.specialOffers ? JSON.stringify(data.specialOffers) : null,
      bottomGallery: data.bottomGallery ? JSON.stringify(data.bottomGallery) : null,
    };

    const brand = await prisma.brand.update({
      where: { id: data.id },
      data: brandData
    });

    revalidatePath('/');
    revalidatePath('/brands');
    revalidatePath('/admin/brands');

    return NextResponse.json({ success: true, data: brand });
  } catch (error) {
    console.error('Error updating brand:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to update brand" },
      { status: 500 }
    );
  }
}

// Добавляем метод DELETE
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Brand ID is required" },
        { status: 400 }
      );
    }

    await prisma.brand.delete({
      where: { id }
    });

    revalidatePath('/');
    revalidatePath('/brands');
    revalidatePath('/admin/brands');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting brand:', error);
    return NextResponse.json(
      { success: false, error: "Failed to delete brand" },
      { status: 500 }
    );
  }
} 