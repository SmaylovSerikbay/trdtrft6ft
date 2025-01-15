"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AboutUsForm } from "./components/AboutUsForm";
import { HeroForm } from "./components/HeroForm";

export default function ContentPage() {
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const sections = [
    {
      id: "hero",
      title: "Hero Секция",
      description: "Управление главным баннером и бегущей строкой",
    },
    {
      id: "aboutUs",
      title: "О Нас",
      description: "Управление информацией о компании",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Управление контентом</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div key={section.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {section.description}
            </p>
            <Button onClick={() => setActiveForm(section.id)}>
              <Plus className="w-4 h-4 mr-2" />
              Редактировать
            </Button>
          </div>
        ))}
      </div>

      {activeForm === "hero" && (
        <HeroForm onClose={() => setActiveForm(null)} />
      )}
      {activeForm === "aboutUs" && (
        <AboutUsForm onClose={() => setActiveForm(null)} />
      )}
    </div>
  );
} 