import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CalendarDays, MapPin, Star } from "lucide-react";

const events = [
  { date: "12 Abr 2026", city: "Madrid", venue: "Café Despertar", description: "Con Rodrigo Ballesteros (batería) y Ernesto Hermida (bajo)", featured: true },
  { date: "7 May 2026", city: "Madrid", venue: "Teatro Lara", description: "20 Poemas de Amor", featured: false },
  { date: "28 May 2026", city: "Madrid", venue: "Teatro Lara", description: "20 Poemas de Amor", featured: false },
  { date: "10 Jul 2026", city: "Málaga", venue: "El Portón del Jazz", description: "Con The Blue Horses", featured: true },
  { date: "12 Jul 2026", city: "Murcia", venue: "Jazz San Javier", description: "Con The Blue Horses", featured: true },
  { date: "16 Ene 2027", city: "Alhaurín de la Torre", venue: "Alhaurín de la Torre", description: "", featured: false },
  { date: "Cada miércoles", city: "Madrid", venue: "Jam de Latin Jazz", description: "Con Luis Guerra, José Raúl Machado y Rodrigo Ballesteros", featured: false },
];

export default function EventsSection() {
  const { ref, isVisible } = useScrollReveal();
  const handleTicketsClick = () => {
    window.alert("Próximamente estará disponible el link para la compra de entradas.");
  };

  return (
    <section id="eventos" className="bg-slate-300 py-24 md:py-32">
      <div ref={ref} className="container px-4">
        <div className="text-center mb-16">
          <p className={`text-primary font-sans text-sm uppercase tracking-[0.25em] mb-3 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            En Vivo
          </p>
          <h2 className={`font-display text-slate-800 text-3xl md:text-5xl leading-[1.1] ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            Próximos <span className="italic">Conciertos</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {events.map((event, i) => (
            <div
              key={i}
              className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-sm border backdrop-blur-sm shadow-sm transition-all duration-300 ${
                event.featured
                  ? "border-primary/35 bg-white/85"
                  : "border-slate-300/80 bg-white/70 hover:border-primary/35"
              } ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                {event.featured && <Star size={16} className="text-amber-500 fill-amber-500 shrink-0" />}
                <div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                    <CalendarDays size={14} />
                    {event.date}
                  </div>
                  <h3 className="font-display text-lg text-slate-800">
                    {event.venue}
                  </h3>
                  {event.description && (
                    <p className="text-slate-500 text-xs mt-0.5">{event.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-slate-600 text-sm">
                  <MapPin size={14} /> {event.city}
                </span>
                <button
                  type="button"
                  onClick={handleTicketsClick}
                  className="px-5 py-2 bg-primary text-primary-foreground text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-primary/90 active:scale-[0.97] transition-all duration-200 shrink-0"
                >
                  Entradas
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
