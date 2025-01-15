// Типы для серверной части (без LucideIcon)
export interface ServerBrand {
  id?: string;
  name: string;
  title: string;
  description: string;
  logo: string;
  logoDark: string;
  mainImage: string;
  address: string;
  slug: string;
  phone: string;
  email: string;
  workingHours: {
    weekdays: string;
    weekends: string;
  };
  
  scrollerTexts: string[];
  
  aboutTitle: string;
  aboutText: string;
  aboutIcon: string;
  
  brandHistory: {
    title: string;
    description: string;
    icon: string;
  };
  
  atmosphere: {
    title: string;
    description: string;
    images: string[];
    features: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  
  events: Array<{
    title: string;
    description: string;
    date: string;
    icon: string;
  }>;
  
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
} 