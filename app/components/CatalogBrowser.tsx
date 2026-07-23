"use client";

import { useMemo, useState } from "react";
import { type PublicProduct } from "../lib/products";
import ProductCard from "./ProductCard";

type SortKey = "recent" | "price-asc" | "price-desc" | "name";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "recent", label: "Mais recentes" },
  { key: "price-asc", label: "Menor preço" },
  { key: "price-desc", label: "Maior preço" },
  { key: "name", label: "A–Z" },
];

const pill = (active: boolean) =>
  `rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors ${
    active
      ? "border-gold bg-gold/15 text-gold-bright"
      : "border-white/10 text-ash hover:border-gold/40 hover:text-cloud"
  }`;

export default function CatalogBrowser({ products }: { products: PublicProduct[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("recent");

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category).filter(Boolean) as string[])).sort(),
    [products],
  );
  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand).filter(Boolean) as string[])).sort(),
    [products],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (brand && p.brand !== brand) return false;
      if (!q) return true;
      return [p.name, p.brand, p.category, p.fragrance_family, p.similar_to]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    else if (sort === "price-desc") sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    else if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    return sorted;
  }, [products, query, category, brand, sort]);

  const clear = () => {
    setQuery("");
    setCategory(null);
    setBrand(null);
  };
  const filtering = Boolean(query || category || brand);

  return (
    <>
      {/* Search */}
      <div className="mx-auto mt-10 flex max-w-lg items-center gap-2 rounded-xl border border-white/10 bg-abyss py-2 pl-5 pr-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome, marca ou família…"
          aria-label="Buscar no catálogo"
          className="h-10 flex-1 bg-transparent text-[15px] text-cloud placeholder:text-fog focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Limpar busca"
            className="px-3 font-mono text-[11px] uppercase tracking-wide text-fog hover:text-cloud"
          >
            limpar
          </button>
        )}
      </div>

      {/* Category filters */}
      {categories.length > 0 && (
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <button onClick={() => setCategory(null)} className={pill(category === null)}>
            Todas
          </button>
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={pill(category === c)}>
              {c}
            </button>
          ))}
        </div>
      )}

      {/* Brand filter */}
      {brands.length > 1 && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <button onClick={() => setBrand(null)} className={pill(brand === null)}>
            Todas as marcas
          </button>
          {brands.map((b) => (
            <button key={b} onClick={() => setBrand(b)} className={pill(brand === b)}>
              {b}
            </button>
          ))}
        </div>
      )}

      {/* Count + sort */}
      <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row">
        <p className="font-mono text-[11px] uppercase tracking-wide text-fog">
          {visible.length} {visible.length === 1 ? "produto" : "produtos"}
          {filtering && (
            <button onClick={clear} className="ml-3 text-gold hover:text-gold-bright">
              limpar filtros
            </button>
          )}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {SORTS.map((s) => (
            <button key={s.key} onClick={() => setSort(s.key)} className={pill(sort === s.key)}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="mt-16 text-center text-ash">
          Nenhum produto encontrado com esses filtros.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} buyable />
          ))}
        </div>
      )}
    </>
  );
}
