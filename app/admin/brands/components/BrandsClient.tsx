"use client";

import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brand } from "../types";
import { DeleteBrand } from "./DeleteBrand";

interface BrandsClientProps {
  initialData: Brand[];
}

export function BrandsClient({ initialData }: BrandsClientProps) {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Бренды</h1>
        <Button onClick={() => router.push('/admin/brands/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Добавить
        </Button>
      </div>

      <div className="mt-8 space-y-4">
        {initialData.map((brand) => (
          <div
            key={brand.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <h2 className="font-medium">{brand.name}</h2>
              <p className="text-sm text-gray-500">{brand.description}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/brands/${brand.id}`}>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              {brand.id && <DeleteBrand brandId={brand.id} />}
            </div>
          </div>
        ))}

        {initialData.length === 0 && (
          <div className="text-center text-gray-500">
            Нет добавленных брендов
          </div>
        )}
      </div>
    </>
  );
} 