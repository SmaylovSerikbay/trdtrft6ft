export interface PhotoReport {
  id: string;
  title: string;
  city: string;
  venue: string;
  photographer: string;
  preview: string;
  folderPath: string;
  publishedAt: Date;
  description?: string;
  images: string[];
  published?: boolean;
  date: Date;
} 