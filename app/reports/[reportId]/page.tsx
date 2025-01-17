"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SafeImage } from "@/components/ui/SafeImage";
import { Separator } from "@/components/ui/separator";
import { downloadFiles } from "@/lib/download";
import { getYandexDiskFiles } from "@/lib/yandex-disk";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Download, MoreHorizontal, Share2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";

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

interface Photo {
   id: string;
   name: string;
   url: string;
   file?: string;
}

interface PageProps {
   params: {
      reportId: string;
   };
}

export default function ReportPage({ params }: PageProps) {
   const [report, setReport] = useState<PhotoReport | null>(null);
   const [photos, setPhotos] = useState<Photo[]>([]);
   const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
   const [page, setPage] = useState(1);
   const photosPerPage = 20;

   // Используем ref для отслеживания прокрутки
   const { ref, inView } = useInView({
      threshold: 0,
      rootMargin: '100px',
   });

   // Загрузка данных репортажа и всех фотографий
   useEffect(() => {
      async function fetchData() {
         try {
            setIsLoading(true);
            const reportRes = await fetch(`/api/reports/${params.reportId}`);
            if (!reportRes.ok) throw new Error('Failed to fetch report');
            const reportData = await reportRes.json();
            setReport(reportData);

            const photosData = await getYandexDiskFiles(reportData.folderPath);
            setPhotos(photosData);
            // Показываем первые 20 фотографий
            setDisplayedPhotos(photosData.slice(0, photosPerPage));
         } catch (error) {
            console.error('Error:', error);
            toast.error("Ошибка при загрузке репортажа");
         } finally {
            setIsLoading(false);
         }
      }

      fetchData();
   }, [params.reportId]);

   // Подгружаем больше фотографий при прокрутке
   useEffect(() => {
      if (inView && !isLoading && displayedPhotos.length < photos.length) {
         const nextPhotos = photos.slice(0, (page + 1) * photosPerPage);
         setDisplayedPhotos(nextPhotos);
         setPage((prev: number) => prev + 1);
      }
   }, [inView, photos, page, isLoading]);

   const handlePhotoSelect = (photoId: string) => {
      setSelectedPhotos((prev: Set<string>) => {
         const newSet = new Set(prev);
         if (newSet.has(photoId)) {
            newSet.delete(photoId);
         } else {
            newSet.add(photoId);
         }
         return newSet;
      });
   };

   const handleDownloadSelected = async () => {
      try {
         const selectedPhotosList = photos.filter((photo: Photo) => selectedPhotos.has(photo.id));
         
         for (const photo of selectedPhotosList) {
            const response = await fetch(
               `/api/yandex-disk/download?path=${encodeURIComponent(photo.name)}&folderPath=${encodeURIComponent(report?.folderPath || '')}`
            );
            if (!response.ok) throw new Error('Failed to download file');
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = photo.name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            // Добавляем небольшую задержку между скачиваниями
            await new Promise(resolve => setTimeout(resolve, 500));
         }

         toast.success(`Скачано ${selectedPhotosList.length} фото`);
      } catch (error) {
         console.error('Error downloading files:', error);
         toast.error("Ошибка при скачивании файлов");
      }
   };

   const handleDownloadAll = async () => {
      if (!report) return null;

      try {
         await downloadFiles(
            photos.map((photo: Photo) => ({
               url: photo.url,
               name: photo.name
            })),
            report.title
         );
         toast.success("Все файлы успешно скачаны");
      } catch (error) {
         console.error('Error downloading photos:', error);
         toast.error("Ошибка при скачивании файлов");
      }
   };

   const handleShareReport = async () => {
      if (navigator.share) {
         try {
            await navigator.share({
               title: report?.title,
               text: `Фотоотчет ${report?.title} - ${report?.venue}, ${report?.city}`,
               url: window.location.href,
            });
         } catch (error) {
            console.error('Error sharing:', error);
         }
      } else {
         // Fallback для браузеров без поддержки Web Share API
         navigator.clipboard.writeText(window.location.href);
         // Показать уведомление о копировании ссылки
      }
   };

   const handleDownloadSingle = async (photo: Photo) => {
      try {
         const response = await fetch(`/api/yandex-disk/download?path=${encodeURIComponent(photo.name)}&folderPath=${encodeURIComponent(report?.folderPath || '')}`);
         if (!response.ok) throw new Error('Failed to download file');
         
         const blob = await response.blob();
         const url = window.URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.href = url;
         a.download = photo.name;
         document.body.appendChild(a);
         a.click();
         window.URL.revokeObjectURL(url);
         document.body.removeChild(a);
         toast.success("Фото успешно скачано");
      } catch (error) {
         console.error('Error downloading file:', error);
         toast.error("Ошибка при скачивании фото");
      }
   };

   if (isLoading) return <Loader />;
   if (!report) return <div>Репортаж не найден</div>;

   return (
      <div className="wrapper">
         <Header />
         <main>
            <section className="pt-5 pb-20 md:pt-[6.125rem]">
               <div className="container">
                  <Breadcrumb className="mb-10 sm:mb-[3.5625rem]">
                     <BreadcrumbList className="uppercase text-black sm:text-base dark:text-white">
                        <BreadcrumbItem>
                           <BreadcrumbLink href="/" className="font-bold hover:underline">
                              главная страница
                           </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        <BreadcrumbItem>
                           <BreadcrumbLink href="/reports" className="font-bold hover:underline">
                              Фото и видео
                           </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        <BreadcrumbItem>
                           <BreadcrumbPage className="font-bold">
                              {report.title}
                           </BreadcrumbPage>
                        </BreadcrumbItem>
                     </BreadcrumbList>
                  </Breadcrumb>

                  <div className="mb-12">
                     <h1 className="mb-6 text-2xl font-bold uppercase sm:text-5xl">
                        {report.title}
                     </h1>
                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex items-center gap-2">
                           <span className="text-muted-foreground">Город:</span>
                           <span className="font-medium">{report.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-muted-foreground">Заведение:</span>
                           <span className="font-medium">{report.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-muted-foreground">Фотограф:</span>
                           <span className="font-medium">{report.photographer}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-muted-foreground">Дата:</span>
                           <span className="font-medium">
                              {format(new Date(report.publishedAt), "dd MMMM yyyy", { locale: ru })}
                           </span>
                        </div>
                     </div>
                  </div>

                  <Separator className="mb-8 bg-black" />

                  <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                     <div className="flex flex-wrap gap-4">
                        <Button 
                           variant="outline"
                           onClick={handleDownloadSelected}
                           disabled={selectedPhotos.size === 0}
                        >
                           <Download className="mr-2 h-4 w-4" />
                           Скачать выбранные по отдельности ({selectedPhotos.size})
                        </Button>
                        <Button variant="outline" onClick={handleDownloadAll}>
                           <Download className="mr-2 h-4 w-4" />
                           Скачать все архивом ({photos.length})
                        </Button>
                        <Button variant="outline" onClick={handleShareReport}>
                           <Share2 className="mr-2 h-4 w-4" />
                           Поделиться
                        </Button>
                     </div>
                     <div className="text-sm text-muted-foreground">
                        Всего фотографий: {photos.length}
                     </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
                     {displayedPhotos.map((photo: Photo) => (
                        <Dialog key={photo.id}>
                           <div className="group relative cursor-pointer">
                              <DialogTrigger asChild>
                                 <div className="aspect-[4/3] w-full rounded-lg overflow-hidden">
                                    <SafeImage
                                       src={photo.url}
                                       alt={photo.name}
                                       fill
                                       className="object-cover"
                                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                 </div>
                              </DialogTrigger>
                              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                 <div className="flex items-center gap-2">
                                    <DialogTrigger asChild>
                                       <Button variant="ghost" className="text-white">
                                          Открыть
                                       </Button>
                                    </DialogTrigger>
                                    <DropdownMenu>
                                       <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="text-white">
                                             <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                       </DropdownMenuTrigger>
                                       <DropdownMenuContent>
                                          <DropdownMenuItem onClick={() => handleDownloadSingle(photo)}>
                                             <Download className="mr-2 h-4 w-4" />
                                             Скачать фото
                                          </DropdownMenuItem>
                                       </DropdownMenuContent>
                                    </DropdownMenu>
                                 </div>
                              </div>
                              <input
                                 type="checkbox"
                                 className="absolute left-2 top-2 h-5 w-5 cursor-pointer rounded border-2 border-white bg-transparent checked:bg-white"
                                 checked={selectedPhotos.has(photo.id)}
                                 onChange={() => handlePhotoSelect(photo.id)}
                                 onClick={(e) => e.stopPropagation()}
                              />
                           </div>
                           <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-none bg-transparent">
                              <div className="relative flex items-center justify-center w-full h-full bg-black/90">
                                 <SafeImage
                                    src={photo.url}
                                    alt={photo.name}
                                    className="max-w-full max-h-[90vh] object-contain"
                                    width={1920}
                                    height={1080}
                                    priority
                                 />
                                 <div className="absolute right-4 top-4 flex gap-2">
                                    <Button
                                       variant="ghost"
                                       className="text-white hover:bg-white/20 rounded-full"
                                       onClick={() => handleDownloadSingle(photo)}
                                    >
                                       <Download className="h-5 w-5" />
                                    </Button>
                                    <DialogTrigger asChild>
                                       <Button
                                          variant="ghost"
                                          className="text-white hover:bg-white/20 rounded-full"
                                       >
                                          <X className="h-5 w-5" />
                                       </Button>
                                    </DialogTrigger>
                                 </div>
                              </div>
                           </DialogContent>
                        </Dialog>
                     ))}
                  </div>

                  {/* Элемент для отслеживания прокрутки */}
                  {displayedPhotos.length < photos.length && (
                     <div 
                        ref={ref}
                        className="flex justify-center py-8"
                     >
                        <div className="animate-spin h-6 w-6 border-2 border-gray-300 rounded-full border-t-gray-600" />
                     </div>
                  )}

                  <div className="text-sm text-muted-foreground text-center mt-4">
                     Показано {displayedPhotos.length} из {photos.length} фотографий
                  </div>
               </div>
            </section>
         </main>
         <Footer />
      </div>
   );
} 