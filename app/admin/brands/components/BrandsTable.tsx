"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BrandsTableProps {
  data: any[];
  onEdit: (brand: any) => void;
  onDelete: () => void;
}

export function BrandsTable({ data = [], onEdit, onDelete }: BrandsTableProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/brands/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();

      toast.success("Бренд удален");
      onDelete();
    } catch (error) {
      toast.error("Что-то пошло не так");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Адрес</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Нет данных
              </TableCell>
            </TableRow>
          ) : (
            data.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>{brand.name}</TableCell>
                <TableCell>{brand.address}</TableCell>
                <TableCell>{brand.phone}</TableCell>
                <TableCell>{brand.email}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Button
                    disabled={loading}
                    onClick={() => onEdit(brand)}
                    variant="outline"
                    size="icon"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    disabled={loading}
                    onClick={() => handleDelete(brand.id)}
                    variant="destructive"
                    size="icon"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
} 