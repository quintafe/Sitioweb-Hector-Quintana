import { useEffect, useMemo, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ShoppingCart, Plus, Minus, Heart, X, Trash2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

type CartItem = {
  productId: number;
  qty: number;
};

const CHECKOUT_EMAIL = "hmquintana89@gmail.com";
const CART_STORAGE_KEY = "hector-quintana-cart";
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const getStripeApiUrl = () => {
  const configuredUrl = import.meta.env.VITE_STRIPE_API_URL;
  if (configuredUrl) return configuredUrl;

  if (typeof window === "undefined") {
    return "http://localhost:4242";
  }

  return `${window.location.protocol}//${window.location.hostname}:4242`;
};

const products: Product[] = [
  {
    id: 1,
    name: "Dactilar",
    category: "Álbum",
    price: 14.99,
    image: "/dactilar.jpg",
    description:
      "\"Dactilar\" es el álbum debut del guitarrista, compositor y arreglista de jazz cubano Héctor Quintana, lanzado en 2014. Producido por Joaquín Betancourt, el disco ofrece una mezcla de jazz, fusión y jazz cubano. Participan Jorge Aragón (piano), Alejandro Falcón (piano), Yissi García (batería) y cantantes como Luna Manzanares y Maykel Ante.",
  },
  {
    id: 2,
    name: "Benny More Un Siglo Después",
    category: "Álbum",
    price: 14.99,
    image: "/Benny%20more%20un%20siglo%20despues.jpg",
    description:
      "Benny Moré un siglo después” constituye un excelente producto a partir del concierto que ofreciera el destacado guitarrista Héctor Quintana en la sala Covarrubias del Teatro Nacional que contó con invitados de lujo como los intérpretes Danay Suárez, Alain Pérez, Cimafunk, Bobby Carcasses, David Álvarez, Maikel Antes y Antonio Guzmán; Barbarito Torres en el laúd, Julito Padrón y Maiquel González en la trompeta, el estadounidense Mark Whitfield en la guitarra, entre otros. Resulta este un merecido homenaje al bárbaro del ritmo en su centenario. Las notas del DVD son de Pancho Amat quien destaca el virtuosismo de Quintana y su capacidad para interpretar el fraseo cubano en el lenguaje del jazz y señala: “Cuando este DVD llegue a sus manos guárdelo con celo. Tenga la certeza de que cada vez que lo vea descubrirá en él artistas nuevos que le harán sentir el disfrute de la primera vez”.",
  },
  {
    id: 3,
    name: "Animal de Galaxia",
    category: "Álbum",
    price: 14.99,
    image: "/Animal%20de%20Galaxia.jpg",
    description:
      "\"Animal de galaxia\" es un álbum de jazz de 2022 del guitarrista cubano Héctor Quintana, lanzado bajo el sello Colibrí y ganador de un premio especial en Cubadisco 2022. El fonograma de 10 temas reinterpreta la obra de Silvio Rodríguez con un enfoque posmoderno y guitarrístico, incluyendo canciones clásicas y un tema original titulado \"Silvio\". Héctor Quintana (guitarra), junto a Yandy Martínez (bajo), Tony Rodríguez (piano), Esteban Puebla (teclados) y Oliver Valdés (batería). Invitado especial Leonardo Amuedo.",
  },
];

export default function ShopSection() {
  const { ref, isVisible } = useScrollReveal();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [likes, setLikes] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const stripePromise = useMemo(() => (stripePublicKey ? loadStripe(stripePublicKey) : null), []);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setCart(JSON.parse(storedCart) as CartItem[]);
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cart.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.productId);
    return acc + (product ? product.price * item.qty : 0);
  }, 0);

  const addToCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === id);
      if (existing) {
        return prev.map((item) => (item.productId === id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { productId: id, qty: 1 }];
    });
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.productId === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.productId !== id));
  };

  const toggleLike = (id: number) => {
    setLikes((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  const handleEmailCheckout = () => {
    if (cart.length === 0) return;

    const lines = cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return `• ${product.name} x${item.qty} — $${(product.price * item.qty).toFixed(2)}`;
      })
      .filter(Boolean)
      .join("\n");

    const subject = "Pedido desde tienda web";
    const body = [
      "Hola, quiero finalizar esta compra:",
      "",
      lines,
      "",
      `Total: $${subtotal.toFixed(2)}`,
      "",
      "Por favor, indícame método de pago y envío.",
    ].join("\n");

    window.location.href = `mailto:${CHECKOUT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setCheckoutError(null);

    if (!stripePublicKey) {
      setCheckoutError("Falta configurar VITE_STRIPE_PUBLISHABLE_KEY para abrir Stripe Checkout.");
      return;
    }

    try {
      setCheckoutLoading(true);

      const response = await fetch(`${getStripeApiUrl()}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart }),
      });

      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "No se pudo iniciar Stripe Checkout.");
      }

      const stripe = await stripePromise;
      if (!stripe) {
        window.location.href = data.url;
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? `${error.message} Verifica que el servidor Stripe esté levantado con npm run stripe:dev.`
          : "No se pudo conectar con Stripe. Verifica que el servidor Stripe esté levantado con npm run stripe:dev.",
      );
    } finally {
      setCheckoutLoading(false);
    }
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
          <button
            type="button"
            onClick={() => {
              setSelectedProduct(null);
              setCartOpen(true);
            }}
            className={`relative ${isVisible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
            aria-label="Abrir carrito"
          >
            <ShoppingCart size={24} className="text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {products.map((product, i) => {
            const inCart = cart.some((item) => item.productId === product.id);
            const liked = likes.includes(product.id);
            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`group cursor-pointer ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${0.25 + i * 0.1}s` }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="relative w-full overflow-hidden rounded-sm mb-3 text-left aspect-square bg-slate-100 flex items-center justify-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain object-center block group-hover:scale-105 transition-transform duration-500 p-2"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs uppercase tracking-wider px-2.5 py-1 rounded-sm font-medium">
                    {product.category}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
                </button>
                <h3 className="font-display text-base text-foreground">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-primary font-semibold">${product.price}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(product.id);
                      }}
                      aria-label={liked ? "Quitar me gusta" : "Me gusta"}
                      className={`inline-flex items-center justify-center w-9 h-9 rounded-sm border transition-colors ${
                        liked
                          ? "border-primary/40 text-primary bg-primary/10"
                          : "border-border text-muted-foreground hover:text-primary hover:border-primary/40"
                      }`}
                    >
                      <Heart size={16} className={liked ? "fill-current" : ""} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product.id);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all duration-200 active:scale-[0.97] bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Plus size={14} />
                      {inCart ? "Añadir +" : "Comprar"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedProduct && (
          <div
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className={`w-full ${selectedProduct.id === 2 ? "max-w-3xl" : "max-w-4xl"} h-[88vh] bg-white rounded-md overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-2`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-slate-100 flex items-center justify-center min-h-[220px] max-h-[38vh] md:min-h-0 md:max-h-none md:h-full shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain object-center p-4"
                />
              </div>

              <div className="p-6 md:p-8 overflow-y-auto flex-1 min-h-0">
                <div className="sticky top-0 z-10 flex justify-end -mt-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="text-slate-500 hover:text-slate-800 transition-colors bg-white/90 rounded-sm"
                    aria-label="Cerrar"
                  >
                    <X size={20} />
                  </button>
                </div>

                <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">{selectedProduct.category}</p>
                <h3 className="font-display text-2xl md:text-3xl text-slate-800 mb-4">{selectedProduct.name}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{selectedProduct.description}</p>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-primary font-semibold text-xl">${selectedProduct.price}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleLike(selectedProduct.id)}
                      aria-label={likes.includes(selectedProduct.id) ? "Quitar me gusta" : "Me gusta"}
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-sm border transition-colors ${
                        likes.includes(selectedProduct.id)
                          ? "border-primary/40 text-primary bg-primary/10"
                          : "border-slate-300 text-slate-500 hover:text-primary hover:border-primary/40"
                      }`}
                    >
                      <Heart size={18} className={likes.includes(selectedProduct.id) ? "fill-current" : ""} />
                    </button>
                    <button
                      type="button"
                      onClick={() => addToCart(selectedProduct.id)}
                      className="flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all duration-200 active:scale-[0.97] bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Plus size={14} />
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {cartOpen && (
          <div
            className="fixed inset-0 z-[75] bg-black/50 backdrop-blur-[1px] flex items-end md:items-center md:justify-center"
            onClick={() => setCartOpen(false)}
          >
            <div
              className="w-full md:max-w-2xl bg-white rounded-t-lg md:rounded-lg shadow-2xl max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-200">
                <h3 className="font-display text-2xl text-slate-800">Carrito de compras</h3>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="text-slate-500 hover:text-slate-800 transition-colors"
                  aria-label="Cerrar carrito"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-5 overflow-y-auto max-h-[55vh] space-y-4">
                {cart.length === 0 ? (
                  <p className="text-slate-500 text-sm">Tu carrito está vacío.</p>
                ) : (
                  cart.map((item) => {
                    const product = products.find((p) => p.id === item.productId);
                    if (!product) return null;

                    return (
                      <div key={item.productId} className="flex items-center gap-4 border border-slate-200 rounded-sm p-3">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-contain bg-slate-100 rounded-sm" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800 truncate">{product.name}</p>
                          <p className="text-sm text-slate-500">${product.price.toFixed(2)} c/u</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => decreaseQty(product.id)}
                            className="w-8 h-8 inline-flex items-center justify-center border border-slate-300 rounded-sm text-slate-600 hover:text-slate-800"
                            aria-label="Reducir cantidad"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-7 text-center text-sm font-semibold text-slate-700">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => addToCart(product.id)}
                            className="w-8 h-8 inline-flex items-center justify-center border border-slate-300 rounded-sm text-slate-600 hover:text-slate-800"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(product.id)}
                            className="w-8 h-8 inline-flex items-center justify-center text-slate-500 hover:text-red-600"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="p-5 border-t border-slate-200 space-y-3">
                <div className="rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                  Pago seguro con Stripe. Checkout externo con tarjeta y dirección de envío.
                </div>
                {checkoutError && (
                  <div className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                    {checkoutError}
                  </div>
                )}
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-medium">Total</span>
                  <span className="font-semibold text-lg">${subtotal.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={cart.length === 0 || checkoutLoading}
                  className="w-full px-5 py-3 bg-primary text-primary-foreground rounded-sm font-semibold uppercase tracking-wider text-xs hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {checkoutLoading ? "Redirigiendo a Stripe..." : "Pagar con Stripe"}
                </button>
                <button
                  type="button"
                  onClick={handleEmailCheckout}
                  disabled={cart.length === 0 || checkoutLoading}
                  className="w-full px-5 py-3 border border-slate-300 text-slate-700 rounded-sm font-semibold uppercase tracking-wider text-xs hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Pedir por correo
                </button>
                <p className="text-[11px] text-slate-500">
                  Si Stripe aún no está configurado, puedes seguir usando el pedido por correo.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
