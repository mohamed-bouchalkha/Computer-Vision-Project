import React from 'react';
import { Target, Eye, Award, TrendingUp } from 'lucide-react';
import { SEGMENTATION_COLORS } from '../utils/constants';
import { getFruitInfo } from '../utils/helpers';
import type { AnalysisResults } from '../types';

interface ResultsDisplayProps {
  results: AnalysisResults;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const { predictions, totalDetections, bestPrediction, averageConfidence } = results;
  const bestFruit = getFruitInfo(bestPrediction.class);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
            {bestFruit.emoji}
          </div>
          <div className="text-sm font-medium text-gray-600 mb-1">Fruit principal détecté</div>
          <div className="text-xl font-bold text-blue-700">{bestFruit.name}</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300">
          <Award className="w-8 h-8 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
          <div className="text-sm font-medium text-gray-600 mb-1">Confiance</div>
          <div className="text-xl font-bold text-green-700">
            {(bestPrediction.confidence * 100).toFixed(1)}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300">
          <Eye className="w-8 h-8 text-orange-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
          <div className="text-sm font-medium text-gray-600 mb-1">Objets détectés</div>
          <div className="text-xl font-bold text-orange-700">{totalDetections}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300">
          <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
          <div className="text-sm font-medium text-gray-600 mb-1">Précision moyenne</div>
          <div className="text-xl font-bold text-purple-700">
            {(averageConfidence * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Liste détaillée des détections */}
      {totalDetections > 1 && (
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Détail des détections</h3>
          </div>
          
          <div className="space-y-3">
            {predictions.map((prediction, index) => {
              const fruit = getFruitInfo(prediction.class);
              const color = SEGMENTATION_COLORS[index % SEGMENTATION_COLORS.length];
              
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-2xl">{fruit.emoji}</span>
                    <div>
                      <div className="font-semibold text-gray-800">{fruit.name}</div>
                      <div className="text-sm text-gray-500">Détection #{index + 1}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {(prediction.confidence * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">confiance</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}