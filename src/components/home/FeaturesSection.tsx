import { motion } from "framer-motion";
import { Scale, BarChart2, Shield } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

const features = [
  {
    icon: Scale,
    title: "Defensa Jurídica",
    description:
      "Protección integral con automatización de documentos legales y seguimiento de casos en tiempo real.",
  },
  {
    icon: BarChart2,
    title: "Gestión Financiera",
    description:
      "Control total de facturación, nómina y gastos con reportes ejecutivos de alto nivel.",
  },
  {
    icon: Shield,
    title: "Cumplimiento Normativo",
    description:
      "Mantenga su institución al día con las últimas regulaciones de salud y estándares de seguridad.",
  },
];

export function FeaturesSecition() {
  return (
    <section id="soluciones" className="py-24 bg-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-16" {...fadeUp(0)}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Core Features
          </h2>
          <div className="w-24 h-1 bg-[#C9A227] mx-auto rounded-full" />
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            La plataforma definitiva que unifica lo legal, financiero y
            operativo.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              {...fadeUp(0.1 + i * 0.1)}
              className="group p-8 bg-zinc-950 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#C9A227]/10 transition-all duration-300 border border-gray-800 hover:border-[#C9A227]/50 relative overflow-hidden hover:-translate-y-2"
            >
              {/* Left accent bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-[#C9A227] -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

              {/* Icon */}
              <div className="w-14 h-14 bg-[#C9A227]/10 group-hover:bg-[#C9A227] rounded-lg flex items-center justify-center mb-6 transition-colors duration-300">
                <Icon className="w-7 h-7 text-[#C9A227] group-hover:text-black transition-colors duration-300" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
