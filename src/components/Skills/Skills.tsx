"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faWordpress,
  faJs,
  faPython,
  faGit,
  faJava,
  faNodeJs,
  faReact,
  faSass,
  faMagento,
  faBootstrap,
  faHtml5,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./Skills.module.scss";
import Image, { StaticImageData } from "next/image";
import nextIcon from "../../../public/icons/nextjs-svgrepo-com.png";

interface ToolIcon {
  type: "fontawesome" | "image";
  icon: IconDefinition | StaticImageData;
}

interface Tool {
  name: string;
  iconData: ToolIcon;
  description: string;
}

interface AdditionalTool {
  name: string;
  iconData: ToolIcon;
}

const mainTools: Tool[] = [
  {
    name: "Next.js",
    iconData: {
      type: "image",
      icon: nextIcon,
    },
    description:
      "Next.js combina la facilidad de uso de React con potentes características que maximizan el rendimiento y la escalabilidad de las aplicaciones web.",
  },
  {
    name: "WordPress",
    iconData: {
      type: "fontawesome",
      icon: faWordpress,
    },
    description:
      "WordPress es una herramienta poderosa para construir prácticamente cualquier tipo de sitio web, desde blogs hasta tiendas en línea.",
  },
  {
    name: "JavaScript",
    iconData: {
      type: "fontawesome",
      icon: faJs,
    },
    description:
      "JavaScript es una herramienta poderosa y versátil que permite construir una amplia variedad de aplicaciones y características.",
  },
];

const additionalTools: AdditionalTool[] = [
  { name: "HTML/CSS", iconData: { type: "fontawesome", icon: faHtml5 } },
  { name: "React.js", iconData: { type: "fontawesome", icon: faReact } },
  { name: "Bootstrap", iconData: { type: "fontawesome", icon: faBootstrap } },
  { name: "Python", iconData: { type: "fontawesome", icon: faPython } },
  { name: "Git", iconData: { type: "fontawesome", icon: faGit } },
  { name: "Java", iconData: { type: "fontawesome", icon: faJava } },
  { name: "Node.js", iconData: { type: "fontawesome", icon: faNodeJs } },
  { name: "Sass", iconData: { type: "fontawesome", icon: faSass } },
  { name: "Magento", iconData: { type: "fontawesome", icon: faMagento } },
];

export default function Tools() {
  return (
    <section className={styles.toolsSection} id="herramientas">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.customHeadingContainer}>
            <hr />
            <h2>Herramientas más utilizadas</h2>
          </div>
        </div>
        <div className={styles.row}>
          {mainTools.map((tool) => (
            <div key={tool.name} className={styles.col}>
              <div className={styles.box}>
                <div className={styles.imgBox}>
                  {tool.iconData.type === "image" ? (
                    <Image
                      src={tool.iconData.icon as StaticImageData}
                      alt={tool.name}
                      className={styles.toolIcon}
                      width={100}
                      height={100}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={tool.iconData.icon as IconDefinition}
                      size="3x"
                      className={styles.toolIcon}
                    />
                  )}
                </div>
                <div className={styles.detailBox}>
                  <h4>{tool.name}</h4>
                  <p>{tool.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.additionalTools}>
          <h3>Otras herramientas</h3>
          <div className={styles.iconGrid}>
            {additionalTools.map((tool) => (
              <div key={tool.name} className={styles.iconBox}>
                <FontAwesomeIcon
                  icon={tool.iconData.icon as IconDefinition}
                  size="2x"
                  className={styles.iconImage}
                />
                <p>{tool.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
