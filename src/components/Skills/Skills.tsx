"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faWordpress,
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
import { SiNestjs } from "react-icons/si";
import styles from "./Skills.module.scss";
import Image, { StaticImageData } from "next/image";
import nextIcon from "../../../public/icons/nextjs-svgrepo-com.png";
import { useLanguage } from "@/context/LanguageContext";

interface ToolIcon {
  type: "fontawesome" | "image" | "react-icon";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
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

const additionalTools: AdditionalTool[] = [
  { name: "WordPress",  iconData: { type: "fontawesome", icon: faWordpress } },
  { name: "HTML/CSS",   iconData: { type: "fontawesome", icon: faHtml5 } },
  { name: "React.js",   iconData: { type: "fontawesome", icon: faReact } },
  { name: "Bootstrap",  iconData: { type: "fontawesome", icon: faBootstrap } },
  { name: "Python",     iconData: { type: "fontawesome", icon: faPython } },
  { name: "Git",        iconData: { type: "fontawesome", icon: faGit } },
  { name: "Java",       iconData: { type: "fontawesome", icon: faJava } },
  { name: "Node.js",    iconData: { type: "fontawesome", icon: faNodeJs } },
  { name: "Sass",       iconData: { type: "fontawesome", icon: faSass } },
  { name: "Magento",    iconData: { type: "fontawesome", icon: faMagento } },
];

export default function Tools() {
  const { t } = useLanguage();

  const mainTools: Tool[] = [
    {
      name: "Next.js",
      iconData: { type: "image", icon: nextIcon },
      description: t("skills.main.nextjs"),
    },
    {
      name: "Nest.js",
      iconData: { type: "react-icon", icon: SiNestjs },
      description: t("skills.main.nestjs"),
    },
  ];

  return (
    <section className={styles.toolsSection} id="herramientas">
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.chip}>{t("skills.chip")}</span>
          <h2 className={styles.sectionTitle}>{t("skills.title")}</h2>
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
                      width={28}
                      height={28}
                    />
                  ) : tool.iconData.type === "react-icon" ? (
                    <tool.iconData.icon className={styles.toolIcon} />
                  ) : (
                    <FontAwesomeIcon
                      icon={tool.iconData.icon as IconDefinition}
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
          <h3>{t("skills.others")}</h3>
          <div className={styles.iconGrid}>
            {additionalTools.map((tool) => (
              <div key={tool.name} className={styles.iconBox}>
                {tool.iconData.type === "react-icon" ? (
                  <tool.iconData.icon className={styles.iconImage} />
                ) : (
                  <FontAwesomeIcon
                    icon={tool.iconData.icon as IconDefinition}
                    className={styles.iconImage}
                  />
                )}
                <p>{tool.name}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
