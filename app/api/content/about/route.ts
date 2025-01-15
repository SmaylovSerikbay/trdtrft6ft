import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const about = await prisma.aboutSection.findFirst();
    return NextResponse.json(about);
  } catch (error) {
    console.error("Error fetching about section:", error);
    return NextResponse.json({ error: "Error fetching about section" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    console.log("Received about data:", json);

    const about = await prisma.aboutSection.upsert({
      where: { id: "1" },
      update: {
        title: json.title,
        description: json.description,
        email: json.email,
        gisLink: json.gisLink,
        instagramLink: json.instagramLink,
        logo: json.logo,
        logoDark: json.logoDark,
      },
      create: {
        id: "1",
        title: json.title,
        description: json.description,
        email: json.email,
        gisLink: json.gisLink,
        instagramLink: json.instagramLink,
        logo: json.logo,
        logoDark: json.logoDark,
      },
    });

    console.log("Updated about section:", about);
    return NextResponse.json(about);
  } catch (error) {
    console.error("Error updating about section:", error);
    return NextResponse.json({ error: "Error updating about section" }, { status: 500 });
  }
} 