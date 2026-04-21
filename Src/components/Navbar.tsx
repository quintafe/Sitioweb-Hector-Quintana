import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#biografia", label: "Biografía" },
  { href: "#eventos", label: "Conciertos" },
  { href: "#contrataciones", label: "Contrataciones" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [inBiografia, setInBiografia] = useState(false);
  const [inConciertos, setInConciertos] = useState(false);
  const [inContrataciones, setInContrataciones] = useState(false);
  const [inMiMusica, setInMiMusica] = useState(false);
  const [inContacto, setInContacto] = useState(false);
  const [inFooter, setInFooter] = useState(false);
  const [inHero, setInHero] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setAtTop(y < 8);

      const heroSection = document.getElementById("inicio");
      if (heroSection) {
        const { top, bottom } = heroSection.getBoundingClientRect();
        setInHero(top <= 80 && bottom > 80);
      }

      const section = document.getElementById("biografia");
      if (section) {
        const { top, bottom } = section.getBoundingClientRect();
        setInBiografia(top <= 80 && bottom > 80);
      }

      const conciertosSection = document.getElementById("eventos");
      if (conciertosSection) {
        const { top, bottom } = conciertosSection.getBoundingClientRect();
        setInConciertos(top <= 80 && bottom > 80);
      }

      const contratacionesSection = document.getElementById("contrataciones");
      if (contratacionesSection) {
        const { top, bottom } = contratacionesSection.getBoundingClientRect();
        setInContrataciones(top <= 80 && bottom > 80);
      }

      const musicaSection = document.getElementById("mi-musica");
      if (musicaSection) {
        const { top, bottom } = musicaSection.getBoundingClientRect();
        setInMiMusica(top <= 80 && bottom > 80);
      }

      const contactoSection = document.getElementById("contacto");
      if (contactoSection) {
        const { top, bottom } = contactoSection.getBoundingClientRect();
        setInContacto(top <= 80 && bottom > 80);
      }

      const footerSection = document.getElementById("footer");
      if (footerSection) {
        const { top, bottom } = footerSection.getBoundingClientRect();
        setInFooter(top <= 80 && bottom > 80);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        atTop
          ? "bg-transparent py-5"
          : inFooter
          ? "bg-slate-50/70 backdrop-blur-sm shadow-lg py-3"
          : inContacto
          ? "bg-slate-50/65 backdrop-blur-sm shadow-lg py-3"
          : inMiMusica
          ? "bg-slate-100/65 backdrop-blur-sm shadow-lg py-3"
          : inConciertos
          ? "bg-slate-300/60 backdrop-blur-sm shadow-lg py-3"
          : inContrataciones
          ? "bg-slate-200/60 backdrop-blur-sm shadow-lg py-3"
          : inBiografia
          ? "bg-slate-700/60 backdrop-blur-sm shadow-lg py-3"
          : inHero
          ? "bg-zinc-600/60 backdrop-blur-sm shadow-lg py-3"
          : scrolled
          ? "bg-white/75 backdrop-blur-sm shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#inicio" className="flex items-center">
          <img src="/logo-transparent.png" alt="Héctor Quintana" className="h-28 w-28 object-contain" />
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                  inFooter || inContacto || inMiMusica
                    ? "text-slate-700 hover:text-primary"
                    : inConciertos
                    ? "text-slate-700 hover:text-primary"
                    : inContrataciones
                    ? "text-slate-700 hover:text-primary"
                    : inBiografia
                    ? "text-slate-200/80 hover:text-amber-400"
                    : inHero
                    ? "text-zinc-100/90 hover:text-white"
                    : "text-slate-700 hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 active:scale-95 transition-transform ${inFooter || inContacto || inMiMusica ? "text-slate-700" : inConciertos ? "text-slate-700" : inContrataciones ? "text-slate-700" : inBiografia ? "text-slate-200" : inHero ? "text-zinc-100" : "text-slate-700"}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={`md:hidden backdrop-blur-sm border-t ${inFooter ? "bg-white/85 border-slate-300/60" : inContacto ? "bg-slate-50/85 border-slate-300/60" : inMiMusica ? "bg-slate-100/80 border-[#1DB954]/25" : inConciertos ? "bg-slate-300/75 border-slate-400/60" : inContrataciones ? "bg-slate-200/75 border-slate-300/70" : inBiografia ? "bg-slate-700/75 border-slate-400/20" : inHero ? "bg-zinc-600/75 border-zinc-300/20" : "bg-white/90 border-slate-300/60"}`}>
          <ul className="container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-base font-medium tracking-wide uppercase transition-colors ${inFooter || inContacto || inMiMusica ? "text-slate-700 hover:text-primary" : inConciertos ? "text-slate-700 hover:text-primary" : inContrataciones ? "text-slate-700 hover:text-primary" : inBiografia ? "text-slate-200/90 hover:text-amber-400" : inHero ? "text-zinc-100/90 hover:text-white" : "text-slate-700 hover:text-primary"}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
