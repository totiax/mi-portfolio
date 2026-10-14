<div align="center">

# Matias Skuarok — Portfolio

**Desarrollador full-stack freelance · Villa Carlos Paz, Córdoba**

[![Ver sitio](https://img.shields.io/badge/Ver_sitio-c6ff00?style=for-the-badge&labelColor=16161a&color=c6ff00&logo=vercel&logoColor=16161a)](https://mi-portfolio-ruby.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js_16-16161a?style=flat-square&logo=nextdotjs&logoColor=c6ff00)
![React](https://img.shields.io/badge/React_19-16161a?style=flat-square&logo=react&logoColor=c6ff00)
![TypeScript](https://img.shields.io/badge/TypeScript-16161a?style=flat-square&logo=typescript&logoColor=c6ff00)
![GSAP](https://img.shields.io/badge/GSAP-16161a?style=flat-square&logo=greensock&logoColor=c6ff00)
![Sass](https://img.shields.io/badge/Sass-16161a?style=flat-square&logo=sass&logoColor=c6ff00)

</div>

---

Mi sitio personal: proyectos para marcas como **Pomelo, Mabe, Cessi, El Solar y Recoleta Mall**, el stack con el que trabajo y los tipos de web que construyo, desde landings hasta web apps, dashboards e integraciones con IA.

## Lo destacado

- **Animación con GSAP**: ScrollTrigger y SplitText, con `gsap.matchMedia()` para respetar `prefers-reduced-motion`.
- **Interacciones de mouse solo donde tienen sentido**: corren únicamente en dispositivos con `hover` y puntero fino.
- **Diseño propio**: paleta Grafito (`#16161a` · `#ededE8` · `#c6ff00`) con Anton y Bricolage Grotesque.
- **Contenido separado del código**: todo lo editable vive en un solo archivo de datos.

## Correrlo en local

```bash
npm install
npm run dev
```

Abrí [localhost:3000](http://localhost:3000).

> No corras `next build` con `next dev` prendido: corrompe la caché de imágenes del servidor de desarrollo.

## Estructura

```
src/
├── app/layout.tsx          # layout raíz, metadatos y fuentes
├── components/Portfolio/   # hero, marquesina, proyectos, perfil, soluciones, contacto
└── data/portfolio.ts       # perfil, proyectos, stack y soluciones (editar acá)
public/
├── portfolio/              # capturas de proyectos (2400×1200, JPG)
└── soluciones/             # mockups de soluciones
```

## Deploy

Se publica automáticamente con cada push a `main`.

---

<div align="center">

[LinkedIn](https://www.linkedin.com/in/matias-skuarok/) · [Lab](https://ms-lab-tau.vercel.app) · [GitHub](https://github.com/totiax)

</div>
