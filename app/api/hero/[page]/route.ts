import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(
  request: NextRequest,
  { params }: { params: { page: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || params?.page || 'main';

  try {
    const hero = await prisma.heroSection.findFirst({
      where: { page }
    });
    
    return NextResponse.json(hero || {
      page,
      image: "/hero/hero-bg.jpg",
      brightness: 0.3,
      scrollerTexts: []
    });
  } catch (error) {
    console.error('GET Error:', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { page: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || params?.page || 'main';

  try {
    const body = await request.json();

    const hero = await prisma.heroSection.upsert({
      where: { page },
      create: {
        page,
        image: body.image,
        brightness: body.brightness,
        scrollerTexts: body.scrollerTexts
      },
      update: {
        image: body.image,
        brightness: body.brightness,
        scrollerTexts: body.scrollerTexts
      }
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.error('POST Error:', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 