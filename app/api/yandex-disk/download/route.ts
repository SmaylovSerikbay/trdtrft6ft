import { NextResponse } from "next/server";

const YANDEX_DISK_API = "https://cloud-api.yandex.net/v1/disk/resources/download";
const YANDEX_DISK_TOKEN = process.env.YANDEX_DISK_TOKEN;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    // Если получен полный URL, извлекаем из него путь к файлу
    if (path.startsWith('http')) {
      try {
        const url = new URL(path);
        const filename = url.searchParams.get('filename');
        // Получаем путь к файлу из folderPath репортажа
        path = `/${filename}`; // Или используйте соответствующий путь к папке
      } catch (e) {
        console.error('Error parsing URL:', e);
        return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
      }
    }

    // Получаем ссылку на скачивание
    const response = await fetch(
      `${YANDEX_DISK_API}?path=${encodeURIComponent(path)}`,
      {
        headers: {
          Authorization: `OAuth ${YANDEX_DISK_TOKEN}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to get download URL');
    }

    const { href } = await response.json();

    // Скачиваем файл
    const fileResponse = await fetch(href);
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