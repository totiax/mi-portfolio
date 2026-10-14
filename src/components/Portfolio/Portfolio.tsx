"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { labModos, perfil, proyectos, stack, tiposDeWeb } from "@/data/portfolio";
import s from "./portfolio.module.scss";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const marquesina = ["Full-Stack", ...stack.principal];
const temas = [s.cobalt, s.cream, s.ink, s.tang];


export default function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const magnet = useRef<HTMLAnchorElement>(null);
  const [abierto, setAbierto] = useState(0);
  const preview = useRef<HTMLDivElement>(null);
  const previewOn = useRef(false);
  const previewActivo = useRef(-1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          fine: "(hover: hover) and (pointer: fine)",
        },
        (ctx) => {
          const { motion, fine } = ctx.conditions as { motion: boolean; fine: boolean };
          if (!motion) return;

          const quitarNombre: (() => void)[] = [];
          const activarNombre = (chars: Element[]) => {
            if (!fine) return;
            const hero = root.current!.querySelector<HTMLElement>(`.${s.hero}`)!;
            const letras = chars.map((el) => ({
              el,
              x: gsap.quickTo(el, "x", { duration: 0.7, ease: "power3" }),
              y: gsap.quickTo(el, "y", { duration: 0.7, ease: "power3" }),
              r: gsap.quickTo(el, "rotation", { duration: 0.9, ease: "power3" }),
            }));
            const atraer = (e: PointerEvent) => {
              letras.forEach(({ el, x, y, r }) => {
                const b = el.getBoundingClientRect();
                const cx = b.left + b.width / 2 - (gsap.getProperty(el, "x") as number);
                const cy = b.top + b.height / 2 - (gsap.getProperty(el, "y") as number);
                const dx = e.clientX - cx;
                const dy = e.clientY - cy;
                const f = Math.max(0, 1 - Math.hypot(dx, dy) / 520) ** 2;
                x(dx * 0.14 * f);
                y(dy * 0.14 * f);
                r(gsap.utils.clamp(-10, 10, dx * 0.025 * f));
              });
            };
            const soltar = () => letras.forEach(({ x, y, r }) => (x(0), y(0), r(0)));
            hero.addEventListener("pointermove", atraer);
            hero.addEventListener("pointerleave", soltar);
            quitarNombre.push(() => {
              hero.removeEventListener("pointermove", atraer);
              hero.removeEventListener("pointerleave", soltar);
            });
          };

          SplitText.create(`.${s.bigLine}`, {
            type: "chars",
            onSplit: (self) =>
              gsap
                .timeline({ delay: 0.15 })
                .from(self.chars, {
                  yPercent: -140,
                  rotation: () => gsap.utils.random(-28, 28),
                  autoAlpha: 0,
                  duration: 0.9,
                  ease: "back.out(1.8)",
                  stagger: 0.045,
                })
                .from(`.${s.badge}`, { scale: 0, rotation: -120, duration: 0.9, ease: "back.out(2)" }, "-=0.4")
                .from(`.${s.heroBar} > *`, { y: 30, autoAlpha: 0, stagger: 0.06, duration: 0.6, ease: "power3.out" }, "<0.1")
                .call(() => activarNombre(self.chars)),
          });

          const track = root.current!.querySelector(`.${s.marqueeTrack}`);
          const loop = gsap.to(track, { xPercent: -50, duration: 22, ease: "none", repeat: -1 });
          const giro = gsap.to(`.${s.badgeRing}`, { rotation: 360, duration: 16, ease: "none", repeat: -1 });
          const skew = gsap.quickTo(track, "skewX", { duration: 0.4, ease: "power3" });

          ScrollTrigger.create({
            onUpdate: (self) => {
              const v = self.getVelocity();
              const boost = 1 + Math.min(Math.abs(v) / 250, 6);
              gsap.to([loop, giro], { timeScale: boost, duration: 0.15, overwrite: true });
              gsap.to([loop, giro], { timeScale: 1, duration: 1.2, delay: 0.15, ease: "power2.out" });
              skew(gsap.utils.clamp(-14, 14, v / -220));
              gsap.delayedCall(0.12, () => skew(0));
            },
          });

          const cards = gsap.utils.toArray<HTMLElement>(`.${s.card}`);
          cards.forEach((card, i) => {
            const next = cards[i + 1];
            if (!next) return;
            gsap
              .timeline({ scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true } })
              .to(card.querySelector(`.${s.cardInner}`), { scale: 0.88, rotation: i % 2 ? 2 : -2, ease: "none" })
              .to(card.querySelector(`.${s.shade}`), { opacity: 0.55, ease: "none" }, 0);
          });

          cards.forEach((card) => {
            SplitText.create(card.querySelector(`.${s.cardTitle}`), {
              type: "chars",
              mask: "chars",
              onSplit: (self) =>
                gsap.from(self.chars, {
                  yPercent: 110,
                  duration: 0.7,
                  ease: "power4.out",
                  stagger: 0.03,
                  scrollTrigger: { trigger: card, start: "top 60%" },
                }),
            });
          });

          gsap.fromTo(
            `.${s.photo}`,
            { clipPath: "circle(14% at 50% 50%)" },
            {
              clipPath: "circle(72% at 50% 50%)",
              ease: "none",
              scrollTrigger: { trigger: `.${s.profile}`, start: "top 80%", end: "center 55%", scrub: true },
            }
          );

          SplitText.create(`.${s.bio}`, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 100,
                duration: 0.9,
                stagger: 0.08,
                ease: "power4.out",
                scrollTrigger: { trigger: self.elements[0], start: "top 80%" },
              }),
          });

          SplitText.create(`.${s.tiposTitle}`, {
            type: "chars",
            mask: "chars",
            onSplit: (self) =>
              gsap.from(self.chars, {
                yPercent: 110,
                duration: 0.8,
                ease: "power4.out",
                stagger: 0.03,
                scrollTrigger: { trigger: self.elements[0], start: "top 85%" },
              }),
          });

          gsap.from(`.${s.tipo}`, {
            xPercent: (i) => (i % 2 ? 10 : -10),
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: { trigger: `.${s.tiposList}`, start: "top 80%" },
          });

          SplitText.create(`.${s.labTitle}`, {
            type: "chars",
            mask: "chars",
            onSplit: (self) =>
              gsap.from(self.chars, {
                yPercent: 110,
                duration: 0.8,
                ease: "power4.out",
                stagger: 0.04,
                scrollTrigger: { trigger: self.elements[0], start: "top 85%" },
              }),
          });

          gsap.from(`.${s.labModo}`, {
            y: 60,
            autoAlpha: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.12,
            scrollTrigger: { trigger: `.${s.labModos}`, start: "top 85%" },
          });

          SplitText.create(`.${s.ctaTitle}`, {
            type: "chars",
            onSplit: (self) =>
              gsap.from(self.chars, {
                yPercent: 120,
                scaleY: 1.6,
                transformOrigin: "50% 100%",
                duration: 0.8,
                ease: "back.out(1.6)",
                stagger: 0.035,
                scrollTrigger: { trigger: self.elements[0], start: "top 85%" },
              }),
          });

          if (!fine || !magnet.current) return;

          const limpiezas: (() => void)[] = [];

          if (preview.current) {
            previewOn.current = true;
            const px = gsap.quickTo(preview.current, "x", { duration: 0.55, ease: "power3" });
            const py = gsap.quickTo(preview.current, "y", { duration: 0.55, ease: "power3" });
            const pr = gsap.quickTo(preview.current, "rotation", { duration: 0.8, ease: "power3" });
            let ultimoX = 0;
            const seguir = (e: PointerEvent) => {
              px(e.clientX);
              py(e.clientY);
              pr(gsap.utils.clamp(-12, 12, (e.clientX - ultimoX) * 0.6));
              ultimoX = e.clientX;
            };
            window.addEventListener("pointermove", seguir);
            limpiezas.push(() => {
              previewOn.current = false;
              window.removeEventListener("pointermove", seguir);
            });
          }
          cards.forEach((card) => {
            const img = card.querySelector<HTMLElement>(`.${s.cardImg}`);
            if (!img) return;
            const rx = gsap.quickTo(img, "rotationX", { duration: 0.6, ease: "power3" });
            const ry = gsap.quickTo(img, "rotationY", { duration: 0.6, ease: "power3" });
            const mover = (e: PointerEvent) => {
              const r = img.getBoundingClientRect();
              ry(((e.clientX - r.left) / r.width - 0.5) * 14);
              rx(-((e.clientY - r.top) / r.height - 0.5) * 14);
            };
            const salir = () => {
              rx(0);
              ry(0);
            };
            img.addEventListener("pointermove", mover);
            img.addEventListener("pointerleave", salir);
            limpiezas.push(() => {
              img.removeEventListener("pointermove", mover);
              img.removeEventListener("pointerleave", salir);
            });
          });

          const btn = magnet.current;
          const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
          const zona = btn.parentElement!;
          const atraer = (e: PointerEvent) => {
            const r = btn.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2 - (gsap.getProperty(btn, "x") as number))) * 0.4);
            yTo((e.clientY - (r.top + r.height / 2 - (gsap.getProperty(btn, "y") as number))) * 0.4);
          };
          const soltar = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.35)", overwrite: true });
          };
          zona.addEventListener("pointermove", atraer);
          zona.addEventListener("pointerleave", soltar);
          return () => {
            quitarNombre.forEach((fn) => fn());
            limpiezas.forEach((fn) => fn());
            zona.removeEventListener("pointermove", atraer);
            zona.removeEventListener("pointerleave", soltar);
          };
        }
      );
    },
    { scope: root }
  );

  const { contextSafe } = useGSAP({ scope: root });
  const mostrarPreview = contextSafe((i: number, x: number, y: number) => {
    const el = preview.current;
    if (!previewOn.current || !el) return;
    if (previewActivo.current === -1) gsap.set(el, { x, y });
    gsap.to(el, { scale: 1, autoAlpha: 1, duration: 0.45, ease: "back.out(1.7)", overwrite: "auto" });
    if (previewActivo.current === i) return;
    previewActivo.current = i;
    const imgs = el.querySelectorAll<HTMLElement>(`.${s.previewImg}`);
    imgs.forEach((img, j) => gsap.set(img, { zIndex: j === i ? 2 : 1 }));
    gsap.fromTo(imgs[i], { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "expo.out" });
    gsap.fromTo(imgs[i].querySelector("img"), { scale: 1.35 }, { scale: 1, duration: 0.8, ease: "expo.out" });
  });

  const ocultarPreview = contextSafe(() => {
    const el = preview.current;
    if (!previewOn.current || !el) return;
    previewActivo.current = -1;
    gsap.to(el, { scale: 0.5, autoAlpha: 0, duration: 0.3, ease: "power3.in", overwrite: "auto" });
  });

  const alternar = contextSafe((i: number) => {
    const siguiente = abierto === i ? -1 : i;
    setAbierto(siguiente);
    if (siguiente < 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const panel = root.current?.querySelector(`#tipo-panel-${i}`);
    if (!panel) return;
    gsap.fromTo(
      panel.querySelectorAll(`.${s.tipoCol}`),
      { y: 24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", stagger: 0.08, delay: 0.1 }
    );
  });

  const frase = marquesina.map((m) => (
    <span key={m} className={s.marqueeItem}>
      {m}
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0v24M0 12h24M3.5 3.5l17 17M20.5 3.5l-17 17" /></svg>
    </span>
  ));

  return (
    <div ref={root} className={s.page}>

      <header className={s.topbar}>
        <a href="#top" className={s.brand} aria-label="Inicio">M✳S</a>
        <nav aria-label="Secciones">
          <a href="#trabajo">Trabajo</a>
          <a href="#servicios">Servicios</a>
          <a href="#perfil">Perfil</a>
          <a href={perfil.lab} target="_blank" rel="noopener noreferrer">Lab ↗</a>
          <a href="#contacto" className={s.navCta}>Hablemos</a>
        </nav>
      </header>

      <section id="top" className={s.hero}>
        <h1 className={s.big}>
          <span className={s.bigLine}>{perfil.nombre}</span>
          <span className={s.bigLine}>{perfil.apellido}</span>
        </h1>
        <div className={s.badge} aria-hidden="true">
          <svg className={s.badgeRing} viewBox="0 0 200 200">
            <defs>
              <path id="circulo" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <text>
              <textPath href="#circulo" textLength="486" lengthAdjust="spacingAndGlyphs">DISPONIBLE ✳ FREELANCE ✳ {new Date().getFullYear()} ✳ CARLOS PAZ · CÓRDOBA ✳</textPath>
            </text>
          </svg>
          <span className={s.badgeCore}>↓</span>
        </div>
        <div className={s.heroBar}>
          <p>{perfil.rol} — diseño y código para marcas que se quieren mover.</p>
          <a href="#trabajo" className={s.pill}>Ver trabajo</a>
        </div>
      </section>

      <div className={s.marquee} aria-hidden="true">
        <div className={s.marqueeTrack}>
          {frase}
          {frase}
        </div>
      </div>

      <section id="trabajo" className={s.work}>
        {proyectos.map((p, i) => (
          <article key={p.cliente} className={`${s.card} ${temas[i % temas.length]}`}>
            <div className={s.cardInner}>
              <div className={s.cardHead}>
                <span className={s.cardNum}>{String(i + 1).padStart(2, "0")}</span>
                <span>{p.tipo} / {p.rubro}</span>
              </div>
              <h2 className={s.cardTitle}>{p.cliente}</h2>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className={s.cardImgWrap} aria-label={`Visitar el sitio de ${p.cliente}`}>
                <span className={s.cardImg}>
                  <Image src={p.imagen} alt="" fill sizes="95vw" />
                </span>
              </a>
              <span className={s.shade} />
            </div>
          </article>
        ))}
      </section>

      <section id="perfil" className={s.profile}>
        <div className={s.photo}>
          <div className={s.photoInner}>
            <Image src={perfil.foto} alt={`Retrato de ${perfil.nombre} ${perfil.apellido}`} fill sizes="100vw" />
          </div>
        </div>
        <div className={s.profileText}>
          <span className={s.kicker}>Perfil</span>
          <p className={s.bio}>{perfil.bio}</p>
          <div className={s.stats}>
            {perfil.stats.map((st) => (
              <div key={st.label}>
                <strong>{st.valor}{st.sufijo}</strong>
                <span>{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className={s.tipos}>
        <div className={s.tiposHead}>
          <span className={s.kicker}>Qué podemos hacer</span>
          <h2 className={s.tiposTitle}>Soluciones</h2>
          <p>De una landing a una automatización con IA: qué es cada formato, qué se está usando hoy y cómo lo construyo.</p>
        </div>
        <div className={s.tiposList} onPointerLeave={ocultarPreview}>
          {tiposDeWeb.map((tw, i) => {
            const open = abierto === i;
            return (
              <div key={tw.nombre} className={s.tipo} data-open={open}>
                <h3>
                  <button
                    type="button"
                    className={s.tipoHead}
                    aria-expanded={open}
                    aria-controls={`tipo-panel-${i}`}
                    onClick={() => alternar(i)}
                    onPointerEnter={(e) => mostrarPreview(i, e.clientX, e.clientY)}
                    onPointerLeave={ocultarPreview}
                  >
                    <span className={s.tipoNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={s.tipoNombre}>{tw.nombre}</span>
                    <span className={s.tipoResumen}>{tw.resumen}</span>
                    <span className={s.tipoIcon} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`tipo-panel-${i}`} role="region" aria-label={tw.nombre} className={s.tipoPanel}>
                  <div className={s.tipoInner}>
                    <div className={s.tipoMedia}>
                      <Image src={tw.imagen} alt="" fill sizes="92vw" loading={open ? "eager" : "lazy"} />
                    </div>
                    <div className={s.tipoGrid}>
                      <div className={s.tipoCol}>
                        <h4>Ideal para</h4>
                        <p>{tw.idealPara}</p>
                        {tw.ejemplos.length > 0 && (
                          <>
                            <h4>Proyectos</h4>
                            <p className={s.tipoEjemplos}>
                              {tw.ejemplos.map((e) => (
                                <span key={e}>{e}</span>
                              ))}
                            </p>
                          </>
                        )}
                      </div>
                      <div className={s.tipoCol}>
                        <h4>Tendencias {new Date().getFullYear()}</h4>
                        <ul>
                          {tw.tendencias.map((td) => (
                            <li key={td}>{td}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={s.tipoCol}>
                        <h4>Modelo</h4>
                        <p>{tw.construccion}</p>
                        <p className={s.tipoModalidad}>{tw.modalidad}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div ref={preview} className={s.preview} aria-hidden="true">
        {tiposDeWeb.map((tw) => (
          <div key={tw.nombre} className={s.previewImg}>
            <Image src={tw.imagen} alt="" fill sizes="360px" />
          </div>
        ))}
      </div>

      <section id="lab" className={s.lab}>
        <span className={s.labAst} aria-hidden="true">✳</span>
        <div className={s.labHead}>
          <span className={s.kicker}>Proyecto propio</span>
          <h2 className={s.labTitle}>M<span>✳</span>S LAB</h2>
          <p>Mi laboratorio: herramientas de IA que generan y una galería de diseño web que marca tendencia. Dos modos en un mismo lugar.</p>
        </div>
        <div className={s.labModos}>
          {labModos.map((m) => (
            <a key={m.nombre} href={perfil.lab} target="_blank" rel="noopener noreferrer" className={`${s.labModo} ${m.nombre === "IA" ? s.labIa : s.labDesign}`}>
              <span className={s.labEtiqueta}>{m.etiqueta}</span>
              <span className={s.labNombre}>{m.nombre}</span>
              <span className={s.labTexto}>{m.texto}</span>
              <span className={s.labIr}>Entrar ↗</span>
            </a>
          ))}
        </div>
        <a href={perfil.lab} target="_blank" rel="noopener noreferrer" className={s.labCta}>Visitar M✳S LAB ↗</a>
      </section>

      <footer id="contacto" className={s.contact}>
        <h2 className={s.ctaTitle}>¿Hablamos?</h2>
        <div className={s.magnetZone}>
          <a ref={magnet} href={perfil.linkedin} target="_blank" rel="noopener noreferrer" className={s.magnet}>
            Escribime
          </a>
        </div>
        <div className={s.links}>
          <a href={perfil.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={perfil.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={perfil.cv} download>CV</a>
        </div>
      </footer>
    </div>
  );
}
