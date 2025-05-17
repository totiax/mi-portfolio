import {
  FaHome,
  FaUser,
  FaCogs,
  FaBriefcase,
  FaStar,
  FaEnvelope,
} from "react-icons/fa";
import styles from "./HeaderVertical.module.scss";

const sections = [
  { id: "inicio", label: "Inicio", icon: <FaHome /> },
  { id: "sobre-mi", label: "Sobre mí", icon: <FaUser /> },
  { id: "servicios", label: "Servicios", icon: <FaCogs /> },
  { id: "portfolio", label: "Portfolio", icon: <FaBriefcase /> },
  { id: "skills", label: "Skills", icon: <FaStar /> },
  { id: "contacto", label: "Contacto", icon: <FaEnvelope /> },
];

export default function HeaderVertical({
  currentSection,
  onSectionClick,
}: {
  currentSection: number;
  onSectionClick: (idx: number) => void;
}) {
  return (
    <nav className={styles.headerVertical}>
      {sections.map((section, idx) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`${styles.navIcon} ${
            currentSection === idx ? styles.active : ""
          }`}
          aria-label={section.label}
          onClick={(e) => {
            e.preventDefault();
            onSectionClick(idx);
          }}
        >
          {section.icon}
          <span className={styles.tooltip}>{section.label}</span>
        </a>
      ))}
    </nav>
  );
}
