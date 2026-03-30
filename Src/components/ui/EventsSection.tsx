import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CalendarDays, MapPin, Star } from "lucide-react";

const events = [
  { date: "12 Abr 2026", city: "La Habana", venue: "Teatro Nacional de Cuba", featured: true },
  { date: "25 Abr 2026", city: "Madrid", venue: "Sala Clamores", featured: false },
  { date: "10 May 2026", city: "Miami", venue: "Arsht Center", featured: true },
  { date: "28 May 2026", city: "Ciudad de México", venue: "Lunario del Auditorio", featured: false },
  { date: "15 Jun 2026", city: "Barcelona", venue: "Jamboree Jazz Club", featured: false },
];

export default function EventsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="eventos" className="bg-section-dark py-24 md:py-32">
      <div ref={ref} className="container px-4">
        <div className="text-center mb-16">
          <p className={`text-gold font-sans text-sm uppercase tracking-[0.25em] mb-3 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            En Vivo
          </p>
          <h2 className={`font-display text-3xl md:text-5xl leading-[1.1] ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            Próximos <span className="italic">Eventos</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {events.map((event, i) => (
            <div
              key={i}
              className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-sm border transition-all duration-300 ${
                event.featured
                  ? "border-primary/40 bg-primary/5"
                  : "border-warm-cream/10 hover:border-warm-cream/25"
              } ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                {event.featured && <Star size={16} className="text-gold fill-gold shrink-0" />}
                <div>
                  <div className="flex items-center gap-2 text-warm-cream/50 text-sm mb-1">
                    <CalendarDays size={14} />
                    {event.date}
                  </div>
                  <h3 className="font-display text-lg text-warm-cream">
                    {event.venue}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-warm-cream/50 text-sm">
                  <MapPin size={14} /> {event.city}
                </span>
                <a
                  href="#"
                  className="px-5 py-2 bg-primary text-primary-foreground text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-primary/90 active:scale-[0.97] transition-all duration-200 shrink-0"
                >
                  Entradas
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
