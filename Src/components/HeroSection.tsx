export default function HeroSection() {
  return (
    <section id="inicio" className="relative flex items-center justify-center overflow-hidden bg-black">
      <img
        src="/Hero2.jpg"
        alt="Héctor Quintana en concierto"
        className="w-full h-auto block"
        loading="eager"
      />
      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="absolute bottom-24 left-1/2 z-10 w-full -translate-x-1/2 px-4">
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up"
          style={{ animationDelay: "1.1s" }}
        >
          
          <a
            href="#mi-musica"
            className="w-full sm:w-56 text-center px-8 py-3.5 border border-warm-cream/40 text-warm-cream font-semibold text-sm uppercase tracking-wider rounded-sm hover:border-slate-400 hover:bg-slate-600/40 hover:text-white active:scale-[0.97] transition-all duration-200"
          >
            Mi MUSICA
          </a>
        </div>
      </div>

      <h1
        className="absolute bottom-24 right-6 md:bottom-28 md:right-12 lg:right-16 z-10 text-right font-display text-3xl md:text-5xl lg:text-6xl text-zinc-100/15 hover:text-zinc-100/90 leading-[0.95] opacity-0 animate-fade-up transition-colors duration-300"
        style={{ animationDelay: "0.5s" }}
      >
        <span className="italic">Héctor</span>
        <br />
        <span className="italic">Quintana</span>
      </h1>

    </section>
  );
}
