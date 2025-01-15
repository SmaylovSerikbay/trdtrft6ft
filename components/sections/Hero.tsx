import Image from "next/image";

interface HeroProps {
  image: string;
  title: string;
  description: string;
  tags: string[];
}

export function Hero({ image, title, description, tags }: HeroProps) {
  return (
    <section className="relative h-[80vh] min-h-[600px]">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container relative h-full flex flex-col justify-center text-white">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-8 max-w-2xl">{description}</p>
        
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/10 backdrop-blur rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
} 