import { FaHome, FaUser, FaCogs, FaBriefcase, FaStar, FaEnvelope } from "react-icons/fa";
import styles from "./HeaderVertical.module.scss";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function HeaderVertical({
  currentSection,
  onSectionClick,
}: {
  currentSection: number;
  onSectionClick: (idx: number) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const sections = [
    { id: "inicio",    label: t("header.sections.inicio"),    icon: <FaHome /> },
    { id: "sobre-mi", label: t("header.sections.sobre-mi"),  icon: <FaUser /> },
    { id: "servicios", label: t("header.sections.servicios"), icon: <FaCogs /> },
    { id: "portfolio", label: t("header.sections.portfolio"), icon: <FaBriefcase /> },
    { id: "skills",    label: t("header.sections.skills"),    icon: <FaStar /> },
    { id: "contacto",  label: t("header.sections.contacto"),  icon: <FaEnvelope /> },
  ];

  return (
    <nav className={styles.dock}>
      {sections.map((section, idx) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-label={section.label}
          className={`${styles.dockItem} ${currentSection === idx ? styles.active : ""}`}
          onClick={(e) => { e.preventDefault(); onSectionClick(idx); }}
        >
          <span className={styles.dockIcon}>{section.icon}</span>
          <span className={styles.dockLabel}>{section.label}</span>
        </a>
      ))}
    </nav>
  );
}
