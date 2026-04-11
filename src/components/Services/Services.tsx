"use client";
import { useState } from "react";
import {
  faCode, faClipboardCheck, faPaintBrush, faUpload,
} from "@fortawesome/free-solid-svg-icons";
import ServiceCard from "./ServicesCard";
import styles from "./Services.module.scss";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const { t } = useLanguage();

  const services = [
    {
      id: 1,
      title: t("services.list.s1.title"),
      icon: faCode,
      description: t("services.list.s1.desc"),
    },
    {
      id: 2,
      title: t("services.list.s2.title"),
      icon: faClipboardCheck,
      description: t("services.list.s2.desc"),
    },
    {
      id: 3,
      title: t("services.list.s3.title"),
      icon: faPaintBrush,
      description: t("services.list.s3.desc"),
    },
    {
      id: 4,
      title: t("services.list.s4.title"),
      icon: faUpload,
      description: t("services.list.s4.desc"),
    },
  ];

  const handleToggle = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.serviceSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionNumber}>{t("services.section_number")}</span>
          <h2 className={styles.sectionTitle}>{t("services.title")}</h2>
          <p className={styles.sectionSubtitle}>
            {t("services.subtitle")}
          </p>
        </div>
        <div className={styles.serviceContainer}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              isOpen={activeId === service.id}
              onToggle={() => handleToggle(service.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
