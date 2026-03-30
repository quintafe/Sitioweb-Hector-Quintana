import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function BiographySection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="biografia" className="bg-slate-700 py-24 md:py-32">
      <div ref={ref} className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}
          >
            <div className="relative mx-auto max-w-[440px]">
              <div className="overflow-hidden rounded-sm shadow-2xl ring-1 ring-slate-500/40">
                <img
                  src="/Biografia2.jpg"
                  alt="Héctor Quintana en La Habana"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className={isVisible ? "animate-slide-in-right" : "opacity-0"}>
            <p className="text-amber-400 font-sans text-sm uppercase tracking-[0.25em] mb-3">
              Biografía
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-slate-100 leading-[1.1] mb-8">
              Una guitarra,
              <br />
              <span className="italic text-amber-400">a la cubana</span>
            </h2>
            <div className="space-y-5 text-slate-300 leading-relaxed max-w-prose">
              <p>
                Nacido en La Habana, Cuba. Graduado del Instituto Superior de Arte en la especialidad de guitarra.
              </p>
              <p>
                Ha participado en festivales como Jazz al Día, Jazz de Vitoria, Au Rythm du Jazz, Montreux Jazz Festival, Jazz Plaza, Barranquillaz, El Portón del Jazz, GalapaJazz, PapJazz, entre muchos más.
              </p>
              <p>
                Participó en el concierto por el Día Internacional del Jazz en La Habana (2017), organizado por la UNESCO y Herbie Hancock.
              </p>
              <p>
                Ha compartido escenario y colaborado con músicos como Mark Whitfield, Horacio "El Negro" Hernández, Joe Lovano, Kurt Rosenwinkel, María del Mar Bonet, John Stowell, Havana de Primera, Ernán López-Nussa y Cimafunk, entre muchos otros.
              </p>
              <p>
                Recibió el 1er Premio MUSICALIA de guitarra clásica (2007), 1er Premio JoJazz 2011, 2do Premio en el Concurso de Jazz de Montreux y Premio Especial Cubadisco 2022.
              </p>
              <p>
                Cuenta con cuatro discos: <span className="text-slate-100 font-medium">Dactilar</span>, <span className="text-slate-100 font-medium">Beny Moré un siglo después</span>, <span className="text-slate-100 font-medium">Animal de Galaxia</span> y <span className="text-slate-100 font-medium">Guitarra a la Cubana</span>.
              </p>
            </div>

            <div className="mt-10 flex gap-12">
              {[
                { num: "4", label: "Álbumes" },
                { num: "4", label: "Premios" },
                { num: "10+", label: "Festivales" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="font-display text-3xl text-amber-400">{stat.num}</span>
                  <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
