export default function Footer() {
  const partnerLogos = [
    {
      src: "/1-logo_header_brand-4.png",
      alt: "Logo Header Brand",
      className: "h-8 w-auto bg-slate-800 p-1.5 rounded-md",
      href: "https://dvmark.it",
    },
    {
      src: "/twa%20tonewood%20amp.png",
      alt: "TWA Tonewood Amp",
      className: "h-12 w-auto",
      href: "https://www.tonewoodamp.com/?srsltid=AfmBOooZrptCQqfvnIMsJPdTWAb5QAMzLpFewo0kP-6Rrfe9a6H2aj1-",
    },
  ];

  return (
    <footer id="footer" className="bg-white border-t border-slate-200 py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
              <img src="/logo-transparent.png" alt="HQ" className="h-8 w-8 object-contain" />
            </div>
            <p className="text-slate-500 text-[11px] uppercase tracking-wider">Endorsement by</p>
            <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
              {partnerLogos.map((logo) => (
                logo.href ? (
                  <a key={logo.src} href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={logo.alt}>
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className={`${logo.className} object-contain`}
                      loading="lazy"
                    />
                  </a>
                ) : (
                  <img
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    className={`${logo.className} object-contain`}
                    loading="lazy"
                  />
                )
              ))}
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {["Inicio", "Biografía", "Eventos", "Contacto"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                className="text-slate-500 hover:text-primary text-xs uppercase tracking-wider transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="text-center md:text-right">
            <p className="text-slate-400 text-xs">
              © {new Date().getFullYear()} Héctor Quintana. Todos los derechos reservados.
            </p>
            <p className="text-slate-400 text-xs mt-1">Desarrollado por Hector Quintana</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
