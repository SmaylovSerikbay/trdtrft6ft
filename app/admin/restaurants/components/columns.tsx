"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Restaurant>[] = [
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    accessorKey: "address",
    header: "Адрес",
  },
  {
    accessorKey: "phone",
    header: "Телефон",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const restaurant = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(restaurant.id)}
            >
              Копировать ID
            </DropdownMenuItem>
            <DropdownMenuItem>Редактировать</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 