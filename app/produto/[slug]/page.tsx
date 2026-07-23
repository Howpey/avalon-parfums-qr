import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import ProductCard from "../../components/ProductCard";
import BuyButton from "../../components/BuyButton";
import { STORE_URL, INSTAGRAM_URL } from "../../components/shared";
import {
  getAllProducts,
  getProductBySlug,
  relatedProducts,
  slugify,
  label,
  formatPrice,
  formatVolume,
  fallbackImage,
  type PublicProduct,
} from "../../lib/products";

const SITE = "https://avalon-parfums-qr.vercel.app";

export async function generateStaticParams() {
  const all = await getAllProducts();
  return all.map((p) => ({ slug: slugify(p) }));
}

function metaDescription(p: PublicProduct): string {
  if (p.description) return p.description.slice(0, 160);
  const notes = [...(p.top_notes ?? []), ...(p.heart_notes ?? []), ...(p.base_notes ?? [])];
  const bits = [
    p.brand,
    label.concentration(p.concentration),
    formatVolume(p.volume_ml),
    notes.length ? `Notas: ${notes.slice(0, 6).join(", ")}` : "",
    "Compre pelo Instagram com entrega em até 24h na Baixada Santista.",
  ].filter(Boolean);
  return bits.join(" · ").slice(0, 160);
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = await getProductBySlug(params.slug);
  if (!p) return { title: "Produto não encontrado" };

  const title = p.brand ? `${p.name} — ${p.brand}` : p.name;
  const url = `${SITE}/produto/${slugify(p)}`;
  const image = p.main_image_url ?? `${SITE}${fallbackImage(p)}`;

  return {
    title,
    description: metaDescription(p),
    alternates: { canonical: url },
    openGraph: {
      title,
      description: metaDescription(p),
      url,
      type: "website",
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", title, images: [image] },
  };
}

function Pyramid({ p }: { p: PublicProduct }) {
  const rows: [string, string[] | null][] = [
    ["Notas de saída", p.top_notes],
    ["Notas de coração", p.heart_notes],
    ["Notas de fundo", p.base_notes],
  ];
  const has = rows.some(([, n]) => n && n.length > 0);
  if (!has) return null;
  return (
    <div className="mt-8 space-y-4">
      {rows.map(([title, notes]) =>
        notes && notes.length ? (
          <div key={title}>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
              {title}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {notes.map((n) => (
                <span
                  key={n}
                  className="rounded-full border border-white/10 px-3 py-1 text-[13px] text-ash"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        ) : null,
      )}
    </div>
  );
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const all = await getAllProducts();
  const idPart = params.slug.split("-").pop() ?? "";
  const p = all.find((x) => x.id.startsWith(idPart));
  if (!p) notFound();

  const image = p.main_image_url ?? `${SITE}${fallbackImage(p)}`;
  const related = relatedProducts(p, all);
  const meta = [
    label.type(p.type),
    label.concentration(p.concentration),
    formatVolume(p.volume_ml),
    label.audience(p.audience),
  ].filter(Boolean);
  const traits = [label.longevity(p.longevity), label.sillage(p.sillage)].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: p.name,
    image: [image],
    description: metaDescription(p),
    brand: p.brand ? { "@type": "Brand", name: p.brand } : undefined,
    category: p.category ?? undefined,
    ...(p.price && p.price > 0
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "BRL",
            price: p.price,
            availability: "https://schema.org/InStock",
            url: `${SITE}/produto/${slugify(p)}`,
            seller: { "@type": "Organization", name: "Avalon Parfums" },
          },
        }
      : {}),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE },
      { "@type": "ListItem", position: 2, name: "Catálogo", item: `${SITE}/catalogo` },
      { "@type": "ListItem", position: 3, name: p.name },
    ],
  };

  return (
    <main className="relative min-h-screen bg-obsidian">
      <Nav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="mx-auto max-w-[1100px] px-6 pt-32">
        {/* Breadcrumb */}
        <nav className="font-mono text-[11px] uppercase tracking-[0.14em] text-fog">
          <Link href="/" className="transition-colors hover:text-cloud">
            Início
          </Link>
          <span className="mx-2">/</span>
          <Link href="/catalogo" className="transition-colors hover:text-cloud">
            Catálogo
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ash">{p.name}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-[30px] bg-graphite">
            <Image
              src={image}
              alt={p.name}
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
              priority
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {p.brand && (
              <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-gold">
                {p.brand}
              </span>
            )}
            <h1 className="display mt-2 text-[clamp(30px,5vw,44px)] leading-tight text-cloud">
              {p.name}
            </h1>

            {p.is_inspired && p.similar_to && (
              <p className="mt-2 text-[14px] text-ash">
                Inspirado em <span className="text-cloud">{p.similar_to}</span>
              </p>
            )}

            {p.price != null && p.price > 0 && (
              <div className="display mt-5 text-3xl text-gold-bright">{formatPrice(p.price)}</div>
            )}

            {meta.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {meta.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-ash"
                  >
                    {m}
                  </span>
                ))}
              </div>
            )}

            {p.description && (
              <p className="mt-6 text-[15px] leading-relaxed text-ash">{p.description}</p>
            )}

            <Pyramid p={p} />

            {traits.length > 0 && (
              <p className="mt-6 font-mono text-[11px] uppercase tracking-wide text-fog">
                {traits.join(" · ")}
              </p>
            )}

            <div className="mt-8">
              <BuyButton product={p} size="lg" />
              <p className="mt-2 text-[12px] text-fog">
                Copiamos sua mensagem — é só colar na conversa com a{" "}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener"
                  className="text-gold hover:text-gold-bright"
                >
                  @avalon_parfum
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="display text-[clamp(22px,4vw,30px)] text-cloud">Você também pode gostar</h2>
            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {related.map((r) => (
                <ProductCard key={r.id} product={r} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 pb-16 text-center">
          <Link
            href="/catalogo"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog transition-colors hover:text-cloud"
          >
            ← Voltar ao catálogo
          </Link>
        </div>
      </div>

      <footer className="border-t border-white/[0.06] px-6 py-10 text-center text-[13px] text-fog">
        <div className="display text-lg text-cloud">Avalon Parfums</div>
        <div className="mt-1">Perfumaria de nicho · Baixada Santista</div>
        <div className="mt-1.5">
          <a href={STORE_URL} target="_blank" rel="noopener" className="text-gold hover:text-gold-bright">
            avalonparfums.com.br
          </a>
          <span className="mx-2">·</span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="text-gold hover:text-gold-bright">
            @avalon_parfum
          </a>
        </div>
      </footer>
    </main>
  );
}
