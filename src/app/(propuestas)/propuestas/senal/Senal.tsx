"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { perfil, proyectos, servicios, stack } from "../data";
import Particulas, { type ParticulasHandle } from "./Particulas";
import s from "./senal.module.scss";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

const boot = [
  "> iniciando portfolio.v26",
  `> cargando proyectos ........ [${String(proyectos.length).padStart(2, "0")}]`,
  "> stack: next / nest / react / ts",
  "> estado: disponible",
];

const GLIFOS = "01<>/_-+*#";

export default function Senal({ fonts }: { fonts: string }) {
  const root = useRef<HTMLDivElement>(null);
  const particulas = useRef<ParticulasHandle>(null);
  const [fuente, setFuente] = useState<string | null>(null);
  const [animar, setAnimar] = useState(true);

  useEffect(() => {
    setAnimar(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    document.fonts.ready.then(() => {
      if (root.current) setFuente(getComputedStyle(root.current).getPropertyValue("--f-sans").trim() || "sans-serif");
    });
  }, []);

  useGSAP(
    () => {
      if (!fuente) return;
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 900px)",
        },
        (ctx) => {
          const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
          if (!motion) {
            particulas.current?.completo();
            return;
          }

          const lineas = gsap.utils.toArray<HTMLElement>(`.${s.bootLine}`);
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          lineas.forEach((l, i) => {
            tl.set(l, { autoAlpha: 1 }, i * 0.32).to(
              l,
              { duration: 0.7, scrambleText: { text: boot[i], chars: GLIFOS, speed: 0.6, revealDelay: 0.15 } },
              i * 0.32
            );
          });
          const ensamble = particulas.current?.ensamblar(2.6);
          if (ensamble) tl.add(ensamble, 0.5);
          tl.from(`.${s.heroMeta} > *`, { y: 14, autoAlpha: 0, stagger: 0.07, duration: 0.8 }, "-=0.9")
            .from(`.${s.topbar}`, { autoAlpha: 0, duration: 0.8 }, "<")
            .from(`.${s.scrollCue}`, { autoAlpha: 0, y: -10, duration: 0.6 }, "<0.3");

          gsap.utils.toArray<HTMLElement>(`.${s.scramble}`).forEach((el) => {
            const texto = el.dataset.text || el.textContent || "";
            ScrollTrigger.create({
              trigger: el,
              start: "top 88%",
              once: true,
              onEnter: () => gsap.to(el, { duration: 1.1, scrambleText: { text: texto, chars: GLIFOS, speed: 0.5 } }),
            });
          });

          gsap.utils.toArray<HTMLElement>(`.${s.statNum}`).forEach((el) => {
            gsap.from(el, {
              textContent: 0,
              snap: { textContent: 1 },
              duration: 1.4,
              ease: "power1.inOut",
              scrollTrigger: { trigger: el, start: "top 88%" },
            });
          });

          gsap.from(`.${s.service}`, {
            autoAlpha: 0,
            y: 30,
            stagger: 0.08,
            duration: 0.8,
            scrollTrigger: { trigger: `.${s.services}`, start: "top 80%" },
          });

          if (!desktop) return;

          const track = root.current!.querySelector<HTMLElement>(`.${s.track}`)!;
          const distancia = () => track.scrollWidth - window.innerWidth;
          const scroll = gsap.to(track, {
            x: () => -distancia(),
            ease: "none",
            scrollTrigger: {
              trigger: `.${s.work}`,
              pin: true,
              scrub: 1,
              end: () => `+=${distancia()}`,
              invalidateOnRefresh: true,
            },
          });

          gsap.to(`.${s.progressBar}`, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: `.${s.work}`,
              start: "top top",
              end: () => `+=${distancia()}`,
              scrub: true,
            },
          });

          gsap.utils.toArray<HTMLElement>(`.${s.card}`).forEach((card) => {
            gsap.fromTo(
              card.querySelector(`.${s.cardImg} img`),
              { xPercent: -8, scale: 1.15 },
              {
                xPercent: 8,
                ease: "none",
                scrollTrigger: { trigger: card, containerAnimation: scroll, start: "left right", end: "right left", scrub: true },
              }
            );
            gsap.from(card.querySelector(`.${s.cardInfo}`), {
              autoAlpha: 0,
              y: 20,
              duration: 0.6,
              scrollTrigger: { trigger: card, containerAnimation: scroll, start: "left 70%" },
            });
          });
        }
      );
    },
    { scope: root, dependencies: [fuente], revertOnUpdate: true }
  );

  const { contextSafe } = useGSAP({ scope: root });
  const scramble = contextSafe((e: React.PointerEvent<HTMLElement>) => {
    if (!animar) return;
    const el = e.currentTarget.querySelector<HTMLElement>("[data-label]");
    if (!el) return;
    gsap.to(el, { duration: 0.6, scrambleText: { text: el.dataset.label!, chars: GLIFOS, speed: 0.8 }, overwrite: true });
  });

  return (
    <div ref={root} className={`${fonts} ${s.page}`}>
      <header className={s.topbar}>
        <Link href="/propuestas" className={s.brand}>MS/<span>señal</span></Link>
        <nav className={s.nav} aria-label="Secciones">
          <a href="#trabajo" onPointerEnter={scramble}><span data-label="[trabajo]">[trabajo]</span></a>
          <a href="#perfil" onPointerEnter={scramble}><span data-label="[perfil]">[perfil]</span></a>
          <a href="#contacto" onPointerEnter={scramble}><span data-label="[contacto]">[contacto]</span></a>
        </nav>
      </header>

      <section className={s.hero}>
        <div className={s.boot} aria-hidden="true">
          {boot.map((l) => (
            <p key={l} className={s.bootLine}>{animar ? "" : l}</p>
          ))}
        </div>
        <div className={s.canvas}>
          {fuente && <Particulas ref={particulas} texto="SKUAROK" fuente={fuente} animar={animar} />}
        </div>
        <h1 className="sr-only">{perfil.nombre} {perfil.apellido} — {perfil.rol}</h1>
        <div className={s.heroMeta}>
          <span>{perfil.nombre} {perfil.apellido}</span>
          <span>{perfil.rol}</span>
          <span>{perfil.base}</span>
          <span className={s.live}><i />Disponible</span>
        </div>
        <span className={s.scrollCue} aria-hidden="true">scroll ↓</span>
      </section>

      <section id="trabajo" className={s.work}>
        <div className={s.workHead}>
          <h2 className={`${s.h2} ${s.scramble}`} data-text="Trabajo seleccionado">Trabajo seleccionado</h2>
          <div className={s.progress}><span className={s.progressBar} /></div>
        </div>
        <div className={s.track}>
          {proyectos.map((p, i) => (
            <a key={p.cliente} href={p.link} target="_blank" rel="noopener noreferrer" className={s.card}>
              <div className={s.cardImg}>
                <Image src={p.imagen} alt={`Sitio de ${p.cliente}`} fill sizes="(max-width: 900px) 100vw, 60vw" loading="eager" />
              </div>
              <div className={s.cardInfo}>
                <span className={s.mono}>{String(i + 1).padStart(2, "0")} / {String(proyectos.length).padStart(2, "0")}</span>
                <h3>{p.cliente}</h3>
                <span className={s.mono}>{p.tipo} · {p.rubro}</span>
                <span className={s.visit}>visitar ↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="perfil" className={s.profile}>
        <div className={s.photo}>
          <Image src={perfil.foto} alt={`Retrato de ${perfil.nombre} ${perfil.apellido}`} fill sizes="(max-width: 900px) 100vw, 35vw" />
        </div>
        <div className={s.profileBody}>
          <span className={`${s.mono} ${s.scramble}`} data-text="// perfil">{"// perfil"}</span>
          <p className={s.bio}>{perfil.bio}</p>
          <div className={s.stats}>
            {perfil.stats.map((st) => (
              <div key={st.label}>
                <span className={s.stat}><span className={s.statNum}>{st.valor}</span>{st.sufijo}</span>
                <span className={s.mono}>{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.services}>
        {servicios.map((sv, i) => (
          <article key={sv.titulo} className={s.service}>
            <span className={s.mono}>0{i + 1}</span>
            <h3>{sv.titulo}</h3>
            <p>{sv.desc}</p>
          </article>
        ))}
      </section>

      <section className={s.stack}>
        <span className={`${s.mono} ${s.scramble}`} data-text="// stack">{"// stack"}</span>
        <ul>
          {[...stack.principal, ...stack.otros].map((t, i) => (
            <li key={t} className={i < stack.principal.length ? s.main : undefined}>{t}</li>
          ))}
        </ul>
      </section>

      <footer id="contacto" className={s.contact}>
        <span className={s.mono}>{"// contacto"}</span>
        <a href={perfil.linkedin} target="_blank" rel="noopener noreferrer" className={s.cta}>
          Iniciemos algo<span className={s.caret}>_</span>
        </a>
        <div className={s.links}>
          <a href={perfil.linkedin} target="_blank" rel="noopener noreferrer" onPointerEnter={scramble}><span data-label="linkedin ↗">linkedin ↗</span></a>
          <a href={perfil.github} target="_blank" rel="noopener noreferrer" onPointerEnter={scramble}><span data-label="github ↗">github ↗</span></a>
          <a href={perfil.cv} download onPointerEnter={scramble}><span data-label="cv.pdf ↓">cv.pdf ↓</span></a>
        </div>
        <div className={s.colophon}>
          <span>© {new Date().getFullYear()} {perfil.nombre} {perfil.apellido}</span>
          <Link href="/propuestas">← propuestas</Link>
        </div>
      </footer>
    </div>
  );
}
