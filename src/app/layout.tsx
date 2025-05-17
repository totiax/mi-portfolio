// src/app/layout.tsx
"use client";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body suppressHydrationWarning>
        <div className="fixed-background" />
        <main className="content-container">{children}</main>
      </body>
    </html>
  );
}
