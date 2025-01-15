"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IconDisplayProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  label?: string;
}

export function IconDisplay({ icon: Icon, size = 24, className, label }: IconDisplayProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-neutral-900">
          {label}
        </label>
      )}
      <div className={cn(
        "flex items-center justify-center rounded-lg border border-neutral-200",
        "bg-white p-4 shadow-sm transition-colors hover:bg-neutral-50",
        className
      )}>
        <Icon size={size} className="text-neutral-600" />
      </div>
    </div>
  );
} 