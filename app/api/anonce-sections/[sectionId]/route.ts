import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { sectionId: string } }
) {
  try {
    const section = await prisma.anonceSection.findUnique({
      where: {
        id: context.params.sectionId
      },
      include: {
        anonces: true
      }
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error("Error fetching section:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { sectionId: string } }
) {
  try {
    const json = await request.json();

    const updatedSection = await prisma.anonceSection.update({
      where: {
        id: context.params.sectionId
      },
      data: {
        header: json.header,
        anonces: {
          deleteMany: {},
          create: json.anonces
        }
      },
      include: {
        anonces: true
      }
    });

    return NextResponse.json(updatedSection);
  } catch (error) {
    console.error("Error updating section:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { sectionId: string } }
) {
  try {
    await prisma.anonceSection.delete({
      where: {
        id: context.params.sectionId
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting section:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 