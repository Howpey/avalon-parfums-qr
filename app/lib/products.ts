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

import { getStoreIndex, matchStoreImage } from "./storeImages";

/** How many products the landing page grid shows (newest first). */
export const PRODUCTS_LIMIT = 20;

/**
 * Fills in `main_image_url` for products the CRM has no photo for, using the
 * real product shot from the Avalon store catalog.
 */
async function withStorePhotos(products: PublicProduct[]): Promise<PublicProduct[]> {
  const missing = products.filter((p) => !p.main_image_url);
  if (missing.length === 0) return products;

  const index = await getStoreIndex();
  if (index.length === 0) return products;

  return products.map((p) =>
    p.main_image_url
      ? p
      : { ...p, main_image_url: matchStoreImage(p.name, p.brand, index) },
  );
}

/**
 * Products without a photo in the CRM fall back to the category's own
 * still-life image (the ones used on the catalog tiles). Shown dimmed behind
 * the category icon, so it reads as decorative — never as the actual product.
 */
export function fallbackImage(p: { category?: string | null; type?: string | null }): string {
  const c = (p.category ?? "").toLowerCase();
  if (c.includes("árabe") || c.includes("arabe")) return "/cards/arabes.webp";
  if (c.includes("nicho")) return "/cards/nicho.webp";
  if (c.includes("import")) return "/cards/importados.webp";
  if (c.includes("body") || c.includes("creme") || c.includes("lotion"))
    return "/cards/cremes.webp";
  if (c.includes("neeche")) return "/cards/neeche.webp";
  // Fall back on the product type when the category doesn't say enough.
  if (p.type === "CREAM" || p.type === "BODY_SPLASH") return "/cards/cremes.webp";
  return "/cards/nicho.webp";
}

/**
 * Message a buyer sends about a product. Instagram has no URL parameter for
 * pre-filling a DM (unlike WhatsApp's ?text=), so the UI copies this to the
 * clipboard and opens the conversation for the customer to paste.
 */
export function purchaseMessage(p: {
  name: string;
  brand?: string | null;
  price?: number | null;
}): string {
  return [
    `Olá! Vim pelo site e tenho interesse no ${p.name}`,
    p.brand ? ` da ${p.brand}` : "",
    p.price ? ` (${formatPrice(p.price)})` : "",
    ". Ainda está disponível?",
  ].join("");
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
    const list = withImages.length > 0 ? withImages : await query(false);
    return withStorePhotos(list);
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
    return Array.isArray(data) ? withStorePhotos(data) : [];
  } catch (err) {
    console.error("getAllProducts: failed to reach the CRM", err);
    return [];
  }
}
