export const API_CONFIG = {
  apiKey: '4xNp7MQJ5aoDUXQLwOau',
  endpoint: 'https://serverless.roboflow.com/infer/workflows/mohamed-4xia1/custom-workflow-3'
};

export const FRUIT_CLASSES = {
  'apple': { emoji: '🍎', name: 'Pomme', color: '#ef4444' },
  'banana': { emoji: '🍌', name: 'Banane', color: '#eab308' },
  'cherry': { emoji: '🍒', name: 'Cerise', color: '#dc2626' },
  'cucumber': { emoji: '🥒', name: 'Concombre', color: '#16a34a' },
  'grapes': { emoji: '🍇', name: 'Raisins', color: '#8b5cf6' },
  'kiwi': { emoji: '🥝', name: 'Kiwi', color: '#84cc16' },
  'lemon': { emoji: '🍋', name: 'Citron', color: '#facc15' },
  'mango': { emoji: '🥭', name: 'Mangue', color: '#f97316' },
  'orange': { emoji: '🍊', name: 'Orange', color: '#ea580c' },
  'pinapple': { emoji: '🍍', name: 'Ananas', color: '#eab308' },
  'pineapple': { emoji: '🍍', name: 'Ananas', color: '#eab308' },
  'tomato': { emoji: '🍅', name: 'Tomate', color: '#ef4444' },
  'water_melon': { emoji: '🍉', name: 'Pastèque', color: '#16a34a' },
  'watermelon': { emoji: '🍉', name: 'Pastèque', color: '#16a34a' }
} as const;

export const SEGMENTATION_COLORS = [
  '#ef4444', '#3b82f6', '#10b981', '#f59e0b', 
  '#8b5cf6', '#06b6d4', '#f97316', '#84cc16'
];

export const IMAGE_CONFIG = {
  maxSize: 640,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
};