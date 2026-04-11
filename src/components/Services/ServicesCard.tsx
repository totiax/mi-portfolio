import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./ServicesCard.module.scss";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: IconDefinition;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ServiceCard({
  title,
  description,
  icon,
  isOpen,
  onToggle,
}: ServiceCardProps) {
  return (
    <div
      className={`${styles.card} ${isOpen ? styles.active : ""}`}
      onClick={onToggle}
    >
      <div className={styles.cardHeader}>
        <div className={styles.iconBadge}>
          <FontAwesomeIcon icon={icon} className={styles.icon} />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`${styles.chevron} ${isOpen ? styles.rotate : ""}`}
        />
      </div>
      <div className={`${styles.content} ${isOpen ? styles.visible : ""}`}>
        <p>{description}</p>
      </div>
    </div>
  );
}
