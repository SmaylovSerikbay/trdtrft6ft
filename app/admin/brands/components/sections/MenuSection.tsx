"use client";

import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { Brand } from "../../types";
import { IconPicker } from "../ui/IconPicker";

interface MenuSectionProps {
  data: Brand;
  onChange: (data: Partial<Brand>) => void;
}

export function MenuSection({ data, onChange }: MenuSectionProps) {
  const updateMenu = (updates: Partial<typeof data.menu>) => {
    onChange({
      menu: {
        ...data.menu,
        ...updates
      }
    });
  };

  if (!data.menu) {
    onChange({
      menu: {
        title: "",
        description: "",
        sections: [],
        images: [],
        icon: "UtensilsCrossed"
      }
    });
    return null;
  }

  const addSection = () => {
    updateMenu({
      sections: [...(data.menu.sections || []), { title: "", items: [] }]
    });
  };

  const removeSection = (index: number) => {
    updateMenu({
      sections: (data.menu.sections || []).filter((_, i) => i !== index)
    });
  };

  const updateSection = (index: number, updates: Partial<typeof data.menu.sections[0]>) => {
    const newSections = [...(data.menu.sections || [])];
    newSections[index] = { ...newSections[index], ...updates };
    updateMenu({ sections: newSections });
  };

  const addMenuItem = (sectionIndex: number) => {
    const newSections = [...(data.menu.sections || [])];
    if (!newSections[sectionIndex].items) {
      newSections[sectionIndex].items = [];
    }
    newSections[sectionIndex].items.push({
      name: "",
      description: "",
      price: ""
    });
    updateMenu({ sections: newSections });
  };

  const removeMenuItem = (sectionIndex: number, itemIndex: number) => {
    const newSections = [...(data.menu.sections || [])];
    newSections[sectionIndex].items = newSections[sectionIndex].items.filter((_, i) => i !== itemIndex);
    updateMenu({ sections: newSections });
  };

  const updateMenuItem = (sectionIndex: number, itemIndex: number, updates: Partial<typeof data.menu.sections[0]['items'][0]>) => {
    const newSections = [...(data.menu.sections || [])];
    newSections[sectionIndex].items[itemIndex] = {
      ...newSections[sectionIndex].items[itemIndex],
      ...updates
    };
    updateMenu({ sections: newSections });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Заголовок</label>
            <Input
              value={data.menu.title}
              onChange={(e) => updateMenu({ title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Описание</label>
            <Textarea
              value={data.menu.description}
              onChange={(e) => updateMenu({ description: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium mb-1">Изображения меню</label>
          <div className="grid grid-cols-2 gap-4">
            {(data.menu.images || []).map((image, index) => (
              <div key={index} className="relative">
                <ImageUpload
                  value={image}
                  onChange={(url) => {
                    const newImages = [...(data.menu.images || [])];
                    newImages[index] = url;
                    updateMenu({ images: newImages });
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2"
                  onClick={() => {
                    updateMenu({
                      images: (data.menu.images || []).filter((_, i) => i !== index)
                    });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="h-[200px]"
              onClick={() => updateMenu({ images: [...(data.menu.images || []), ""] })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Добавить
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Разделы меню</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSection}
          >
            <Plus className="h-4 w-4 mr-2" />
            Добавить раздел
          </Button>
        </div>

        <div className="space-y-6">
          {(data.menu.sections || []).map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <Input
                  placeholder="Название раздела"
                  value={section.title}
                  onChange={(e) => updateSection(sectionIndex, { title: e.target.value })}
                  className="max-w-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeSection(sectionIndex)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-4">
                      <Input
                        placeholder="Название блюда"
                        value={item.name}
                        onChange={(e) => updateMenuItem(sectionIndex, itemIndex, { name: e.target.value })}
                      />
                    </div>
                    <div className="col-span-6">
                      <Textarea
                        placeholder="Описание"
                        value={item.description}
                        onChange={(e) => updateMenuItem(sectionIndex, itemIndex, { description: e.target.value })}
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        placeholder="Цена"
                        value={item.price}
                        onChange={(e) => updateMenuItem(sectionIndex, itemIndex, { price: e.target.value })}
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeMenuItem(sectionIndex, itemIndex)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addMenuItem(sectionIndex)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить блюдо
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <IconPicker
          label="Иконка меню"
          value={data.menu.icon || "UtensilsCrossed"}
          onChange={(icon) => updateMenu({ icon })}
        />
      </div>
    </div>
  );
} 