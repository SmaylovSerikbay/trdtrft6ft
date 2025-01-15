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
  features: Feature[];
  specialOffers: SpecialOffer[];
  bottomGallery: string[];
  userId?: string;
  gallery: Gallery;
}

export interface Feature {
  title: string;
  description: string;
}

export interface SpecialOffer {
  title: string;
  description: string;
}

export interface Gallery {
  title: string;
  description: string;
  images: string[];
} 