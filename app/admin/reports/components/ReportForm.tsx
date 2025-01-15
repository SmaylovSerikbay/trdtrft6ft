"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUpload } from "@/hooks/use-upload";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
    title: z.string().min(1, "Обязательное поле"),
    city: z.string().min(1, "Обязательное поле"),
    venue: z.string().min(1, "Обязательное поле"),
    photographer: z.string().min(1, "Обязательное поле"),
    preview: z.string().min(1, "Добавьте обложку"),
    folderPath: z.string().min(1, "Укажите путь к папке"),
    publishedAt: z.date(),
});

const cities = ["Алматы", "Астана", "Усть-Каменогорск", "Атырау", "Шымкент"];
const venues = ["AHO RESTAURANT", "BEREZKA", "SHISHKA", "SHISHKA PREMIUM"];

interface ReportFormProps {
    initialData?: PhotoReport;
    onSuccess?: () => void;
}

export function ReportForm({ initialData, onSuccess }: ReportFormProps) {
    const { startUpload } = useUpload();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            publishedAt: new Date(),
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const url = initialData 
                ? `/api/reports/${initialData.id}`
                : "/api/reports";
            
            const method = initialData ? "PATCH" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!response.ok) throw new Error("Ошибка при сохранении");
            
            toast.success(initialData 
                ? "Репортаж обновлен" 
                : "Репортаж создан"
            );
            
            form.reset();
            onSuccess?.();
        } catch (error) {
            console.error("Error:", error);
            toast.error("Ошибка при сохранении репортажа");
        }
    }

    const handleImageUpload = async (file: File) => {
        try {
            const imageUrl = await startUpload(file);
            if (imageUrl) {
                form.setValue("preview", imageUrl);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Ошибка при загрузке изображения");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Название репортажа</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="preview"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Обложка репортажа</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-4">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                handleImageUpload(file);
                                            }
                                        }}
                                    />
                                    {field.value && (
                                        <img
                                            src={field.value}
                                            alt="Preview"
                                            className="h-20 w-20 object-cover"
                                        />
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="folderPath"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Путь к папке на Яндекс.Диске</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="/aho restaurant" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Город</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите город" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {cities.map((city) => (
                                        <SelectItem key={city} value={city}>
                                            {city}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Заведение</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите заведение" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {venues.map((venue) => (
                                        <SelectItem key={venue} value={venue}>
                                            {venue}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="photographer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Фотограф</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="publishedAt"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Дата публикации</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP", { locale: ru })
                                            ) : (
                                                <span>Выберите дату</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                        locale={ru}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">
                    {initialData ? "Сохранить изменения" : "Создать репортаж"}
                </Button>
            </form>
        </Form>
    );
} 