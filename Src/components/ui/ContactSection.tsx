import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Send, Instagram, Youtube, Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Mensaje enviado", description: "Gracias por escribir. Te responderemos pronto." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contacto" className="bg-section-dark py-24 md:py-32">
      <div ref={ref} className="container px-4">
        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Info */}
          <div className={isVisible ? "animate-slide-in-left" : "opacity-0"}>
            <p className="text-gold font-sans text-sm uppercase tracking-[0.25em] mb-3">
              Hablemos
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.1] mb-6">
              Contacto
            </h2>
            <p className="text-warm-cream/60 leading-relaxed mb-10 max-w-sm">
              Para contrataciones, colaboraciones o simplemente decir hola.
              Estaré encantado de escucharte.
            </p>

            <div className="space-y-3 mb-10">
              <p className="text-warm-cream/80 text-sm">
                <span className="text-gold">Email:</span> hector@quintanaguitar.com
              </p>
              <p className="text-warm-cream/80 text-sm">
                <span className="text-gold">Management:</span> booking@quintanaguitar.com
              </p>
            </div>

            <div className="flex gap-4">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
                { icon: Music, label: "Spotify" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-warm-cream/20 flex items-center justify-center text-warm-cream/60 hover:text-gold hover:border-gold/50 active:scale-95 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`space-y-5 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
          >
            <div>
              <label className="text-warm-cream/50 text-xs uppercase tracking-wider block mb-2">Nombre</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border-b border-warm-cream/20 text-warm-cream py-3 text-sm focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="text-warm-cream/50 text-xs uppercase tracking-wider block mb-2">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent border-b border-warm-cream/20 text-warm-cream py-3 text-sm focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="text-warm-cream/50 text-xs uppercase tracking-wider block mb-2">Mensaje</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border-b border-warm-cream/20 text-warm-cream py-3 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider rounded-sm hover:bg-primary/90 active:scale-[0.97] transition-all duration-200"
            >
              <Send size={16} />
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
