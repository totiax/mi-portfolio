// Background3D.tsx
"use client";
import { useEffect, useRef } from "react";
import styles from "./Background3D.module.scss";

interface Background3DProps {
  currentSection: number;
}

export default function Background3D({ currentSection }: Background3DProps) {
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Posiciones verticales para cada sección
  const positions = [
    { y: "10vh", opacity: 0.5 },
    { y: "25vh", opacity: 0.85 },
    { y: "40vh", opacity: 0.7 },
    { y: "55vh", opacity: 1 },
    { y: "70vh", opacity: 0.6 },
    { y: "85vh", opacity: 0.85 },
    { y: "95vh", opacity: 0.8 },
  ];

  useEffect(() => {
    const pos = positions[currentSection] || positions[0];
    if (spotlightRef.current) {
      spotlightRef.current.style.top = pos.y;
      spotlightRef.current.style.opacity = `${pos.opacity}`;
    }
  }, [currentSection]);

  return (
    <div className={styles.bg3d}>
      <div className={styles.spotlight} ref={spotlightRef} />
    </div>
  );
}
