import React, { useCallback, useRef, useState } from 'react';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { validateImageFile, processImageFile } from '../utils/helpers';
import type { ImageData } from '../types';

interface ImageUploaderProps {
  onImageLoad: (imageData: ImageData) => void;
  disabled?: boolean;
}

export default function ImageUploader({ onImageLoad, disabled }: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const imageData = await processImageFile(file);
      onImageLoad(imageData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du traitement de l\'image');
    }
  }, [onImageLoad]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [disabled, handleFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  return (
    <div className="space-y-4">
      <div
        className={`
          relative border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-all duration-300 ease-in-out
          ${isDragOver 
            ? 'border-green-500 bg-green-50 scale-102' 
            : 'border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500 hover:shadow-lg'}
          overflow-hidden
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {/* Animation background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer opacity-0 hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            {isDragOver ? (
              <Upload className="w-16 h-16 text-green-500 animate-bounce" />
            ) : (
              <ImageIcon className="w-16 h-16 text-blue-500" />
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">
              {isDragOver ? 'Déposez votre image ici' : 'Sélectionnez ou glissez votre image'}
            </h3>
            <p className="text-gray-600">
              Formats supportés: JPG, PNG, WebP, GIF (max 10MB)
            </p>
            {!disabled && (
              <p className="text-sm text-blue-600 font-medium">
                Cliquez ici ou glissez-déposez votre fichier
              </p>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 animate-fadeIn">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
}