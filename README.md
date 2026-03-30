# Héctor Quintana - Sitio web

Frontend en Vite + React y backend Express para Stripe Checkout.

## Requisitos

- Node.js 20+
- npm 10+

## Variables de entorno

Usa [.env.example](.env.example) como base.

Variables obligatorias:

- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_STRIPE_API_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_SERVER_PORT`
- `FRONTEND_URL`

## Desarrollo local

Instalar dependencias:

`npm install`

Levantar frontend + backend Stripe:

`npm run dev:all`

Frontend: `http://localhost:8080`

Backend Stripe: `http://localhost:4242`

## Build

`npm run build`

## Deploy (Render)

Este repo ya incluye [render.yaml](render.yaml) para desplegar:

- Servicio web Node (`hectorquintana-stripe-api`)
- Sitio estático (`hectorquintana-web`)

Pasos:

1. Subir el proyecto a GitHub.
2. En Render, crear un **Blueprint** desde el repositorio.
3. Configurar en Render las variables `sync: false`:
	- `STRIPE_SECRET_KEY`
	- `FRONTEND_URL`
	- `VITE_STRIPE_PUBLISHABLE_KEY`
	- `VITE_STRIPE_API_URL`

## Subir a GitHub

Si todavía no hay repo Git inicializado:

1. `git init`
2. `git add .`
3. `git commit -m "Initial site + Stripe checkout"`
4. Crear repo en GitHub y copiar URL.
5. `git remote add origin <URL_DEL_REPO>`
6. `git branch -M main`
7. `git push -u origin main`
