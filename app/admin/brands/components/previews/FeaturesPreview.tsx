import Image from "next/image";
import { PLACEHOLDERS } from "../../constants";
import { BrandFormData } from "../../types";

export const FeaturesPreview = ({ formData }: { formData: BrandFormData }) => {
  return (
    <div className="space-y-32">
      {/* Features */}
      <section className="py-32">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-7xl font-bold text-center mb-24 tracking-wider">
            ОСОБЕННОСТИ
          </h2>
          <div className="grid grid-cols-2 gap-16">
            {formData.features.map((feature, index) => (
              <div key={index} className="p-16 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors duration-500">
                <h3 className="text-4xl font-bold mb-8 tracking-wide leading-tight">
                  {feature.title}
                </h3>
                <p className="text-2xl text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-32 bg-black text-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-7xl font-bold text-center mb-24 tracking-wider">
            СПЕЦИАЛЬНЫЕ ПРЕДЛОЖЕНИЯ
          </h2>
          <div className="grid grid-cols-3 gap-16">
            {formData.specialOffers.map((offer, index) => (
              <div key={index} className="group">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-10">
                  <Image
                    src={offer.image || PLACEHOLDERS.GALLERY}
                    alt={offer.title || `Offer ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-opacity duration-1000 group-hover:opacity-0" />
                </div>
                <h3 className="text-3xl font-bold mb-6 tracking-wide">
                  {offer.title}
                </h3>
                <p className="text-xl text-neutral-400 leading-relaxed">
                  {offer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}; 