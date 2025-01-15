"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { columns } from "./columns";
import { RestaurantDialog } from "./RestaurantDialog";

type Restaurant = {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

export function RestaurantsTable({ initialData }: { initialData: Restaurant[] }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(initialData);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Список ресторанов</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Добавить ресторан
        </Button>
      </div>

      <DataTable columns={columns} data={restaurants} />

      <RestaurantDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={(newRestaurant) => {
          setRestaurants([...restaurants, newRestaurant]);
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
} 