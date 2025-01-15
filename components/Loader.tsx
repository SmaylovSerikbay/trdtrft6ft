import Image from "next/image";

export default function Loader() {
   return (
      <div className="flex flex-col items-center justify-center text-center">
         <Image
            src="/loader.png"
            width={100}
            height={130}
            alt="загрузка"
            className="mb-4 inline-block"
         />
         <p className="text-2xl font-bold uppercase">Загрузка ...</p>
      </div>
   );
}
