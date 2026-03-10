import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

const anchorLinks = [
  { label: "IA Demo", href: "/#ia-demo" },
  { label: "Integraciones", href: "/#integraciones" },
  { label: "Soluciones", href: "/#soluciones" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/public/Logo/Logo horizontal/Logo horizontal (blanco).svg"
              alt="Med-Core"
              className="h-15 w-auto"
            />
          </Link>

          {/* Nav Links + CTA — Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {anchorLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-[#C9A227] transition px-3 py-2 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/pricing"
              className="text-gray-300 hover:text-[#C9A227] transition px-3 py-2 text-sm font-medium"
            >
              Pricing
            </Link>
            <a
              href="https://app.med-core.com"
              target="_blank"
              rel="noreferrer"
              className="bg-[#C9A227] text-black hover:bg-[#C9A227]/90 px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-[#C9A227]/20 transition-all duration-300"
            >
              Acceder al Dashboard
            </a>
          </div>

          {/* Hamburger — Mobile */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-black/95 border-t border-white/10"
          >
            <div className="px-4 pt-4 pb-6 flex flex-col gap-2">
              <div className="md:hidden bg-black/95 border-t border-white/10 px-4 pt-4 pb-6 flex flex-col gap-2">
                {anchorLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-300 hover:text-[#C9A227] transition px-3 py-2 text-sm font-medium rounded-md hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                ))}
                <Link
                  to="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-[#C9A227] transition px-3 py-2 text-sm font-medium rounded-md hover:bg-white/5"
                >
                  Pricing
                </Link>

                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
                  <a
                    href="https://app.med-core.com"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#C9A227] text-black hover:bg-[#C9A227]/90 px-5 py-2 rounded-full text-sm font-bold text-center shadow-lg shadow-[#C9A227]/20 transition-all duration-300"
                  >
                    Acceder al Dashboard
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
