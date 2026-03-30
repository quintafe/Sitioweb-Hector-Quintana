import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function BiographySection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="biografia" className="bg-section-warm py-24 md:py-32">
      <div ref={ref} className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image */}
          <div
            className={`relative ${
              isVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <div className="relative overflow-hidden rounded-sm">
              <img
                src="/Biografia2.jpg"
                alt="Héctor Quintana en La Habana"
                className="w-full max-w-[440px] mx-auto h-auto object-contain"
              />
            </div>
          </div>

          {/* Text */}
          <div className={isVisible ? "animate-slide-in-right" : "opacity-0"}>
            <p className="text-primary font-sans text-sm uppercase tracking-[0.25em] mb-3">
              Biografía
            </p>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.1] mb-8">
              Una guitarra,
              <br />
              <span className="italic text-primary">mil historias</span>
            </h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed max-w-prose">
              <p>
                Nacido en La Habana, Cuba, Héctor Quintana descubrió la guitarra a los siete años
                en el patio de la casa de su abuelo, donde los boleros y los sones se mezclaban con
                el murmullo del Malecón.
              </p>

              <p>
                Formado en el Conservatorio Amadeo Roldán, Héctor fusiona la tradición de la música
                cubana con las armonías del jazz latino.
              </p>

              <p>
                Con más de dos décadas de trayectoria, ha compartido escenario con figuras
                emblemáticas de la música cubana y ha llevado su guitarra a festivales
                internacionales.
              </p>
            </div>

            <div className="mt-10 flex gap-12">
              {[
                { num: "20+", label: "Años de carrera" },
                { num: "4", label: "Álbumes" },
                { num: "15", label: "Países" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="font-display text-3xl text-primary">
                    {stat.num}
                  </span>
                  <p className="text-muted-foreground text-sm mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}