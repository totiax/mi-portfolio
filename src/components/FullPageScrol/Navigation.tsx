// Navigation.tsx (igual que antes)
import { Section } from "./types";
import styles from "./Navigation.module.scss";
import { useState, useEffect } from "react";

interface NavigationProps {
  sections: Section[];
  currentSection: number;
  onDotClick: (index: number) => void;
}

const sectionNames: Record<string, string> = {
  inicio: "Inicio",
  "sobre-mi": "Sobre mí",
  servicios: "Servicios",
  portfolio: "Portfolio",
  skills: "Skills",
  contacto: "Contacto",
};

export default function Navigation({
  sections,
  currentSection,
  onDotClick,
}: NavigationProps) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const handleDotClick = (index: number) => {
    if (isDesktop) {
      // Comportamiento desktop (scroll seccionado)
      onDotClick(index);
    } else {
      // Comportamiento mobile (scroll normal)
      const section = document.getElementById(sections[index].id);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.dotsContainer}>
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`${styles.dot} ${
              currentSection === index ? styles.active : ""
            }`}
            onClick={() => handleDotClick(index)}
            aria-label={sectionNames[section.id] || section.id}
          >
            <div className={styles.dotContent}>
              <span className={styles.tooltip}>
                {sectionNames[section.id] || section.id}
              </span>
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
}
