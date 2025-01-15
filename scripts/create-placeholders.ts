import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const PLACEHOLDER_DIR = join(process.cwd(), 'public/images/placeholders');
const BRANDS_DIR = join(process.cwd(), 'public/brands');

// Создаем директории если они не существуют
mkdirSync(PLACEHOLDER_DIR, { recursive: true });
mkdirSync(BRANDS_DIR, { recursive: true });

// Создаем SVG файлы
const placeholders = {
  logo: { width: 200, height: 80, text: 'LOGO' },
  hero: { width: 1920, height: 1080, text: 'HERO' },
  about: { width: 800, height: 600, text: 'ABOUT' },
  menu: { width: 800, height: 600, text: 'MENU' },
  gallery: { width: 800, height: 600, text: 'GALLERY' }
};

Object.entries(placeholders).forEach(([name, config]) => {
  const svg = `
    <svg width="${config.width}" height="${config.height}" viewBox="0 0 ${config.width} ${config.height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${config.width}" height="${config.height}" fill="#E5E7EB"/>
      <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#9CA3AF" text-anchor="middle" dominant-baseline="middle">
        ${config.text}
      </text>
    </svg>
  `;

  writeFileSync(join(PLACEHOLDER_DIR, `${name}.svg`), svg.trim());
}); 