// Loader.tsx
import { useEffect, useState } from "react";
import styles from "./Loader.module.scss";

interface LoaderProps {
  onLoadingComplete?: () => void; // Callback opcional para notificar cuando termina
}

const Loader = ({ onLoadingComplete }: LoaderProps = {}) => {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHiding(true);
      // Notificamos que el loader está terminando
      if (onLoadingComplete) {
        // Esperamos a que termine la animación de fade out
        setTimeout(onLoadingComplete, 500);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className={`${styles.loaderWrapper} ${isHiding ? styles.hide : ""}`}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
