import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function MusicSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="mi-musica"
      className="bg-gradient-to-b from-slate-100 via-slate-100 to-slate-50 py-24 md:py-32"
    >
      <div ref={ref} className="container px-4">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <p
            className={`text-[#1DB954] font-sans text-sm uppercase tracking-[0.25em] mb-3 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          >
            Escucha ahora
          </p>
          <h2
            className={`font-display text-3xl md:text-5xl text-slate-800 leading-[1.1] ${isVisible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            Mi Música en Spotify
          </h2>
          <p
            className={`text-slate-600 mt-4 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            Descubre álbumes, sencillos y colaboraciones de Héctor Quintana.
          </p>
        </div>

        <div
          className={`max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl ring-1 ring-[#1DB954]/30 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "0.25s" }}
        >
          <iframe
            title="Spotify - Héctor Quintana"
            src="https://open.spotify.com/embed/artist/2ugaIVpyD4rBKd5fR6G9N7?utm_source=generator"
            width="100%"
            height="452"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
