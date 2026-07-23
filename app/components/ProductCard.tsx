"use client";

import {
  type PublicProduct,
  label,
  formatPrice,
  formatVolume,
  whatsappLink,
} from "../lib/products";
import { INSTAGRAM_URL } from "./shared";
import { WhatsAppIcon, InstagramIcon } from "./icons";

const chip =
  "rounded-full border border-white/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-wide text-ash";

function Notes({ title, notes }: { title: string; notes: string[] | null }) {
  if (!notes || notes.length === 0) return null;
  return (
    <p className="text-[13px] leading-relaxed text-ash">
      <span className="font-mono text-[10.5px] uppercase tracking-wide text-fog">{title}</span>
      <br />
      {notes.join(" · ")}
    </p>
  );
}

export default function ProductCard({
  product: p,
  buyable = false,
}: {
  product: PublicProduct;
  buyable?: boolean;
}) {
  const meta = [
    label.type(p.type),
    label.concentration(p.concentration),
    formatVolume(p.volume_ml),
    label.audience(p.audience),
  ].filter(Boolean);
  const traits = [label.longevity(p.longevity), label.sillage(p.sillage)].filter(Boolean);
  const wa = whatsappLink({ name: p.name, brand: p.brand, price: p.price });

  return (
    <article className="flex flex-col overflow-hidden rounded-[30px] bg-graphite transition-colors hover:bg-steel">
      {p.main_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.main_image_url}
          alt={p.name}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
      )}

      <div className="flex flex-1 flex-col p-7">
        {p.brand && (
          <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-gold">
            {p.brand}
          </span>
        )}
        <h3 className="display mt-2 text-[22px] leading-tight text-cloud">{p.name}</h3>

        {p.category && (
          <span className="mt-3 w-fit rounded-full bg-white/[0.06] px-3 py-1 font-mono text-[10.5px] uppercase tracking-wide text-ash">
            {p.category}
          </span>
        )}

        {p.description && (
          <p className="mt-4 line-clamp-3 text-[14px] leading-relaxed text-ash">{p.description}</p>
        )}

        {meta.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {meta.map((m) => (
              <span key={m} className={chip}>
                {m}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 space-y-2">
          <Notes title="Saída" notes={p.top_notes} />
          <Notes title="Coração" notes={p.heart_notes} />
          <Notes title="Fundo" notes={p.base_notes} />
        </div>

        {traits.length > 0 && (
          <p className="mt-3 font-mono text-[10.5px] uppercase tracking-wide text-fog">
            {traits.join(" · ")}
          </p>
        )}

        {/* Price + buy pinned to the bottom so cards align regardless of copy length */}
        <div className="mt-auto pt-6">
          {p.price != null && p.price > 0 && (
            <span className="display text-2xl text-gold-bright">{formatPrice(p.price)}</span>
          )}

          {buyable &&
            (wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener"
                className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gold text-[14px] font-medium text-obsidian transition-colors hover:bg-gold-bright"
              >
                <WhatsAppIcon className="size-[18px]" />
                Comprar no WhatsApp
              </a>
            ) : (
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener"
                className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/20 text-[14px] font-medium text-cloud transition-colors hover:bg-white/5"
              >
                <InstagramIcon className="size-[18px]" />
                Falar no Instagram
              </a>
            ))}
        </div>
      </div>
    </article>
  );
}
