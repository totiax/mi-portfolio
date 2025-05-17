import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./ServicesCard.module.scss";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: IconDefinition;
}

export default function ServiceCard({
  title,
  description,
  icon,
}: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <div
      className={`${styles.card} ${expanded ? styles.active : ""}`}
      onClick={handleToggle}
    >
      <div className={styles.cardHeader}>
        <FontAwesomeIcon icon={icon} className={styles.icon} />
        <h3 className={styles.title}>{title}</h3>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`${styles.chevron} ${expanded ? styles.rotate : ""}`}
        />
      </div>
      <div className={`${styles.content} ${expanded ? styles.visible : ""}`}>
        <p>{description}</p>
      </div>
    </div>
  );
}
