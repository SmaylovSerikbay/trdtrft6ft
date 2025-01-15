"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ReportForm } from "./components/ReportForm";
import { ReportsList } from "./components/ReportsList";

export default function ReportsPage() {
    const [isCreating, setIsCreating] = useState(false);

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Управление репортажами</h1>
                <Button onClick={() => setIsCreating(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить репортаж
                </Button>
            </div>

            {isCreating ? (
                <div>
                    <Button 
                        variant="outline" 
                        onClick={() => setIsCreating(false)}
                        className="mb-4"
                    >
                        Назад к списку
                    </Button>
                    <ReportForm 
                        onSuccess={() => {
                            setIsCreating(false);
                        }}
                    />
                </div>
            ) : (
                <ReportsList />
            )}
        </div>
    );
} 