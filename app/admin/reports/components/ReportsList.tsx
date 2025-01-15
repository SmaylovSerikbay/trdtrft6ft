"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ReportForm } from "./ReportForm";

interface PhotoReport {
    id: string;
    title: string;
    city: string;
    venue: string;
    photographer: string;
    preview: string;
    folderPath: string;
    publishedAt: Date;
}

export function ReportsList() {
    const [reports, setReports] = useState<PhotoReport[]>([]);
    const [editingReport, setEditingReport] = useState<PhotoReport | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchReports = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/reports');
            if (!response.ok) throw new Error('Failed to fetch reports');
            const data = await response.json();
            setReports(data);
        } catch (error) {
            console.error('Error:', error);
            toast.error("Ошибка при загрузке репортажей");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Вы уверены, что хотите удалить этот репортаж?')) return;

        try {
            const response = await fetch(`/api/reports/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete report');
            
            toast.success("Репортаж удален");
            fetchReports(); // Обновляем список
        } catch (error) {
            console.error('Error:', error);
            toast.error("Ошибка при удалении репортажа");
        }
    };

    if (isLoading) return <div>Загрузка...</div>;

    if (editingReport) {
        return (
            <div>
                <Button 
                    variant="outline" 
                    onClick={() => setEditingReport(null)}
                    className="mb-4"
                >
                    Назад к списку
                </Button>
                <ReportForm 
                    initialData={editingReport}
                    onSuccess={() => {
                        setEditingReport(null);
                        fetchReports();
                    }}
                />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="grid gap-4">
                {reports.map((report) => (
                    <div 
                        key={report.id} 
                        className="flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-gray-800"
                    >
                        <div className="flex items-center gap-4">
                            <img 
                                src={report.preview} 
                                alt={report.title}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div>
                                <h3 className="font-medium">{report.title}</h3>
                                <p className="text-sm text-gray-500">
                                    {report.city} • {report.venue}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {format(new Date(report.publishedAt), "dd MMMM yyyy", { locale: ru })}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setEditingReport(report)}
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDelete(report.id)}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 