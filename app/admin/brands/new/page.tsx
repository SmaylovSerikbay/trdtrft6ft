"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BrandForm } from "../components/BrandForm";
import { Brand } from "../types";

export default function NewBrandPage() {
  const router = useRouter();
  const { status } = useSession();

  const handleSubmit = async (data: Brand) => {
    try {
      const response = await fetch("/api/brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast.success("Бренд успешно создан");
      router.push("/admin/brands");
      router.refresh();
    } catch (error) {
      toast.error("Ошибка при создании бренда");
      throw error;
    }
  };

  if (status === "loading") {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Загрузка...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Создать новый бренд</h1>
        <p className="text-muted-foreground">
          Заполните форму для создания нового бренда
        </p>
      </div>

      <BrandForm onSubmit={handleSubmit} />
    </div>
  );
} 