import Image from "next/image";

export default function Team() {
   return (
      <section className="pt-7 sm:pt-14">
         <div className="container">
            <div className="mb-10 space-y-5 text-center text-2xl font-bold sm:mb-16 sm:space-y-10 md:text-3xl lg:text-4xl">
               <h1>В центре Holy Melon — люди!</h1>
               <p>Команда — наша душа, наш успех.</p>
            </div>
            <div className="mb-10 space-y-7 text-lg sm:text-xl md:mb-16 md:text-2xl lg:mb-28">
               <p>
                  В каждом проекте, в каждой детали и в каждом достижении есть
                  одна важная составляющая — люди. В{" "}
                  <span className="font-bold">Holy Melon Management</span> мы
                  уверены, что настоящая сила компании заключается в её команде.
                  Мы гордимся тем, что наши сотрудники не просто профессионалы,
                  а те, кто вдохновляет и вкладывает свою энергию в создание
                  уникальных впечатлений. Мы понимаем, что успех — это результат
                  не только труда, но и страсти, с которой мы работаем.
               </p>
               <p>
                  Работа в <span className="font-bold">Holy Melon</span> — это
                  путь, который мы проходим вместе, поддерживая и вдохновляя
                  друг друга. Каждый день мы растём и развиваемся, двигаясь к
                  общей цели.
               </p>
               <p>
                  <span className="font-bold">Holy Melon Management</span> — это
                  еще и эмоции, которые мы создаем для наших гостей, а также
                  амбиции, которые мы реализуем вместе.
               </p>
            </div>
            <h2 className="mb-10 text-center text-2xl font-bold md:mb-16 md:text-[2rem]">
               Статистика, которая говорит за себя
            </h2>
            <div className="mb-7 grid auto-rows-[12.5rem] grid-cols-1 gap-5 min-[520px]:grid-cols-2 sm:mb-12 sm:auto-rows-[17.125rem] md:mb-20 md:grid-cols-3 md:gap-[2.625rem] lg:mb-28 lg:grid-cols-4 xl:grid-cols-5">
               <div className="flex flex-col items-center justify-center rounded-[20px] border border-black px-[.9375rem] text-center">
                  Средний стаж работы в компании — от{" "}
                  <span className="font-bold">4-х лет</span>
               </div>
               <div className="flex flex-col items-center justify-center rounded-[20px] border border-black px-[.9375rem] text-center">
                  <span className="font-bold">11 проектов</span> по всему
                  Казахстану
               </div>
               <div className="flex flex-col items-center justify-center rounded-[20px] border border-black px-[.9375rem] text-center">
                  <span className="font-bold">Более + 450</span> сотрудников
               </div>
               <div className="flex flex-col items-center justify-center rounded-[20px] border border-black px-[.9375rem] text-center">
                  Ежегодно обслуживаем{" "}
                  <span className="font-bold">свыше (кол-во) гостей</span>
               </div>
               <div className="flex flex-col items-center justify-center rounded-[20px] border border-black px-[.9375rem] text-center">
                  В Академии гостеприимства прошли обучение{" "}
                  <span className="font-bold">более (кол-во) специалистов</span>
               </div>
            </div>
            <div className="mb-9 rounded-[20px] border border-black/35 px-4 py-6 text-center text-sm sm:mb-12 md:mb-16 md:py-[2.6875rem] md:text-base lg:mb-28 lg:text-lg">
               <div className="mx-auto max-w-[70.1875rem]">
                  <p className="mb-8">
                     Ключ к нашему успеху — в единстве и взаимной поддержке.
                     Каждый день мы вдохновляем друг друга на новые достижения,
                     а вместе достигаем высоких результатов и стремимся к новым
                     вершинам.
                  </p>
                  <p className="font-bold">
                     Хотите стать частью нашей команды?
                  </p>
                  <p>
                     Пишите нам на почту:{" "}
                     <a
                        href="mailto:holymelon.mgmt@gmail.com"
                        className="hover:underline"
                     >
                        holymelon.mgmt@gmail.com
                     </a>
                  </p>
               </div>
            </div>
            <div className="mb-10 space-y-7 md:mb-16 lg:mb-24">
               <h3 className="font-bold">Что такое Holy Melon Management?</h3>
               <p>
                  Представьте себе место, где каждый день превращается в
                  праздник. Мы — это мощная команда, объединенная общей страстью
                  к кулинарии и гостеприимству, создающая уникальные впечатления
                  для каждого посетителя.
               </p>
               <p>
                  Holy Melon Management — это семья, в которой работают лучшие
                  из лучших, чтобы дарить нашим гостям незабываемые впечатления.
               </p>
            </div>
            <div className="mb-10 grid grid-cols-1 gap-7 text-lg md:mb-20 lg:mb-28 lg:text-xl xl:grid-cols-[1fr,36.6875rem] xl:gap-[53px] xl:text-[29px]">
               <div className="flex flex-col">
                  <h3 className="mb-11 font-bold">Кто мы?</h3>
                  <ul className="mb-5 space-y-3 md:mb-7 lg:mb-11">
                     <li className="before:pr-1 before:content-['•']">
                        Сеть из 11 брендов в сфере HoReCa, которые знают и
                        любят.
                     </li>
                     <li className="before:pr-1 before:content-['•']">
                        Команда из более чем 450 профессионалов, каждый из
                        которых — неотъемлемая часть нашей истории.
                     </li>
                     <li className="before:pr-1 before:content-['•']">
                        Лидеры в области гостеприимства, стремящиеся к
                        постоянному росту и развитию.
                     </li>
                  </ul>
                  <p className="mb-5 font-bold md:mb-7 lg:mb-11 xl:flex-auto">
                     Добро пожаловать в команду, где каждый день — это новый
                     вызов и новая победа. Вместе мы пишем историю, которой
                     можем гордиться.
                  </p>
                  <div>
                     <Image
                        src="/team/01.jpg"
                        width={1100}
                        height={538}
                        alt="команда"
                        className="aspect-[1100/538] size-full object-cover"
                     />
                  </div>
               </div>
               <div className=" ">
                  <Image
                     src="/team/02.jpg"
                     width={587}
                     height={992}
                     alt="команда"
                     className="aspect-[587/992] size-full object-cover"
                  />
               </div>
            </div>
            <div className="mb-10 md:mb-16 lg:mb-20 xl:mb-32">
               <p className="mb-16">
                  Каждое наше заведение — это пространство, где рождаются
                  воспоминания и начинается история.
               </p>
               <div className="grid grid-cols-1 justify-between gap-6 text-base min-[560px]:grid-cols-2 md:text-lg min-[992px]:grid-cols-3">
                  <div className="space-y-7">
                     <p>г. Астана:</p>
                     <ul className="space-y-1 uppercase">
                        <li className="before:pr-1 before:content-['•']">
                           SHISHKA HIGHVILL — 2019 г.
                        </li>
                        <li className="before:pr-1 before:content-['•']">
                           SHISHKA REPUBLIC — 2020 г.
                        </li>
                        <li className="before:pr-1 before:content-['•']">
                           SHISHKA EDITION — 2021 г.
                        </li>
                        <li className="before:pr-1 before:content-['•']">
                           BERËZKA — 2022 г.
                        </li>
                        <li className="before:pr-1 before:content-['•']">
                           SHISHKA PREMIUM — 2022 г.
                        </li>
                        <li className="before:pr-1 before:content-['•']">
                           SHISHKA BOTANIC — 2023 г.
                        </li>
                        <li className="before:pr-1 before:content-['•']">
                           AHÓ — 2024 г.
                        </li>
                        <li className="before:pr-1 before:content-['•']">
                           SHISHKA ALPHA — 2024 г.
                        </li>
                     </ul>
                  </div>
                  <div className="space-y-7">
                     <p>г. Алматы:</p>
                     <ul className="space-y-1 uppercase">
                        <li className="before:pr-1 before:content-['•']">
                           SHISHKA GAGARINA — 2021 г.
                        </li>
                        <li className="before:pr-1 before:content-['•']">
                           SHISHKA PREMIUM — 2022 г.
                        </li>
                     </ul>
                  </div>
                  <div className="space-y-7">
                     <p>г. Атырау:</p>
                     <ul className="space-y-1 uppercase">
                        <li className="before:pr-1 before:content-['•']">
                           SHISHKA PREMIUM — 2022 г
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
