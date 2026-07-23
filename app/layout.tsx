import type { Metadata } from "next";
import { Inter, Playfair_Display, Roboto_Mono } from "next/font/google";
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

const mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const DESCRIPTION =
  "Exclusividade que desperta sentidos. Perfumes de nicho, importados, árabes e inspirações a partir de R$ 69,90. Frete grátis em até 24h para a Baixada Santista.";

export const metadata: Metadata = {
  metadataBase: new URL("https://avalon-parfums-qr.vercel.app"),
  title: {
    default: "Avalon Parfums — Perfumaria de Nicho",
    template: "%s | Avalon Parfums",
  },
  description: DESCRIPTION,
  keywords: [
    "perfumes de nicho",
    "perfumes importados",
    "perfumes árabes",
    "perfumaria",
    "Avalon Parfums",
    "Baixada Santista",
    "Santos",
    "decants",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Avalon Parfums — Perfumaria de Nicho",
    description:
      "Exclusividade que desperta sentidos. Perfumes de nicho, importados, árabes e inspirações exclusivas.",
    url: "/",
    siteName: "Avalon Parfums",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avalon Parfums — Perfumaria de Nicho",
    description:
      "Exclusividade que desperta sentidos. Perfumes de nicho, importados, árabes e inspirações exclusivas.",
  },
};

export const viewport = {
  themeColor: "#0f1011",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
