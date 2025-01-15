import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { reportId: string } }
) {
    try {
        const report = await prisma.photoReport.findUnique({
            where: { id: params.reportId }
        });

        if (!report) {
            return new NextResponse("Report not found", { status: 404 });
        }

        return NextResponse.json(report);
    } catch (error) {
        console.error("[REPORT_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { reportId: string } }
) {
    try {
        const body = await request.json();

        const report = await prisma.photoReport.update({
            where: {
                id: params.reportId,
            },
            data: body,
        });

        return NextResponse.json(report);
    } catch (error) {
        console.error("[REPORT_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { reportId: string } }
) {
    try {
        await prisma.photoReport.delete({
            where: {
                id: params.reportId,
            },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[REPORT_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
} 