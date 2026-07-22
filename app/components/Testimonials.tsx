"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { StarIcon, ArrowIcon } from "./icons";

// Placeholder reviews — replace with real customer testimonials.
const reviews = [
  { name: "Marina S.", city: "Santos", stars: 5, text: "Chegou no mesmo dia e o perfume é idêntico ao original. Virei cliente fiel da Avalon." },
  { name: "Rafael T.", city: "São Vicente", stars: 5, text: "Atendimento impecável, me ajudaram a escolher um árabe que fixa o dia inteiro. Recomendo demais." },
  { name: "Beatriz L.", city: "Praia Grande", stars: 5, text: "A Neeche Collection surpreendeu pelo preço. Fragrância sofisticada e entrega rápida." },
  { name: "Carla M.", city: "Guarujá", stars: 5, text: "Comprei de presente e a embalagem veio linda. Meu marido amou o amadeirado." },
  { name: "Diego P.", city: "Santos", stars: 4, text: "Ótima curadoria de importados. Encontrei um nicho que não achava em lugar nenhum." },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="depoimentos" className="mx-auto max-w-[1200px] px-6 py-24">
      <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <span className="eyebrow text-[11px]">Depoimentos</span>
          <h2 className="display mt-4 text-[clamp(32px,6vw,48px)]">Quem comprou, recomenda</h2>
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Anterior"
            onClick={() => emblaApi?.scrollPrev()}
            className="grid size-11 place-items-center rounded-lg border border-white/15 text-cloud transition-colors hover:bg-white/5"
          >
            <ArrowIcon className="size-[18px] rotate-180" />
          </button>
          <button
            aria-label="Próximo"
            onClick={() => emblaApi?.scrollNext()}
            className="grid size-11 place-items-center rounded-lg border border-white/15 text-cloud transition-colors hover:bg-white/5"
          >
            <ArrowIcon className="size-[18px]" />
          </button>
        </div>
      </div>

      <div className="mt-10 overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="flex min-w-0 shrink-0 grow-0 basis-[85%] flex-col rounded-[30px] bg-graphite p-8 sm:basis-[46%] lg:basis-[31%]"
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className={`size-4 ${i < r.stars ? "text-gold" : "text-white/15"}`} />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-ash">“{r.text}”</blockquote>
              <figcaption className="mt-6 text-[14px] text-cloud">
                {r.name} <span className="text-fog">· {r.city}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {snaps.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir ao depoimento ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${i === selected ? "w-6 bg-gold" : "w-1.5 bg-white/20"}`}
          />
        ))}
      </div>
    </section>
  );
}
