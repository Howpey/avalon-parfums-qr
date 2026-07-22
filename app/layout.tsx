import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Avalon Parfums — Perfumaria de Nicho",
  description:
    "Exclusividade que desperta sentidos. Perfumes de nicho, importados, árabes e inspirações a partir de R$ 69,90. Frete grátis em até 24h para a Baixada Santista.",
  openGraph: {
    title: "Avalon Parfums — Perfumaria de Nicho",
    description:
      "Exclusividade que desperta sentidos. Perfumes de nicho, importados, árabes e inspirações exclusivas.",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Avalon Parfums — Perfumaria de Nicho",
    description:
      "Exclusividade que desperta sentidos. Perfumes de nicho, importados, árabes e inspirações exclusivas.",
  },
};

export const viewport = {
  themeColor: "#14110b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
