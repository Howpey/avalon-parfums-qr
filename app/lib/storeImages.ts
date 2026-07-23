/**
 * Real product photos, pulled from the Avalon Shopify store's own public
 * catalog (avalonparfums.com.br/products.json). Products registered in the CRM
 * without a `main_image_url` are matched by name so the site shows the actual
 * bottle instead of a generic image.
 *
 * Matching is deliberately strict: a wrong photo on a shop is worse than none,
 * so a product only matches when every meaningful word of its name appears in
 * the store title, and single-word names additionally require the brand.
 */

const STORE_PRODUCTS_URL = "https://avalonparfums.com.br/products.json";

const STOP = new Set([
  "edp", "edt", "edc", "parfum", "eau", "de", "la", "the", "extrait", "perfume",
  "spray", "body", "splash", "lotion", "creme", "cream", "hair", "mist", "ml",
  "xj", "decant", "tradicional", "original", "masculino", "feminino", "unissex",
  "pour", "homme", "femme",
]);

/** Names the CRM spells differently from the store. */
const ALIASES: Record<string, string> = {
  "erba pure": "erba pura",
  "valaya exclusiv": "valaya exclusif",
};

const normalize = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\d+\s*ml/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const meaningfulWords = (s: string) =>
  normalize(s)
    .split(" ")
    .filter((w) => w.length > 1 && !STOP.has(w) && !/^\d+$/.test(w));

export type StoreEntry = { title: string; words: Set<string>; length: number; image: string };

/** Fetches every product in the store (paginated) and indexes it for matching. */
export async function getStoreIndex(): Promise<StoreEntry[]> {
  const entries: StoreEntry[] = [];
  try {
    for (let page = 1; page <= 12; page++) {
      const res = await fetch(`${STORE_PRODUCTS_URL}?limit=250&page=${page}`, {
        // The store catalog changes rarely; refresh hourly.
        next: { revalidate: 3600, tags: ["store-images"] },
      });
      if (!res.ok) break;
      const data = (await res.json()) as {
        products?: { title: string; images?: { src: string }[] }[];
      };
      const products = data.products ?? [];
      if (products.length === 0) break;

      for (const p of products) {
        const image = p.images?.[0]?.src;
        if (!image) continue;
        const n = normalize(p.title);
        entries.push({ title: p.title, words: new Set(n.split(" ")), length: n.length, image });
      }
      if (products.length < 250) break;
    }
  } catch (err) {
    console.error("getStoreIndex: could not read the store catalog", err);
  }
  return entries;
}

/** Best store photo for a product, or null when nothing matches confidently. */
export function matchStoreImage(
  name: string,
  brand: string | null,
  index: StoreEntry[],
): string | null {
  if (index.length === 0) return null;

  const key = normalize(name);
  const words = meaningfulWords(ALIASES[key] ?? name);
  if (words.length === 0) return null;

  const brandWords = meaningfulWords(brand ?? "");
  const candidates = index.filter((e) => words.every((w) => e.words.has(w)));
  if (candidates.length === 0) return null;

  const withBrand = brandWords.length
    ? candidates.filter((e) => brandWords.every((b) => e.words.has(b)))
    : [];

  // A one-word name ("Angel", "Gris") is too generic to trust on its own.
  if (words.length === 1 && withBrand.length === 0) return null;

  const pool = withBrand.length ? withBrand : candidates;
  // Prefer the full bottle over a decant, then the most specific (shortest) title.
  pool.sort((a, b) => {
    const ad = a.words.has("decant") ? 1 : 0;
    const bd = b.words.has("decant") ? 1 : 0;
    return ad - bd || a.length - b.length;
  });
  return pool[0].image;
}
