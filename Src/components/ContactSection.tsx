import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Instagram, Youtube } from "lucide-react";

const CONTACT_EMAIL = "hmquintana89@gmail.com";

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contacto" className="bg-slate-50 py-24 md:py-32">
      <div ref={ref} className="container px-4">
        <div className="max-w-3xl mx-auto">
          {/* Info */}
          <div className={isVisible ? "animate-slide-in-left" : "opacity-0"}>
            <p className="text-primary font-sans text-sm uppercase tracking-[0.25em] mb-3">
              Hablemos
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-slate-800 leading-[1.1] mb-6">
              Contacto
            </h2>
            <p className="text-slate-600 leading-relaxed mb-10 max-w-sm">
              Para contrataciones, colaboraciones o simplemente decir hola.
              Estaré encantado de escucharte.
            </p>

            <div className="space-y-3 mb-10">
              <p className="text-slate-700 text-sm">
                <span className="text-primary">Email:</span> {CONTACT_EMAIL}
              </p>
            </div>

            <div className="flex gap-4">
              {[
                {
                  icon: Instagram,
                  label: "Instagram",
                  href: "https://www.instagram.com/quintafe_/",
                },
                {
                  icon: Youtube,
                  label: "YouTube",
                  href: "https://www.youtube.com/@quintafe",
                },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/50 active:scale-95 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
