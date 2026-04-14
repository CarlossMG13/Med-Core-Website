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
  <div className="flex gap-0.5" role="img" aria-label="5 de 5 estrellas">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 fill-[#C9A227] text-[#C9A227]" aria-hidden="true" />
    ))}
  </div>
);

const testimonials = [
  {
    quote:
      "Desde que implementamos Med-Core, nuestra carga administrativa se ha reducido en un 40%. La tranquilidad legal que nos brinda es invaluable.",
    name: "Dr. Roberto Sanchez",
    role: "Director Médico, Clínica San José",
    initials: "RS",
    featured: true,
  },
  {
    quote:
      "La interfaz es elegante y funcional. No requiere horas de aprendizaje. Todo el equipo legal y administrativo está sincronizado por primera vez.",
    name: "Lic. Mariana López",
    role: "Gerente Administrativa",
    initials: "LM",
    featured: false,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-gray-900">
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent"
        aria-hidden="true"
      />

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {testimonials.map(({ quote, name, role, initials, featured }, i) => (
            <motion.article
              key={name}
              {...fadeUp(0.1 + i * 0.1)}
              className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-[#C9A227]/20 transition-[border-color] duration-300 shadow-xl relative flex flex-col"
            >
              {featured && (
                <div
                  className="absolute -top-4 -left-2 text-8xl text-[#C9A227] opacity-10 font-serif leading-none select-none"
                  aria-hidden="true"
                >
                  "
                </div>
              )}

              {/* Estrellas */}
              <div className="mb-6">
                <Stars />
              </div>

              {/* Quote */}
              <blockquote
                className={`flex-1 mb-8 relative z-10 leading-relaxed ${
                  featured
                    ? "text-xl font-light text-gray-200 italic pl-4 border-l-2 border-[#C9A227]/30"
                    : "text-sm text-gray-400 leading-loose"
                }`}
              >
                "{quote}"
              </blockquote>

              {/* Author */}
              <div className={`flex items-center gap-4 ${featured ? "pl-4" : ""} border-t border-white/5 pt-5`}>
                <div
                  className="w-12 h-12 rounded-full bg-[#C9A227]/10 border-2 border-[#C9A227]/40 flex items-center justify-center flex-shrink-0"
                  role="img"
                  aria-label={`Avatar de ${name}`}
                >
                  <span className="text-[#C9A227] font-bold text-xs">{initials}</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{name}</h4>
                  <p className="text-[#C9A227] text-xs font-medium mt-0.5">{role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div className="mt-14 flex justify-center" {...fadeUp(0.3)}>
          <a
            href="#ia-demo"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#C9A227] transition-colors duration-200 group border border-white/5 hover:border-[#C9A227]/20 px-5 py-2.5 rounded-full min-h-[44px]"
          >
            ¿Deseas iniciar?
            <span className="font-semibold text-[#C9A227]">
              Solicitar Demo
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C9A227] group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
