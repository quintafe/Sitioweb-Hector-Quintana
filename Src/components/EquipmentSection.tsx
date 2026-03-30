import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Guitar, Speaker, SlidersHorizontal } from "lucide-react";

const gear = [
  {
    icon: Guitar,
    title: "Guitarras",
    items: [
      { name: "Gibson Les Paul", desc: "Guitarra eléctrica de cuerpo sólido" },
      { name: "Fender Stratocaster", desc: "Guitarra eléctrica de sonido versátil" },
      { name: "Music Man Stingray", desc: "Bajo eléctrico de gran presencia" },
      { name: "D’Angelico Atlantic Deluxe", desc: "Guitarra eléctrica semihueca" },
      { name: "D’Angelico Excel SS", desc: "Guitarra semihueca de tono cálido" },
      { name: "Gretsch G420", desc: "Guitarra de carácter vintage" },
      { name: "Godin Fifth Avenue", desc: "Archtop acústica con timbre jazz" },
      { name: "Alhambra 11P", desc: "Guitarra clásica profesional" },
    ],
  },
  {
    icon: Speaker,
    title: "Amplificación",
    items: [
      { name: "Tone Wood Amp", desc: "" },
      { name: "DV Mark", desc: "" },
      { name: "Fender Hot Rod Deluxe", desc: "" },
      { name: "Blackstar HT Club 40", desc: "" },
    ],
  },
  {
    icon: SlidersHorizontal,
    title: "Pedales de efectos",
    items: [
      { name: "Line 6 HX Stomp", desc: "" },
      { name: "Line 6 DL4", desc: "" },
      { name: "Radial Tone Bone", desc: "" },
      { name: "Electro Harmonix Superego+", desc: "" },
      { name: "Boo Tremolo", desc: "" },
      { name: "Boss VE-20", desc: "" },
      { name: "TC Electronic Hall of Fame 2", desc: "" },
      { name: "Boss Chorus Ensemble", desc: "" },
      { name: "Boss CS-1", desc: "" },
      { name: "AC Booster Xotic Pedals", desc: "" },
      { name: "Vox V847", desc: "" },
      { name: "Boss TU-2", desc: "" },
    ],
  },
];

export default function EquipmentSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="equipamiento" className="bg-section-warm py-24 md:py-32">
      <div ref={ref} className="container px-4">
        <div className="text-center mb-16">
          <h2 className={`font-display text-3xl md:text-5xl text-foreground leading-[1.1] ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            Equipamiento
          </h2>

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
