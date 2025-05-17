"use client";
import styles from "./Hero.module.scss";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Desarrollador Full Stack</h1>
          <div className={styles.subtitleWrapper}>
            <div className={styles.description}>
              <p>
                Desarrollador apasionado por crear{" "}
                <span className={styles.highlight}>experiencias digitales</span>{" "}
                y soluciones{" "}
                <span className={`${styles.highlight} ${styles.highlight2}`}>
                  innovadoras
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/faces/20241030_220448.jpg"
            alt="Matias Skuarok"
            className={styles.heroImage}
            width={700}
            height={700}
            priority // Añadido priority ya que es la primera imagen visible
          />
        </div>
      </div>
      <div className={styles.scrollDownIndicator}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 320 512"
          fill="#64ffda"
          className={styles.arrowSvg}
          aria-hidden="true"
        >
          <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 274.7 54.6 201.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128zM137.4 246.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 146.7 54.6 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z" />
        </svg>
      </div>
    </section>
  );
}
