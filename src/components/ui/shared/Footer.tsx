import { Link } from "react-router-dom";
// SVG inline para iconos de marca (Lucide deprecó los iconos sociales en v0.400+)
const SvgInstagram = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const SvgLinkedin = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const SvgFacebook = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const SvgYoutube = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const anchorLinks = [
  { label: "IA Demo", id: "ia-demo" },
  { label: "Integraciones", id: "integraciones" },
  { label: "Soluciones", id: "soluciones" },
];

const socialLinks = [
  { icon: SvgInstagram, href: "#", label: "Instagram" },
  { icon: SvgLinkedin, href: "#", label: "LinkedIn" },
  { icon: SvgFacebook, href: "#", label: "Facebook" },
  { icon: SvgYoutube, href: "#", label: "YouTube" },
];

function handleAnchor(id: string) {
  if (window.location.pathname !== "/") {
    window.location.href = `/#${id}`;
  } else {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Footer() {
  return (
    <footer className="bg-black border-t border-[#C9A227]/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" aria-label="Med-Core — Ir al inicio">
            <img
              src="/Logo/Logo horizontal/Logo horizontal (blanco).svg"
              alt="Med-Core"
              className="h-10 w-auto"
            />
          </Link>

          {/* Nav Links */}
          <nav aria-label="Navegación del pie de página">
            <ul className="flex flex-wrap justify-center gap-6 list-none">
              {anchorLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleAnchor(link.id)}
                    className="text-sm text-white/60 hover:text-[#C9A227] transition-colors duration-200 cursor-pointer min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to="/pricing"
                  className="text-sm text-white/60 hover:text-[#C9A227] transition-colors duration-200 min-h-[44px] flex items-center"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white/50 hover:text-[#C9A227] transition-colors duration-200 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Med-Core. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
