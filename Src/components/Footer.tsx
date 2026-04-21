export default function Footer() {
  return (
    <footer id="footer" className="bg-white border-t border-slate-200 py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo-transparent.png" alt="HQ" className="h-8 w-8 object-contain" />
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

          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} Héctor Quintana. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
