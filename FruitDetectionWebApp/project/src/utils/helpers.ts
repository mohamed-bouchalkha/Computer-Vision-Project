import { FRUIT_CLASSES, IMAGE_CONFIG } from './constants';
import type { FruitInfo, ImageData } from '../types';

export function getFruitInfo(className: string): FruitInfo {
  const normalizedClass = className ? className.toLowerCase().replace(/[-_\s]/g, '') : '';
  
  // Recherche exacte
  if (normalizedClass in FRUIT_CLASSES) {
    return FRUIT_CLASSES[normalizedClass as keyof typeof FRUIT_CLASSES];
  }

  // Recherche par correspondance partielle
  for (const [key, value] of Object.entries(FRUIT_CLASSES)) {
    if (normalizedClass.includes(key) || key.includes(normalizedClass)) {
      return value;
    }
  }

  // Valeur par défaut
  return {
    emoji: '🍎',
    name: className || 'Fruit inconnu',
    color: '#6b7280'
  };
}

export function validateImageFile(file: File): string | null {
  if (!IMAGE_CONFIG.allowedTypes.includes(file.type.toLowerCase())) {
    return 'Format de fichier non supporté. Utilisez JPG, PNG, WebP ou GIF.';
  }

  if (file.size > IMAGE_CONFIG.maxFileSize) {
    return `Fichier trop volumineux (${formatBytes(file.size)}). Maximum autorisé: 10MB.`;
  }

  return null;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export async function processImageFile(file: File): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Optimiser la taille de l'image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Impossible de créer le contexte canvas'));
          return;
        }
        
        const MAX_SIZE = IMAGE_CONFIG.maxSize;
        let { width, height } = img;
        
        if (width > height) {
          if (width > MAX_SIZE) {
            height = (height * MAX_SIZE) / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = (width * MAX_SIZE) / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        const base64 = dataUrl.split(',')[1];

        resolve({
          dataUrl,
          base64,
          width,
          height,
          file
        });
      };
      img.onerror = () => reject(new Error('Impossible de charger l\'image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
    reader.readAsDataURL(file);
  });
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}