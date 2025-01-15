import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { PLACEHOLDERS } from "../../constants";
import { BrandFormData } from "../../types";

export const AtmospherePreview = ({ formData }: { formData: BrandFormData }) => {
  const images = formData?.atmosphere?.images || [PLACEHOLDERS.GALLERY, PLACEHOLDERS.GALLERY, PLACEHOLDERS.GALLERY];

  return (
    <section className="py-32">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-7xl font-bold text-center mb-24 tracking-wider">
          {formData?.atmosphere?.title || "АТМОСФЕРА"}
        </h2>
        <div className="grid grid-cols-3 gap-16">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <ImageWithFallback
                src={image}
                fallbackSrc={PLACEHOLDERS.GALLERY}
                alt={`Atmosphere ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 