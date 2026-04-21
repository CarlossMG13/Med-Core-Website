import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe, type StripeCardElementOptions } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Check,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Zap,
  Star,
  Shield,
  CheckCircle2,
  Mail,
  ExternalLink,
} from "lucide-react";

// ── Stripe ────────────────────────────────────────────────────────────────────

const stripePromise = loadStripe(
  "pk_test_51SuG9sJneQW4JvohHTfgyNEmHIiO2vTcaWXmN9SqsAaC9YAhXMYUFE3PGDN9SaBBsL3Lqym3bsGtlKP5E4D3czq900EcdKnOX1"
);

const CARD_ELEMENT_OPTIONS: StripeCardElementOptions = {
  style: {
    base: {
      color: "#ffffff",
      fontFamily: "Geist, system-ui, sans-serif",
      fontSize: "14px",
      "::placeholder": { color: "#4b5563" },
    },
    invalid: { color: "#f87171" },
  },
};

// ── Types ─────────────────────────────────────────────────────────────────────

type PlanId = "oro" | "platino" | "diamante";
type Billing = "monthly" | "annual";

interface AccountData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  password: string;
  confirmPassword: string;
}

interface StripeRegistrationData {
  clientSecret: string;
  customerId: string;
  doctorId: string;
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

const STEP_LABELS = ["Plan", "Tu Cuenta", "Pago", "¡Listo!"];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getPasswordStrength(p: string): number {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

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

const strengthLabels = ["", "Débil", "Regular", "Fuerte", "Muy fuerte"];
const strengthColors = [
  "",
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-400",
  "bg-green-500",
];

function PasswordStrength({ strength }: { strength: number }) {
  if (strength === 0) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= strength ? strengthColors[strength] : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <p
        className={`text-xs mt-1 ${
          strength >= 3 ? "text-green-400" : "text-orange-400"
        }`}
      >
        {strengthLabels[strength]}
      </p>
    </div>
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

function StepAccount({
  account,
  setAccount,
  errors,
  apiError,
  isProcessing,
  onContinue,
  onBack,
}: {
  account: AccountData;
  setAccount: React.Dispatch<React.SetStateAction<AccountData>>;
  errors: FieldErrors;
  apiError: string;
  isProcessing: boolean;
  onContinue: () => void;
  onBack: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const strength = getPasswordStrength(account.password);

  const set = (field: keyof AccountData) => (e: React.ChangeEvent<HTMLInputElement>) =>
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
            Aquí recibirás tus credenciales institucionales y comprobante de pago.
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

        <FieldWrapper label="Contraseña" error={errors.password}>
          <div className="relative">
            <TextInput
              type={showPassword ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              value={account.password}
              onChange={set("password")}
              hasError={!!errors.password}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
            </button>
          </div>
          <PasswordStrength strength={strength} />
          {strength < 4 && account.password.length > 0 && (
            <ul className="mt-2 space-y-0.5">
              {[
                { ok: account.password.length >= 8, label: "Al menos 8 caracteres" },
                { ok: /[A-Z]/.test(account.password), label: "Una mayúscula" },
                { ok: /[0-9]/.test(account.password), label: "Un número" },
                { ok: /[^A-Za-z0-9]/.test(account.password), label: "Un símbolo (@!#...)" },
              ].map(({ ok, label }) => (
                <li key={label} className={`flex items-center gap-1.5 text-xs ${ok ? "text-green-400" : "text-gray-600"}`}>
                  <Check className={`w-3 h-3 ${ok ? "opacity-100" : "opacity-30"}`} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          )}
        </FieldWrapper>

        <FieldWrapper label="Confirmar contraseña" error={errors.confirmPassword}>
          <div className="relative">
            <TextInput
              type={showConfirm ? "text" : "password"}
              placeholder="Repite tu contraseña"
              value={account.confirmPassword}
              onChange={set("confirmPassword")}
              hasError={!!errors.confirmPassword}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
            </button>
          </div>
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

// ── Step 2: Stripe Elements payment form ──────────────────────────────────────

function StepPaymentInner({
  clientSecret,
  account,
  planId,
  billing,
  onSuccess,
  onBack,
}: {
  clientSecret: string;
  account: AccountData;
  planId: PlanId;
  billing: Billing;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const plan = PLANS[planId];
  const price = billing === "annual" ? plan.annualPrice : plan.monthlyPrice;

  const handlePay = async () => {
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setIsProcessing(true);
    setPaymentError("");

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: `${account.nombre} ${account.apellido}`,
          email: account.email,
          phone: account.telefono,
        },
      },
    });

    if (error) {
      setPaymentError(error.message ?? "Error al procesar el pago. Intenta de nuevo.");
      setIsProcessing(false);
    } else if (paymentIntent?.status === "succeeded") {
      onSuccess();
    }
  };

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

      <h2 className="text-2xl font-bold text-white mb-2">Método de pago</h2>
      <p className="text-gray-400 text-sm mb-8">
        Tu información de pago está protegida con cifrado de grado bancario.
      </p>

      {/* Card element */}
      <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 mb-4">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Tarjeta de crédito o débito
        </label>
        <div className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3.5 focus-within:border-[#C9A227]/60 transition-colors duration-200">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>

      {/* Mobile order summary */}
      <div className="lg:hidden bg-zinc-950 border border-white/10 rounded-2xl p-5 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs">Plan {plan.name}</p>
            <p className="text-gray-500 text-xs capitalize">
              {billing === "annual" ? "Anual" : "Mensual"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white font-black text-xl">${price.toLocaleString("es-MX")}</p>
            <p className="text-gray-500 text-xs">/mes</p>
          </div>
        </div>
      </div>

      {paymentError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-4">
          <p className="text-red-400 text-sm">{paymentError}</p>
        </div>
      )}

      <button
        onClick={handlePay}
        disabled={isProcessing || !stripe}
        className="w-full bg-[#C9A227] text-black font-bold py-4 rounded-2xl hover:bg-[#C9A227]/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-lg shadow-[#C9A227]/20"
      >
        {isProcessing ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
              aria-hidden="true"
            />
            Procesando pago…
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" aria-hidden="true" />
            Pagar ${price.toLocaleString("es-MX")}/mes
          </>
        )}
      </button>

      <p className="text-center text-gray-600 text-xs mt-4">
        Al confirmar aceptas nuestros{" "}
        <a href="#" className="text-[#C9A227]/70 hover:text-[#C9A227] underline transition-colors">
          Términos de Servicio
        </a>{" "}
        y{" "}
        <a href="#" className="text-[#C9A227]/70 hover:text-[#C9A227] underline transition-colors">
          Política de Privacidad
        </a>.
      </p>
    </div>
  );
}

// Wrapper that provides the Elements context for step 2
function StepPayment(props: Omit<Parameters<typeof StepPaymentInner>[0], never>) {
  return (
    <Elements stripe={stripePromise}>
      <StepPaymentInner {...props} />
    </Elements>
  );
}

// ── Step 3: Success ───────────────────────────────────────────────────────────

function StepSuccess({
  account,
  planId,
  billing,
}: {
  account: AccountData;
  planId: PlanId;
  billing: Billing;
}) {
  const plan = PLANS[planId];
  const price = billing === "annual" ? plan.annualPrice : plan.monthlyPrice;
  const institutionalEmail =
    account.nombre && account.apellido
      ? `${account.nombre.toLowerCase()}.${account.apellido.toLowerCase()}@garra-med.com.mx`
      : "nombre.apellido@garra-med.com.mx";

  return (
    <div className="max-w-lg mx-auto text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-green-500/15 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-6"
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <Check className="w-10 h-10 text-green-400" aria-hidden="true" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2">
          ¡Bienvenido{account.nombre ? `, Dr. ${account.nombre}` : ""}!
        </h2>
        <p className="text-gray-400 text-sm mb-10">
          Tu suscripción al Plan {plan.name} está activa. Revisa tu correo para continuar.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="space-y-3 mb-10"
      >
        <div className="bg-zinc-950 border border-[#C9A227]/20 rounded-2xl p-5 text-left">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C9A227]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Mail className="w-4 h-4 text-[#C9A227]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-1">Tu correo institucional</p>
              <p className="text-[#C9A227] font-mono text-sm break-all">{institutionalEmail}</p>
              <p className="text-gray-500 text-xs mt-1.5">
                Recibirás las credenciales en{" "}
                <span className="text-gray-300">{account.email || "tu email personal"}</span>{" "}
                en los próximos minutos.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-5 text-left">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs mb-0.5">Plan activo</p>
              <p className="text-white font-bold">Plan {plan.name}</p>
            </div>
            <div className="text-right">
              <p className="text-white font-black text-xl">${price.toLocaleString("es-MX")}</p>
              <p className="text-gray-500 text-xs">/mes</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 border border-yellow-500/20 rounded-2xl p-5 text-left">
          <p className="text-yellow-400 text-xs font-semibold mb-1">Verificación pendiente</p>
          <p className="text-gray-400 text-xs leading-relaxed">
            Puedes acceder al dashboard ahora, pero tu perfil no aparecerá en el directorio
            público hasta completar la verificación.
          </p>
        </div>
      </motion.div>

      <motion.a
        href="https://doc-app-anex.vercel.app/"
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="inline-flex items-center justify-center gap-2 w-full bg-[#C9A227] text-black font-bold py-4 rounded-2xl hover:bg-[#C9A227]/90 transition-colors duration-200 text-sm shadow-lg shadow-[#C9A227]/20"
      >
        Ir al Dashboard
        <ExternalLink className="w-4 h-4" aria-hidden="true" />
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4"
      >
        <Link to="/pricing" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
          Volver a Planes
        </Link>
      </motion.div>
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
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState("");
  const [stripeData, setStripeData] = useState<StripeRegistrationData | null>(null);

  const goForward = () => {
    setDirection(1);
    setErrors({});
    setStep((s) => Math.min(s + 1, 3));
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
    if (getPasswordStrength(account.password) < 3) e.password = "La contraseña es muy débil";
    if (account.password !== account.confirmPassword) e.confirmPassword = "Las contraseñas no coinciden";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Step 1 → 2: register doctor and get clientSecret
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
            plan: selectedPlan.toUpperCase(),
            billing_cycle: "MENSUAL",
            password: account.password,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Error al crear la cuenta");
      setStripeData({
        clientSecret: data.clientSecret,
        customerId: data.customerId,
        doctorId: data.doctorId,
      });
      goForward();
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Ocurrió un error. Intenta de nuevo.");
    } finally {
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
          className={`grid gap-10 ${step < 3 ? "lg:grid-cols-[1fr_360px]" : ""}`}
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
                    onContinue={handleAccountContinue}
                    onBack={goBack}
                  />
                )}
                {step === 2 && stripeData && (
                  <StepPayment
                    clientSecret={stripeData.clientSecret}
                    account={account}
                    planId={selectedPlan}
                    billing={billing}
                    onSuccess={goForward}
                    onBack={goBack}
                  />
                )}
                {step === 3 && (
                  <StepSuccess
                    account={account}
                    planId={selectedPlan}
                    billing={billing}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {step < 3 && (
            <div className="hidden lg:block">
              <OrderSummary planId={selectedPlan} billing={billing} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
