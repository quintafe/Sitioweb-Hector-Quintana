import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Guitar, Speaker, Settings } from "lucide-react";

const gear = [
  {
    icon: Guitar,
    title: "Guitarras",
    items: [
      { name: "Alhambra Luthier India", desc: "Guitarra clásica de concierto, cedro y palosanto" },
      { name: "Godin Multiac Nylon", desc: "Electroacústica para escenarios amplificados" },
    ],
  },
  {
    icon: Speaker,
    title: "Amplificación",
    items: [
      { name: "AER Compact 60", desc: "Amplificador acústico de referencia" },
      { name: "L.R. Baggs Anthem", desc: "Sistema de pastilla y micrófono" },
    ],
  },
  {
    icon: Settings,
    title: "Accesorios",
    items: [
      { name: "Cuerdas D'Addario EJ46", desc: "Pro-Arté Hard Tension, nylon rectificado" },
      { name: "Capo G7th Performance 3", desc: "Cejilla de alta precisión" },
    ],
  },
];

export default function EquipmentSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="equipamiento" className="bg-section-warm py-24 md:py-32">
      <div ref={ref} className="container px-4">
        <div className="text-center mb-16">
          <p className={`text-primary font-sans text-sm uppercase tracking-[0.25em] mb-3 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            Mi Sonido
          </p>
          <h2 className={`font-display text-3xl md:text-5xl text-foreground leading-[1.1] ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            Equipamiento
          </h2>
          <p className={`mt-4 text-muted-foreground max-w-xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.25s" }}>
            Cada instrumento es una extensión de la voz interior. Estas son las herramientas que dan forma a mi sonido.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {gear.map((category, i) => (
            <div
              key={category.title}
              className={`bg-background rounded-sm p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow duration-300 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <category.icon size={28} className="text-primary mb-5" />
              <h3 className="font-display text-xl text-foreground mb-6">{category.title}</h3>
              <div className="space-y-5">
                {category.items.map((item) => (
                  <div key={item.name}>
                    <p className="font-semibold text-foreground text-sm">{item.name}</p>
                    <p className="text-muted-foreground text-sm mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
