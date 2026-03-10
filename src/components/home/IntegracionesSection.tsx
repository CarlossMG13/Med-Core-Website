import { motion } from "framer-motion";
import {
  Calendar,
  FolderOpen,
  Video,
  FileText,
  BadgeCheck,
  Mail,
  Lock,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import doctorPhoto from "@/assets/doctor-pfp.jpg";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

const workspaceApps = [
  { icon: Calendar, color: "text-blue-400", label: "Agenda" },
  { icon: FolderOpen, color: "text-yellow-400", label: "Drive" },
  { icon: Video, color: "text-blue-500", label: "Meet" },
  { icon: FileText, color: "text-green-500", label: "Docs" },
];

const features = [
  {
    icon: Mail,
    title: "Correo Corporativo Automatizado",
    description: "Cuentas @su-clinica.com listas en segundos.",
  },
  {
    icon: Lock,
    title: "SSO & Seguridad Enterprise",
    description: "Acceso único a expedientes y herramientas.",
  },
  {
    icon: RefreshCw,
    title: "Sincronización Bidireccional",
    description:
      "Citas de MedCore aparecen instantáneamente en Google Calendar.",
  },
];

export function IntegracionesSection() {
  return (
    <section
      id="integraciones"
      className="py-24 bg-black relative overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-zinc-900 to-transparent z-0" />
      <div className="absolute -right-20 top-1/4 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Card mockup */}
          <motion.div className="order-2 lg:order-1 relative" {...fadeUp(0.2)}>
            <div className="relative mx-auto max-w-md">
              {/* Decorative rings */}
              <div className="absolute -top-6 -right-6 w-24 h-24 border border-gray-700 rounded-full z-10 opacity-50" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-[#C9A227]/20 rounded-full z-10" />

              {/* Glass card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative z-20">
                {/* Doctor profile */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full border-2 border-[#C9A227] p-1 flex-shrink-0">
                    {/* Reemplaza con <img> cuando tengas la foto */}
                    <div className="w-full h-full rounded-full bg-zinc-700 flex items-center justify-center text-white font-bold text-lg">
                      <img
                        src={doctorPhoto}
                        alt="Doctor Profile"
                        className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      Dr. Carlos Zamudio
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Cardiología Intervencionista
                    </p>
                  </div>
                  <div className="ml-auto">
                    <BadgeCheck className="w-6 h-6 text-green-500" />
                  </div>
                </div>

                {/* Email account */}
                <div className="bg-black/60 rounded-xl p-4 border border-gray-700 mb-6">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">
                    Cuenta Corporativa
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-red-500" />
                      </div>
                      <span className="text-white font-mono text-xs sm:text-sm truncate">
                        dr-zamudio@med-core.com.mx
                      </span>
                    </div>
                    <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded border border-green-900/50 flex-shrink-0">
                      Activa
                    </span>
                  </div>
                </div>

                {/* Workspace apps */}
                <div className="grid grid-cols-4 gap-4">
                  {workspaceApps.map(({ icon: Icon, color, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 hover:border-[#C9A227]/50 transition-colors">
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <span className="text-[10px] text-gray-400">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Connector line — solo desktop */}
                <div className="hidden lg:block absolute -right-24 top-1/2 w-24 h-px bg-gradient-to-r from-[#C9A227] to-transparent" />
                <div className="hidden lg:block absolute -right-[100px] top-1/2 w-2 h-2 bg-[#C9A227] rounded-full animate-ping" />
              </div>
            </div>
          </motion.div>

          {/* Right — Text content */}
          <div className="order-1 lg:order-2">
            <motion.div className="flex items-center gap-3 mb-4" {...fadeUp(0)}>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 uppercase tracking-wider">
                Nuevo
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs font-bold border border-white/10 uppercase tracking-wider flex items-center gap-2">
                {/* Reemplaza con logo de Google si lo tienes en public */}
                <span className="text-[10px] font-black text-blue-400">G</span>
                Workspace
              </span>
            </motion.div>

            <motion.h2
              className="text-4xl font-bold text-white mb-6"
              {...fadeUp(0.1)}
            >
              Identidad Digital{" "}
              <span className="text-[#C9A227]">Instantánea</span>
            </motion.h2>

            <motion.p
              className="text-gray-400 text-lg mb-8 leading-relaxed"
              {...fadeUp(0.2)}
            >
              Olvídese de las configuraciones manuales de TI. Al dar de alta un
              nuevo médico en MedCore, generamos automáticamente su ecosistema
              digital profesional.
            </motion.p>

            <motion.ul className="space-y-6" {...fadeUp(0.3)}>
              {features.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C9A227]/10 flex items-center justify-center mt-1">
                    <Icon className="w-4 h-4 text-[#C9A227]" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-bold text-lg">{title}</h4>
                    <p className="text-gray-500 text-sm">{description}</p>
                  </div>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
        {/* CTA */}
        <motion.div className="mt-14 flex justify-center" {...fadeUp(0.4)}>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#C9A227] transition-colors group border border-white/5 hover:border-[#C9A227]/20 px-5 py-2.5 rounded-full"
          >
            ¿Quieres una integración personalizada?
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
