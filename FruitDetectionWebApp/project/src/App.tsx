import React, { useState, useCallback } from 'react';
import { Brain, Trash2, Zap, ArrowLeft, Upload, Eye, BarChart3, CheckCircle, Link as LinkIcon, Globe } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ImageUploader from './components/ImageUploader';
import ImagePreview from './components/ImagePreview';
import LoadingSpinner from './components/LoadingSpinner';
import ResultsDisplay from './components/ResultsDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import { analyzeImage } from './utils/api';
import { processImageFile } from './utils/helpers';
import type { ImageData, FruitPrediction, AnalysisResults } from './types';
import Home from './pages/Home';

function DetectionPage() {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [predictions, setPredictions] = useState<FruitPrediction[]>([]);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');

  const handleImageLoad = useCallback((newImageData: ImageData) => {
    setImageData(newImageData);
    setPredictions([]);
    setResults(null);
    setError(null);
    setImageUrl(''); // Clear URL when uploading file
  }, []);

  const handleUrlLoad = useCallback(async () => {
    if (!imageUrl.trim()) {
      setError('Veuillez entrer une URL d\'image valide');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const url = new URL(imageUrl.trim());
      if (!url.protocol.startsWith('http')) {
        throw new Error('L\'URL doit commencer par http:// ou https://');
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error('Impossible de télécharger l\'image depuis cette URL');
      }

      const blob = await response.blob();
      const file = new File([blob], url.pathname.split('/').pop() || 'image_from_url.jpg', { type: blob.type });
      
      const imageData = await processImageFile(file);
      setImageData(imageData);
      setPredictions([]);
      setResults(null);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement de l\'image depuis l\'URL';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [imageUrl]);

  const handleAnalyze = useCallback(async () => {
    if (!imageData) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const detectedPredictions = await analyzeImage(imageData.base64);
      
      if (!detectedPredictions || detectedPredictions.length === 0) {
        throw new Error('Aucun fruit détecté dans l\'image. Essayez avec une image plus claire contenant des fruits visibles.');
      }

      // Trier par confiance décroissante
      const sortedPredictions = detectedPredictions.sort((a, b) => (b.confidence || 0) - (a.confidence || 0));
      
      setPredictions(sortedPredictions);
      
      // Calculer les résultats
      const analysisResults: AnalysisResults = {
        predictions: sortedPredictions,
        totalDetections: sortedPredictions.length,
        bestPrediction: sortedPredictions[0],
        averageConfidence: sortedPredictions.reduce((sum, p) => sum + (p.confidence || 0), 0) / sortedPredictions.length
      };
      
      setResults(analysisResults);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur inattendue s\'est produite';
      setError(errorMessage);
      console.error('Erreur lors de l\'analyse:', err);
    } finally {
      setIsLoading(false);
    }
  }, [imageData]);

  const handleClear = useCallback(() => {
    setImageData(null);
    setPredictions([]);
    setResults(null);
    setError(null);
    setImageUrl('');
    setActiveTab('upload');
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    handleAnalyze();
  }, [handleAnalyze]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">FruitSegment</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <span className="text-sm text-gray-500">Analyse IA</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <Brain className="w-4 h-4 mr-2" />
              Intelligence Artificielle Avancée
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Analyseur de Fruits
              <span className="block text-green-600">par Vision IA</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Téléchargez votre image et laissez notre IA identifier automatiquement 
              les fruits avec une précision exceptionnelle
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center justify-center space-x-3 bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Upload className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">1. Téléchargez</div>
                <div className="text-sm text-gray-600">Sélectionnez votre image</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">2. Analysez</div>
                <div className="text-sm text-gray-600">IA traite l'image</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">3. Résultats</div>
                <div className="text-sm text-gray-600">Obtenez les détections</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Analysis Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Upload Section */}
            {!imageData && (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                  <div className="flex items-center justify-center space-x-3 text-white">
                    <Upload className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">Charger une Image</h2>
                  </div>
                </div>
                
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => {setActiveTab('upload'); setError(null);}}
                      className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                        activeTab === 'upload'
                          ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Upload className="w-4 h-4" />
                        <span>Télécharger un fichier</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {setActiveTab('url'); setError(null);}}
                      className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                        activeTab === 'url'
                          ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span>URL d\'image</span>
                      </div>
                    </button>
                  </div>
                </div>
                
                <div className="p-8">
                  {activeTab === 'upload' ? (
                    <ImageUploader onImageLoad={handleImageLoad} disabled={isLoading} />
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <LinkIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Coller l\'URL d\'une image
                        </h3>
                        <p className="text-gray-600">
                          Entrez l\'URL publique d\'une image contenant des fruits
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                            URL de l\'image
                          </label>
                          <div className="relative">
                            <input
                              id="imageUrl"
                              type="url"
                              value={imageUrl}
                              onChange={(e) => setImageUrl(e.target.value)}
                              placeholder="https://exemple.com/mon-image.jpg"
                              disabled={isLoading}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                            />
                            <Globe className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          </div>
                        </div>

                        <button
                          onClick={handleUrlLoad}
                          disabled={!imageUrl.trim() || isLoading}
                          className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Chargement...
                            </>
                          ) : (
                            <>
                              <LinkIcon className="w-5 h-5" />
                              Charger depuis l\'URL
                            </>
                          )}
                        </button>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-5 h-5 text-blue-600 mt-0.5">ℹ️</div>
                            <div className="text-sm text-blue-800">
                              <p className="font-medium mb-1">Conseils pour l\'URL :</p>
                              <ul className="space-y-1 text-blue-700">
                                <li>• L\'image doit être accessible publiquement</li>
                                <li>• Formats supportés : JPG, PNG, WebP</li>
                                <li>• Évitez les images trop volumineuses (&gt;10MB)</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Analysis Section */}
            {imageData && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Image Preview Column */}
                <div className="xl:col-span-2">
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-3">
                          <Eye className="w-5 h-5" />
                          <h3 className="text-lg font-semibold">Aperçu de l\'Image</h3>
                        </div>
                        {predictions.length > 0 && (
                          <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">{predictions.length} détection(s)</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      {imageData.name && (
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 mb-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 text-gray-500">📁</div>
                            <span className="text-sm text-gray-700 font-medium truncate">
                              {imageData.name}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-center">
                        <ImagePreview imageData={imageData} predictions={predictions} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls and Results Column */}
                <div className="space-y-8">
                  
                  {/* Action Controls */}
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                      <div className="flex items-center space-x-3 text-white">
                        <Zap className="w-5 h-5" />
                        <h3 className="text-lg font-semibold">Contrôles</h3>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <button
                        onClick={handleAnalyze}
                        disabled={isLoading}
                        className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Analyse en cours...
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5" />
                            Analyser l\'image
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleClear}
                        disabled={isLoading}
                        className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
                      >
                        <Trash2 className="w-5 h-5" />
                        Nouvelle image
                      </button>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  {results && !isLoading && (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4">
                        <div className="flex items-center space-x-3 text-white">
                          <BarChart3 className="w-5 h-5" />
                          <h3 className="text-lg font-semibold">Statistiques Rapides</h3>
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Détections totales</span>
                          <span className="text-2xl font-bold text-green-600">{results.totalDetections}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Confiance moyenne</span>
                          <span className="text-2xl font-bold text-blue-600">
                            {(results.averageConfidence * 100).toFixed(1)}%
                          </span>
                        </div>
                        {results.bestPrediction && (
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                            <div className="text-sm text-green-800 font-medium mb-1">Meilleure détection</div>
                            <div className="text-lg font-bold text-green-900">{results.bestPrediction.class}</div>
                            <div className="text-sm text-green-700">
                              {((results.bestPrediction.confidence || 0) * 100).toFixed(1)}% de confiance
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="mt-8">
                <LoadingSpinner message="Analyse par intelligence artificielle en cours..." />
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mt-8">
                <ErrorDisplay error={error} onRetry={handleRetry} />
              </div>
            )}

            {/* Full Results Display */}
            {results && !isLoading && !error && (
              <div className="mt-8">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                    <div className="flex items-center space-x-3 text-white">
                      <BarChart3 className="w-6 h-6" />
                      <h2 className="text-2xl font-bold">Résultats Détaillés</h2>
                    </div>
                  </div>
                  <div className="p-8">
                    <ResultsDisplay results={results} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Performance Indicators */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">99.2%</div>
              <div className="text-gray-600">Précision moyenne</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Classes de fruits</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">0.3s</div>
              <div className="text-gray-600">Temps de traitement</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">YOLOv8</div>
              <div className="text-gray-600">Technologie IA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FS</span>
              </div>
              <span className="text-xl font-bold">FruitSegment</span>
            </div>
            <div className="text-gray-400 text-sm">
              Propulsé par YOLOv8 et l\'API Roboflow • © 2025 FruitSegment
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detection" element={<DetectionPage />} />
      </Routes>
    </Router>
  );
}

export default App;