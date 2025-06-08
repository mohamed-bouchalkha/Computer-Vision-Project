import { API_CONFIG } from './constants';
import type { APIResponse, FruitPrediction } from '../types';

export async function analyzeImage(base64Image: string): Promise<FruitPrediction[]> {
  const requestBody = {
    api_key: API_CONFIG.apiKey,
    inputs: {
      image: base64Image
    }
  };

  const response = await fetch(API_CONFIG.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
  }

  const data: APIResponse = await response.json();
  return extractPredictions(data);
}

function extractPredictions(data: APIResponse): FruitPrediction[] {
  // Format direct: data.predictions
  if (data.predictions && Array.isArray(data.predictions)) {
    return data.predictions;
  }

  // Format workflow: data.outputs
  if (data.outputs && Array.isArray(data.outputs)) {
    for (const output of data.outputs) {
      if (output.predictions) {
        if (Array.isArray(output.predictions)) {
          return output.predictions;
        }
        if ('predictions' in output.predictions && Array.isArray(output.predictions.predictions)) {
          return output.predictions.predictions;
        }
      }
    }
  }

  // Recherche récursive
  return findPredictionsRecursive(data);
}

function findPredictionsRecursive(obj: any): FruitPrediction[] {
  if (!obj || typeof obj !== 'object') return [];

  if (Array.isArray(obj)) {
    for (const item of obj) {
      const found = findPredictionsRecursive(item);
      if (found.length > 0) return found;
    }
    return [];
  }

  if (obj.predictions && Array.isArray(obj.predictions)) {
    return obj.predictions;
  }

  for (const key in obj) {
    const found = findPredictionsRecursive(obj[key]);
    if (found.length > 0) return found;
  }

  return [];
}