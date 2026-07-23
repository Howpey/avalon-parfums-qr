import type { MetadataRoute } from "next";
import { getAllProducts, slugify } from "./lib/products";

const SITE = "https://avalon-parfums-qr.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE}/produto/${slugify(p)}`,
    lastModified: p.created_at ? new Date(p.created_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    { url: SITE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/catalogo`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    ...productUrls,
  ];
}
