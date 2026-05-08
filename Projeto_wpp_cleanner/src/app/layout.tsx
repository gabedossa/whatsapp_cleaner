import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WhatsApp Cleaner",
  description: "Limpe conversas e mídias antigas do WhatsApp com uma interface rápida e responsiva.",
};

export const viewport: Viewport = {
  themeColor: "#0A0F1E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
