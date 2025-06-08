import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
}

export default function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center animate-fadeIn">
      <div className="flex flex-col items-center space-y-4">
        <AlertTriangle className="w-16 h-16 text-red-500" />
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-red-800">
            Erreur lors de l'analyse
          </h3>
          <p className="text-red-600 max-w-md mx-auto">
            {error}
          </p>
        </div>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            Réessayer
          </button>
        )}
        
        <div className="text-sm text-red-500 mt-4">
          <p>Suggestions :</p>
          <ul className="list-disc list-inside space-y-1 text-left mt-2">
            <li>Vérifiez que l'image contient des fruits clairement visibles</li>
            <li>Essayez avec une image de meilleure qualité</li>
            <li>Assurez-vous que votre connexion internet fonctionne</li>
          </ul>
        </div>
      </div>
    </div>
  );
}