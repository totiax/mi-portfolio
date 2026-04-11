"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import es from "../i18n/es.json";
import en from "../i18n/en.json";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  // Nested key dot notation typed for our dicts, or fallback to any nested property
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, typeof es> = { es, en };

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang") as Language;
    if (savedLang && (savedLang === "es" || savedLang === "en")) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === "es" ? "en" : "es";
    setLanguage(nextLang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = translations[language];

    for (const k of keys) {
      if (current[k] === undefined) {
        console.warn(`Translation key missing: ${key}`);
        return key; // Fallback to key
      }
      current = current[k];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
