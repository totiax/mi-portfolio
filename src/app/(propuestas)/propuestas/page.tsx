import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";
import s from "./propuestas.module.scss";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono" });

const opciones = [
  {
    href: "/propuestas/indice",
    letra: "A",
    nombre: "Índice",
    tono: "Editorial · claro · preciso",
    paleta: ["#f2f0eb", "#141412", "#ff4d00"],
    tipos: "Instrument Serif / Schibsted Grotesk / JetBrains Mono",
    secuencias: [
      "Intro: contador 000→100 y telón que sube",
      "Nombre que emerge línea por línea desde una máscara",
      "Índice de clientes: la captura sigue al cursor y se inclina con la velocidad",
      "Bio que se ilumina palabra por palabra con el scroll",
      "Foto que se abre desde un recorte al hacer scroll",
    ],
  },
  {
    href: "/propuestas/senal",
    letra: "B",
    nombre: "Señal",
    tono: "Ingeniería · oscuro · técnico",
    paleta: ["#0e0e0c", "#e8e6e1", "#ffb000"],
    tipos: "Geist / Geist Mono",
    secuencias: [
      "Boot: líneas de terminal que se descifran (ScrambleText)",
      "Apellido formado por miles de partículas (Three.js) que reaccionan al cursor",
      "Proyectos en scroll horizontal fijado, con barra de progreso",
      "Títulos y links que se descifran al entrar o al pasar el mouse",
      "Contadores y servicios con línea de escaneo",
    ],
  },
  {
    href: "/propuestas/kinetico",
    letra: "C",
    nombre: "Kinético",
    tono: "Bold · color · enérgico",
    paleta: ["#2433ff", "#f4efe6", "#ff6a3d"],
    tipos: "Anton / Bricolage Grotesque",
    secuencias: [
      "Letras del nombre que caen y rebotan con rotación",
      "Marquesina y sello giratorio que aceleran con la velocidad del scroll",
      "Proyectos como tarjetas apiladas que se achican al llegar la siguiente",
      "Capturas con inclinación 3D según el cursor",
      "Foto revelada por un círculo que crece y botón magnético",
      "Selector de 6 paletas para comparar colores en vivo",
    ],
  },
];

export default function Propuestas() {
  return (
    <main className={`${mono.variable} ${s.page}`}>
      <header className={s.head}>
        <span>Matias Skuarok — Rediseño del portfolio</span>
        <h1>Tres direcciones</h1>
        <p>Mismo contenido, tres identidades. Abrí cada una, scrolleá hasta el final y pasá el mouse por los proyectos.</p>
      </header>
      <ol className={s.grid}>
        {opciones.map((o) => (
          <li key={o.letra}>
            <Link href={o.href} className={s.card}>
              <div className={s.swatch}>
                {o.paleta.map((c) => (
                  <span key={c} style={{ background: c }} />
                ))}
              </div>
              <div className={s.body}>
                <span className={s.letra}>{o.letra}</span>
                <h2>{o.nombre}</h2>
                <p className={s.tono}>{o.tono}</p>
                <p className={s.tipos}>{o.tipos}</p>
                <ul>
                  {o.secuencias.map((sq) => (
                    <li key={sq}>{sq}</li>
                  ))}
                </ul>
                <span className={s.ver}>Ver propuesta →</span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
      <footer className={s.foot}>
        <Link href="/">← Sitio actual</Link>
      </footer>
    </main>
  );
}
