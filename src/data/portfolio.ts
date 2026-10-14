export const perfil = {
  nombre: "Matias",
  apellido: "Skuarok",
  rol: "Desarrollador Full-Stack",
  base: "Villa Carlos Paz, Córdoba",
  desde: 2020,
  bio: "Construyo sitios y aplicaciones web de punta a punta: desde la interfaz que ve el usuario hasta la API que la sostiene. Freelance desde 2020, trabajando con marcas como Pomelo, Mabe, Cessi y los shoppings El Solar y Recoleta Mall.",
  foto: "/faces/20241030_220448.jpg",
  cv: "/cv/desarrolladorFullStack-dev.pdf",
  github: "https://github.com/totiax",
  linkedin: "https://www.linkedin.com/in/matias-skuarok/",
  lab: "https://ms-lab-tau.vercel.app",
  stats: [
    { valor: 4, sufijo: "+", label: "años de experiencia" },
    { valor: 100, sufijo: "+", label: "proyectos entregados" },
  ],
};

export type Proyecto = {
  cliente: string;
  tipo: string;
  rubro: string;
  imagen: string;
  link: string;
};

export const proyectos: Proyecto[] = [
  { cliente: "El Solar", tipo: "Sitio de shopping", rubro: "Retail", imagen: "/portfolio/elsolar.jpg", link: "https://elsolarshopping.com.ar/" },
  { cliente: "Recoleta Mall", tipo: "Sitio de shopping", rubro: "Retail y entretenimiento", imagen: "/portfolio/recoleta.jpg", link: "https://www.recoletamall.com.ar/" },
  { cliente: "Pomelo", tipo: "Blog corporativo", rubro: "Fintech", imagen: "/portfolio/pomelo.jpg", link: "https://blog.pomelo.la/" },
  { cliente: "Mabe", tipo: "Blog corporativo", rubro: "Electrodomésticos", imagen: "/portfolio/mabe.jpg", link: "https://blog.mabeglobal.com/" },
  { cliente: "Cessi", tipo: "Sitio institucional", rubro: "Cámara de software", imagen: "/portfolio/cessi.jpg", link: "https://cessi.org.ar/" },
  { cliente: "Cupito", tipo: "Sitio profesional", rubro: "Salud", imagen: "/portfolio/cupito.jpg", link: "https://www.rinoplastiamiguelcupito.com/" },
];

export const stack = {
  principal: ["Next.js", "NestJS", "React", "TypeScript", "Node.js"],
  otros: ["WordPress", "WooCommerce", "Odoo", "Sass", "Python", "Java", "Git"],
};


export type TipoDeWeb = {
  nombre: string;
  resumen: string;
  idealPara: string;
  tendencias: string[];
  construccion: string;
  modalidad: string;
  ejemplos: string[];
  imagen: string;
};

export const tiposDeWeb: TipoDeWeb[] = [
  {
    nombre: "Landing page",
    imagen: "/soluciones/landing.jpg",
    resumen: "Una sola página con un único objetivo: vender, captar contactos o lanzar algo.",
    idealPara: "Lanzamientos, campañas, eventos y productos puntuales.",
    tendencias: [
      "Scroll narrativo: la página cuenta una historia a medida que bajás",
      "Hero con video o 3D liviano que no frena la carga",
      "Microinteracciones que guían hacia el botón principal",
      "Medición y pruebas A/B desde el primer día",
    ],
    construccion: "Sitio estático en Next.js publicado en CDN: carga casi instantánea y costo de hosting mínimo.",
    modalidad: "Proyecto cerrado con una ronda de ajustes.",
    ejemplos: [],
  },
  {
    nombre: "Sitio institucional",
    imagen: "/portfolio/cessi.jpg",
    resumen: "La casa digital de una empresa, marca o institución.",
    idealPara: "Empresas, estudios, cámaras y profesionales que necesitan presencia y confianza.",
    tendencias: [
      "Diseño editorial: tipografía grande y mucho aire",
      "Accesibilidad real (WCAG) y modo oscuro",
      "Contenido pensado para buscadores y para respuestas de IA",
      "Multilenguaje para llegar a otros mercados",
    ],
    construccion: "Next.js con un CMS headless: el cliente edita textos e imágenes sin tocar código.",
    modalidad: "Proyecto cerrado + abono opcional de mantenimiento.",
    ejemplos: ["Cessi", "Cupito"],
  },
  {
    nombre: "Portal comercial",
    imagen: "/portfolio/recoleta.jpg",
    resumen: "Sitios con mucho contenido que cambia: locales, beneficios, eventos, agenda.",
    idealPara: "Shoppings, centros comerciales, cadenas y marcas con varias sedes.",
    tendencias: [
      "Video de portada y contenido que se actualiza solo",
      "Directorio de locales con búsqueda y filtros",
      "Contacto directo por WhatsApp",
      "Versiones en inglés para turismo",
    ],
    construccion: "CMS con módulos a medida (locales, beneficios, eventos) y front optimizado para mobile.",
    modalidad: "Proyecto + abono mensual de soporte y carga de contenido.",
    ejemplos: ["El Solar", "Recoleta Mall"],
  },
  {
    nombre: "Blog y contenidos",
    imagen: "/portfolio/mabe.jpg",
    resumen: "Medios, blogs corporativos y centros de recursos que atraen tráfico orgánico.",
    idealPara: "Marcas que quieren posicionarse como referentes en su rubro.",
    tendencias: [
      "SEO técnico y optimización para buscadores con IA",
      "Lectura cómoda: tipografía, ritmo y modo lectura",
      "Newsletter y suscripciones integradas",
      "Core Web Vitals en verde para no perder posiciones",
    ],
    construccion: "WordPress o CMS headless con generación estática de páginas para máxima velocidad.",
    modalidad: "Proyecto cerrado + mantenimiento y evolución.",
    ejemplos: ["Pomelo", "Mabe"],
  },
  {
    nombre: "E-commerce",
    imagen: "/soluciones/ecommerce.jpg",
    resumen: "Tiendas online para vender 24/7, con catálogo, pagos y envíos.",
    idealPara: "Marcas y comercios que venden productos físicos o digitales.",
    tendencias: [
      "Checkout en un paso con Mercado Pago y MODO",
      "Búsqueda inteligente y recomendaciones con IA",
      "Fichas de producto con video y zoom",
      "Experiencia tipo app en el celular (PWA)",
    ],
    construccion: "WooCommerce o tienda 100% a medida, con integraciones custom de pagos, envíos, stock y ERP (Odoo y otros).",
    modalidad: "Proyecto + abono de mantenimiento, integraciones y mejoras de conversión.",
    ejemplos: [],
  },
  {
    nombre: "Web app a medida",
    imagen: "/soluciones/webapp.jpg",
    resumen: "Sistemas y plataformas que resuelven un proceso de negocio.",
    idealPara: "Paneles de gestión, portales de clientes, SaaS y herramientas internas.",
    tendencias: [
      "IA integrada: asistentes, resúmenes y búsqueda semántica",
      "Datos en tiempo real y notificaciones",
      "Ingreso sin contraseña (passkeys)",
      "Interfaces rápidas que se sienten como una app",
    ],
    construccion: "Front en Next.js, API en NestJS y base de datos a medida, con deploy automatizado.",
    modalidad: "Desarrollo por etapas (MVP primero) + mantenimiento mensual.",
    ejemplos: [],
  },
  {
    nombre: "App mobile",
    imagen: "/soluciones/mobile.jpg",
    resumen: "Aplicaciones para iPhone y Android con una sola base de código.",
    idealPara: "Productos que necesitan estar en el bolsillo del usuario: reservas, fidelización, delivery, comunidades.",
    tendencias: [
      "Notificaciones push personalizadas",
      "Pagos dentro de la app y billeteras digitales",
      "Funciones sin conexión que se sincronizan después",
      "Asistentes con IA dentro de la app",
    ],
    construccion: "React Native con Expo y la misma API que la web: una sola lógica para web, iOS y Android.",
    modalidad: "Desarrollo por etapas, publicación en las tiendas y mantenimiento mensual.",
    ejemplos: [],
  },
  {
    nombre: "Dashboards",
    imagen: "/soluciones/dashboard.jpg",
    resumen: "Paneles que convierten los datos del negocio en decisiones.",
    idealPara: "Equipos que hoy viven en planillas: ventas, operaciones, marketing, finanzas.",
    tendencias: [
      "Indicadores en tiempo real conectados a las fuentes reales",
      "Preguntas en lenguaje natural a los datos con IA",
      "Alertas automáticas cuando algo se sale de lo normal",
      "Permisos por rol: cada persona ve lo que necesita",
    ],
    construccion: "Next.js con gráficos interactivos, API en NestJS y conexión a bases de datos, CRMs o planillas.",
    modalidad: "Proyecto por etapas + mantenimiento y nuevos indicadores.",
    ejemplos: [],
  },
  {
    nombre: "Integraciones y automatizaciones con IA",
    imagen: "/soluciones/ia.jpg",
    resumen: "Conectar los sistemas que ya usás y sacarle tareas repetitivas al equipo.",
    idealPara: "Empresas que copian datos a mano entre sistemas, responden siempre lo mismo o procesan documentos.",
    tendencias: [
      "Agentes de IA que ejecutan tareas, no solo responden",
      "Atención por WhatsApp con IA y derivación a una persona",
      "Lectura automática de facturas, formularios y mails",
      "Conexión entre CRM, e-commerce, planillas y ERPs como Odoo",
    ],
    construccion: "Integraciones custom en Node.js entre tus sistemas (Odoo, CRMs, tiendas, planillas) y APIs de IA como Claude u OpenAI.",
    modalidad: "Diagnóstico inicial, implementación por flujo y abono de monitoreo.",
    ejemplos: [],
  },
];

export const labModos = [
  { nombre: "IA", etiqueta: "Repos + prompts", texto: "Herramientas abiertas que generan imagen, video, audio y código, cada una con prompts listos para usar con Claude o Gemini." },
  { nombre: "Design", etiqueta: "Galería curada", texto: "Las webs que marcan tendencia, filtradas por rubro, con su paleta de colores medida y link a la original." },
];
