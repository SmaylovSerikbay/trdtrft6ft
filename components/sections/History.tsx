interface HistoryProps {
  title: string;
  description: string;
}

export function History({ title, description }: HistoryProps) {
  if (!title && !description) return null;

  return (
    <section className="container py-16">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <div 
          className="prose dark:prose-invert mx-auto"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </section>
  );
} 