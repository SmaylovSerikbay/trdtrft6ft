import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Функция для подготовки JSON полей
const prepareJsonField = (field: any) => {
  if (!field) return null;
  return typeof field === 'string' ? field : JSON.stringify(field);
};

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Подготавливаем данные для сохранения
    const preparedData = {
      ...data,
      workingHours: prepareJsonField(data.workingHours),
      mainGallery: prepareJsonField(data.mainGallery),
      navigationTags: prepareJsonField(data.navigationTags),
      brandHistory: prepareJsonField(data.brandHistory),
      features: prepareJsonField(data.features),
      specialOffers: prepareJsonField(data.specialOffers),
      bottomGallery: prepareJsonField(data.bottomGallery)
    };

    // Если есть id, то это обновление
    if (data.id) {
      const updatedBrand = await prisma.brand.update({
        where: { id: data.id },
        data: preparedData
      });
      return NextResponse.json(updatedBrand);
    }

    // Если нет id, то это создание нового
    const newBrand = await prisma.brand.create({
      data: preparedData
    });

    return NextResponse.json(newBrand);
  } catch (error) {
    console.error('POST Error:', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    // Подготавливаем данные для обновления
    const preparedData = {
      ...updateData,
      workingHours: prepareJsonField(updateData.workingHours),
      mainGallery: prepareJsonField(updateData.mainGallery),
      navigationTags: prepareJsonField(updateData.navigationTags),
      brandHistory: prepareJsonField(updateData.brandHistory),
      features: prepareJsonField(updateData.features),
      specialOffers: prepareJsonField(updateData.specialOffers),
      bottomGallery: prepareJsonField(updateData.bottomGallery)
    };

    const updatedBrand = await prisma.brand.update({
      where: { id },
      data: preparedData
    });

    return NextResponse.json(updatedBrand);
  } catch (error) {
    console.error('PATCH Error:', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 