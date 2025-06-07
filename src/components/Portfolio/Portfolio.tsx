"use client";
import Image from "next/image";
import styles from "./Portfolio.module.scss";

const projects = [
  {
    id: 1,
    title: "Pomelo",
    image: "/portfolio/pomelo.png",
    link: "https://blog.pomelo.la/",
  },
  {
    id: 2,
    title: "Mabe",
    image: "/portfolio/Mabe.png",
    link: "https://blog.mabeglobal.com/",
  },
  {
    id: 3,
    title: "Holcim",
    image: "/portfolio/holcim.png",
    link: "https://tector.holcim.com.ar/",
  },
  {
    id: 4,
    title: "Cupito",
    image: "/portfolio/cupito.png",
    link: "https://www.rinoplastiamiguelcupito.com/",
  },
  {
    id: 5,
    title: "Cessi",
    image: "/portfolio/cessi.png",
    link: "https://cessi.org.ar/",
  },
  {
    id: 6,
    title: "Moussa",
    image: "/portfolio/moussa.png",
    link: "https://moussashop.com/",
  },
];

export default function Portfolio() {
  return (
    <section className={styles.portfolioSection}>
      <div className={styles.container}>
        <div className={styles.customHeadingContainer}>
          <h2>Portfolio</h2>
          <hr />
        </div>

        <div className={styles.layoutPadding}>
          <div className={styles.row}>
            {projects.map((project) => (
              <div key={project.id} className={styles.col}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={project.link}
                  className={styles.imgBox}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={200}
                    className={styles.projectImage}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
