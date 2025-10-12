'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Carlos Mendoza',
    role: 'CEO, Tech Innovations',
    image: '👨‍💼',
    rating: 5,
    text: 'AFORTU transformó completamente mi estrategia de inversión. Los análisis con IA son increíblemente precisos.',
  },
  {
    name: 'María González',
    role: 'Directora Financiera',
    image: '👩‍💼',
    rating: 5,
    text: 'La mejor plataforma de gestión patrimonial que he usado. El soporte es excepcional y los resultados hablan por sí solos.',
  },
  {
    name: 'Roberto Silva',
    role: 'Inversor Privado',
    image: '👨‍💻',
    rating: 5,
    text: 'Increíble cómo la IA de AFORTU optimizó mi portafolio. He visto un crecimiento del 35% en solo 6 meses.',
  },
  {
    name: 'Ana Martínez',
    role: 'Empresaria',
    image: '👩‍🚀',
    rating: 5,
    text: 'Seguridad, transparencia y resultados. AFORTU es todo lo que necesitas para gestionar tu patrimonio.',
  },
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-8 italic">
              "{testimonials[currentIndex].text}"
            </p>
            
            <div className="flex items-center gap-4">
              <div className="text-5xl">{testimonials[currentIndex].image}</div>
              <div>
                <h4 className="text-lg font-semibold text-white">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-slate-300">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={goToPrev}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-110"
          aria-label="Anterior testimonio"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-gradient-to-r from-[#f7c873] to-[#ffd700]'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-110"
          aria-label="Siguiente testimonio"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
}
