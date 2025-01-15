import Image from "next/image";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";

const members = [
   {
      id: crypto.randomUUID(),
      src: "/staff/portret.jpeg",
      fullName: "Павлова Анна Викторовна",
      position: "Менеджер ресторана",
   },
   {
      id: crypto.randomUUID(),
      src: "/staff/portret.jpeg",
      fullName: "Павлова Анна Викторовна",
      position: "Менеджер ресторана",
   },
   {
      id: crypto.randomUUID(),
      src: "/staff/portret.jpeg",
      fullName: "Павлова Анна Викторовна",
      position: "Менеджер ресторана",
   },
   {
      id: crypto.randomUUID(),
      src: "/staff/portret.jpeg",
      fullName: "Павлова Анна Викторовна",
      position: "Менеджер ресторана",
   },
   {
      id: crypto.randomUUID(),
      src: "/staff/portret.jpeg",
      fullName: "Павлова Анна Викторовна",
      position: "Менеджер ресторана",
   },
   {
      id: crypto.randomUUID(),
      src: "/staff/portret.jpeg",
      fullName: "Павлова Анна Викторовна",
      position: "Менеджер ресторана",
   },
   {
      id: crypto.randomUUID(),
      src: "/staff/portret.jpeg",
      fullName: "Павлова Анна Викторовна",
      position: "Менеджер ресторана",
   },
   {
      id: crypto.randomUUID(),
      src: "/staff/portret.jpeg",
      fullName: "Павлова Анна Викторовна",
      position: "Менеджер ресторана",
   },
];

export default function Staff() {
   return (
      <section className="pb-10 pt-7 sm:pb-24 md:pb-48 md:pt-14">
         <div className="container">
            <h2 className="mb-7 text-3xl font-bold uppercase sm:text-[2.6875rem] md:mb-[2.5625rem]">
               команда
            </h2>
            <div className="mb-10 space-y-4 text-2xl md:mb-12 lg:mb-24">
               <p>Команда — наша душа, наш успех.</p>
               <p>
                  В каждом проекте, в каждой детали и в каждом достижении есть
                  одна важная составляющая — люди. В Holy Melon Management мы
                  уверены, что настоящая сила компании заключается в её команде.
               </p>
            </div>
            <Accordion type="multiple">
               <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="uppercase">
                     aho restaurant
                  </AccordionTrigger>
                  <AccordionContent>
                     <div className="grid auto-cols-[9.8125rem] grid-cols-1 gap-6 md:grid-cols-2 min-[1440px]:grid-cols-3">
                        {members.map((member) => (
                           <div key={member.id} className="flex gap-5 lg:gap-10">
                              <div>
                                 <Image
                                    src={member.src}
                                    width={147}
                                    height={157}
                                    alt={member.fullName}
                                    className="aspect-[147/157] object-cover"
                                 />
                              </div>
                              <div className="space-y-[.4375rem] text-sm lg:text-xl xl:text-2xl">
                                 <h4>{member.fullName}</h4>
                                 <p className="font-light">{member.position}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-2" className="border-none">
                  <AccordionTrigger className="uppercase">
                     Shishka Botanic
                  </AccordionTrigger>
                  <AccordionContent>
                     <div className="grid auto-cols-[9.8125rem] grid-cols-1 gap-6 md:grid-cols-2 min-[1440px]:grid-cols-3">
                        {members.map((member) => (
                           <div key={member.id} className="flex gap-5 lg:gap-10">
                              <div>
                                 <Image
                                    src={member.src}
                                    width={147}
                                    height={157}
                                    alt={member.fullName}
                                    className="aspect-[147/157] object-cover"
                                 />
                              </div>
                              <div className="space-y-[.4375rem] text-sm lg:text-xl xl:text-2xl">
                                 <h4>{member.fullName}</h4>
                                 <p className="font-light">{member.position}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-3" className="border-none">
                  <AccordionTrigger className="uppercase">
                     SHISHKA HIGHVILL
                  </AccordionTrigger>
                  <AccordionContent>
                     <div className="grid auto-cols-[9.8125rem] grid-cols-1 gap-6 md:grid-cols-2 min-[1440px]:grid-cols-3">
                        {members.map((member) => (
                           <div key={member.id} className="flex gap-5 lg:gap-10">
                              <div>
                                 <Image
                                    src={member.src}
                                    width={147}
                                    height={157}
                                    alt={member.fullName}
                                    className="aspect-[147/157] object-cover"
                                 />
                              </div>
                              <div className="space-y-[.4375rem] text-sm lg:text-xl xl:text-2xl">
                                 <h4>{member.fullName}</h4>
                                 <p className="font-light">{member.position}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-4" className="border-none">
                  <AccordionTrigger className="uppercase">
                     Shishka Alpha
                  </AccordionTrigger>
                  <AccordionContent>
                     <div className="grid auto-cols-[9.8125rem] grid-cols-1 gap-6 md:grid-cols-2 min-[1440px]:grid-cols-3">
                        {members.map((member) => (
                           <div key={member.id} className="flex gap-5 lg:gap-10">
                              <div>
                                 <Image
                                    src={member.src}
                                    width={147}
                                    height={157}
                                    alt={member.fullName}
                                    className="aspect-[147/157] object-cover"
                                 />
                              </div>
                              <div className="space-y-[.4375rem] text-sm lg:text-xl xl:text-2xl">
                                 <h4>{member.fullName}</h4>
                                 <p className="font-light">{member.position}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-5" className="border-none">
                  <AccordionTrigger className="uppercase">
                     Shishka Republic
                  </AccordionTrigger>
                  <AccordionContent>
                     <div className="grid auto-cols-[9.8125rem] grid-cols-1 gap-6 md:grid-cols-2 min-[1440px]:grid-cols-3">
                        {members.map((member) => (
                           <div key={member.id} className="flex gap-5 lg:gap-10">
                              <div>
                                 <Image
                                    src={member.src}
                                    width={147}
                                    height={157}
                                    alt={member.fullName}
                                    className="aspect-[147/157] object-cover"
                                 />
                              </div>
                              <div className="space-y-[.4375rem] text-sm lg:text-xl xl:text-2xl">
                                 <h4>{member.fullName}</h4>
                                 <p className="font-light">{member.position}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-6" className="border-none">
                  <AccordionTrigger className="uppercase">
                     Shishka Premium
                  </AccordionTrigger>
                  <AccordionContent>
                     <div className="grid auto-cols-[9.8125rem] grid-cols-1 gap-6 md:grid-cols-2 min-[1440px]:grid-cols-3">
                        {members.map((member) => (
                           <div key={member.id} className="flex gap-5 lg:gap-10">
                              <div>
                                 <Image
                                    src={member.src}
                                    width={147}
                                    height={157}
                                    alt={member.fullName}
                                    className="aspect-[147/157] object-cover"
                                 />
                              </div>
                              <div className="space-y-[.4375rem] text-sm lg:text-xl xl:text-2xl">
                                 <h4>{member.fullName}</h4>
                                 <p className="font-light">{member.position}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-7" className="border-none">
                  <AccordionTrigger className="uppercase">
                     SHISHKA EDITION
                  </AccordionTrigger>
                  <AccordionContent>
                     <div className="grid auto-cols-[9.8125rem] grid-cols-1 gap-6 md:grid-cols-2 min-[1440px]:grid-cols-3">
                        {members.map((member) => (
                           <div key={member.id} className="flex gap-5 lg:gap-10">
                              <div>
                                 <Image
                                    src={member.src}
                                    width={147}
                                    height={157}
                                    alt={member.fullName}
                                    className="aspect-[147/157] object-cover"
                                 />
                              </div>
                              <div className="space-y-[.4375rem] text-sm lg:text-xl xl:text-2xl">
                                 <h4>{member.fullName}</h4>
                                 <p className="font-light">{member.position}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </AccordionContent>
               </AccordionItem>
            </Accordion>
         </div>
      </section>
   );
}
