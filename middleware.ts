import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname === "/login";
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  // Если пользователь авторизован и пытается зайти на страницу логина
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/admin/brands", request.url));
  }

  // Если пользователь не авторизован и пытается получить доступ к админ-маршрутам
  if (!token && isAdminRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = NextResponse.next();

  // Отключаем кэширование для API запросов
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}; 