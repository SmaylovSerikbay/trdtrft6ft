import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json();
    const anonce = await prisma.anonce.update({
      where: {
        id: params.id,
      },
      data: {
        title: json.title,
        text: json.text,
      },
    });

    return NextResponse.json(anonce);
  } catch (error) {
    console.error("Error updating anonce:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error updating anonce" }), 
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.anonce.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting anonce:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error deleting anonce" }), 
      { status: 500 }
    );
  }
} 