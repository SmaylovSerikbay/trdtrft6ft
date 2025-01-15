"use client";

import { cn } from "@/lib/utils";

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({ children, className }: SectionCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg border border-neutral-200 p-6 shadow-sm",
      className
    )}>
      {children}
    </div>
  );
} 