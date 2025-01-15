import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Панель управления</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Рестораны</h3>
          <p className="text-3xl font-bold">4</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">События</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Изображения</h3>
          <p className="text-3xl font-bold">156</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Пользователи</h3>
          <p className="text-3xl font-bold">2</p>
        </div>
      </div>
    </div>
  );
} 