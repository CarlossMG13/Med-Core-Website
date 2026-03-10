import { motion } from "framer-motion";

const anchorBubbles = [
  { initials: "JD", bg: "bg-gray-700" },
  { initials: "AM", bg: "bg-gray-600" },
  { initials: "+42", bg: "bg-gray-500" },
];

// Variante base reutilizable: fade + slide up
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background layers — sin animación, estáticos */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#C9A22715_0%,_transparent_60%)] z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-[#C9A227]/10 to-transparent blur-3xl opacity-30 pointer-events-none" />

      {/* Floating dots */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-[#C9A227] rounded-full animate-ping opacity-20" />
      <div className="absolute bottom-1/3 right-20 w-3 h-3 bg-[#C9A227] rounded-full animate-pulse opacity-20" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Isologo — escala desde 0 */}
        <motion.div
          className="mx-auto mb-8 w-24 h-24 sm:w-32 sm:h-32 relative"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src="/public/Isologo/Isologo.svg"
            alt="Med-Core Emblem"
            className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(201,162,39,0.6)]"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-tight"
          {...fadeUp(0.2)}
        >
          <span className="text-white block">EL FUTURO</span>
          <span className="block bg-gradient-to-r from-[#C9A227] via-yellow-300 to-[#C9A227] bg-clip-text text-transparent">
            MÉDICO LEGAL
          </span>
        </motion.h1>

        {/* Subtitle divider */}
        <motion.div
          className="flex items-center justify-center space-x-4 mb-8"
          {...fadeUp(0.4)}
        >
          <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />
          <span className="text-[#C9A227] tracking-[0.3em] uppercase text-xs sm:text-sm font-bold">
            SaaS Premium para Doctores
          </span>
          <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />
        </motion.div>

        {/* Description */}
        <motion.p
          className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 font-light leading-relaxed"
          {...fadeUp(0.55)}
        >
          Gestión administrativa autónoma. Protección jurídica en tiempo real.{" "}
          <span className="text-white font-normal">Potenciado por IA.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
          {...fadeUp(0.7)}
        >
          <a
            href="#ia-demo"
            className="group relative px-8 py-4 bg-[#C9A227] text-black font-bold text-sm tracking-wider uppercase rounded-sm overflow-hidden shadow-[0_0_30px_rgba(201,162,39,0.4)] transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Solicitar Demo
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>

          <a
            href="#soluciones"
            className="px-8 py-4 text-gray-300 hover:text-white border border-white/20 hover:border-[#C9A227]/60 rounded-sm transition-all duration-300 bg-white/5 backdrop-blur-sm hover:bg-white/10"
          >
            <span className="font-light tracking-wider uppercase text-sm">
              Conocer Más
            </span>
          </a>
        </motion.div>
      </div>

      {/* Live Waitlist card — entra desde la derecha */}
      <motion.div
        className="absolute bottom-10 right-10 z-20 hidden md:block"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 1 }}
      >
        <div className="bg-black/80 backdrop-blur-md border border-[#C9A227]/30 p-4 rounded-xl shadow-[0_0_20px_rgba(201,162,39,0.15)] max-w-xs">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-[#C9A227] font-bold uppercase tracking-wide">
              Live Waitlist
            </span>
          </div>
          <div className="flex -space-x-2 mb-3">
            {anchorBubbles.map(({ initials, bg }) => (
              <div
                key={initials}
                className={`w-8 h-8 rounded-full ${bg} border-2 border-black flex items-center justify-center text-xs text-white`}
              >
                {initials}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400">
            Doctores uniéndose hoy. <br /> Asegura tu lugar.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
