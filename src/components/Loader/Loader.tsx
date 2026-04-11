// Loader.tsx
import { useEffect, useState } from "react";
import styles from "./Loader.module.scss";

interface LoaderProps {
  onLoadingComplete?: () => void;
}

const Loader = ({ onLoadingComplete }: LoaderProps = {}) => {
  const [isHiding, setIsHiding]   = useState(false);
  const [progress, setProgress]   = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
    }, 38);

    const timer = setTimeout(() => {
      setIsHiding(true);
      if (onLoadingComplete) setTimeout(onLoadingComplete, 600);
    }, 2100);

    return () => { clearTimeout(timer); clearInterval(interval); };
  }, [onLoadingComplete]);

  return (
    <div className={`${styles.loaderWrapper} ${isHiding ? styles.hide : ""}`}>
      <div className={styles.loaderContent}>
        <div className={styles.monogram}>
          <span className={styles.letterCyan}>M</span>
          <span className={styles.letterWhite}>S</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <p className={styles.loadingLabel}>Cargando experiencia…</p>
      </div>
      <div className={styles.sweepLine} />
    </div>
  );
};

export default Loader;
