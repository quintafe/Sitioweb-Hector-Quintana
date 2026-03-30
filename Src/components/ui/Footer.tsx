export default function Footer() {
  return (
    <footer className="bg-deep-brown border-t border-warm-cream/10 py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo-transparent.png" alt="HQ" className="h-8 w-8 object-contain" />
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {["Inicio", "Biografía", "Eventos", "Tienda", "Contacto"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                className="text-warm-cream/40 hover:text-gold text-xs uppercase tracking-wider transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          <p className="text-warm-cream/30 text-xs">
            © {new Date().getFullYear()} Héctor Quintana. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
