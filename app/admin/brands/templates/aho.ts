import {
    Clock,
    Coffee,
    History,
    Image,
    Instagram,
    Mail,
    MapPin,
    Music,
    Phone,
    Star,
    Users,
    UtensilsCrossed,
    Wine
} from "lucide-react";
import { Brand } from "../types";

export const ahoTemplate: Brand = {
  name: "AHO RESTAURANT",
  title: "AHO RESTAURANT",
  description: "Ресторан авторской кухни",
  logo: UtensilsCrossed,
  logoDark: UtensilsCrossed,
  mainImage: Image,
  address: "Москва, ул. Пример, 123",
  phone: "+7 (999) 123-45-67",
  email: "info@aho-restaurant.ru",
  workingHours: {
    weekdays: "12:00-23:00",
    weekends: "12:00-00:00"
  },
  menu: {
    title: "Меню",
    description: "Авторская кухня от шеф-повара",
    sections: [
      {
        title: "Основные блюда",
        items: [
          {
            name: "Стейк Рибай",
            description: "Премиальная говядина с соусом демиглас",
            price: "3200"
          },
          {
            name: "Палтус на гриле",
            description: "С пюре из цветной капусты и соусом биск",
            price: "2400"
          }
        ]
      },
      {
        title: "Напитки",
        items: [
          {
            name: "Авторские коктейли",
            description: "Уникальные сочетания вкусов",
            price: "850"
          }
        ]
      }
    ],
    icon: Coffee
  },
  gallery: {
    title: "Галерея",
    description: "Атмосфера нашего ресторана",
    images: Array(6).fill(Image),
    icon: Image
  },
  contacts: {
    title: "Контакты",
    description: "Мы всегда рады вас видеть",
    mapLink: "https://yandex.ru/maps/-/example",
    instagramLink: "https://instagram.com/aho_restaurant",
    address: "Москва, ул. Пример, 123",
    phone: "+7 (999) 123-45-67",
    email: "info@aho-restaurant.ru",
    workingHours: {
      weekdays: "12:00-23:00",
      weekends: "12:00-00:00"
    },
    icons: {
      map: MapPin,
      instagram: Instagram,
      phone: Phone,
      email: Mail,
      clock: Clock
    }
  },
  events: [
    {
      title: "Винный вечер",
      description: "Дегустация премиальных вин",
      date: "2024-02-01",
      icon: Wine
    },
    {
      title: "Джазовый четверг",
      description: "Живая музыка и особое меню",
      date: "2024-02-08",
      icon: Music
    }
  ],
  brandHistory: {
    title: "История AHO",
    description: "История нашего ресторана началась с идеи создать уникальное место, где каждый гость может насладиться изысканной кухней в атмосфере уюта и комфорта...",
    icon: History
  },
  atmosphere: {
    title: "Атмосфера",
    description: "Уникальная атмосфера и стильный интерьер создают идеальное пространство для особых моментов",
    images: Array(3).fill(Image),
    features: [
      {
        title: "Уютный интерьер",
        description: "Современный дизайн в теплых тонах",
        icon: Star
      },
      {
        title: "Живая музыка",
        description: "Каждый вечер с четверга по воскресенье",
        icon: Music
      }
    ]
  },
  specialOffers: [
    {
      title: "Бизнес-ланч",
      description: "Каждый будний день с 12:00 до 16:00",
      icon: Clock
    },
    {
      title: "Винная карта",
      description: "Эксклюзивная коллекция вин со всего мира",
      icon: Wine
    }
  ],
  aboutTitle: "О нас",
  aboutText: "AHO RESTAURANT - это уникальное гастрономическое пространство, где современная авторская кухня сочетается с безупречным сервисом...",
  aboutIcon: Users,
  scrollerTexts: [
    "АТМОСФЕРА",
    "СТИЛЬ",
    "МУЗЫКА",
    "ЭНЕРГЕТИКА",
    "УЮТ",
    "СОБЫТИЯ"
  ],
  features: [
    {
      title: "ЯРКИЕ ВЫХОДНЫЕ С SANDWAVE PARTIES",
      description: "Каждую субботу и воскресенье наши шоу-программы переносят гостей в мир музыки и танцев.",
      icon: Music
    },
    {
      title: "VIP-ЗОНА ДЛЯ УЕДИНЕННОГО ОТДЫХА",
      description: "Уютная комната до 25 человек идеально подходит для особых встреч.",
      icon: Users
    }
  ]
}; 