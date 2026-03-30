import { useState } from "react";
import { Send } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const DESTINO_EMAIL = "hmquintana89@gmail.com";

export default function ContratacionesSection() {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    servicio: "",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `Nueva solicitud de contratación - ${form.nombre}`;
    const body = [
      `Nombre: ${form.nombre}`,
      `Email: ${form.email}`,
      `Tipo de contratación: ${form.servicio || "No especificado"}`,
      "",
      "Mensaje:",
      form.mensaje,
    ].join("\n");

    const mailtoUrl = `mailto:${DESTINO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contrataciones" className="bg-slate-200 py-24 md:py-32">
      <div ref={ref} className="container px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className={isVisible ? "animate-slide-in-left" : "opacity-0"}>
            <p className="text-primary font-sans text-sm uppercase tracking-[0.25em] mb-3">
              Contrataciones
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-slate-800 leading-[1.1] mb-6">
              Lleva la música en vivo
              <br />
              <span className="italic text-primary">a tu evento</span>
            </h2>
            <p className="text-slate-600 leading-relaxed max-w-md">
              Completa el formulario y se abrirá tu correo para enviar la solicitud directamente a {DESTINO_EMAIL}.
            </p>
            <p className="text-slate-600 leading-relaxed max-w-md mt-4">
              También contamos con alquiler de equipos de sonido y luces para tu evento a gran escala.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-slate-700">
              <li>• Eventos privados</li>
              <li>• Bodas</li>
              <li>• Conciertos temáticos</li>
              <li>• Arreglos y producciones musicales</li>
              <li>• Grabaciones</li>
            </ul>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`rounded-md border border-slate-300/70 bg-white/80 backdrop-blur-sm p-6 md:p-8 space-y-5 shadow-sm ${
              isVisible ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
            <div>
              <label className="text-slate-600 text-xs uppercase tracking-wider block mb-2">
                Nombre
              </label>
              <input
                type="text"
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full bg-white border border-slate-300 text-slate-800 rounded-sm px-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label className="text-slate-600 text-xs uppercase tracking-wider block mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white border border-slate-300 text-slate-800 rounded-sm px-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label className="text-slate-600 text-xs uppercase tracking-wider block mb-2">
                Tipo de contratación
              </label>
              <select
                required
                value={form.servicio}
                onChange={(e) => setForm({ ...form, servicio: e.target.value })}
                className="w-full bg-white border border-slate-300 text-slate-800 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="Eventos privados">Eventos privados</option>
                <option value="Bodas">Bodas</option>
                <option value="Conciertos temáticos">Conciertos temáticos</option>
                <option value="Arreglos y producciones musicales">Arreglos y producciones musicales</option>
                <option value="Grabaciones">Grabaciones</option>
                <option value="Clases online">Clases online</option>
              </select>
            </div>

            <div>
              <label className="text-slate-600 text-xs uppercase tracking-wider block mb-2">
                Mensaje
              </label>
              <textarea
                required
                rows={4}
                value={form.mensaje}
                placeholder="Cuéntame detalles: fecha, ciudad, formato y tipo de evento (eventos privados, bodas o conciertos temáticos)."
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                className="w-full bg-white border border-slate-300 text-slate-800 rounded-sm px-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-sm text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 active:scale-[0.98] transition-all duration-200"
            >
              <Send size={16} />
              Enviar solicitud
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
