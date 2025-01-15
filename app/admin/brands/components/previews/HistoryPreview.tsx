import Image from "next/image";
import { PLACEHOLDERS } from "../../constants";
import { BrandFormData } from "../../types";

export const HistoryPreview = ({ formData }: { formData: BrandFormData }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">{formData.brandHistory?.title || "История бренда"}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {formData.brandHistory?.description}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={formData.brandHistory?.image || PLACEHOLDERS.HISTORY}
              alt="Brand History"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}; 