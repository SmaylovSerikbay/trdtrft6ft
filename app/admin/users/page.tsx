import { authConfig as authOptions } from "@/app/api/auth/[...nextauth]/auth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Пользователи</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {/* Здесь будет таблица пользователей */}
      </div>
    </div>
  );
} 