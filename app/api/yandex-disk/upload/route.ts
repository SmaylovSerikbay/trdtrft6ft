import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const path = formData.get('path') as string;

    // Получаем URL для загрузки
    const getUploadUrlResponse = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(path)}`,
      {
        headers: {
          Authorization: `OAuth ${process.env.YANDEX_DISK_TOKEN}`
        }
      }
    );

    const { href } = await getUploadUrlResponse.json();

    // Загружаем файл
    const uploadResponse = await fetch(href, {
      method: 'PUT',
      body: file
    });

    if (!uploadResponse.ok) throw new Error('Upload failed');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Upload error:', error);
    return new NextResponse("Error uploading file", { status: 500 });
  }
} 