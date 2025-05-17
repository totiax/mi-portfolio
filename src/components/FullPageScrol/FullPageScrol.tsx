"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import Portfolio from "../Portfolio/Portfolio";
import Skills from "@/components/Skills/Skills";
import Contact from "@/components/Contact/Contact";
import Navigation from "./Navigation";
import { Section } from "./types";
import styles from "./FullPageScrol.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import Background3D from "../Background3D/Background3D";
import Loader from "../Loader/Loader";
import Header from "../Header/HeaderVertical";
import Footer from "../Footer/Footer";

const sections: Section[] = [
  { id: "inicio", component: Hero },
  { id: "sobre-mi", component: About },
  { id: "servicios", component: Services },
  { id: "portfolio", component: Portfolio },
  { id: "skills", component: Skills },
  { id: "contacto", component: Contact },
];

export default function FullPageScroll() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Inicializar el array de refs
    sectionsRef.current = sectionsRef.current.slice(0, sections.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.findIndex(
              (section) => section === entry.target
            );
            setCurrentSection(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;

      setIsScrolling(true);
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = Math.min(
        Math.max(currentSection + direction, 0),
        sections.length - 1
      );

      sectionsRef.current[nextSection]?.scrollIntoView({ behavior: "smooth" });
      setCurrentSection(nextSection);

      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      observer.disconnect();
    };
  }, [currentSection, isScrolling]);

  const setRefs = (el: HTMLElement | null, index: number) => {
    sectionsRef.current[index] = el;
  };
  const handleLoadingComplete = () => {
    setShowContent(true);
  };
  const isLastSection = currentSection === sections.length - 1;
  return (
    <>
      <div className={styles.backgroundFixed}>
        <Background3D currentSection={currentSection} />
      </div>
      <Loader onLoadingComplete={handleLoadingComplete} />
      <div className={`${styles.fullpageContainer}`}>
        <Header
          currentSection={currentSection}
          onSectionClick={(idx) => {
            sectionsRef.current[idx]?.scrollIntoView({ behavior: "smooth" });
            setCurrentSection(idx);
          }}
        />

        <AnimatePresence mode="wait">
          {sections.map((section, index) => {
            const Component = section.component;
            return (
              <motion.section
                key={section.id}
                id={section.id} // <-- ¡Agregá esto!
                ref={(el) => setRefs(el, index)}
                className={`${styles.section} ${
                  currentSection === index ? styles.active : ""
                }`}
                data-anchor={section.id}
                initial={showContent ? { opacity: 0, x: -30 } : false}
                animate={
                  showContent ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                }
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.2 * index,
                }}
              >
                <Component />
              </motion.section>
            );
          })}
        </AnimatePresence>
        <Footer />
      </div>
    </>
  );
}
