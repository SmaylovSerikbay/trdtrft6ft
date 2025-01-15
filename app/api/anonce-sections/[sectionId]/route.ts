import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { sectionId: string } }
) {
  try {
    const section = await prisma.anonceSection.findUnique({
      where: {
        id: params.sectionId
      },
      include: {
        anonces: true
      }
    });

    return Response.json(section);
  } catch (error) {
    console.error("Error fetching section:", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { sectionId: string } }
) {
  try {
    const json = await request.json();

    const updatedSection = await prisma.anonceSection.update({
      where: {
        id: params.sectionId
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

    return Response.json(updatedSection);
  } catch (error) {
    console.error("Error updating section:", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { sectionId: string } }
) {
  try {
    await prisma.anonceSection.delete({
      where: {
        id: params.sectionId
      }
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting section:", error);
    return new Response("Internal error", { status: 500 });
  }
} 