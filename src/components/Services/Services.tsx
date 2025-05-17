import {
  faCode,
  faClipboardCheck,
  faPaintBrush,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import ServiceCard from "./ServicesCard";
import styles from "./Services.module.scss";

const services = [
  {
    id: 1,
    title: "Desarrollo web",
    icon: faCode,
    description:
      "El desarrollo web es un servicio fundamental en el mundo digital actual. Permite a las empresas y particulares crear una presencia en línea efectiva y atractiva.",
  },
  {
    id: 2,
    title: "Evaluación de proyecto",
    icon: faClipboardCheck,
    description:
      "Análisis detallado de requisitos y objetivos para garantizar soluciones efectivas y escalables.",
  },
  {
    id: 3,
    title: "Diseño a medida",
    icon: faPaintBrush,
    description:
      "Creación de interfaces únicas y personalizadas que reflejan la identidad de tu marca.",
  },
  {
    id: 4,
    title: "Subida y mantenimiento",
    icon: faUpload,
    description:
      "Implementación profesional y soporte continuo para mantener tu sitio actualizado y seguro.",
  },
];

export default function Services() {
  return (
    <section className={styles.serviceSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.customHeadingContainer}>
            <hr />
            <h2>Servicios</h2>
          </div>
          <p>
            Desarrollo especializado, optimizando recursos y mejorando la
            flexibilidad y escalabilidad.
          </p>
        </div>
        <div className={styles.serviceContainer}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
