import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sections = await prisma.anonceSection.findMany({
      include: {
        anonces: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(sections);
  } catch (error) {
    console.error("Error fetching sections:", error);
    return NextResponse.json({ error: "Error fetching sections" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const section = await prisma.anonceSection.create({
      data: {
        header: json.header
      }
    });
    return NextResponse.json(section);
  } catch (error) {
    console.error("Error creating section:", error);
    return NextResponse.json({ error: "Error creating section" }, { status: 500 });
  }
} 