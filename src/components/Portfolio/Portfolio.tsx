"use client";
import Image from "next/image";
import styles from "./Portfolio.module.scss";
import { useLanguage } from "@/context/LanguageContext";

const projects = [
  { id: 1, title: "Pomelo",  image: "/portfolio/pomelo.png",  link: "https://blog.pomelo.la/" },
  { id: 2, title: "Mabe",    image: "/portfolio/Mabe.png",    link: "https://blog.mabeglobal.com/" },
  { id: 3, title: "Holcim",  image: "/portfolio/holcim.png",  link: "https://tector.holcim.com.ar/" },
  { id: 4, title: "Cupito",  image: "/portfolio/cupito.png",  link: "https://www.rinoplastiamiguelcupito.com/" },
  { id: 5, title: "Cessi",   image: "/portfolio/cessi.png",   link: "https://cessi.org.ar/" },
  { id: 6, title: "Moussa",  image: "/portfolio/moussa.png",  link: "https://moussashop.com/" },
];

export default function Portfolio() {
  const { t } = useLanguage();

  return (
    <section className={styles.portfolioSection}>
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.sectionNumber}>{t("portfolio.section_number")}</span>
          <h2 className={styles.sectionTitle}>{t("portfolio.title")}</h2>
        </div>

        <div className={styles.bentoGrid}>
          {projects.map((p, i) => (
            <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer"
              className={`${styles.bentoItem} ${styles[`item${i + 1}`]}`}>
              <Image src={p.image} alt={p.title} fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.projectImage}
                style={{ objectFit: "cover" }} />
              <div className={styles.overlay}>
                <span className={styles.overlayTitle}>{p.title}</span>
                <span className={styles.overlayLink}>
                  {t("portfolio.view_site")}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
