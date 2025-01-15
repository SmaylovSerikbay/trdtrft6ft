import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { RestaurantsTable } from "./components/RestaurantsTable";

export default async function RestaurantsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const restaurants = await prisma.restaurant.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Рестораны</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <RestaurantsTable initialData={restaurants} />
      </div>
    </div>
  );
} 