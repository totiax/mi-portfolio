import React, { useState } from "react";
import { init, send } from "@emailjs/browser";
import styles from "./Contact.module.scss";
import { Metadata } from "next";
import Script from "next/script";
import { Toast } from "../Toast/Toast";
import { useLanguage } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Contact Page",
  description: "Contact form page",
};

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

init("u6ltrA3togxUryjt5");

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serviceId = "service_v1en5zq";
    const templateId = "template_lpsh2m4";

    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(
          "6LeWmzwrAAAAALJEb7WDTvKLtmznN5ARpGbIUwqY",
          { action: "submit" }
        );

        const result = await send(
          serviceId,
          templateId,
          {
            from_name: formData.nombre,
            reply_to: formData.email,
            telefono: formData.telefono,
            mensaje: formData.mensaje,
            "g-recaptcha-response": token,
          },
          "u6ltrA3togxUryjt5"
        );

        if (result.status === 200) {
          setToast({
            show: true,
            message: t("contact.toast.success"),
            type: "success",
          });
          setFormData({
            nombre: "",
            email: "",
            telefono: "",
            mensaje: "",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setToast({
          show: true,
          message: t("contact.toast.error"),
          type: "error",
        });
      }
    });
  };

  return (
    <section className={styles.contact_section}>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=6LeWmzwrAAAAALJEb7WDTvKLtmznN5ARpGbIUwqY`}
        strategy="afterInteractive"
      />
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col_md_6}>
            <h2 className={styles.sectionTitle}>
              {t("contact.title1")} <br />
              <span>{t("contact.title2")}</span>
            </h2>
            <div className={styles.downloadContainer}>
              <a href={t("contact.cv_file")} download>
                <span>{t("contact.download")}</span>
                <div className={styles.downloadArrow}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="12"
                    viewBox="0 0 20 12"
                    fill="none"
                  >
                    <path
                      d="M18.5 1.47363L10 9.52627L1.5 1.47363"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </a>
            </div>
            <div className={styles.mapBox}>
              <div className={styles.mapResponsive}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54481.15733912888!2d-64.54093616882435!3d-31.41213310859031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d6640d6777c71%3A0x75c24ab6cb121bed!2sVilla%20Carlos%20Paz%2C%20C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1744809985726!5m2!1ses!2sar"
                  frameBorder={0}
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex={0}
                ></iframe>
              </div>
            </div>
          </div>
          <div className={styles.col_md_6}>
            <div className={styles.contactFormContainer}>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="nombre"
                    placeholder={t("contact.form.name")}
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("contact.form.email")}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="telefono"
                    placeholder={t("contact.form.phone")}
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    name="mensaje"
                    placeholder={t("contact.form.message")}
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    className={styles.messageInput}
                  />
                </div>
                <div className={styles.mt5}>
                  <button type="submit">{t("contact.form.send")}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
