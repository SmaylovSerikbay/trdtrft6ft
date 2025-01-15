"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type RestaurantDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (restaurant: any) => void;
  initialData?: any;
};

export function RestaurantDialog({
  open,
  onOpenChange,
  onSuccess,
  initialData,
}: RestaurantDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [features, setFeatures] = useState<Array<{ title: string; description: string }>>(
    initialData?.features || [{ title: "", description: "" }]
  );
  const [specialOffers, setSpecialOffers] = useState<Array<{ title: string; description: string }>>(
    initialData?.specialOffers || [{ title: "", description: "" }]
  );

  const addFeature = () => {
    setFeatures([...features, { title: "", description: "" }]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const addSpecialOffer = () => {
    setSpecialOffers([...specialOffers, { title: "", description: "" }]);
  };

  const removeSpecialOffer = (index: number) => {
    setSpecialOffers(specialOffers.filter((_, i) => i !== index));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      images,
      features,
      specialOffers,
    };

    try {
      const response = await fetch("/api/restaurants", {
        method: initialData ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Ошибка при сохранении");

      const restaurant = await response.json();
      onSuccess(restaurant);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Редактировать" : "Добавить"} ресторан
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Название</Label>
            <Input
              id="name"
              name="name"
              defaultValue={initialData?.name}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={initialData?.description}
              required
            />
          </div>

          <div>
            <Label htmlFor="address">Адрес</Label>
            <Input
              id="address"
              name="address"
              defaultValue={initialData?.address}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              name="phone"
              defaultValue={initialData?.phone}
              required
            />
          </div>

          <div>
            <Label>Изображения</Label>
            <ImageUpload
              value={images}
              onChange={(urls) => setImages(urls)}
              onRemove={(url) => setImages(images.filter((i) => i !== url))}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Особенности</Label>
              <Button type="button" onClick={addFeature} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
                Добавить
              </Button>
            </div>
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Название"
                    value={feature.title}
                    onChange={(e) => {
                      const newFeatures = [...features];
                      newFeatures[index].title = e.target.value;
                      setFeatures(newFeatures);
                    }}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Описание"
                    value={feature.description}
                    onChange={(e) => {
                      const newFeatures = [...features];
                      newFeatures[index].description = e.target.value;
                      setFeatures(newFeatures);
                    }}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFeature(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Специальные предложения</Label>
              <Button type="button" onClick={addSpecialOffer} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
                Добавить
              </Button>
            </div>
            {specialOffers.map((offer, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Название"
                    value={offer.title}
                    onChange={(e) => {
                      const newOffers = [...specialOffers];
                      newOffers[index].title = e.target.value;
                      setSpecialOffers(newOffers);
                    }}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Описание"
                    value={offer.description}
                    onChange={(e) => {
                      const newOffers = [...specialOffers];
                      newOffers[index].description = e.target.value;
                      setSpecialOffers(newOffers);
                    }}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSpecialOffer(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 