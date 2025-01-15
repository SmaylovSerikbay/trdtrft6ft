import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        features: true,
        specialOffers: true,
        events: true,
      },
    });
    return NextResponse.json(restaurants);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching restaurants" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const restaurant = await prisma.restaurant.create({
      data: {
        name: json.name,
        description: json.description,
        address: json.address,
        phone: json.phone,
        images: json.images,
        features: {
          create: json.features,
        },
        specialOffers: {
          create: json.specialOffers,
        },
      },
    });
    return NextResponse.json(restaurant);
  } catch (error) {
    return NextResponse.json({ error: "Error creating restaurant" }, { status: 500 });
  }
} 