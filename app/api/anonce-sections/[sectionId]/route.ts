import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { sectionId: string } }
) {
  try {
    await prisma.anonceSection.delete({
      where: {
        id: params.sectionId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting section:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error deleting section" }), 
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { sectionId: string } }
) {
  try {
    const json = await request.json();
    const section = await prisma.anonceSection.update({
      where: {
        id: params.sectionId,
      },
      data: {
        header: json.header,
      },
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error("Error updating section:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error updating section" }), 
      { status: 500 }
    );
  }
} 