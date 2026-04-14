import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const anchorLinks = [
  { label: "IA Demo", id: "ia-demo" },
  { label: "Integraciones", id: "integraciones" },
  { label: "Soluciones", id: "soluciones" },
];

function scrollToCenter(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const navbarHeight = 80;
  const elTop = el.getBoundingClientRect().top + window.pageYOffset;
  const elHeight = el.offsetHeight;
  const viewportHeight = window.innerHeight;

  const centered = elTop - (viewportHeight - elHeight) / 2;
  const fallback = elTop - navbarHeight - 40;

  window.scrollTo({
    top: elHeight > viewportHeight ? fallback : Math.max(0, centered),
    behavior: "smooth",
  });
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll-aware background + active section via IntersectionObserver
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = anchorLinks.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleLink = (id: string) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToCenter(id), 300);
    } else {
      setTimeout(() => scrollToCenter(id), 50);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "bg-black/95 border-white/10"
          : "bg-black/80 border-white/10"
      } backdrop-blur-xl`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/Logo/Logo horizontal/Logo horizontal (blanco).svg"
              alt="Med-Core"
              className="h-10 w-auto"
            />
          </Link>

          {/* Nav Links + CTA — Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {anchorLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLink(link.id)}
                aria-current={activeId === link.id ? "true" : undefined}
                className={`relative cursor-pointer px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md min-h-[44px] ${
                  activeId === link.id
                    ? "text-[#C9A227]"
                    : "text-gray-300 hover:text-[#C9A227]"
                }`}
              >
                {link.label}
                {activeId === link.id && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#C9A227] rounded-full" />
                )}
              </button>
            ))}
            <Link
              to="/pricing"
              className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-[#C9A227] transition-colors duration-200 rounded-md min-h-[44px] flex items-center"
            >
              Pricing
            </Link>
            <a
              href="https://doc-app-anex.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="ml-2 bg-[#C9A227] text-black hover:bg-[#C9A227]/90 px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-[#C9A227]/20 transition-colors duration-200 min-h-[44px] flex items-center"
            >
              Acceder al Dashboard
            </a>
          </div>

          {/* Hamburger — Mobile */}
          <button
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menú de navegación"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-black/95 border-t border-white/10"
          >
            <div className="px-4 pt-4 pb-6 flex flex-col gap-1">
              {anchorLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLink(link.id)}
                  aria-current={activeId === link.id ? "true" : undefined}
                  className={`px-4 py-3 text-sm font-medium rounded-md text-left min-h-[44px] transition-colors duration-200 ${
                    activeId === link.id
                      ? "text-[#C9A227] bg-[#C9A227]/5"
                      : "text-gray-300 hover:text-[#C9A227] hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <Link
                to="/pricing"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-[#C9A227] transition-colors duration-200 rounded-md hover:bg-white/5 min-h-[44px] flex items-center"
              >
                Pricing
              </Link>
              <div className="mt-4 pt-4 border-t border-white/10">
                <a
                  href="https://doc-app-anex.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-[#C9A227] text-black hover:bg-[#C9A227]/90 px-5 py-3 rounded-full text-sm font-bold text-center shadow-lg shadow-[#C9A227]/20 transition-colors duration-200"
                >
                  Acceder al Dashboard
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
