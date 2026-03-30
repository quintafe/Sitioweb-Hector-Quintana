import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ShoppingCart, Plus, Check } from "lucide-react";
import album1 from "@/assets/album1.jpg";
import album2 from "@/assets/album2.jpg";
import tshirt from "@/assets/merch-tshirt.jpg";
import pullover from "@/assets/merch-pullover.jpg";

const products = [
  { id: 1, name: "Raíces", category: "Álbum", price: 14.99, image: album1 },
  { id: 2, name: "Noches de La Habana", category: "Álbum", price: 14.99, image: album2 },
  { id: 3, name: "Camiseta Guitar Soul", category: "Merch", price: 29.99, image: tshirt },
  { id: 4, name: "Pullover Acústico", category: "Merch", price: 49.99, image: pullover },
];

export default function ShopSection() {
  const { ref, isVisible } = useScrollReveal();
  const [cart, setCart] = useState<number[]>([]);

  const addToCart = (id: number) => {
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <section id="tienda" className="bg-background py-24 md:py-32">
      <div ref={ref} className="container px-4">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className={`text-primary font-sans text-sm uppercase tracking-[0.25em] mb-3 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
              Colección
            </p>
            <h2 className={`font-display text-3xl md:text-5xl text-foreground leading-[1.1] ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
              Tienda
            </h2>
          </div>
          <div className={`relative ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <ShoppingCart size={24} className="text-foreground" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => {
            const inCart = cart.includes(product.id);
            return (
              <div
                key={product.id}
                className={`group ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${0.25 + i * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-sm bg-card aspect-square mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs uppercase tracking-wider px-2.5 py-1 rounded-sm font-medium">
                    {product.category}
                  </span>
                </div>
                <h3 className="font-display text-lg text-foreground">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-primary font-semibold">${product.price}</span>
                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={inCart}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all duration-200 active:scale-[0.97] ${
                      inCart
                        ? "bg-muted text-muted-foreground cursor-default"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {inCart ? <Check size={14} /> : <Plus size={14} />}
                    {inCart ? "Añadido" : "Comprar"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
