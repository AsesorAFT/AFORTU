'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, DollarSign, Calendar } from 'lucide-react';

export function ROICalculator() {
  const [investment, setInvestment] = useState(100000);
  const [years, setYears] = useState(5);
  const [riskProfile, setRiskProfile] = useState(2); // 0: Bajo, 1: Medio, 2: Alto

  const returns = {
    0: 8,  // Bajo riesgo: 8% anual
    1: 15, // Medio riesgo: 15% anual
    2: 25, // Alto riesgo: 25% anual
  };

  const returnRate = returns[riskProfile as keyof typeof returns] / 100;
  const finalAmount = investment * Math.pow(1 + returnRate, years);
  const totalGain = finalAmount - investment;
  const percentageGain = ((totalGain / investment) * 100).toFixed(2);

  const riskLabels = ['Conservador', 'Moderado', 'Agresivo'];
  const riskColors = ['text-green-600', 'text-blue-600', 'text-purple-600'];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-600/20 border border-amber-500/30 rounded-full text-sm font-semibold text-amber-700 mb-6">
            🧮 Calculadora Interactiva
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Proyecta tu Crecimiento
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Descubre el potencial de crecimiento de tu patrimonio con AFORTU Pro
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Controles */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-gray-200 shadow-xl">
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {/* Inversión inicial */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-amber-600" />
                          Inversión Inicial
                        </label>
                        <span className="text-2xl font-bold text-gray-900">
                          ${investment.toLocaleString('es-MX')}
                        </span>
                      </div>
                      <Slider
                        value={[investment]}
                        onValueChange={(value) => setInvestment(value[0])}
                        min={10000}
                        max={10000000}
                        step={10000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>$10K</span>
                        <span>$10M</span>
                      </div>
                    </div>

                    {/* Años de inversión */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          Años de Inversión
                        </label>
                        <span className="text-2xl font-bold text-gray-900">
                          {years} años
                        </span>
                      </div>
                      <Slider
                        value={[years]}
                        onValueChange={(value) => setYears(value[0])}
                        min={1}
                        max={30}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>1 año</span>
                        <span>30 años</span>
                      </div>
                    </div>

                    {/* Perfil de riesgo */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-4">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                        Perfil de Inversión
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[0, 1, 2].map((level) => (
                          <button
                            key={level}
                            onClick={() => setRiskProfile(level)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                              riskProfile === level
                                ? 'border-amber-500 bg-amber-50 shadow-lg scale-105'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className={`text-xs font-semibold mb-1 ${riskColors[level]}`}>
                              {riskLabels[level]}
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {returns[level as keyof typeof returns]}%
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Resultados */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-sm font-semibold text-gray-700 mb-6">
                    Proyección Final
                  </h3>
                  
                  <motion.div
                    key={finalAmount}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                  >
                    <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                      ${finalAmount.toLocaleString('es-MX', { maximumFractionDigits: 0 })}
                    </div>
                    <p className="text-sm text-gray-600">Valor proyectado en {years} años</p>
                  </motion.div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white/60 rounded-xl">
                      <span className="text-sm font-medium text-gray-700">Ganancia Total</span>
                      <span className="text-xl font-bold text-green-600">
                        +${totalGain.toLocaleString('es-MX', { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-white/60 rounded-xl">
                      <span className="text-sm font-medium text-gray-700">Rendimiento</span>
                      <span className="text-xl font-bold text-blue-600">
                        +{percentageGain}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-white/60 rounded-xl">
                      <span className="text-sm font-medium text-gray-700">Retorno Anual</span>
                      <span className="text-xl font-bold text-purple-600">
                        {returns[riskProfile as keyof typeof returns]}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-900">Nota:</span> Esta es una proyección estimada basada en rendimientos históricos promedio. Los resultados reales pueden variar según las condiciones del mercado y tu estrategia específica.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
