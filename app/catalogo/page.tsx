import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import CatalogBrowser from "../components/CatalogBrowser";
import { getAllProducts } from "../lib/products";
import { STORE_URL, INSTAGRAM_URL } from "../components/shared";

export const metadata: Metadata = {
  title: "Catálogo — Avalon Parfums",
  description:
    "Catálogo completo da Avalon Parfums: perfumes de nicho, importados, árabes e inspirações. Compre pelo WhatsApp com entrega em até 24h na Baixada Santista.",
};

export default async function CatalogoPage() {
  const products = await getAllProducts();

  return (
    <main className="relative min-h-screen bg-obsidian">
      <Nav />

      <section className="mx-auto max-w-[1200px] px-6 pb-24 pt-36">
        <div className="text-center">
          <span className="eyebrow text-[11px]">Catálogo completo</span>
          <h1 className="display mx-auto mt-4 max-w-3xl text-[clamp(36px,7vw,64px)]">
            Todas as nossas <em className="italic text-gold-gradient">fragrâncias</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-ash">
            Busque, filtre e fale com a gente no WhatsApp para comprar. Entrega grátis em até 24h
            para toda a Baixada Santista.
          </p>
        </div>

        {products.length === 0 ? (
          <p className="mt-16 text-center text-ash">
            Nosso catálogo está sendo atualizado. Fale com a gente no{" "}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              className="text-gold transition-colors hover:text-gold-bright"
            >
              Instagram
            </a>
            .
          </p>
        ) : (
          <CatalogBrowser products={products} />
        )}

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog transition-colors hover:text-cloud"
          >
            ← Voltar para o início
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-6 py-10 text-center text-[13px] text-fog">
        <div className="display text-lg text-cloud">Avalon Parfums</div>
        <div className="mt-1">Perfumaria de nicho · Baixada Santista</div>
        <div className="mt-1.5">
          <a
            href={STORE_URL}
            target="_blank"
            rel="noopener"
            className="text-gold transition-colors hover:text-gold-bright"
          >
            avalonparfums.com.br
          </a>
          <span className="mx-2">·</span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener"
            className="text-gold transition-colors hover:text-gold-bright"
          >
            @avalon_parfum
          </a>
        </div>
      </footer>
    </main>
  );
}
