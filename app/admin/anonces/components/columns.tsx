"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";

export type Anonce = {
  id: string;
  title: string;
  text: string;
  icon: string;
  iconDark: string;
  createdAt: string;
};

export const columns: ColumnDef<Anonce>[] = [
  {
    accessorKey: "title",
    header: "Заголовок",
  },
  {
    accessorKey: "text",
    header: "Текст",
  },
  {
    accessorKey: "icon",
    header: "Иконка",
    cell: ({ row }) => {
      const icon = row.getValue("icon") as string;
      return icon ? (
        <div className="relative h-10 w-10">
          <Image
            src={icon}
            alt="Icon"
            fill
            className="rounded object-cover"
          />
        </div>
      ) : null;
    },
  },
  {
    accessorKey: "iconDark",
    header: "Темная иконка",
    cell: ({ row }) => {
      const icon = row.getValue("iconDark") as string;
      return icon ? (
        <div className="relative h-10 w-10">
          <Image
            src={icon}
            alt="Dark Icon"
            fill
            className="rounded object-cover"
          />
        </div>
      ) : null;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Дата создания",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const anonce = row.original;

      const handleDelete = async () => {
        if (confirm("Вы уверены, что хотите удалить этот анонс?")) {
          try {
            const response = await fetch(`/api/anonces/${anonce.id}`, {
              method: "DELETE",
            });

            if (!response.ok) throw new Error("Ошибка удаления");

            // Обновляем данные таблицы
            const meta = table.options.meta as { refreshData?: () => Promise<void> };
            await meta?.refreshData?.();
          } catch (error) {
            console.error(error);
          }
        }
      };

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              // Добавить функцию редактирования
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
]; 