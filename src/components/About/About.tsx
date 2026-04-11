"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./About.module.scss";
import { useLanguage } from "@/context/LanguageContext";

const images = [
  { src: "/faces/20241030_220448.jpg", alt: "Matias Skuarok" },
  { src: "/about/code.jpg",            alt: "Code" },
  { src: "/about/mate.jpg",            alt: "Mate" },
];

export default function About() {
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useLanguage();

  const stats = [
    { number: "4+",   label: t("about.stats.years") },
    { number: "30+",  label: t("about.stats.projects") },
    { number: "100%", label: t("about.stats.clients") },
  ];

  useEffect(() => {
    const time = setInterval(() => setCurrentImage((p) => (p + 1) % images.length), 3200);
    return () => clearInterval(time);
  }, []);

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.row}>

          {/* Text */}
          <div className={styles.col}>
            <div className={styles.detailBox}>
              <span className={styles.sectionNumber}>{t("about.section_number")}</span>
              <h2 className={styles.sectionTitle}>
                Web<br />
                <span className={styles.titleAccent}>Elements</span>
              </h2>
              <div className={styles.divider} />
              <p className={styles.bio}>
                {t("about.bio")}
              </p>
              <div className={styles.statsRow}>
                {stats.map((s) => (
                  <div key={s.number} className={styles.stat}>
                    <span className={styles.statNumber}>{s.number}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`${styles.col} ${styles.orderMobileImg}`}>
            <div className={styles.imgBox}>
              <div className={styles.imageSlider}>
                {images.map((img, i) => (
                  <div key={i} className={`${styles.slideImage} ${i === currentImage ? styles.active : ""}`}>
                    <Image src={img.src} alt={img.alt} fill className={styles.dynamicImage}
                      style={{ objectFit: "cover" }} priority={i === 0} />
                  </div>
                ))}
              </div>
              <div className={styles.indicators}>
                {images.map((_, i) => (
                  <button key={i}
                    className={`${styles.indicator} ${i === currentImage ? styles.active : ""}`}
                    onClick={() => setCurrentImage(i)} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
