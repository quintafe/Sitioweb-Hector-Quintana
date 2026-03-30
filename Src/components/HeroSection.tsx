export default function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-slate-200 md:min-h-screen md:flex md:items-center md:justify-center">
      <img
        src="/Hero.jpg"
        alt="Héctor Quintana en concierto"
        className="w-full h-auto md:absolute md:inset-0 md:w-full md:h-full md:object-cover md:object-center"
        loading="eager"
      />
      <div className="hidden md:block absolute inset-0 bg-hero-overlay" />

      <h1
        className="relative z-10 mt-6 text-center font-display text-3xl text-slate-700 leading-[0.95] opacity-0 animate-fade-up md:absolute md:bottom-28 md:right-12 md:mt-0 md:text-right md:text-5xl lg:right-16 lg:text-6xl md:text-zinc-100/15 md:hover:text-zinc-100/90 transition-colors duration-300"
        style={{ animationDelay: "0.5s" }}
      >
        <span className="italic">Héctor</span>
        <br />
        <span className="italic">Quintana</span>
      </h1>

      <div className="relative z-10 w-full px-4 pb-8 mt-6 md:absolute md:bottom-24 md:left-1/2 md:-translate-x-1/2 md:pb-0 md:mt-0">
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up"
          style={{ animationDelay: "1.1s" }}
        >
          <a
            href="#contrataciones"
            className="w-full sm:w-56 text-center px-8 py-3.5 border border-warm-cream/40 text-warm-cream font-semibold text-sm uppercase tracking-wider rounded-sm hover:border-slate-400 hover:bg-slate-600/40 hover:text-white active:scale-[0.97] transition-all duration-200"
          >
            Contrataciones
          </a>
          <a
            href="#mi-musica"
            className="w-full sm:w-56 text-center px-8 py-3.5 border border-warm-cream/40 text-warm-cream font-semibold text-sm uppercase tracking-wider rounded-sm hover:border-slate-400 hover:bg-slate-600/40 hover:text-white active:scale-[0.97] transition-all duration-200"
          >
            Mi MUSICA
          </a>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1.5s" }}>
        <div className="w-px h-12 bg-warm-cream/30 mx-auto mb-2" />
        <span className="text-warm-cream/40 text-xs uppercase tracking-[0.2em]">Scroll</span>
      </div>
    </section>
  );
}
