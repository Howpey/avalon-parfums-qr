"use client";

import { useState } from "react";
import { purchaseMessage } from "../lib/products";
import { INSTAGRAM_DM_URL } from "./shared";
import { InstagramIcon } from "./icons";

type Props = {
  product: { name: string; brand?: string | null; price?: number | null };
  className?: string;
  size?: "sm" | "lg";
  label?: string;
};

/**
 * Instagram has no way to pre-fill a DM from a link, so copy the personalized
 * message and open the conversation — the customer just pastes it.
 */
export default function BuyButton({
  product,
  className = "",
  size = "sm",
  label = "Comprar no Instagram",
}: Props) {
  const [copied, setCopied] = useState(false);

  const buy = async () => {
    try {
      await navigator.clipboard.writeText(purchaseMessage(product));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked (older browsers / no permission) — still open the DM.
    }
    window.open(INSTAGRAM_DM_URL, "_blank", "noopener");
  };

  const dims =
    size === "lg"
      ? "h-12 px-7 text-[15px] gap-2.5"
      : "h-9 w-full text-[12px] gap-1.5";

  return (
    <button
      onClick={buy}
      title="Copia a mensagem e abre a DM do Instagram"
      className={`inline-flex items-center justify-center rounded-lg bg-gold font-medium text-obsidian transition-colors hover:bg-gold-bright ${dims} ${className}`}
    >
      <InstagramIcon className={size === "lg" ? "size-[18px]" : "size-[14px]"} />
      {copied ? "Copiado — cole na DM" : label}
    </button>
  );
}
