import { cn } from "@/lib/utils";

interface FormSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ children, className }: FormSectionProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg border border-neutral-200 p-6",
      className
    )}>
      <div className="grid gap-6">
        {children}
      </div>
    </div>
  );
} 