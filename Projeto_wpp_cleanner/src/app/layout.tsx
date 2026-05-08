import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";

// ─────────────────────────────────────────────
// Fontes via next/font (zero layout shift)
// ─────────────────────────────────────────────
const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Metadados da página para SEO e PWA
export const metadata: Metadata = {
  title: "WhatsApp Cleaner",
  description: "Limpe conversas e mídias antigas do WhatsApp com mais de 30 dias",
};

export const viewport: Viewport = {
  themeColor: "#0A0F1E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        {/* Favicon emoji */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧹</text></svg>"
        />
      </head>
      <body>
        {/* Reset e estilos globais */}
        <style>{`
          *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-tap-highlight-color: transparent;
          }

          html, body {
            height: 100%;
            background: #0A0F1E;
            overflow: hidden;
          }

          /* Oculta scrollbar mantendo funcionalidade */
          ::-webkit-scrollbar { display: none; }
          * { scrollbar-width: none; }

          /* Variáveis CSS globais */
          :root {
            --color-bg: #0A0F1E;
            --color-accent: #00E5A0;
            --color-accent-blue: #00B4D8;
            --color-danger: #FF4757;
            --color-text: #ffffff;
            --color-text-muted: rgba(255, 255, 255, 0.5);
            --font-display: var(--font-syne), sans-serif;
            --font-body: var(--font-dm-sans), sans-serif;
          }

          /* Animações globais */
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50%       { transform: scale(1.08); }
          }

          select option {
            background: #0A0F1E;
            color: #fff;
          }
        `}</style>

        {children}
      </body>
    </html>
  );
}
