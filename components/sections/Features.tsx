
interface Feature {
  title: string;
  description: string;
}

interface FeaturesProps {
  features: Feature[];
}

export function Features({ features }: FeaturesProps) {
  if (!features?.length) return null;

  return (
    <section className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
} 