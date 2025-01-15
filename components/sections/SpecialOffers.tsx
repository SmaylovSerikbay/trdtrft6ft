interface Offer {
  title: string;
  description: string;
}

interface SpecialOffersProps {
  offers: Offer[];
}

export function SpecialOffers({ offers }: SpecialOffersProps) {
  if (!offers?.length) return null;

  return (
    <section className="container py-16 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-12">
        Специальные предложения
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4">{offer.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {offer.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
} 