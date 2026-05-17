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

      <h1
        className="hidden sm:block absolute bottom-24 right-6 md:bottom-28 md:right-12 lg:right-16 z-10 text-right font-display text-3xl md:text-5xl lg:text-6xl text-zinc-100/15 hover:text-zinc-100/90 leading-[0.95] opacity-0 animate-fade-up transition-colors duration-300"
        style={{ animationDelay: "0.5s" }}
      >
        <span className="italic">Héctor</span>
        <br />
        <span className="italic">Quintana</span>
      </h1>

    </section>
  );
}
