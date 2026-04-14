import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Zap,
  Shield,
  Star,
  Building2,
  Users,
  HeadphonesIcon,
  Clock,
  Lock,
  Award,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

const plans = [
  {
    id: "oro",
    name: "Oro",
    badge: null,
    icon: Zap,
    accentColor: "#C9A227",
    monthlyPrice: 1400,
    annualPrice: 1199,
    description:
      "Ideal para consultorios independientes que buscan optimizar su gestión.",
    features: [
      "Hasta 3 médicos",
      "Agenda inteligente con IA",
      "Expedientes clínicos digitales",
      "Notificaciones por WhatsApp",
      "App móvil incluida",
      "Soporte por correo",
      "1 cuenta corporativa",
    ],
    cta: "Empezar con Oro",
    featured: false,
  },
  {
    id: "platino",
    name: "Platino",
    badge: "Más popular",
    icon: Star,
    accentColor: "#C9A227",
    monthlyPrice: 1600,
    annualPrice: 2399,
    description:
      "Para clínicas en crecimiento que necesitan potencia y automatización.",
    features: [
      "Hasta 10 médicos",
      "Todo lo del plan Oro",
      "IA avanzada para agenda y reportes",
      "Módulo jurídico básico",
      "Contabilidad integrada",
      "Correos corporativos ilimitados",
      "Google Workspace incluido",
      "Soporte prioritario 24/7",
      "Onboarding personalizado",
    ],
    cta: "Empezar con Platino",
    featured: true,
  },
  {
    id: "diamante",
    name: "Diamante",
    badge: null,
    icon: Shield,
    accentColor: "#a78bfa",
    monthlyPrice: 1900,
    annualPrice: 4799,
    description:
      "Solución enterprise para grupos hospitalarios y redes de clínicas.",
    features: [
      "Médicos ilimitados",
      "Todo lo del plan Platino",
      "Módulo jurídico completo",
      "Auditorías de seguridad avanzadas",
      "Integraciones personalizadas",
      "SLA garantizado 99.9%",
      "Manager de cuenta dedicado",
      "Capacitación presencial",
      "API acceso completo",
    ],
    cta: "Contactar ventas",
    featured: false,
  },
];

const trustBadges = [
  {
    icon: Lock,
    title: "Datos 100% seguros",
    description: "Cifrado de extremo a extremo en todos sus expedientes.",
  },
  {
    icon: Clock,
    title: "Disponibilidad 99.9%",
    description: "Infraestructura de alta disponibilidad sin interrupciones.",
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte real",
    description: "Equipo humano disponible para resolver sus dudas.",
  },
  {
    icon: Award,
    title: "Cumplimiento NOM",
    description: "Alineado con la normativa mexicana de salud digital.",
  },
];

export function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="bg-black min-h-screen">
      {/* Hero header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C9A227]/5 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#C9A22720 1px, transparent 1px), linear-gradient(90deg, #C9A22720 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div {...fadeUp(0)}>
            <span className="inline-block text-[#C9A227] font-bold tracking-widest uppercase text-xs mb-4 px-4 py-1.5 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/5">
              Planes y Precios
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6 leading-tight"
            {...fadeUp(0.1)}
          >
            Invierte en la eficiencia{" "}
            <span className="bg-gradient-to-r from-[#C9A227] via-yellow-300 to-[#C9A227] bg-clip-text text-transparent">
              de tu práctica
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            {...fadeUp(0.2)}
          >
            Sin contratos anuales forzosos. Sin costos ocultos. Escala cuando tu
            clínica lo necesite.
          </motion.p>

          {/* Toggle mensual / anual */}
          <motion.div
            className="inline-flex items-center gap-3 bg-zinc-900 border border-white/10 rounded-full px-2 py-2"
            {...fadeUp(0.3)}
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                !isAnnual
                  ? "bg-[#C9A227] text-black shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                isAnnual
                  ? "bg-[#C9A227] text-black shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Anual
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full transition-all ${
                  isAnnual
                    ? "bg-black/20 text-black"
                    : "bg-green-500/20 text-green-400 border border-green-500/30"
                }`}
              >
                -20%
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {plans.map((plan, i) => {
              const PlanIcon = plan.icon;
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

              return (
                <motion.div
                  key={plan.id}
                  {...fadeUp(0.1 + i * 0.1)}
                  className={`relative rounded-2xl border flex flex-col ${
                    plan.featured
                      ? "border-[#C9A227]/50 bg-gradient-to-b from-[#C9A227]/5 to-zinc-950 shadow-2xl shadow-[#C9A227]/10 md:scale-105 z-10"
                      : "border-white/10 bg-zinc-950/80"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-[#C9A227] text-black text-xs font-black px-4 py-1.5 rounded-full shadow-lg shadow-[#C9A227]/30 whitespace-nowrap">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${plan.accentColor}15` }}
                      >
                        <PlanIcon
                          className="w-5 h-5"
                          style={{ color: plan.accentColor }}
                        />
                      </div>
                      <h3 className="text-white font-bold text-lg">
                        Plan {plan.name}
                      </h3>
                    </div>

                    <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                      {plan.description}
                    </p>

                    <div className="mb-8">
                      <div className="flex items-end gap-1">
                        <span className="text-gray-500 text-lg font-medium">
                          $
                        </span>
                        <motion.span
                          key={`${plan.id}-${isAnnual}`}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: "easeOut" as const,
                          }}
                          className="text-5xl font-black text-white leading-none"
                        >
                          {price.toLocaleString("es-MX")}
                        </motion.span>
                        <span className="text-gray-500 text-sm mb-1">/mes</span>
                      </div>
                      {isAnnual && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-green-400 text-xs mt-1 font-medium"
                        >
                          Ahorras $
                          {(
                            (plan.monthlyPrice - plan.annualPrice) *
                            12
                          ).toLocaleString("es-MX")}{" "}
                          al año
                        </motion.p>
                      )}
                    </div>

                    <a
                      href="#contacto"
                      className={`w-full text-center py-3 rounded-xl text-sm font-bold transition-all duration-300 mb-8 block ${
                        plan.featured
                          ? "bg-[#C9A227] text-black hover:bg-[#C9A227]/90 shadow-lg shadow-[#C9A227]/20"
                          : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-[#C9A227]/30"
                      }`}
                    >
                      {plan.cta}
                    </a>

                    <div className="border-t border-white/5 mb-6" />

                    <ul className="space-y-3 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle
                            className="w-4 h-4 flex-shrink-0 mt-0.5"
                            style={{ color: plan.accentColor }}
                          />
                          <span className="text-gray-400 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-20 bg-zinc-950 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeUp(0)}>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Su confianza es nuestra{" "}
              <span className="text-[#C9A227]">prioridad</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                {...fadeUp(0.1 + i * 0.08)}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-black/40 border border-white/5 hover:border-[#C9A227]/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#C9A227]/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#C9A227]" />
                </div>
                <h4 className="text-white font-bold text-sm mb-2">{title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp(0)}
            className="relative rounded-2xl border border-[#C9A227]/20 bg-gradient-to-br from-zinc-900 to-zinc-950 p-10 md:p-14 text-center overflow-hidden"
          >
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#C9A227]/10 border border-[#C9A227]/20 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-[#C9A227]" />
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Red hospitalaria o{" "}
                <span className="text-[#C9A227]">grupo médico</span>?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Ofrecemos soluciones enterprise con precios especiales,
                implementación dedicada y contratos flexibles para instituciones
                de cualquier tamaño.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center gap-2 bg-[#C9A227] text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-[#C9A227]/90 transition-all shadow-lg shadow-[#C9A227]/20"
                >
                  <Users className="w-4 h-4" />
                  Hablar con ventas enterprise
                </a>
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center gap-2 border border-white/10 text-white px-8 py-3 rounded-full font-bold text-sm hover:border-[#C9A227]/30 hover:text-[#C9A227] transition-all"
                >
                  Ver casos de éxito
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="py-16 bg-zinc-950 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.p className="text-gray-500 text-sm" {...fadeUp(0)}>
            ¿Tiene preguntas sobre planes o facturación?{" "}
            <a
              href="#contacto"
              className="text-[#C9A227] hover:underline font-semibold"
            >
              Contáctenos directamente
            </a>{" "}
            — respondemos en menos de 24 horas.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
