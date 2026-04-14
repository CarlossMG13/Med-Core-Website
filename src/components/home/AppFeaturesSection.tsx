// src/components/home/AppFeaturesSection.tsx
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  FileText,
  Bell,
  Scale,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Maximize2,
  X,
  ArrowRight,
} from "lucide-react";

import alertasImg from "../../assets/Alertas.JPG";
import contabilidadImg from "../../assets/Contabilidad.JPG";
import expedientesImg from "../../assets/Expedientes.JPG";
import juridicoImg from "../../assets/Juridico.JPG";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

const features = [
  {
    icon: Database,
    title: "Base de Datos Optimizada",
    description:
      "Almacenamiento seguro con respaldo automático en la nube y acceso ultrarrápido.",
  },
  {
    icon: FileText,
    title: "Expedientes Clínicos",
    description:
      "Historial completo de cada paciente, organizado y accesible en segundos.",
  },
  {
    icon: Bell,
    title: "Alertas Inteligentes",
    description:
      "Notificaciones proactivas de vencimientos, urgencias y seguimientos.",
  },
  {
    icon: Scale,
    title: "Contabilidad & Jurídico",
    description:
      "Gestión financiera y defensa legal integradas en un solo panel.",
  },
];

const cards = [
  {
    id: 0,
    label: "Expedientes Clínicos",
    icon: LayoutDashboard,
    accent: "#C9A227",
    image: expedientesImg,
  },
  {
    id: 1,
    label: "Alertas Inteligentes",
    icon: Bell,
    accent: "#60a5fa",
    image: alertasImg,
  },
  {
    id: 2,
    label: "Jurídico",
    icon: Scale,
    accent: "#34d399",
    image: juridicoImg,
  },
  {
    id: 3,
    label: "Contabilidad",
    icon: FileText,
    accent: "#f87171",
    image: contabilidadImg,
  },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 320 : -320,
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? 320 : -320,
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.3, ease: "easeIn" as const },
  }),
};

export function AppFeaturesSection() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [expanded, setExpanded] = useState(false);
  const dragDelta = useRef(0);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const expandBtnRef = useRef<HTMLButtonElement>(null);

  const paginate = useCallback((newDir: number) => {
    setCurrent(([prev]) => [
      (prev + newDir + cards.length) % cards.length,
      newDir,
    ]);
  }, []);

  // Keyboard navigation for carousel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (expanded) return;
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, paginate]);

  // Focus trap + Escape for lightbox
  useEffect(() => {
    if (!expanded) return;
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpanded(false);
        expandBtnRef.current?.focus();
      }
      if (e.key === "Tab") {
        // Single focusable element in lightbox — keep focus on close button
        e.preventDefault();
        closeBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  const card = cards[current];
  const CardIcon = card.icon;
  const prevIdx = (current - 1 + cards.length) % cards.length;
  const nextIdx = (current + 1) % cards.length;

  return (
    <>
      <section className="py-24 bg-zinc-950 relative overflow-hidden border-t border-gray-900">
        <div className="absolute top-10 -left-10 w-96 h-96 border border-[#C9A227]/10 rounded-full pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-10 -right-10 w-96 h-96 border border-[#C9A227]/10 rounded-full pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — features */}
            <div>
              <motion.div {...fadeUp(0)}>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Interfaz <span className="text-[#C9A227]">Dark-First</span>
                </h2>
                <p className="text-gray-400 mb-8 text-lg">
                  Diseñada para sesiones largas. Reducción de fatiga visual con
                  un contraste calibrado para entornos médicos de baja
                  luminosidad.
                </p>
              </motion.div>

              <ul className="space-y-4">
                {features.map(({ icon: Icon, title, description }, i) => (
                  <motion.li
                    key={title}
                    {...fadeUp(0.1 + i * 0.08)}
                    className="flex items-start p-4 bg-white/5 rounded-lg border border-white/5 hover:border-[#C9A227]/30 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#C9A227]/10 flex items-center justify-center mr-4 mt-0.5">
                      <Icon className="w-4 h-4 text-[#C9A227]" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{title}</h4>
                      <p className="text-gray-500 text-sm mt-0.5">
                        {description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right — carousel */}
            <motion.div
              className="flex flex-col items-center gap-6"
              {...fadeUp(0.3)}
            >
              {/* Hint de arrastre */}
              <p className="text-xs text-gray-600 tracking-widest uppercase select-none" aria-hidden="true">
                ← arrastra, desliza o usa las flechas →
              </p>

              <div
                className="relative w-full max-w-md"
                style={{ height: "420px" }}
                role="region"
                aria-label="Galería de pantallas de la app"
              >
                {/* Peeking cards — botones accesibles */}
                {[prevIdx, nextIdx].map((idx, i) => (
                  <button
                    key={`peek-${idx}`}
                    onClick={() => paginate(i === 0 ? -1 : 1)}
                    aria-label={`Ver ${cards[idx].label}`}
                    className="absolute inset-0 rounded-2xl border bg-zinc-900 shadow-xl overflow-hidden"
                    style={{
                      transform: `translateX(${i === 0 ? -16 : 16}px) rotate(${i === 0 ? -4 : 4}deg) scale(0.95)`,
                      borderColor: `${cards[idx].accent}40`,
                      zIndex: 0,
                    }}
                  >
                    <img
                      src={cards[idx].image}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
                  </button>
                ))}

                {/* Active card */}
                <div className="absolute inset-0" style={{ zIndex: 1 }}>
                  <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.div
                      key={card.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.15}
                      onDragStart={() => { dragDelta.current = 0; }}
                      onDrag={(_, { offset }) => { dragDelta.current = Math.abs(offset.x); }}
                      onDragEnd={(_, { offset, velocity }) => {
                        const swipe = offset.x * velocity.x;
                        if (swipe < -6000 || offset.x < -80) paginate(1);
                        else if (swipe > 6000 || offset.x > 80) paginate(-1);
                      }}
                      className="absolute inset-0 rounded-2xl border bg-zinc-900 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
                      style={{ borderColor: `${card.accent}50` }}
                      aria-label={card.label}
                    >
                      <img
                        src={card.image}
                        alt={`Pantalla de ${card.label}`}
                        className="w-full h-full object-cover pointer-events-none"
                      />

                      {/* Botón expandir */}
                      <button
                        ref={expandBtnRef}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (dragDelta.current < 5) setExpanded(true);
                        }}
                        aria-label={`Ampliar vista de ${card.label}`}
                        className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/80 transition-colors duration-200 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                      </button>

                      {/* Label overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4">
                        <div className="flex items-center gap-2">
                          <CardIcon
                            className="w-4 h-4"
                            style={{ color: card.accent }}
                            aria-hidden="true"
                          />
                          <span className="text-white text-sm font-semibold">
                            {card.label}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4" role="group" aria-label="Controles del carrusel">
                <button
                  onClick={() => paginate(-1)}
                  aria-label="Pantalla anterior"
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C9A227]/10 hover:border-[#C9A227]/40 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-400" aria-hidden="true" />
                </button>

                <div className="flex items-center gap-2" role="tablist" aria-label="Selector de pantalla">
                  {cards.map((c, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === current}
                      aria-label={`Ver ${c.label}`}
                      onClick={() => setCurrent(([prev]) => [i, i > prev ? 1 : -1])}
                      className="transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                      style={{
                        width: i === current ? "20px" : "8px",
                        height: "8px",
                        minWidth: "8px",
                        backgroundColor:
                          i === current ? "#C9A227" : "rgba(255,255,255,0.2)",
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={() => paginate(1)}
                  aria-label="Pantalla siguiente"
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C9A227]/10 hover:border-[#C9A227]/40 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                >
                  <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
                </button>
              </div>

              {/* Revenue badge */}
              <div className="bg-zinc-900 border border-gray-800 px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg">
                <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-400" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">
                    Reducción carga administrativa
                  </div>
                  <div className="text-lg font-bold text-white">−40%</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div className="mt-14 flex justify-center" {...fadeUp(0.4)}>
          <a
            href="#ia-demo"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#C9A227] transition-colors duration-200 group border border-white/5 hover:border-[#C9A227]/20 px-5 py-2.5 rounded-full min-h-[44px]"
          >
            ¿Quieres ver estas funciones en vivo?
            <span className="font-semibold text-[#C9A227]">
              Solicitar Demo
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C9A227] group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </a>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setExpanded(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`Vista ampliada: ${card.label}`}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl border"
              style={{ borderColor: `${card.accent}40` }}
            >
              <img
                src={card.image}
                alt={`Vista ampliada de ${card.label}`}
                className="w-full h-auto max-h-[85vh] object-contain bg-zinc-900"
              />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
                <div className="flex items-center gap-2">
                  <CardIcon className="w-4 h-4" style={{ color: card.accent }} aria-hidden="true" />
                  <span className="text-white text-sm font-semibold">{card.label}</span>
                </div>
              </div>

              {/* Cerrar */}
              <button
                ref={closeBtnRef}
                onClick={() => {
                  setExpanded(false);
                  expandBtnRef.current?.focus();
                }}
                aria-label="Cerrar vista ampliada"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 border border-white/10 flex items-center justify-center hover:bg-black transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
              >
                <X className="w-4 h-4 text-white" aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
