"use client";

import { useState } from "react";
import {
  type PublicProduct,
  label,
  formatPrice,
  formatVolume,
  purchaseMessage,
  fallbackImage,
} from "../lib/products";
import { INSTAGRAM_DM_URL } from "./shared";
import {
  InstagramIcon,
  NicheIcon,
  ArabicIcon,
  ImportedIcon,
  CreamIcon,
} from "./icons";

/**
 * Products of the same category share one fallback photo, so vary the crop
 * deterministically per product — otherwise a filtered grid looks copy-pasted.
 */
const CROPS = ["18% 28%", "50% 35%", "78% 55%", "32% 72%", "64% 22%", "45% 62%"];
function cropFor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return { objectPosition: CROPS[h % CROPS.length], scale: 1 + ((h >> 3) % 4) * 0.06 };
}

/** Icon shown over the decorative fallback image, matching the category. */
function categoryIcon(category: string | null, type: string | null) {
  const c = (category ?? "").toLowerCase();
  if (c.includes("árabe") || c.includes("arabe")) return ArabicIcon;
  if (c.includes("import")) return ImportedIcon;
  if (c.includes("body") || c.includes("creme") || c.includes("lotion")) return CreamIcon;
  if (type === "CREAM" || type === "BODY_SPLASH") return CreamIcon;
  return NicheIcon;
}

const chip =
  "rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-ash";

export default function ProductCard({
  product: p,
  buyable = false,
}: {
  product: PublicProduct;
  buyable?: boolean;
}) {
  // Kept short on purpose: these cards are a dense browsing grid.
  const meta = [label.concentration(p.concentration), formatVolume(p.volume_ml)].filter(Boolean);
  const FallbackIcon = categoryIcon(p.category, p.type);
  const crop = cropFor(p.id);
  const [copied, setCopied] = useState(false);

  /**
   * Instagram has no way to pre-fill a DM from a link, so copy the message and
   * open the conversation — the customer just pastes it.
   */
  const buy = async () => {
    const message = purchaseMessage({ name: p.name, brand: p.brand, price: p.price });
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked (older browsers / no permission) — still open the DM.
    }
    window.open(INSTAGRAM_DM_URL, "_blank", "noopener");
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-graphite transition-colors hover:bg-steel">
      {p.main_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.main_image_url}
          alt={p.name}
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
      ) : (
        <div className="relative aspect-square w-full overflow-hidden bg-abyss">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fallbackImage({ category: p.category, type: p.type })}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="size-full object-cover opacity-35"
            style={{
              objectPosition: crop.objectPosition,
              transform: `scale(${crop.scale})`,
            }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <FallbackIcon className="size-7 text-gold-bright/70" />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-3.5">
        {p.brand && (
          <span className="truncate font-mono text-[9px] uppercase tracking-[0.14em] text-gold">
            {p.brand}
          </span>
        )}
        <h3 className="display mt-1 line-clamp-2 text-[15px] leading-snug text-cloud">{p.name}</h3>

        {meta.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {meta.map((m) => (
              <span key={m} className={chip}>
                {m}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3">
          {p.price != null && p.price > 0 && (
            <span className="display text-[17px] text-gold-bright">{formatPrice(p.price)}</span>
          )}

          {buyable && (
            <button
              onClick={buy}
              title="Copia a mensagem e abre a DM do Instagram"
              className="mt-2.5 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-gold text-[12px] font-medium text-obsidian transition-colors hover:bg-gold-bright"
            >
              <InstagramIcon className="size-[14px]" />
              {copied ? "Copiado — cole na DM" : "Comprar"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
