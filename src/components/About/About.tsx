"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./About.module.scss";

const images = [
  {
    src: "/about/herramientas-de-diseno-grafico.jpg",
    alt: "Herramientas de diseño gráfico",
  },
  {
    src: "/about/code.jpg",
    alt: "Descripción imagen 2",
  },
  {
    src: "/about/mate.jpg",
    alt: "Descripción imagen 3",
  },
];

export default function About() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.detailBox}>
              <h6>Acerca de mí</h6>
              <div className={styles.customHeadingContainer}>
                <h2>Web Elements</h2>
                <hr />
              </div>
              <p>
                Desarrollador Front-End Freelance | Apasionado por la Innovación
                y el Aprendizaje Continuo. Desde diciembre de 2020, me he
                sumergido en el mundo del desarrollo web, aprovechando
                plataformas como Udemy, YouTube y EscuelaDevRock para adquirir
                habilidades técnicas robustas y actualizadas. Mi enfoque se
                centra en una amplia gama de tecnologías que me permiten crear
                experiencias web interactivas y funcionales.
              </p>
            </div>
          </div>
          <div className={`${styles.col} ${styles.orderMobileImg}`}>
            <div className={styles.imgBox}>
              <div className={styles.imageSlider}>
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`${styles.slideImage} ${
                      currentImage === index ? styles.active : ""
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className={styles.dynamicImage}
                      priority={index === 0}
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.indicators}>
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicator} ${
                      currentImage === index ? styles.active : ""
                    }`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
