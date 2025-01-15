import Link from "next/link";
import { cn } from "@/lib/utils";
import { getPreview } from "@/api/api";
import { formatDate } from "@/utils/helpers";

export default async function RecentEvents() {
   const ahoPreview = await getPreview("aho restaurant");
   const berezkaPreview = await getPreview("berezka");
   const shishkaPreview = await getPreview("shishka");
   const shishkaPremiumPreview = await getPreview("shishka premium");
   const blaBlaBarPreview = await getPreview("bla bla bar");

   const previews = [
      ahoPreview,
      blaBlaBarPreview,
      berezkaPreview,
      ahoPreview,
      shishkaPremiumPreview,
      shishkaPreview,
      berezkaPreview,
      ahoPreview,
   ];

   return (
      <section className="pb-7 md:pt-10 lg:pt-14">
         <div className="container max-w-[101.75rem]">
            <h2 className="mb-12 text-2xl font-bold uppercase leading-[137.209302%] min-[480px]:text-3xl md:text-4xl">
               недавние события
            </h2>
            <div className="grid auto-rows-[12.5rem] grid-cols-1 gap-5 sm:grid-cols-2 min-[992px]:grid-cols-3 xl:grid-cols-4 xl:grid-rows-[repeat(3,auto)]">
               {previews.map((preview, index) => (
                  <Link
                     key={index}
                     href={`/${preview.title.split(" ").join("")}`}
                     className={cn(
                        [1, 2, 6, 7].includes(index)
                           ? "row-span-1"
                           : "row-span-1 sm:row-span-2",
                        "group relative text-white",
                     )}
                  >
                     <img
                        src={preview.preview}
                        width={384}
                        height={[1, 2, 6, 7].includes(index) ? 230 : 460}
                        className={cn(
                           [1, 2, 6, 7].includes(index)
                              ? "aspect-[384/230]"
                              : "",
                           "size-full rounded-[1.25rem] object-cover brightness-[.5]",
                        )}
                        alt={preview.title}
                     />
                     <p className="absolute left-5 top-6 rounded-[1.25rem] bg-[#212020]/[.7] px-[1.5625rem] py-[.375rem] text-base backdrop-blur-[56px] 2xl:left-[2.375rem] 2xl:top-10 2xl:text-xl">
                        Астана
                     </p>
                     <div className="absolute bottom-6 left-5 2xl:left-[2.375rem]">
                        <p className="max-w-[12.8125rem] font-bold uppercase transition-transform group-hover:translate-x-2 xl:text-xl 2xl:text-3xl">
                           {preview.title}
                        </p>
                        <time
                           dateTime="09-05"
                           className="text-base 2xl:text-xl"
                        >
                           {formatDate(preview.created)}
                        </time>
                     </div>
                  </Link>
               ))}
            </div>
         </div>
      </section>
   );
}
