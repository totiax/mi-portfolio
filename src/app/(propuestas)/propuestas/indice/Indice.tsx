"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { perfil, proyectos, servicios, stack } from "../data";
import s from "./indice.module.scss";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

function Reloj() {
  const [hora, setHora] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-AR", {
      hour: "2-digit",
      hourCycle: "h23",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Argentina/Buenos_Aires",
    });
    const tick = () => setHora(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{hora || "--:--:--"}</span>;
}

export default function Indice({ fonts }: { fonts: string }) {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const previewOn = useRef(false);
  const activo = useRef(-1);

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

          const num = root.current!.querySelector(`.${s.loaderNum}`)!;
          const contador = { v: 0 };

          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .to(contador, {
              v: 100,
              duration: 1.3,
              ease: "power2.inOut",
              onUpdate: () => {
                num.textContent = String(Math.round(contador.v)).padStart(3, "0");
              },
            })
            .to(`.${s.loader}`, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "+=0.1")
            .from(`.${s.heroLine}`, { yPercent: 110, duration: 1.3, stagger: 0.12 }, "-=0.5")
            .from(`.${s.heroRule}`, { scaleX: 0, duration: 1.4, ease: "expo.inOut" }, "<0.15")
            .from(`.${s.meta} > *`, { y: 18, opacity: 0, duration: 0.9, stagger: 0.06 }, "<0.35")
            .from(`.${s.lead}`, { y: 24, opacity: 0, duration: 1 }, "<0.1")
            .from(`.${s.topbar} > *`, { y: -16, opacity: 0, duration: 0.8, stagger: 0.05 }, "<");

          gsap.utils.toArray<HTMLElement>(`.${s.row}`).forEach((row) => {
            gsap
              .timeline({ scrollTrigger: { trigger: row, start: "top 92%" } })
              .from(row.querySelector(`.${s.rowRule}`), { scaleX: 0, duration: 1.1, ease: "expo.inOut" })
              .from(row.querySelectorAll(`.${s.cell}`), { yPercent: 100, opacity: 0, duration: 0.9, stagger: 0.05, ease: "expo.out" }, "<0.2");
          });

          SplitText.create(`.${s.sectionTitle}`, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 100,
                duration: 1.1,
                stagger: 0.08,
                ease: "expo.out",
                scrollTrigger: { trigger: self.elements[0], start: "top 85%" },
              }),
          });

          SplitText.create(`.${s.bio}`, {
            type: "words",
            autoSplit: true,
            onSplit: (self) =>
              gsap.fromTo(
                self.words,
                { opacity: 0.14 },
                {
                  opacity: 1,
                  stagger: 0.1,
                  ease: "none",
                  scrollTrigger: { trigger: self.elements[0], start: "top 80%", end: "bottom 50%", scrub: true },
                }
              ),
          });

          gsap.fromTo(
            `.${s.photo}`,
            { clipPath: "inset(16% 14% 16% 14%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: { trigger: `.${s.photo}`, start: "top 90%", end: "top 30%", scrub: true },
            }
          );
          gsap.fromTo(
            `.${s.photo} img`,
            { yPercent: -8, scale: 1.18 },
            {
              yPercent: 8,
              scale: 1.05,
              ease: "none",
              scrollTrigger: { trigger: `.${s.photo}`, start: "top bottom", end: "bottom top", scrub: true },
            }
          );

          gsap.utils.toArray<HTMLElement>(`.${s.statNum}`).forEach((el) => {
            gsap.from(el, {
              textContent: 0,
              snap: { textContent: 1 },
              duration: 1.6,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 90%" },
            });
          });

          SplitText.create(`.${s.cta}`, {
            type: "chars",
            mask: "chars",
            onSplit: (self) =>
              gsap.from(self.chars, {
                yPercent: 105,
                duration: 1.2,
                stagger: 0.035,
                ease: "expo.out",
                scrollTrigger: { trigger: self.elements[0], start: "top 88%" },
              }),
          });

          if (!fine) return;

          previewOn.current = true;
          const xTo = gsap.quickTo(preview.current, "x", { duration: 0.6, ease: "power3" });
          const yTo = gsap.quickTo(preview.current, "y", { duration: 0.6, ease: "power3" });
          const rTo = gsap.quickTo(preview.current, "rotation", { duration: 0.9, ease: "power3" });
          let ultimoX = 0;
          const mover = (e: PointerEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
            rTo(gsap.utils.clamp(-10, 10, (e.clientX - ultimoX) * 0.5));
            ultimoX = e.clientX;
          };
          window.addEventListener("pointermove", mover);
          return () => {
            previewOn.current = false;
            window.removeEventListener("pointermove", mover);
          };
        }
      );
    },
    { scope: root }
  );

  const { contextSafe } = useGSAP({ scope: root });

  const entrar = contextSafe((i: number, x: number, y: number) => {
    if (!previewOn.current || !preview.current) return;
    const imgs = preview.current.querySelectorAll<HTMLElement>(`.${s.previewImg}`);
    if (activo.current === -1) gsap.set(preview.current, { x, y });
    gsap.to(preview.current, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "expo.out" });
    if (activo.current === i) return;
    activo.current = i;
    gsap.set(imgs[i], { zIndex: 2 });
    imgs.forEach((img, j) => j !== i && gsap.set(img, { zIndex: 1 }));
    gsap.fromTo(imgs[i], { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "expo.out" });
    gsap.fromTo(imgs[i].querySelector("img"), { scale: 1.3 }, { scale: 1, duration: 0.9, ease: "expo.out" });
  });

  const salir = contextSafe(() => {
    if (!previewOn.current || !preview.current) return;
    activo.current = -1;
    gsap.to(preview.current, { scale: 0.6, autoAlpha: 0, duration: 0.4, ease: "power3.in" });
  });

  return (
    <div ref={root} className={`${fonts} ${s.page}`}>
      <div className={s.loader} aria-hidden="true">
        <span className={s.loaderLabel}>Índice — {perfil.nombre} {perfil.apellido}</span>
        <span className={s.loaderNum}>000</span>
      </div>

      <header className={s.topbar}>
        <Link href="/propuestas" className={s.brand}>MS<span>—</span>Índice</Link>
        <nav className={s.nav} aria-label="Secciones">
          <a href="#trabajo">Trabajo</a>
          <a href="#perfil">Perfil</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <span className={s.clock}>CBA <Reloj /></span>
      </header>

      <section className={s.hero}>
        <h1 className={s.name}>
          <span className={s.mask}><span className={s.heroLine}>{perfil.nombre}</span></span>
          <span className={s.mask}><span className={`${s.heroLine} ${s.italic}`}>{perfil.apellido}</span></span>
        </h1>
        <div className={s.heroRule} />
        <div className={s.heroFoot}>
          <dl className={s.meta}>
            <div><dt>(01) Rol</dt><dd>{perfil.rol}</dd></div>
            <div><dt>(02) Base</dt><dd>{perfil.base}</dd></div>
            <div><dt>(03) Desde</dt><dd>{perfil.desde}</dd></div>
            <div><dt>(04) Estado</dt><dd><i className={s.dot} />Disponible</dd></div>
          </dl>
          <p className={s.lead}>
            Construyo la web de punta a punta — <em>de la interfaz a la API.</em>
          </p>
        </div>
      </section>

      <section id="trabajo" className={s.work}>
        <div className={s.sectionHead}>
          <h2 className={s.sectionTitle}>Trabajo seleccionado</h2>
          <span className={s.count}>({String(proyectos.length).padStart(2, "0")})</span>
        </div>

        <ol className={s.list} onPointerLeave={salir}>
          {proyectos.map((p, i) => (
            <li key={p.cliente} className={s.row}>
              <span className={s.rowRule} />
              <a href={p.link} target="_blank" rel="noopener noreferrer" className={s.rowLink} onPointerEnter={(e) => entrar(i, e.clientX, e.clientY)}>
                <span className={s.cellWrap}><span className={`${s.cell} ${s.idx}`}>{String(i + 1).padStart(2, "0")}</span></span>
                <span className={`${s.cellWrap} ${s.clientWrap}`}><span className={`${s.cell} ${s.client}`}>{p.cliente}</span></span>
                <span className={s.cellWrap}><span className={`${s.cell} ${s.type}`}>{p.tipo}</span></span>
                <span className={s.cellWrap}><span className={`${s.cell} ${s.type}`}>{p.rubro}</span></span>
                <span className={`${s.cellWrap} ${s.arrowWrap}`}><span className={`${s.cell} ${s.arrow}`} aria-hidden="true">↗</span></span>
                <span className={s.thumb}>
                  <Image src={p.imagen} alt="" fill sizes="100vw" />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <div ref={preview} className={s.preview} aria-hidden="true">
        {proyectos.map((p) => (
          <div key={p.cliente} className={s.previewImg}>
            <Image src={p.imagen} alt="" fill sizes="420px" />
          </div>
        ))}
      </div>

      <section id="perfil" className={s.profile}>
        <figure className={s.photo}>
          <Image src={perfil.foto} alt={`Retrato de ${perfil.nombre} ${perfil.apellido}`} fill sizes="(max-width: 900px) 100vw, 40vw" />
        </figure>
        <div className={s.profileBody}>
          <span className={s.label}>Perfil</span>
          <p className={s.bio}>{perfil.bio}</p>
          <div className={s.stats}>
            {perfil.stats.map((st) => (
              <div key={st.label}>
                <span className={s.stat}><span className={s.statNum}>{st.valor}</span>{st.sufijo}</span>
                <span className={s.statLabel}>{st.label}</span>
              </div>
            ))}
          </div>
          <ol className={s.services}>
            {servicios.map((sv, i) => (
              <li key={sv.titulo}>
                <span className={s.idx}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{sv.titulo}</h3>
                <p>{sv.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={s.stack}>
        <span className={s.label}>Stack</span>
        <p className={s.stackMain}>{stack.principal.join(" / ")}</p>
        <p className={s.stackOther}>También: {stack.otros.join(", ")}</p>
      </section>

      <footer id="contacto" className={s.contact}>
        <span className={s.label}>¿Tenés un proyecto?</span>
        <a href={perfil.linkedin} target="_blank" rel="noopener noreferrer" className={s.cta}>Hablemos.</a>
        <div className={s.links}>
          <a href={perfil.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href={perfil.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href={perfil.cv} download>Descargar CV ↓</a>
        </div>
        <div className={s.colophon}>
          <span>© {new Date().getFullYear()} {perfil.nombre} {perfil.apellido}</span>
          <Link href="/propuestas">← Volver a las propuestas</Link>
        </div>
      </footer>
    </div>
  );
}
