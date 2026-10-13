import type { Metadata } from "next";
import "./propuestas.css";

export const metadata: Metadata = {
  title: "Propuestas de diseño — Matias Skuarok",
  robots: { index: false },
};

export default function PropuestasLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
