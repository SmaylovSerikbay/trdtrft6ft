import { cn } from "@/lib/utils";

interface BentoGridProps {
   className?: string;
   children?: React.ReactNode;
}

interface BentoGridItemProps {
   className?: string;
}

export function BentoGrid({ className, children }: BentoGridProps) {
   return (
      <div
         className={cn(
            "mb-14 grid auto-rows-[300px] grid-cols-3 gap-5 min-[480px]:grid-cols-6 sm:mb-16 md:mb-20 md:auto-rows-[500px] lg:mb-28 lg:grid-cols-9 xl:mb-[8.4375rem] xl:grid-cols-12",
            className,
         )}
      >
         {children}
      </div>
   );
}

export function BentoGridItem({ className }: BentoGridItemProps) {
   return <div className={cn("col-span-3", className)}></div>;
}
