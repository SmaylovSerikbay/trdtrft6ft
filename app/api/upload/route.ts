import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        if (!file) {
            return NextResponse.json(
                { error: "No file received." },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Создаем уникальное имя файла
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name}`;
        
        // Путь для сохранения
        const filepath = path.join(process.cwd(), "public/uploads", filename);
        
        // Сохраняем файл
        await writeFile(filepath, buffer);
        
        // Возвращаем URL для доступа к файлу
        return NextResponse.json({ 
            url: `/uploads/${filename}` 
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json(
            { error: "Error uploading file." },
            { status: 500 }
        );
    }
} 