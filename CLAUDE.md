# Portfolio de Matias Skuarok

Portfolio personal: desarrollador full-stack freelance en Villa Carlos Paz, Córdoba. Responder siempre en español.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript.
- Estilos con CSS Modules en SCSS. Sin Tailwind.
- Animación con GSAP (`gsap` + `@gsap/react`): ScrollTrigger y SplitText. Todos los plugins vienen en el paquete público `gsap`.
- Fuentes por `next/font/google` en `src/app/layout.tsx`: Anton (`--f-display`) y Bricolage Grotesque (`--f-sans`).
- Deploy en Netlify desde la rama `main`.

## Estructura

- `src/app/layout.tsx`: layout raíz, metadatos, fuentes.
- `src/components/Portfolio/`: toda la página (hero, marquesina, proyectos, perfil, soluciones, contacto).
- `src/data/portfolio.ts`: contenido editable (perfil, proyectos, stack, soluciones). Para sumar o sacar proyectos, se edita acá.
- `public/portfolio/`: capturas de proyectos (2400×1200, JPG).
- `public/soluciones/`: mockups de las soluciones.

## Diseño

- Paleta Grafito: `--primary #16161a`, `--light #ededE8`, `--dark #08080a`, `--accent #c6ff00`.
- Nada de "AI slop": sin gradientes violetas genéricos, sin emojis como íconos, sin layouts por defecto.
- Toda animación respeta `prefers-reduced-motion` (vía `gsap.matchMedia()`), y los efectos de mouse solo corren con `(hover: hover) and (pointer: fine)`.
- No poner transiciones CSS de `transform` en elementos que anima GSAP.

## Notas

- No correr `next build` con `next dev` prendido: corrompe la caché de imágenes del servidor de desarrollo.
- Stack que ofrece Matias: Next.js, NestJS, React, TypeScript, Node.js, WordPress, WooCommerce o e-commerce a medida, Odoo, integraciones custom y automatizaciones con IA. No Magento ni Shopify.
- Pocos comentarios en el código.
