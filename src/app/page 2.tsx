export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 px-6 py-4 border-b border-gray-800">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-amber-400">AFORTU PRO</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-24">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Gestión Patrimonial{' '}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              de Clase Mundial
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Plataforma premium para inversionistas institucionales y clientes de alto patrimonio.
            Tecnología avanzada, análisis profundo, resultados excepcionales.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-8 py-4 rounded-lg transition-colors">
              Acceder a la Plataforma →
            </button>
            <button className="border border-amber-500 text-amber-400 hover:bg-amber-500/10 font-semibold px-8 py-4 rounded-lg transition-colors">
              Conocer Servicios
            </button>
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-2xl font-bold text-amber-400 mb-2">$2.5B+</div>
              <p className="text-gray-400 text-sm">Activos Bajo Gestión</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-2xl font-bold text-blue-400 mb-2">15.3%</div>
              <p className="text-gray-400 text-sm">Rendimiento Promedio Anual</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-2xl font-bold text-green-400 mb-2">500+</div>
              <p className="text-gray-400 text-sm">Clientes Institucionales</p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-24 bg-gray-900/70">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Servicios Institucionales
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Soluciones sofisticadas diseñadas para los estándares más exigentes 
              del mercado financiero global.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 hover:shadow-amber-500/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-16 h-16 bg-gray-800 rounded-xl mb-6 flex items-center justify-center group-hover:bg-amber-900/50 transition-colors">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Gestión de Portafolios</h3>
              <p className="text-gray-400 mb-4">Estrategias de inversión personalizadas con análisis cuantitativo avanzado y gestión de riesgos institucional.</p>
              <div className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">Más información →</div>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 hover:shadow-amber-500/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-16 h-16 bg-gray-800 rounded-xl mb-6 flex items-center justify-center group-hover:bg-amber-900/50 transition-colors">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Asesoría Estratégica</h3>
              <p className="text-gray-400 mb-4">Consultoría en estructuración patrimonial, planificación fiscal y optimización de inversiones internacionales.</p>
              <div className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">Más información →</div>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 hover:shadow-amber-500/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-16 h-16 bg-gray-800 rounded-xl mb-6 flex items-center justify-center group-hover:bg-amber-900/50 transition-colors">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Análisis con IA</h3>
              <p className="text-gray-400 mb-4">Modelos predictivos y análisis de mercado impulsados por IA para decisiones de inversión superiores.</p>
              <div className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">Más información →</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-6 py-8 text-center border-t border-gray-800">
        <p className="text-gray-400">© 2025 AFORTU PRO - Gestión Patrimonial de Élite</p>
      </footer>
    </div>
  );
}
