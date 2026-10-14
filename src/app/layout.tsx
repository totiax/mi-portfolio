import type { Metadata, Viewport } from "next";
import { Anton, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import "./globals.css";

const display = Anton({ subsets: ["latin"], weight: "400", variable: "--f-display" });
const sans = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-sans" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--f-serif" });

const titulo = "Matias Skuarok — Desarrollador Full-Stack";
const descripcion =
  "Sitios, e-commerce, apps y automatizaciones con IA. Desarrollador full-stack freelance en Villa Carlos Paz, Córdoba.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.URL ?? "http://localhost:3000"),
  title: titulo,
  description: descripcion,
  openGraph: {
    title: titulo,
    description: descripcion,
    type: "website",
    locale: "es_AR",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Matias Skuarok" }],
  },
  twitter: { card: "summary_large_image", title: titulo, description: descripcion, images: ["/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#16161a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
