import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, Calendar, Plus, UserPlus, CalendarX } from "lucide-react";

type Message = {
  id: number;
  role: "ai" | "user";
  text: string;
};

type Step = "greeting" | "waitingName" | "done";

const quickActions = [
  { label: "Ver citas de hoy", icon: Calendar },
  { label: "Agendar cita", icon: Plus },
  { label: "Registrar paciente", icon: UserPlus },
  { label: "Bloquear agenda", icon: CalendarX },
];

const quickActionResponses: Record<string, string> = {
  "Ver citas de hoy":
    "Hoy tiene 4 citas programadas, incluyendo una urgencia a las 3:00 PM. Para ver su agenda completa en tiempo real y recibir alertas automáticas, solicite una demo y descubra todo lo que MedCore tiene para usted.",
  "Agendar cita":
    "Con MedCore puede agendar citas en segundos, enviar confirmaciones automáticas por WhatsApp y sincronizar su calendario. Solicite una demo para ver esta funcionalidad en acción.",
  "Registrar paciente":
    "El registro de pacientes en MedCore incluye historial clínico, documentos legales y alertas de seguimiento. Solicite una demo y descubra el mundo de oportunidades que MedCore tiene para usted.",
  "Bloquear agenda":
    "Puede bloquear días, rangos de horas o semanas completas desde cualquier dispositivo. Su equipo recibirá notificaciones automáticamente. Solicite una demo para verlo en vivo.",
};

const genericDemoResponse = (name: string) =>
  `Esa es una excelente consulta, Dr. ${name}. Para descubrir todas las funcionalidades que MedCore tiene para su práctica, le invitamos a solicitar una demo personalizada.`;

const extractName = (input: string): string => {
  const patterns = [
    /me llamo\s+(.+)/i,
    /soy\s+(?:el\s+dr\.?\s*|la\s+dra\.?\s*)?(.+)/i,
    /mi nombre es\s+(.+)/i,
  ];
  for (const p of patterns) {
    const m = input.match(p);
    if (m) return m[1].trim();
  }
  return input.trim();
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

export function IaDemoSection() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "ai", text: "¡Hola Doctor! ¿Cuál es su nombre?" },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<Step>("greeting");
  const [doctorName, setDoctorName] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: messages.length,
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    if (step === "greeting") {
      const name = extractName(trimmed);
      setDoctorName(name);
      setStep("waitingName");

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length,
            role: "ai",
            text: `¡Hola Dr. ${name}! Soy su asistente MedCore. Estoy aquí para gestionar su agenda, registrar pacientes y proteger su práctica con respaldo legal en tiempo real — todo potenciado por IA. ¿En qué le puedo ayudar hoy?`,
          },
        ]);
        setStep("done");
      }, 900);
    } else if (step === "done") {
      const matched = quickActionResponses[trimmed];
      const reply = matched ?? genericDemoResponse(doctorName);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: prev.length, role: "ai", text: reply },
        ]);
      }, 700);
    }
  };

  return (
    <section id="ia-demo" className="py-24 bg-zinc-950 relative">
      {/* Grid background sutil */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#C9A22720 1px, transparent 1px), linear-gradient(90deg, #C9A22720 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header de sección */}
        <motion.div className="text-center mb-16" {...fadeUp(0)}>
          <span className="text-[#C9A227] font-bold tracking-widest uppercase text-xs mb-2 block">
            Inteligencia Artificial
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Su Asistente Personal{" "}
            <span className="bg-gradient-to-r from-[#C9A227] via-yellow-300 to-[#C9A227] bg-clip-text text-transparent">
              24/7
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Interactúe con nuestro Agente de IA y experimente cómo gestiona su
            práctica médica de forma autónoma.
          </p>
        </motion.div>

        {/* Chat interactivo */}
        <motion.div className="relative max-w-lg mx-auto" {...fadeUp(0.2)}>
          {/* Glow border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#C9A227] via-white/10 to-[#C9A227] rounded-2xl blur opacity-20" />

          {/* Modal shell */}
          <div className="relative bg-[#1a1a1f] border border-[#C9A227]/20 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header del chat */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-[#16161b]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A227] to-amber-600 flex items-center justify-center shadow-[0_0_12px_rgba(201,162,39,0.4)]">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none">
                  Asistente MedCore
                </p>
                <p className="text-gray-500 text-xs mt-0.5">
                  IA · Gestión de agenda
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-400">En línea</span>
              </div>
            </div>

            {/* Mensajes */}
            <div className="h-80 overflow-y-auto px-4 py-4 flex flex-col gap-4 scrollbar-none">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex gap-2 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "ai" && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A227] to-amber-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-black" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "ai"
                          ? "bg-[#252530] text-gray-200 rounded-tl-none border border-white/5"
                          : "bg-[#C9A227]/20 text-[#C9A227] rounded-tr-none border border-[#C9A227]/20"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Quick actions — aparecen al finalizar el flujo */}
              <AnimatePresence>
                {step === "done" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="flex flex-wrap gap-2 pl-9"
                  >
                    {quickActions.map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        onClick={() => setInput(label)}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-[#C9A227]/30 text-[#C9A227]/80 hover:bg-[#C9A227]/10 transition-colors"
                      >
                        <Icon className="w-3 h-3" />
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/5 bg-[#16161b]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-[#0f0f14] border border-[#C9A227]/30 text-white text-sm rounded-full px-4 py-2.5 placeholder:text-gray-600 focus:outline-none focus:border-[#C9A227]/60 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-full bg-[#C9A227] flex items-center justify-center flex-shrink-0 hover:bg-[#C9A227]/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-4 h-4 text-black" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
