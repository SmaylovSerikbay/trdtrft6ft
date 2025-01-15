"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Brand } from "../types";
import { columns } from "./columns";

interface BrandsClientProps {
  initialData: Brand[];
}

export function BrandsClient({ initialData }: BrandsClientProps) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Бренды</h1>
        <Link href="/admin/brands/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Создать бренд
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={initialData} />
    </div>
  );
} 