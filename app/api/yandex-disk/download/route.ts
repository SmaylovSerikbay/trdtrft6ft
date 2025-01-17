import { NextResponse } from "next/server";

const YANDEX_DISK_API = "https://cloud-api.yandex.net/v1/disk/resources/download";
const YANDEX_DISK_TOKEN = process.env.YANDEX_DISK_TOKEN;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let path = searchParams.get('path');
    const folderPath = searchParams.get('folderPath');

    if (!path || !folderPath) {
      return NextResponse.json({ error: 'Path and folderPath are required' }, { status: 400 });
    }

    // Получаем имя файла из URL
    const filename = path.split('/').pop()?.split('?')[0];
    if (!filename) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    // Формируем путь к файлу в Яндекс.Диске
    const fullPath = `/${folderPath}/${filename}`.replace(/\/+/g, '/');

    // Получаем ссылку на скачивание
    const response = await fetch(
      `${YANDEX_DISK_API}?path=${encodeURIComponent(fullPath)}`,
      {
        headers: {
          Authorization: `OAuth ${YANDEX_DISK_TOKEN}`
        }
      }
    );

    if (!response.ok) {
      console.error('Yandex.Disk API error:', await response.text());
      throw new Error('Failed to get download URL');
    }

    const { href } = await response.json();

    // Скачиваем файл
    const fileResponse = await fetch(href);
    
    if (!fileResponse.ok) {
      throw new Error('Failed to download file');
    }
    
    const fileBuffer = await fileResponse.arrayBuffer();

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': fileResponse.headers.get('Content-Type') || 'application/octet-stream',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
} 