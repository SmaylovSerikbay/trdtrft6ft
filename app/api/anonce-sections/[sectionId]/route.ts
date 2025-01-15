import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { sectionId: string } }
): Promise<Response> {
  try {
    const section = await prisma.anonceSection.findUnique({
      where: {
        id: context.params.sectionId
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
  context: { params: { sectionId: string } }
): Promise<Response> {
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

    return Response.json(updatedSection);
  } catch (error) {
    console.error("Error updating section:", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { sectionId: string } }
): Promise<Response> {
  try {
    await prisma.anonceSection.delete({
      where: {
        id: context.params.sectionId
      }
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting section:", error);
    return new Response("Internal error", { status: 500 });
  }
}