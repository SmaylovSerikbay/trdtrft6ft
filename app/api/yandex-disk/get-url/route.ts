import { getDownloadUrl } from '@/lib/yandex-disk';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');

  if (!path) {
    return new NextResponse('Path is required', { status: 400 });
  }

  try {
    const url = await getDownloadUrl(path);
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error getting download URL:', error);
    return new NextResponse('Failed to get download URL', { status: 500 });
  }
} 