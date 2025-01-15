import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const report = await prisma.photoReport.create({
      data: body
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("[REPORTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const reports = await prisma.photoReport.findMany({
      orderBy: {
        publishedAt: 'desc'
      }
    });

    return NextResponse.json(reports);
  } catch (error) {
    console.error("[REPORTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 