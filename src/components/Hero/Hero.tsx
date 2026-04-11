"use client";
import styles from "./Hero.module.scss";
import { ReactTyped } from "react-typed";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className={styles.heroSection}>


      {/* ── Corner TL ── */}
      <div className={styles.cornerTL}>
        <span className={styles.mono}>MS.DEV</span>
      </div>

      {/* ── Corner TR ── */}
      <div className={styles.cornerTR}>
        <span className={styles.mono}>VOL. I / 2026</span>
        <span className={`${styles.mono} ${styles.available}`}>
          <span className={styles.dot} />
          {t("hero.available")}
        </span>
      </div>

      {/* ── Giant name ── */}
      <div className={styles.nameBlock}>
        <h1 className={styles.nameWrap}>
          <span className={styles.nameFirst}>MATIAS</span>
          <span className={styles.nameLast}>SKUAROK</span>
        </h1>
      </div>

      {/* ── Bottom bar ── */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomLeft}>
          <span className={styles.mono}>P. 001</span>
          <span className={styles.sep} />
          <span className={styles.mono}>/ </span>
          <ReactTyped
            strings={t("hero.roles") as unknown as string[]}
            typeSpeed={55}
            backSpeed={30}
            loop
            className={styles.typingMono}

          />
        </div>

        <div className={styles.bottomRight}>
          <a
            href="#portfolio"
            className={styles.ctaBtn}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("hero.see_projects")}
          </a>
          <a href={t("hero.cv_file")} download className={styles.cvLink}>
            {t("hero.cv")}
          </a>
          <span className={`${styles.mono} ${styles.scrollHint}`}>{t("hero.scroll")}</span>
        </div>
      </div>

    </section>
  );
}
