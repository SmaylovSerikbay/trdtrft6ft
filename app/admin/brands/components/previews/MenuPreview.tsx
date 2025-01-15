import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { PLACEHOLDERS } from "../../constants";
import { BrandFormData } from "../../types";

export const MenuPreview = ({ formData }: { formData: BrandFormData }) => {
  return (
    <section className="py-32">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-7xl font-bold text-center mb-10 tracking-wider">
          {formData.menuTitle || "МЕНЮ"}
        </h2>
        <p className="text-2xl text-center text-neutral-600 mb-24 max-w-4xl mx-auto leading-relaxed">
          {formData.menuText}
        </p>
        <div className="grid grid-cols-2 gap-16">
          {(formData.menuImages || []).map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
            >
              <ImageWithFallback
                src={image || null}
                fallbackSrc={PLACEHOLDERS.MENU}
                alt={`Menu ${index + 1}`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-1000 group-hover:opacity-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 