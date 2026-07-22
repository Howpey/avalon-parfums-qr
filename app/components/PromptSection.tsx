"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { STORE_URL } from "./shared";
import { ArrowIcon } from "./icons";

const suggestions = ["Para a noite", "Presente", "Trabalho", "Árabes intensos"];

/**
 * Origin's "Ask anything" AI-prompt block, adapted to perfume discovery.
 * It's a visual analog — submitting sends the query to the store as a search.
 */
export default function PromptSection() {
  const [value, setValue] = useState("");

  const go = (q: string) => {
    const url = q.trim()
      ? `${STORE_URL}/search?q=${encodeURIComponent(q.trim())}`
      : STORE_URL;
    window.open(url, "_blank", "noopener");
  };

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow text-[11px]">Encontre sua fragrância</span>
        <h2 className="display mt-4 text-[clamp(32px,6vw,48px)]">Qual perfume é a sua cara?</h2>
        <p className="mx-auto mt-4 max-w-md text-[15.5px] leading-relaxed text-ash">
          Diga a ocasião ou o estilo e a gente te leva às opções certas no catálogo.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            go(value);
          }}
          className="mx-auto mt-8 flex max-w-lg items-center gap-2 rounded-xl border border-white/10 bg-obsidian py-2 pl-5 pr-2 text-left"
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ex.: um amadeirado marcante para a noite…"
            aria-label="Descreva a fragrância que procura"
            className="h-10 flex-1 bg-transparent text-[15px] text-cloud placeholder:text-fog focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="grid size-10 shrink-0 place-items-center rounded-lg bg-gold text-obsidian transition-colors hover:bg-gold-bright"
          >
            <ArrowIcon className="size-[18px]" />
          </button>
        </form>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => go(s)}
              className="rounded-full border border-white/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ash transition-colors hover:border-gold/50 hover:text-cloud"
            >
              {s}
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
