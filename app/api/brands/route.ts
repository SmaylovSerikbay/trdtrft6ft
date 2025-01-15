import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Преобразуем gallery в JSON строку
    const brandData = {
      ...data,
      gallery: JSON.stringify(data.gallery),
      workingHours: JSON.stringify(data.workingHours),
      mainGallery: JSON.stringify(data.mainGallery),
      navigationTags: JSON.stringify(data.navigationTags),
      brandHistory: JSON.stringify(data.brandHistory),
      features: JSON.stringify(data.features),
      specialOffers: JSON.stringify(data.specialOffers),
      bottomGallery: JSON.stringify(data.bottomGallery),
    };

    const brand = await prisma.brand.create({
      data: brandData
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.error('Error creating brand:', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(brands);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
} 