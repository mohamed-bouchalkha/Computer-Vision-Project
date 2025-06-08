export interface FruitPrediction {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
  points?: Array<{ x: number; y: number }>;
}

export interface APIResponse {
  predictions?: FruitPrediction[];
  outputs?: Array<{
    predictions?: FruitPrediction[] | { predictions: FruitPrediction[] };
  }>;
}

export interface FruitInfo {
  emoji: string;
  name: string;
  color: string;
}

export interface ImageData {
  dataUrl: string;
  base64: string;
  width: number;
  height: number;
  file?: File | null;
  preview?: string;
  name?: string;
}

export interface AnalysisResults {
  predictions: FruitPrediction[];
  totalDetections: number;
  bestPrediction: FruitPrediction;
  averageConfidence: number;
}