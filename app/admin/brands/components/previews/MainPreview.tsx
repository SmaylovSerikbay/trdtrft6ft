import { InfiniteScroller } from "@/components/InfiniteScroller";
import Image from "next/image";
import { BrandFormData } from "../../types";

export const MainPreview = ({ formData }: { formData: BrandFormData }) => {
  return (
    <div className="space-y-0">
      {/* Hero секция */}
      <div className="relative h-screen">
        <Image
          src={formData.mainImage}
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Лого */}
        <div className="absolute top-0 left-0 right-0 p-8 z-10">
          <div className="container mx-auto">
            {formData.logo && (
              <Image
                src={formData.logo}
                alt="Logo"
                width={200}
                height={80}
                className="object-contain brightness-0 invert"
              />
            )}
          </div>
        </div>

        {/* Заголовок и описание */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
          <h1 className="text-8xl font-bold mb-8 text-center tracking-wider">
            {formData.title}
          </h1>
          <p className="text-3xl text-center max-w-4xl mx-auto font-light tracking-wide">
            {formData.description}
          </p>
        </div>
      </div>

      {/* Бегущая строка */}
      {formData.scrollerTexts.length > 0 && (
        <div className="bg-black text-white py-8 text-2xl tracking-widest">
          <InfiniteScroller texts={formData.scrollerTexts.map(text => text.toUpperCase())} />
        </div>
      )}
    </div>
  );
}; 