import React, { useEffect, useRef } from 'react';
import { SEGMENTATION_COLORS } from '../utils/constants';
import { getFruitInfo } from '../utils/helpers';
import type { ImageData, FruitPrediction } from '../types';

interface ImagePreviewProps {
  imageData: ImageData;
  predictions?: FruitPrediction[];
}

export default function ImagePreview({ imageData, predictions }: ImagePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (predictions && predictions.length > 0 && imageRef.current && canvasRef.current) {
      drawSegmentations();
    } else if (canvasRef.current) {
      // Clear canvas if no predictions
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, [predictions, imageData]);

  const setupCanvas = () => {
    if (!canvasRef.current || !imageRef.current) return;
    
    const canvas = canvasRef.current;
    const img = imageRef.current;
    
    canvas.width = img.naturalWidth || imageData.width;
    canvas.height = img.naturalHeight || imageData.height;
    canvas.style.width = img.offsetWidth + 'px';
    canvas.style.height = img.offsetHeight + 'px';
  };

  const drawSegmentations = () => {
    if (!canvasRef.current || !imageRef.current || !predictions) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scaleX = canvas.width / imageData.width;
    const scaleY = canvas.height / imageData.height;

    predictions.forEach((prediction, index) => {
      const color = SEGMENTATION_COLORS[index % SEGMENTATION_COLORS.length];
      const fruitInfo = getFruitInfo(prediction.class);
      
      if (prediction.points && prediction.points.length > 0) {
        drawPolygonSegmentation(ctx, prediction.points, scaleX, scaleY, color, prediction.confidence, fruitInfo.name);
      } else if (prediction.x !== undefined && prediction.y !== undefined && 
                prediction.width !== undefined && prediction.height !== undefined) {
        drawBoundingBox(ctx, prediction, scaleX, scaleY, color, prediction.confidence, fruitInfo.name);
      }
    });
  };

  const drawPolygonSegmentation = (
    ctx: CanvasRenderingContext2D,
    points: Array<{ x: number; y: number }>,
    scaleX: number,
    scaleY: number,
    color: string,
    confidence: number,
    fruitName: string
  ) => {
    if (points.length === 0) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x * scaleX, points[0].y * scaleY);
    
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x * scaleX, points[i].y * scaleY);
    }
    
    ctx.closePath();

    // Remplissage semi-transparent
    ctx.fillStyle = color + '30';
    ctx.fill();

    // Contour
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Label
    const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length * scaleX;
    const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length * scaleY;
    
    drawLabel(ctx, `${fruitName} ${(confidence * 100).toFixed(1)}%`, centerX, centerY, color);
  };

  const drawBoundingBox = (
    ctx: CanvasRenderingContext2D,
    prediction: FruitPrediction,
    scaleX: number,
    scaleY: number,
    color: string,
    confidence: number,
    fruitName: string
  ) => {
    const x = (prediction.x - prediction.width / 2) * scaleX;
    const y = (prediction.y - prediction.height / 2) * scaleY;
    const width = prediction.width * scaleX;
    const height = prediction.height * scaleY;

    // Remplissage semi-transparent
    ctx.fillStyle = color + '20';
    ctx.fillRect(x, y, width, height);

    // Contour
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);

    // Label
    drawLabel(ctx, `${fruitName} ${(confidence * 100).toFixed(1)}%`, x + width / 2, y - 10, color);
  };

  const drawLabel = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    color: string
  ) => {
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    // Mesurer le texte
    const metrics = ctx.measureText(text);
    const padding = 8;
    const bgWidth = metrics.width + padding * 2;
    const bgHeight = 24;

    // Fond du label avec coins arrondis
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x - bgWidth / 2, y - bgHeight, bgWidth, bgHeight, 6);
    ctx.fill();

    // Texte du label
    ctx.fillStyle = 'white';
    ctx.fillText(text, x, y - padding);
  };

  return (
    <div className="relative inline-block rounded-2xl overflow-hidden shadow-2xl bg-white">
      <img
        ref={imageRef}
        src={imageData.preview || imageData.dataUrl}
        alt="Image à analyser"
        className="max-w-full max-h-96 w-auto h-auto block"
        onLoad={setupCanvas}
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      />
    </div>
  );
}