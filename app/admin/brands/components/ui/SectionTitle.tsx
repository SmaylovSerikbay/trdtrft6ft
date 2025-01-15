interface SectionTitleProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function SectionTitle({ title, description, children }: SectionTitleProps) {
  return (
    <div className="flex items-start justify-between pb-6 mb-6 border-b">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-neutral-500">{description}</p>
        )}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
} 