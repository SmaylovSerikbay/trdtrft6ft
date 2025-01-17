import { NextResponse } from "next/server";

const YANDEX_DISK_API = "https://cloud-api.yandex.net/v1/disk/resources/download";
const YANDEX_DISK_TOKEN = process.env.YANDEX_DISK_TOKEN;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let path = searchParams.get('path');
    const folderPath = searchParams.get('folderPath');

    console.log('Received request with path:', path, 'folderPath:', folderPath);

    if (!path || !folderPath) {
      return NextResponse.json({ error: 'Path and folderPath are required' }, { status: 400 });
    }

    // Получаем имя файла из URL или используем весь path, если это просто имя файла
    const filename = path.includes('/') ? path.split('/').pop()?.split('?')[0] : path;
    if (!filename) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    // Формируем путь к файлу в Яндекс.Диске
    const fullPath = `disk:/${folderPath}/${filename}`.replace(/\/+/g, '/');
    console.log('Constructed full path:', fullPath);

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
      const errorText = await response.text();
      console.error('Yandex.Disk API error response:', errorText);
      throw new Error(`Failed to get download URL: ${errorText}`);
    }

    const data = await response.json();
    console.log('Yandex.Disk API response:', data);

    // Скачиваем файл
    const fileResponse = await fetch(data.href);
    
    if (!fileResponse.ok) {
      const errorText = await fileResponse.text();
      console.error('File download error:', errorText);
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
    console.error('Error in download route:', error);
    return NextResponse.json({ 
      error: 'Failed to download file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 