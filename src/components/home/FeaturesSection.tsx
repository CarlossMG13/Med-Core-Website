import { motion } from "framer-motion";
import { CalendarCheck, LayoutDashboard, Receipt, Scale, Globe } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

const features = [
  {
    icon: CalendarCheck,
    title: "Gestión del Consultorio",
    description:
      "Centraliza agendas, expedientes clínicos y flujos internos del consultorio. Control total de tu operación médica desde un solo panel.",
  },
  {
    icon: LayoutDashboard,
    title: "Administración Operativa",
    description:
      "Facturación automática, control de nómina y gestión de gastos en tiempo real. Reportes ejecutivos que impulsan decisiones inteligentes.",
  },
  {
    icon: Receipt,
    title: "Control Contable y Fiscal",
    description:
      "Genera CFDI, concilia cuentas y mantente al corriente de tus obligaciones fiscales. Contabilidad clara, ordenada y siempre al día.",
  },
  {
    icon: Scale,
    title: "Cumplimiento Jurídico",
    description:
      "Contratos, consentimientos y documentación legal automatizada. Tu institución protegida y en pleno cumplimiento normativo.",
  },
  {
    icon: Globe,
    title: "Ecosistema Digital Profesional",
    description:
      "Página web, citas en línea y presencia digital integrados en un solo ecosistema. Conecta con tus pacientes desde cualquier canal.",
  },
];

const colSpanClass = [
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-3",
  "md:col-span-3",
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
            Somos una plataforma integral que centraliza toda tu operación:
            Administración, contabilidad y respaldo jurídico en un solo
            ECOSISTEMA.
          </p>
        </motion.div>

        {/* Bento grid — 3 cards top, 2 cards bottom */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              {...fadeUp(0.1 + i * 0.1)}
              className={`group ${colSpanClass[i]} p-8 bg-zinc-950 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#C9A227]/10 transition-[transform,box-shadow,border-color] duration-300 border border-gray-800 hover:border-[#C9A227]/50 relative overflow-hidden hover:-translate-y-2`}
            >
              {/* Left accent bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-[#C9A227] -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

              {/* Number badge */}
              <span className="absolute top-6 right-6 text-xs font-mono text-gray-700 select-none">
                0{i + 1}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 bg-[#C9A227]/10 group-hover:bg-[#C9A227] rounded-lg flex items-center justify-center mb-6 transition-colors duration-300">
                <Icon
                  aria-hidden="true"
                  className="w-7 h-7 text-[#C9A227] group-hover:text-black transition-colors duration-300"
                />
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
