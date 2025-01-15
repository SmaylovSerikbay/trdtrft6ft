"use client";

import { cn } from "@/lib/utils";
import { Bell, Calendar, FileText, Image, LayoutDashboard, LogOut, Store } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Рестораны",
    href: "/admin/restaurants",
    icon: Store,
  },
  {
    title: "События",
    href: "/admin/events",
    icon: Calendar,
  },
  {
    title: "Бренды",
    href: "/admin/brands",
    icon: Store,
  },
  {
    title: "Анонсы",
    href: "/admin/anonces",
    icon: Bell,
  },
  {
    title: "Контент",
    href: "/admin/content",
    icon: FileText,
  },
  {
    title: "Медиа",
    href: "/admin/media",
    icon: Image,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/admin/login" });
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">Админ-панель</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-800",
                  pathname === item.href ? "bg-gray-800" : "transparent"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-400 transition-colors hover:bg-gray-800"
        >
          <LogOut className="h-5 w-5" />
          Выйти
        </button>
      </div>
    </div>
  );
} 