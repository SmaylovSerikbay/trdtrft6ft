import { Forward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IconButtonProps {
   icon: React.ElementType;
   size?: number;
   iconClassName?: string;
   className?: string;
   href?: string;
}

export default function IconButton({
   icon: Icon,
   size = 40,
   iconClassName,
   className,
   href = "",
}: IconButtonProps) {
   function handleCopyClick() {
      async function getUrl() {
         const shareData = {
            url: window.location.href,
         };

         try {
            await navigator.share(shareData);
         } catch (err) {
            console.error(err);
         }
      }
      getUrl();
   }

   if (Icon === Forward)
      return (
         <Button
            onClick={handleCopyClick}
            className={cn(
               "inline-flex size-[4.375rem] items-center justify-center rounded-full bg-neutral-100 text-black transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 [&_svg]:size-auto",
               className,
            )}
         >
            <Forward size={size} className={iconClassName} />
         </Button>
      );

   return (
      <a
         href={href}
         className={cn(
            "inline-flex size-[4.375rem] items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700",
            className,
         )}
      >
         <Icon size={size} className={iconClassName} />
      </a>
   );
}
