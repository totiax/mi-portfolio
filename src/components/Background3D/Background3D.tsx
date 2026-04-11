// Background3D.tsx
"use client";
import { useEffect, useRef } from "react";
import styles from "./Background3D.module.scss";

interface Background3DProps {
  currentSection: number;
}

const cyanPositions = [
  { y: "5vh",  opacity: 0.5 },
  { y: "20vh", opacity: 0.85 },
  { y: "40vh", opacity: 0.7 },
  { y: "55vh", opacity: 1 },
  { y: "65vh", opacity: 0.6 },
  { y: "80vh", opacity: 0.85 },
  { y: "90vh", opacity: 0.8 },
];

const violetPositions = [
  { y: "60vh", opacity: 0.6 },
  { y: "50vh", opacity: 0.75 },
  { y: "20vh", opacity: 0.85 },
  { y: "10vh", opacity: 0.5 },
  { y: "30vh", opacity: 0.9 },
  { y: "15vh", opacity: 0.7 },
  { y: "5vh",  opacity: 0.6 },
];

export default function Background3D({ currentSection }: Background3DProps) {
  const spotlightRef       = useRef<HTMLDivElement>(null);
  const spotlightVioletRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cyan   = cyanPositions[currentSection]   || cyanPositions[0];
    const violet = violetPositions[currentSection] || violetPositions[0];

    if (spotlightRef.current) {
      spotlightRef.current.style.top     = cyan.y;
      spotlightRef.current.style.opacity = `${cyan.opacity}`;
    }
    if (spotlightVioletRef.current) {
      spotlightVioletRef.current.style.top     = violet.y;
      spotlightVioletRef.current.style.opacity = `${violet.opacity}`;
    }
  }, [currentSection]);

  return (
    <div className={styles.bg3d}>
      <div className={styles.spotlight}       ref={spotlightRef} />
      <div className={styles.spotlightViolet} ref={spotlightVioletRef} />
    </div>
  );
}
