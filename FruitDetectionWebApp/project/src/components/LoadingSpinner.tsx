import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Analyse en cours...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 rounded-full animate-ping opacity-20" />
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-gray-700">{message}</p>
        <p className="text-sm text-gray-500">
          Notre IA analyse votre image avec précision...
        </p>
      </div>
      
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}