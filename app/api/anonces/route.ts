import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const anonces = await prisma.anonce.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(anonces);
  } catch (error) {
    console.error("Error fetching anonces:", error);
    return NextResponse.json({ error: "Error fetching anonces" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    console.log("Received anonce data:", json);

    const anonce = await prisma.anonce.create({
      data: {
        title: json.title,
        text: json.text,
        sectionId: json.sectionId
      }
    });

    return NextResponse.json(anonce);
  } catch (error) {
    console.error("Error creating anonce:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error creating anonce" }), 
      { status: 500 }
    );
  }
} 