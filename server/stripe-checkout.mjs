import "dotenv/config";
import express from "express";
import cors from "cors";
import Stripe from "stripe";
import { stripeProducts } from "./stripe-products.mjs";

const app = express();
const port = Number(process.env.STRIPE_SERVER_PORT || 4242);
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:8080";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn("Missing STRIPE_SECRET_KEY. Stripe checkout will fail until it is configured.");
}

const stripe = new Stripe(stripeSecretKey || "sk_test_placeholder", {
  apiVersion: "2025-02-24.acacia",
});

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin (e.g. curl, Postman, server-to-server)
      if (!origin) {
        callback(null, true);
        return;
      }

      try {
        const url = new URL(origin);
        const isLocalhost =
          url.hostname === "localhost" || url.hostname === "127.0.0.1";

        if (isLocalhost || origin === allowedOrigin) {
          callback(null, true);
          return;
        }
      } catch {
        callback(new Error("Origen no válido para CORS."));
        return;
      }

      callback(new Error("Origen no permitido por CORS."));
    },
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, stripeConfigured: Boolean(stripeSecretKey) });
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    if (!stripeSecretKey) {
      return res.status(500).json({ error: "Stripe no está configurado todavía en el servidor." });
    }

    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    if (items.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío." });
    }

    const lineItems = items
      .map((item) => {
        const product = stripeProducts.find((entry) => entry.id === Number(item.productId));
        if (!product) return null;

        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: product.name,
              images: product.image.startsWith("http")
                ? [product.image]
                : [`${req.headers.origin || allowedOrigin}${product.image}`],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: Number(item.qty) || 1,
        };
      })
      .filter(Boolean);

    if (lineItems.length === 0) {
      return res.status(400).json({ error: "No se pudieron procesar los productos del carrito." });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${req.headers.origin || allowedOrigin}/checkout/success`,
      cancel_url: `${req.headers.origin || allowedOrigin}/checkout/cancel`,
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["ES", "FR", "PT", "IT", "DE"],
      },
      locale: "es",
    });

    return res.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo crear la sesión de Stripe.";
    return res.status(500).json({ error: message });
  }
});

app.listen(port, () => {
  console.log(`Stripe checkout server running on http://localhost:${port}`);
});
