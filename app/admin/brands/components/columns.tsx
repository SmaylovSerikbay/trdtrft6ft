"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";
import { Brand } from "../types";

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    accessorKey: "description",
    header: "Описание",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="flex items-center gap-2">
          <Link href={`/admin/brands/${brand.id}`}>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
]; 