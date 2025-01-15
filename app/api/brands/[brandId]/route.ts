import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { brandId: string } }
) {
  try {
    const brandId = context.params.brandId;
    const brand = await prisma.brand.findUnique({
      where: { id: brandId }
    });

    console.log('=== Raw Brand Data ===');
    console.log('Raw mainGallery:', brand?.mainGallery);
    console.log('Raw bottomGallery:', brand?.bottomGallery);
    console.log('Raw features:', brand?.features);
    console.log('Raw specialOffers:', brand?.specialOffers);
    console.log('Raw workingHours:', brand?.workingHours);
    console.log('Raw brandHistory:', brand?.brandHistory);

    return new Response(JSON.stringify(brand), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch brand' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PATCH(
  req: Request,
  context: { params: { brandId: string } }
) {
  try {
    const brandId = context.params.brandId;
    const body = await req.json();

    console.log('=== Incoming Update Data ===');
    console.log('Body:', body);

    // Безопасная сериализация
    const safeStringify = (data: any) => {
      if (typeof data === 'string') return data;
      try {
        return JSON.stringify(data);
      } catch (e) {
        console.error('Stringify error for:', data);
        return '[]';
      }
    };

    const data = {
      ...body,
      mainGallery: safeStringify(body.mainGallery),
      bottomGallery: safeStringify(body.bottomGallery),
      workingHours: safeStringify(body.workingHours),
      navigationTags: safeStringify(body.navigationTags),
      brandHistory: safeStringify(body.brandHistory),
      features: safeStringify(body.features),
      specialOffers: safeStringify(body.specialOffers),
    };

    console.log('=== Processed Update Data ===');
    console.log('Data to save:', data);

    const brand = await prisma.brand.update({
      where: { id: brandId },
      data
    });

    return NextResponse.json({ success: true, data: brand });
  } catch (error) {
    console.error("[BRAND_PATCH]", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Internal Error" 
    }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { brandId: string } }
) {
  try {
    const body = await request.json();

    // Валидация данных
    if (!body) {
      return NextResponse.json(
        { message: "No data provided" },
        { status: 400 }
      );
    }

    // Проверяем существование бренда
    const existingBrand = await prisma.brand.findUnique({
      where: { id: params.brandId },
    });

    if (!existingBrand) {
      return NextResponse.json(
        { message: "Brand not found" },
        { status: 404 }
      );
    }

    // Обновляем бренд
    const updatedBrand = await prisma.brand.update({
      where: { id: params.brandId },
      data: body,
    });

    return NextResponse.json(updatedBrand);
  } catch (error) {
    console.error("[BRAND_UPDATE]", error);
    return NextResponse.json(
      { message: "Internal server error", details: error },
      { status: 500 }
    );
  }
} 