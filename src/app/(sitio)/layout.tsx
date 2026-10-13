"use client";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import FloatingLanguageToggle from "@/components/FloatingLanguageToggle/FloatingLanguageToggle";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body suppressHydrationWarning>
        <LanguageProvider>
          <div className="viewport-frame" />
          <FloatingLanguageToggle />
          <main className="content-container">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
