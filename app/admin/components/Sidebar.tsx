"use client";

import { cn } from "@/lib/utils";
import { Camera, Home, Image, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "Главная",
    icon: Home,
    href: "/admin",
  },
  {
    label: "Контент",
    icon: Image,
    href: "/admin/content",
  },
  {
    label: "Бренды",
    icon: Users,
    href: "/admin/brands",
  },
  {
    label: "Репортажи",
    icon: Camera,
    href: "/admin/reports",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-[200px] flex-col space-y-2 border-r bg-gray-100/40 py-4 dark:bg-gray-800/40">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center gap-x-2 px-4 py-2 text-sm transition-colors hover:bg-gray-200/40 hover:text-gray-900 dark:hover:bg-gray-700/40 dark:hover:text-gray-50",
            pathname === route.href
              ? "bg-gray-200/60 text-gray-900 dark:bg-gray-700/60 dark:text-gray-50"
              : "text-gray-500 dark:text-gray-400"
          )}
        >
          <route.icon className="h-4 w-4" />
          {route.label}
        </Link>
      ))}
    </div>
  );
} 