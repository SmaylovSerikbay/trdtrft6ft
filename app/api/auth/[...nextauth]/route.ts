import NextAuth from "next-auth";

// Выносим конфигурацию в отдельный файл
import { authConfig } from "./auth.config";

// Создаем handler с конфигурацией
const handler = NextAuth(authConfig);

// Экспортируем только GET и POST методы
export { handler as GET, handler as POST };

