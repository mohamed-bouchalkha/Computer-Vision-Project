// Remplacez Link par des éléments <a> ou des boutons selon vos besoins
// import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Zap, Users, CheckCircle, Upload, BarChart3 } from 'lucide-react';

const Home = () => {
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
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Fonctionnalités</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">Comment ça marche</a>
              <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors">À propos</a>
              <a href="/detection" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Commencer
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                IA de Pointe pour l'Agriculture
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Segmentation et Classification
                <span className="block text-green-600">de Fruits par IA</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Révolutionnez votre analyse agricole avec notre technologie de vision par ordinateur. 
                Détectez, segmentez et classifiez automatiquement différentes variétés de fruits 
                avec une précision remarquable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/detection" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-xl text-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Analyser mes images
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
          
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-100 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🍊</div>
                      <div className="text-sm font-medium text-gray-700">Orange</div>
                      <div className="text-xs text-gray-500">98.5% confiance</div>
                    </div>
                    <div className="bg-red-100 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🍎</div>
                      <div className="text-sm font-medium text-gray-700">Pomme</div>
                      <div className="text-xs text-gray-500">97.2% confiance</div>
                    </div>
                    <div className="bg-yellow-100 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🍌</div>
                      <div className="text-sm font-medium text-gray-700">Banane</div>
                      <div className="text-xs text-gray-500">99.1% confiance</div>
                    </div>
                    <div className="bg-purple-100 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🍇</div>
                      <div className="text-sm font-medium text-gray-700">Raisin</div>
                      <div className="text-xs text-gray-500">96.8% confiance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">99.2%</div>
              <div className="text-gray-600">Précision moyenne</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Variétés de fruits</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">0.3s</div>
              <div className="text-gray-600">Temps de traitement</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600">Images analysées</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités Avancées
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre plateforme combine segmentation précise et classification intelligente 
              pour une analyse complète de vos images de fruits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Segmentation Précise
              </h3>
              <p className="text-gray-600 mb-6">
                Isolez automatiquement chaque fruit dans vos images avec des contours précis, 
                même dans des environnements complexes.
              </p>
              <div className="flex items-center text-green-600 font-medium">
                Précision: 98.5%
                <CheckCircle className="w-4 h-4 ml-2" />
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Classification Multi-Classes
              </h3>
              <p className="text-gray-600 mb-6">
                Identifiez instantanément plus de 50 variétés de fruits avec des scores 
                de confiance détaillés pour chaque prédiction.
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                50+ Classes supportées
                <CheckCircle className="w-4 h-4 ml-2" />
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Traitement en Temps Réel
              </h3>
              <p className="text-gray-600 mb-6">
                Obtenez des résultats instantanés grâce à notre infrastructure optimisée 
                et nos modèles d'IA haute performance.
              </p>
              <div className="flex items-center text-purple-600 font-medium">
                Moins de 0.5s par image
                <CheckCircle className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comment ça fonctionne
            </h2>
            <p className="text-xl text-gray-600">
              Trois étapes simples pour analyser vos fruits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Téléchargez</h3>
              <p className="text-gray-600">
                Importez vos images de fruits directement depuis votre appareil 
                ou glissez-déposez dans l'interface.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Analysez</h3>
              <p className="text-gray-600">
                Notre IA traite automatiquement vos images pour segmenter 
                et classifier chaque fruit détecté.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Exploitez</h3>
              <p className="text-gray-600">
                Recevez des résultats détaillés avec visualisations, 
                statistiques et possibilité d'export des données.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à révolutionner votre analyse de fruits ?
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Rejoignez les professionnels de l'agriculture qui utilisent déjà notre technologie 
            pour optimiser leurs processus de tri et d'analyse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/detection" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg"
            >
              Commencer gratuitement
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
         
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FS</span>
                </div>
                <span className="text-xl font-bold">FruitSegment</span>
              </div>
              <p className="text-gray-400">
                La solution IA de référence pour la segmentation et classification de fruits.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutoriels</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FruitSegment. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;