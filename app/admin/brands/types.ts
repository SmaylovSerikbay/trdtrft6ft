export interface Brand {
  id?: string;
  name: string;
  title?: string;
  description?: string;
  welcomeText?: string;
  address?: string;
  mapLink?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  slug: string;
  heroImage?: string | null;
  workingHours: {
    weekdays: string;
    weekends: string;
  };
  mainGallery: string[];
  navigationTags?: string[];
  brandHistory: {
    title: string;
    description: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
  specialOffers: Array<{
    title: string;
    description: string;
  }>;
  bottomGallery: string[];
  userId?: string;
} 