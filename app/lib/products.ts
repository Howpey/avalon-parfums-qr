/**
 * Products come from the Avalon CRM's Supabase, read through the curated
 * `public_products` view — which exposes only publicly safe columns. Cost,
 * minimum stock, supplier and internal codes never leave the CRM.
 */
export type PublicProduct = {
  id: string;
  name: string;
  type: string | null;
  audience: string | null;
  volume_ml: number | null;
  concentration: string | null;
  description: string | null;
  price: number | null;
  main_image_url: string | null;
  top_notes: string[] | null;
  heart_notes: string[] | null;
  base_notes: string[] | null;
  longevity: string | null;
  sillage: string | null;
  recommended_seasons: string[] | null;
  recommended_occasions: string[] | null;
  similar_to: string | null;
  is_inspired: boolean | null;
  created_at: string;
  brand: string | null;
  category: string | null;
  fragrance_family: string | null;
};

/** Cache tag the CRM webhook revalidates when a product changes. */
export const PRODUCTS_TAG = "products";

const TYPE_LABELS: Record<string, string> = {
  FULL_BOTTLE: "Perfume",
  DECANT: "Decant",
  CREAM: "Creme",
  BODY_SPLASH: "Body splash",
  KIT: "Kit",
  SAMPLE: "Amostra",
  OTHER: "Outro",
};

const AUDIENCE_LABELS: Record<string, string> = {
  MASCULINE: "Masculino",
  FEMININE: "Feminino",
  UNISEX: "Unissex",
};

const CONCENTRATION_LABELS: Record<string, string> = {
  EXTRAIT: "Extrait",
  EAU_DE_PARFUM: "EDP",
  EAU_DE_TOILETTE: "EDT",
  EAU_DE_COLOGNE: "EDC",
  BODY_SPLASH: "Body splash",
  NOT_APPLICABLE: "",
};

const LONGEVITY_LABELS: Record<string, string> = {
  LIGHT: "Fixação leve",
  MODERATE: "Fixação moderada",
  LONG: "Alta fixação",
};

const SILLAGE_LABELS: Record<string, string> = {
  INTIMATE: "Projeção intimista",
  MODERATE: "Projeção moderada",
  STRONG: "Projeção forte",
};

export const label = {
  type: (v: string | null) => (v ? TYPE_LABELS[v] ?? v : ""),
  audience: (v: string | null) => (v ? AUDIENCE_LABELS[v] ?? v : ""),
  concentration: (v: string | null) => (v ? CONCENTRATION_LABELS[v] ?? v : ""),
  longevity: (v: string | null) => (v ? LONGEVITY_LABELS[v] ?? v : ""),
  sillage: (v: string | null) => (v ? SILLAGE_LABELS[v] ?? v : ""),
};

export const formatPrice = (value: number | null) =>
  value == null
    ? ""
    : new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export const formatVolume = (ml: number | null) =>
  ml == null ? "" : `${Number(ml) % 1 === 0 ? Number(ml).toFixed(0) : ml} ml`;

/** How many products the landing page grid shows (newest first). */
export const PRODUCTS_LIMIT = 12;

/**
 * WhatsApp number for purchases, digits only with country code
 * (e.g. 5513999999999). Set NEXT_PUBLIC_WHATSAPP_NUMBER to enable the
 * "Comprar no WhatsApp" buttons; without it they fall back to Instagram.
 */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");

/** Builds a wa.me link pre-filled with a message about this product. */
export function whatsappLink(p: {
  name: string;
  brand?: string | null;
  price?: number | null;
}): string | null {
  if (!WHATSAPP_NUMBER) return null;
  const parts = [
    `Olá! Vim pelo site e tenho interesse no *${p.name}*`,
    p.brand ? ` da ${p.brand}` : "",
    p.price ? ` (${formatPrice(p.price)})` : "",
    ". Ainda está disponível?",
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(parts.join(""))}`;
}

/**
 * Fetches the public catalog. Returns [] when the CRM connection isn't configured
 * or the request fails, so the page always renders.
 */
export async function getProducts(limit = PRODUCTS_LIMIT): Promise<PublicProduct[]> {
  const url = process.env.CRM_SUPABASE_URL;
  const key = process.env.CRM_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const base = `${url.replace(/\/(rest\/v1\/?)?$/, "")}/rest/v1/public_products`;

  const query = async (withImageOnly: boolean) => {
    const endpoint =
      `${base}?select=*&order=created_at.desc&limit=${limit}` +
      (withImageOnly ? "&main_image_url=not.is.null" : "");
    const res = await fetch(endpoint, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      // The CRM webhook revalidates this tag; the interval is a safety net.
      next: { tags: [PRODUCTS_TAG], revalidate: 300 },
    });
    if (!res.ok) {
      console.error("getProducts: CRM responded", res.status, await res.text());
      return [];
    }
    const data = (await res.json()) as PublicProduct[];
    return Array.isArray(data) ? data : [];
  };

  try {
    // The showcase looks best with photos; fall back to any product when the
    // CRM has none with an image yet.
    const withImages = await query(true);
    return withImages.length > 0 ? withImages : await query(false);
  } catch (err) {
    console.error("getProducts: failed to reach the CRM", err);
    return [];
  }
}

/** Every active product, for the full catalog page. */
export async function getAllProducts(): Promise<PublicProduct[]> {
  const url = process.env.CRM_SUPABASE_URL;
  const key = process.env.CRM_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const endpoint =
    `${url.replace(/\/(rest\/v1\/?)?$/, "")}/rest/v1/public_products` +
    `?select=*&order=created_at.desc&limit=1000`;

  try {
    const res = await fetch(endpoint, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { tags: [PRODUCTS_TAG], revalidate: 300 },
    });
    if (!res.ok) {
      console.error("getAllProducts: CRM responded", res.status, await res.text());
      return [];
    }
    const data = (await res.json()) as PublicProduct[];
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("getAllProducts: failed to reach the CRM", err);
    return [];
  }
}
