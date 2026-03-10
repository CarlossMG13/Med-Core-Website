// src/components/home/TestimonialsSection.tsx
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

const Stars = () => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 fill-[#C9A227] text-[#C9A227]" />
    ))}
  </div>
);

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-gray-900">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-16" {...fadeUp(0)}>
          <span className="text-[#C9A227] font-bold tracking-widest uppercase text-xs mb-2 block">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Lo que dicen nuestros{" "}
            <span className="text-[#C9A227]">clientes</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Testimonial 1 — blockquote destacado */}
          <motion.div className="relative" {...fadeUp(0.1)}>
            <div className="absolute -top-4 -left-2 text-8xl text-[#C9A227] opacity-10 font-serif leading-none select-none">
              "
            </div>
            <blockquote className="text-xl font-light text-gray-200 italic leading-relaxed mb-8 relative z-10 pl-4 border-l-2 border-[#C9A227]/30">
              Desde que implementamos Med-Core, nuestra carga administrativa se
              ha reducido en un 40%. La tranquilidad legal que nos brinda es
              invaluable.
            </blockquote>
            <div className="flex items-center pl-4 gap-4">
              <div className="w-14 h-14 rounded-full bg-[#C9A227]/10 border-2 border-[#C9A227]/40 flex items-center justify-center flex-shrink-0">
                <span className="text-[#C9A227] font-bold text-sm">RS</span>
              </div>
              <div>
                <h4 className="font-bold text-white">Dr. Roberto Sanchez</h4>
                <p className="text-[#C9A227] text-sm font-semibold">
                  Director Médico, Clínica San José
                </p>
              </div>
            </div>
          </motion.div>

          {/* Testimonial 2 — card */}
          <motion.div
            {...fadeUp(0.2)}
            className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-[#C9A227]/20 transition-all duration-300 shadow-xl relative"
          >
            <div className="flex justify-between items-start mb-6">
              <Stars />
            </div>
            <p className="text-gray-400 mb-8 text-sm leading-loose">
              "La interfaz es elegante y funcional. No requiere horas de
              aprendizaje. Todo el equipo legal y administrativo está
              sincronizado por primera vez."
            </p>
            <div className="flex items-center border-t border-white/5 pt-5 gap-3">
              <div className="w-10 h-10 bg-[#C9A227]/10 rounded-full flex items-center justify-center text-[#C9A227] font-bold text-xs border border-[#C9A227]/20 flex-shrink-0">
                LM
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  Lic. Mariana López
                </h4>
                <p className="text-gray-500 text-xs">Gerente Administrativa</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div className="mt-14 flex justify-center" {...fadeUp(0.3)}>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#C9A227] transition-colors group border border-white/5 hover:border-[#C9A227]/20 px-5 py-2.5 rounded-full"
          >
            ¿Deseas iniciar?
            <span className="font-semibold text-[#C9A227]">
              Contactar al equipo
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
