import { saveAs } from "file-saver";
import JSZip from "jszip";

export async function downloadFiles(files: { url: string; name: string }[], zipName: string) {
  const zip = new JSZip();
  
  // Загружаем все файлы
  const filePromises = files.map(async (file) => {
    const response = await fetch(file.url);
    const blob = await response.blob();
    zip.file(file.name, blob);
  });

  await Promise.all(filePromises);
  
  // Создаем и скачиваем архив
  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, `${zipName}.zip`);
} 