import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { path } = await request.json();
    
    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(path)}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `OAuth ${process.env.YANDEX_DISK_TOKEN}`
        }
      }
    );

    if (!response.ok) throw new Error('Failed to create folder');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Create folder error:', error);
    return new NextResponse("Error creating folder", { status: 500 });
  }
} 