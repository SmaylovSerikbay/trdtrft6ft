import { getImageUrl } from "@/app/admin/brands/utils";
import { SafeImage } from "../ui/SafeImage";

interface BottomGalleryProps {
  images: string[];
}

export function BottomGallery({ images }: BottomGalleryProps) {
  if (!images?.length) return null;

  // Фильтруем и валидируем URL изображений
  const validImages = images
    .map(getImageUrl)
    .filter(url => url !== '/images/placeholder.jpg');

  if (!validImages.length) return null;

  return (
    <section className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {validImages.map((url, index) => (
          <div key={index} className="relative aspect-video">
            <SafeImage
              src={url}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
} 