import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const hero = await prisma.heroSection.findFirst({
      where: { page: "home" },
    });
    return NextResponse.json(hero);
  } catch (error) {
    console.error("Error fetching hero section:", error);
    return NextResponse.json({ error: "Error fetching hero section" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const hero = await prisma.heroSection.upsert({
      where: { page: "home" },
      update: {
        image: json.image,
        brightness: json.brightness,
        scrollerTexts: json.scrollerTexts,
      },
      create: {
        page: "home",
        image: json.image,
        brightness: json.brightness,
        scrollerTexts: json.scrollerTexts,
      },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.error("Error updating hero section:", error);
    return NextResponse.json({ error: "Error updating hero section" }, { status: 500 });
  }
} 