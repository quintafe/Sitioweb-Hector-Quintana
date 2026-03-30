import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function CheckoutStatus() {
  const location = useLocation();
  const isSuccess = location.pathname.includes("success");

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl rounded-lg border border-slate-200 bg-white shadow-xl p-8 md:p-10 text-center">
        <div className="flex justify-center mb-5">
          {isSuccess ? (
            <CheckCircle2 size={64} className="text-emerald-500" />
          ) : (
            <AlertCircle size={64} className="text-amber-500" />
          )}
        </div>

        <p className="text-primary text-xs uppercase tracking-[0.25em] mb-3">Stripe Checkout</p>
        <h1 className="font-display text-3xl md:text-4xl text-slate-800 mb-4">
          {isSuccess ? "Pago completado" : "Pago cancelado"}
        </h1>
        <p className="text-slate-600 leading-relaxed mb-8">
          {isSuccess
            ? "Tu pago se ha procesado correctamente. Puedes volver a la tienda o seguir explorando la web."
            : "El proceso de pago se canceló antes de completarse. Tu carrito sigue guardado para que puedas intentarlo de nuevo."}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/#tienda"
            className="px-5 py-3 bg-primary text-primary-foreground rounded-sm text-sm font-semibold uppercase tracking-wider hover:bg-primary/90"
          >
            Volver a la tienda
          </Link>
          <Link
            to="/"
            className="px-5 py-3 border border-slate-300 text-slate-700 rounded-sm text-sm font-semibold uppercase tracking-wider hover:bg-slate-50"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}