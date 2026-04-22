import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Lock,
  ArrowLeft,
  Zap,
  Star,
  Shield,
  CheckCircle2,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type PlanId = "oro" | "platino" | "diamante";
type Billing = "monthly" | "annual";

interface AccountData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  id_tipo_doctor: string;
}

type FieldErrors = Partial<AccountData>;

// ── Plan data ─────────────────────────────────────────────────────────────────

const PLANS: Record<
  PlanId,
  {
    name: string;
    icon: React.ElementType;
    monthlyPrice: number;
    annualPrice: number;
    color: string;
    highlights: string[];
  }
> = {
  oro: {
    name: "Oro",
    icon: Zap,
    monthlyPrice: 1400,
    annualPrice: 1199,
    color: "#C9A227",
    highlights: [
      "Hasta 3 médicos",
      "Agenda inteligente con IA",
      "1 cuenta @garra-med.com.mx",
    ],
  },
  platino: {
    name: "Platino",
    icon: Star,
    monthlyPrice: 1600,
    annualPrice: 2399,
    color: "#C9A227",
    highlights: [
      "Hasta 10 médicos",
      "IA avanzada y reportes",
      "Soporte prioritario 24/7",
    ],
  },
  diamante: {
    name: "Diamante",
    icon: Shield,
    monthlyPrice: 1900,
    annualPrice: 4799,
    color: "#a78bfa",
    highlights: [
      "Médicos ilimitados",
      "Módulo jurídico completo",
      "Manager de cuenta dedicado",
    ],
  },
};

const STEP_LABELS = ["Plan", "Tu Cuenta"];

// ── UI primitives ─────────────────────────────────────────────────────────────

function FieldWrapper({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
}

function TextInput({
  hasError,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  return (
    <input
      {...props}
      className={`w-full bg-zinc-900 border ${
        hasError ? "border-red-500/60" : "border-white/10"
      } rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#C9A227]/60 transition-colors duration-200`}
    />
  );
}

// ── Order summary sidebar ──────────────────────────────────────────────────────

function OrderSummary({
  planId,
  billing,
}: {
  planId: PlanId;
  billing: Billing;
}) {
  const plan = PLANS[planId];
  const price = billing === "annual" ? plan.annualPrice : plan.monthlyPrice;
  const PlanIcon = plan.icon;

  return (
    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 sticky top-24">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5">
        Resumen de tu pedido
      </h3>

      <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${plan.color}15` }}
        >
          <PlanIcon className="w-5 h-5" style={{ color: plan.color }} aria-hidden="true" />
        </div>
        <div>
          <p className="text-white font-bold text-sm">Plan {plan.name}</p>
          <p className="text-gray-500 text-xs capitalize">
            Facturación {billing === "annual" ? "anual" : "mensual"}
          </p>
        </div>
      </div>

      <ul className="space-y-2 mb-5">
        {plan.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5">
            <CheckCircle2
              className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
              style={{ color: plan.color }}
              aria-hidden="true"
            />
            <span className="text-gray-400 text-xs">{h}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-white/10 pt-4">
        <div className="flex items-end justify-between">
          <span className="text-gray-400 text-sm">Total mensual</span>
          <div className="text-right">
            <span className="text-white font-black text-2xl">
              ${price.toLocaleString("es-MX")}
            </span>
            <span className="text-gray-500 text-xs">/mes</span>
          </div>
        </div>
        {billing === "annual" && (
          <p className="text-green-400 text-xs mt-1.5 text-right">
            Ahorras $
            {((plan.monthlyPrice - plan.annualPrice) * 12).toLocaleString("es-MX")}{" "}
            al año
          </p>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2">
        <Lock className="w-3.5 h-3.5 text-gray-600" aria-hidden="true" />
        <span className="text-gray-600 text-xs">Pago procesado con cifrado SSL</span>
      </div>
    </div>
  );
}

// ── Step 0: Plan ──────────────────────────────────────────────────────────────

function StepPlan({
  selectedPlan,
  setSelectedPlan,
  billing,
  setBilling,
  onContinue,
}: {
  selectedPlan: PlanId;
  setSelectedPlan: (p: PlanId) => void;
  billing: Billing;
  setBilling: (b: Billing) => void;
  onContinue: () => void;
}) {
  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold text-white mb-2">Elige tu plan</h2>
      <p className="text-gray-400 text-sm mb-8">
        Puedes cambiar o cancelar tu suscripción en cualquier momento.
      </p>

      <div className="inline-flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-full p-1 mb-6">
        <button
          onClick={() => setBilling("monthly")}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
            billing === "monthly" ? "bg-[#C9A227] text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          Mensual
        </button>
        <button
          onClick={() => setBilling("annual")}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
            billing === "annual" ? "bg-[#C9A227] text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          Anual
          <span
            className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
              billing === "annual"
                ? "bg-black/20 text-black"
                : "bg-green-500/20 text-green-400 border border-green-500/30"
            }`}
          >
            -20%
          </span>
        </button>
      </div>

      <div className="space-y-3 mb-8">
        {(Object.entries(PLANS) as [PlanId, (typeof PLANS)[PlanId]][]).map(([id, plan]) => {
          const PlanIcon = plan.icon;
          const price = billing === "annual" ? plan.annualPrice : plan.monthlyPrice;
          const isSelected = selectedPlan === id;
          return (
            <button
              key={id}
              onClick={() => setSelectedPlan(id)}
              aria-pressed={isSelected}
              className={`w-full text-left rounded-2xl border p-5 transition-all duration-200 ${
                isSelected
                  ? "border-[#C9A227]/60 bg-[#C9A227]/5"
                  : "border-white/10 bg-zinc-950 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${plan.color}15` }}
                  >
                    <PlanIcon className="w-4.5 h-4.5" style={{ color: plan.color }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Plan {plan.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{plan.highlights[0]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-white font-black text-lg leading-none">
                      ${price.toLocaleString("es-MX")}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">/mes</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      isSelected ? "border-[#C9A227] bg-[#C9A227]" : "border-white/20"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-black" aria-hidden="true" />}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onContinue}
        className="w-full bg-[#C9A227] text-black font-bold py-4 rounded-2xl hover:bg-[#C9A227]/90 transition-colors duration-200 flex items-center justify-center gap-2 text-sm shadow-lg shadow-[#C9A227]/20"
      >
        Continuar con Plan {PLANS[selectedPlan].name}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// ── Step 1: Account ───────────────────────────────────────────────────────────

interface TipoDoctor {
  id_tipo_doctor: string;
  nombre_tipo: string;
}

function StepAccount({
  account,
  setAccount,
  errors,
  apiError,
  isProcessing,
  tiposDoctor,
  loadingTipos,
  onContinue,
  onBack,
}: {
  account: AccountData;
  setAccount: React.Dispatch<React.SetStateAction<AccountData>>;
  errors: FieldErrors;
  apiError: string;
  isProcessing: boolean;
  tiposDoctor: TipoDoctor[];
  loadingTipos: boolean;
  onContinue: () => void;
  onBack: () => void;
}) {
  const set = (field: keyof AccountData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setAccount((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="max-w-xl">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors text-sm mb-6"
        aria-label="Volver al paso anterior"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Volver
      </button>

      <h2 className="text-2xl font-bold text-white mb-2">Crea tu cuenta</h2>
      <p className="text-gray-400 text-sm mb-8">
        Estos datos se usarán para acceder al dashboard y recibir tus credenciales institucionales.
        Recibirás una contraseña temporal por email al confirmar tu pago.
      </p>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <FieldWrapper label="Nombre" error={errors.nombre}>
            <TextInput
              placeholder="Roberto"
              value={account.nombre}
              onChange={set("nombre")}
              hasError={!!errors.nombre}
              autoComplete="given-name"
            />
          </FieldWrapper>
          <FieldWrapper label="Apellido" error={errors.apellido}>
            <TextInput
              placeholder="Sánchez"
              value={account.apellido}
              onChange={set("apellido")}
              hasError={!!errors.apellido}
              autoComplete="family-name"
            />
          </FieldWrapper>
        </div>

        <FieldWrapper label="Email personal" error={errors.email}>
          <TextInput
            type="email"
            placeholder="dr.sanchez@gmail.com"
            value={account.email}
            onChange={set("email")}
            hasError={!!errors.email}
            autoComplete="email"
          />
          <p className="text-gray-600 text-xs mt-1.5">
            Aquí recibirás tus credenciales de acceso y comprobante de pago.
          </p>
        </FieldWrapper>

        <FieldWrapper label="Teléfono" error={errors.telefono}>
          <TextInput
            type="tel"
            placeholder="5512345678"
            value={account.telefono}
            onChange={(e) =>
              setAccount((prev) => ({
                ...prev,
                telefono: e.target.value.replace(/\D/g, "").slice(0, 10),
              }))
            }
            hasError={!!errors.telefono}
            autoComplete="tel"
          />
        </FieldWrapper>

        <FieldWrapper label="Tipo de médico" error={errors.id_tipo_doctor}>
          <select
            value={account.id_tipo_doctor}
            onChange={set("id_tipo_doctor")}
            disabled={loadingTipos}
            className={`w-full bg-zinc-900 border ${
              errors.id_tipo_doctor ? "border-red-500/60" : "border-white/10"
            } rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C9A227]/60 transition-colors duration-200 appearance-none disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <option value="" disabled className="text-gray-600">
              {loadingTipos ? "Cargando especialidades..." : "Selecciona tu especialidad"}
            </option>
            {tiposDoctor.map((t) => (
              <option key={t.id_tipo_doctor} value={t.id_tipo_doctor} className="bg-zinc-900">
                {t.nombre_tipo}
              </option>
            ))}
          </select>
        </FieldWrapper>
      </div>

      {apiError && (
        <div className="mt-5 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
          <p className="text-red-400 text-sm">{apiError}</p>
        </div>
      )}

      <button
        onClick={onContinue}
        disabled={isProcessing}
        className="w-full mt-8 bg-[#C9A227] text-black font-bold py-4 rounded-2xl hover:bg-[#C9A227]/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-lg shadow-[#C9A227]/20"
      >
        {isProcessing ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
              aria-hidden="true"
            />
            Creando tu cuenta…
          </>
        ) : (
          <>
            Continuar al Pago
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function CheckoutPage() {
  const [searchParams] = useSearchParams();

  const planParam = searchParams.get("plan") as PlanId | null;
  const initialPlan: PlanId = planParam && planParam in PLANS ? planParam : "platino";

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(initialPlan);
  const [billing, setBilling] = useState<Billing>("monthly");
  const [account, setAccount] = useState<AccountData>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    id_tipo_doctor: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState("");
  const [tiposDoctor, setTiposDoctor] = useState<TipoDoctor[]>([]);
  const [loadingTipos, setLoadingTipos] = useState(true);

  useEffect(() => {
    fetch("https://docapp-anex-production.up.railway.app/api/tipo-doctor")
      .then((res) => res.json())
      .then((data) => setTiposDoctor(Array.isArray(data) ? data : []))
      .catch(() => setTiposDoctor([]))
      .finally(() => setLoadingTipos(false));
  }, []);

  const goForward = () => {
    setDirection(1);
    setErrors({});
    setStep((s) => Math.min(s + 1, 1));
  };

  const goBack = () => {
    setDirection(-1);
    setErrors({});
    setApiError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const validateAccount = (): boolean => {
    const e: FieldErrors = {};
    if (!account.nombre.trim()) e.nombre = "Requerido";
    if (!account.apellido.trim()) e.apellido = "Requerido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account.email)) e.email = "Email inválido";
    if (account.telefono.length < 10) e.telefono = "Ingresa 10 dígitos";
    if (!account.id_tipo_doctor) e.id_tipo_doctor = "Selecciona un tipo";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAccountContinue = async () => {
    if (!validateAccount()) return;
    setIsProcessing(true);
    setApiError("");
    try {
      const res = await fetch(
        "https://docapp-anex-production.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: account.nombre,
            apellido: account.apellido,
            email: account.email,
            telefono: account.telefono,
            id_tipo_doctor: account.id_tipo_doctor,
            plan: selectedPlan.toUpperCase(),
            billing_cycle: billing,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Error al crear la cuenta");
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Ocurrió un error. Intenta de nuevo.");
      setIsProcessing(false);
    }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir * 48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -48, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Minimal header */}
      <header className="border-b border-white/10 bg-black/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" aria-label="Med-Core — Ir al inicio">
            <img
              src="/Logo/Logo horizontal/Logo horizontal (blanco).svg"
              alt="Med-Core"
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Lock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Pago 100% seguro</span>
          </div>
        </div>
      </header>

      {/* Step indicator */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <nav aria-label="Progreso del checkout">
          <ol className="flex items-center justify-center gap-0">
            {STEP_LABELS.map((label, i) => {
              const isCompleted = i < step;
              const isActive = i === step;
              return (
                <li key={label} className="flex items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      aria-current={isActive ? "step" : undefined}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        isCompleted
                          ? "bg-[#C9A227] text-black"
                          : isActive
                          ? "bg-[#C9A227]/15 border-2 border-[#C9A227] text-[#C9A227]"
                          : "bg-white/5 border border-white/20 text-gray-600"
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" aria-hidden="true" /> : i + 1}
                    </div>
                    <span
                      className={`text-xs font-medium hidden sm:block ${
                        isActive ? "text-white" : isCompleted ? "text-[#C9A227]" : "text-gray-600"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div
                      className={`w-16 sm:w-24 h-px mx-2 mb-5 transition-colors duration-500 ${
                        i < step ? "bg-[#C9A227]/40" : "bg-white/10"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div
          className="grid gap-10 lg:grid-cols-[1fr_360px]"
        >
          <div>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeInOut" }}
              >
                {step === 0 && (
                  <StepPlan
                    selectedPlan={selectedPlan}
                    setSelectedPlan={setSelectedPlan}
                    billing={billing}
                    setBilling={setBilling}
                    onContinue={goForward}
                  />
                )}
                {step === 1 && (
                  <StepAccount
                    account={account}
                    setAccount={setAccount}
                    errors={errors}
                    apiError={apiError}
                    isProcessing={isProcessing}
                    tiposDoctor={tiposDoctor}
                    loadingTipos={loadingTipos}
                    onContinue={handleAccountContinue}
                    onBack={goBack}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden lg:block">
            <OrderSummary planId={selectedPlan} billing={billing} />
          </div>
        </div>
      </div>
    </div>
  );
}
