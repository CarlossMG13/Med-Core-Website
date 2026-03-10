import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook, Youtube } from "lucide-react";

const anchorLinks = [
  { label: "IA Demo", href: "#ia-demo" },
  { label: "Integraciones", href: "#integraciones" },
  { label: "Soluciones", href: "#soluciones" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-black border-t border-[#C9A227]/20">
      <div className="max-w-8xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/">
            <img
              src="/public/Logo/Logo horizontal/Logo horizontal (blanco).svg"
              alt="Med-Core"
              className="h-15 w-auto"
            />
          </Link>

          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {anchorLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 hover:text-[#C9A227] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/pricing"
              className="text-sm text-white/60 hover:text-[#C9A227] transition-colors"
            >
              Pricing
            </Link>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white/50 hover:text-[#C9A227] transition-colors"
              >
                <Icon size={18} />
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
