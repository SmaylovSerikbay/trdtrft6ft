"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { AnoncesForm } from "./components/AnoncesForm";

interface Anonce {
  id: string;
  title: string;
  text: string;
}

interface Section {
  id: string;
  header: string;
  anonces: Anonce[];
}

export default function AnoncesPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [editingAnonce, setEditingAnonce] = useState<Anonce | null>(null);
  const [editingSection, setEditingSection] = useState<Section | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/anonce-sections");
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm("Удалить секцию и все анонсы в ней?")) return;

    try {
      const response = await fetch(`/api/anonce-sections/${sectionId}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Ошибка удаления");

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAnonce = async (anonceId: string) => {
    if (!confirm("Удалить анонс?")) return;

    try {
      const response = await fetch(`/api/anonces/${anonceId}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Ошибка удаления");

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Анонсы</h1>
        <Button onClick={() => {
          setSelectedSection(null);
          setEditingAnonce(null);
          setEditingSection(null);
          setShowForm(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Новая секция
        </Button>
      </div>

      {sections.map(section => (
        <div key={section.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{section.header}</h2>
            <div className="flex gap-2">
              <Button onClick={() => {
                setSelectedSection(section.id);
                setEditingAnonce(null);
                setEditingSection(null);
                setShowForm(true);
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Добавить анонс
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedSection(section.id);
                  setEditingAnonce(null);
                  setEditingSection(section);
                  setShowForm(true);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteSection(section.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {section.anonces.map(anonce => (
              <div key={anonce.id} className="border p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{anonce.title}</h3>
                  <p className="text-sm text-gray-500">{anonce.text}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedSection(section.id);
                      setEditingAnonce(anonce);
                      setShowForm(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteAnonce(anonce.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showForm && (
        <AnoncesForm 
          onClose={() => {
            setShowForm(false);
            setSelectedSection(null);
            setEditingAnonce(null);
            setEditingSection(null);
            fetchData();
          }}
          isNewSection={!selectedSection}
          sectionId={selectedSection || undefined}
          editingAnonce={editingAnonce}
          editingSection={editingSection}
        />
      )}
    </div>
  );
} 