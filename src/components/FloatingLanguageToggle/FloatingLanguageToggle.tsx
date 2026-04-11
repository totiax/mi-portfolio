"use client";

import { useLanguage } from "@/context/LanguageContext";
import styles from "./FloatingLanguageToggle.module.scss";

export default function FloatingLanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      className={styles.languageToggle}
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      <span className={language === "en" ? styles.active : ""}>EN</span>
      <span className={styles.separator}>/</span>
      <span className={language === "es" ? styles.active : ""}>ES</span>
    </button>
  );
}
