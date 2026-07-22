import Nav from "./components/Nav";
import Hero from "./components/Hero";
import PromptSection from "./components/PromptSection";
import ScrollVisual from "./components/ScrollVisual";
import CatalogTiles from "./components/CatalogTiles";
import Testimonials from "./components/Testimonials";
import Reveal from "./components/Reveal";
import { STORE_URL, INSTAGRAM_URL, primaryBtn, ghostBtn } from "./components/shared";
import { ArrowIcon, InstagramIcon, TruckIcon } from "./components/icons";

const advantages = [
  { title: "Entrega em até 24h grátis", text: "para a Baixada Santista" },
  { title: "Frete grátis", text: "nas compras acima de R$ 299,99 para todo o Brasil" },
  { title: "Parcelamento sem juros", text: "em diversas formas de pagamento" },
  { title: "Atendimento próximo", text: "— tire suas dúvidas direto com a gente" },
];

const instagramPosts = [
  "https://www.instagram.com/p/DZaWwous-FS/",
  "https://www.instagram.com/p/DZaWr_XJPpa/",
  "https://www.instagram.com/p/DZaWmiMtEi_/",
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-obsidian">
      <Nav />
      <Hero />
      <PromptSection />

      {/* Sobre — two-column analog */}
      <section id="sobre" className="mx-auto max-w-[1200px] px-6 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-[11px]">Sobre nós</span>
          <h2 className="display mt-4 text-[clamp(32px,6vw,48px)]">Bem-vindo à Avalon</h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ash">
            Somos uma perfumaria especializada em fragrâncias de nicho e importadas, com curadoria
            autoral para quem busca um perfume fora do comum. Do clássico ao exclusivo, temos a
            fragrância certa para cada momento.
          </p>
        </Reveal>
        <Reveal className="mx-auto mt-10 flex max-w-lg items-center gap-5 rounded-2xl bg-graphite p-6">
          <TruckIcon className="size-8 shrink-0 text-gold" />
          <p className="text-[15px] leading-snug text-ash">
            <strong className="font-medium text-cloud">Frete grátis com entrega em até 24h</strong>
            <br />
            para toda a Baixada Santista
          </p>
        </Reveal>
      </section>

      <ScrollVisual />

      <CatalogTiles />

      {/* Vantagens + cupom */}
      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-[11px]">Vantagens</span>
          <h2 className="display mt-4 text-[clamp(32px,6vw,48px)]">Por que comprar com a gente</h2>
        </div>
        <Reveal as="ul" stagger className="mx-auto mt-10 flex max-w-xl flex-col gap-3">
          {advantages.map((advantage) => (
            <li
              key={advantage.title}
              className="flex items-start gap-4 rounded-2xl bg-graphite px-5 py-4 text-[15px] text-ash transition-colors hover:bg-steel"
            >
              <span className="mt-0.5 shrink-0 text-gold">✦</span>
              <span>
                <strong className="font-medium text-cloud">{advantage.title}</strong>{" "}
                {advantage.text}
              </span>
            </li>
          ))}
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-sm rounded-[30px] bg-silver px-8 py-8 text-center text-obsidian">
          <div className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-obsidian/60">
            Primeira compra?
          </div>
          <div className="display mt-3 text-4xl tracking-[0.08em] text-obsidian">BEMVINDO10</div>
          <div className="mt-2 text-[14px] text-obsidian/70">
            Use o cupom e ganhe <strong className="font-medium text-obsidian">10% de desconto</strong>{" "}
            no site
          </div>
        </Reveal>
      </section>

      <Testimonials />

      {/* Instagram */}
      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="text-center">
          <span className="eyebrow text-[11px]">Instagram</span>
          <h2 className="display mt-4 text-[clamp(32px,6vw,48px)]">Direto do nosso feed</h2>
          <p className="mx-auto mt-4 max-w-md text-[15.5px] leading-relaxed text-ash">
            Acompanhe lançamentos, promoções e bastidores no{" "}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="text-gold transition-colors hover:text-gold-bright">
              @avalon_parfum
            </a>
          </p>
        </div>
        <Reveal stagger className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
          {instagramPosts.map((permalink) => (
            <div key={permalink} className="overflow-hidden rounded-2xl bg-graphite">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={permalink}
                data-instgrm-version="14"
                style={{ background: "transparent", border: 0, margin: 0, padding: 0, width: "100%", minWidth: 0 }}
              >
                <a href={permalink} target="_blank" rel="noopener" className="block p-6 text-center text-[13px] text-ash">
                  Ver post no Instagram
                </a>
              </blockquote>
            </div>
          ))}
        </Reveal>
        <div className="mt-8 text-center">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className={ghostBtn}>
            <InstagramIcon className="size-[18px]" />
            Ver mais no Instagram
          </a>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-[1200px] px-6 pb-28 pt-16">
        <Reveal className="mx-auto max-w-3xl rounded-[30px] bg-abyss px-7 py-16 text-center">
          <span className="eyebrow text-[11px]">Encontre seu perfume</span>
          <h2 className="display mt-4 text-[clamp(32px,6vw,48px)]">Vamos começar?</h2>
          <p className="mx-auto mt-4 max-w-md text-[15.5px] leading-relaxed text-ash">
            Explore o catálogo completo no nosso site ou acompanhe as novidades e lançamentos no
            Instagram.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <a href={STORE_URL} target="_blank" rel="noopener" className={primaryBtn}>
              avalonparfums.com.br
              <ArrowIcon className="size-[18px]" />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className={ghostBtn}>
              <InstagramIcon className="size-[18px]" />
              @avalon_parfum
            </a>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-6 py-10 text-center text-[13px] text-fog">
        <div className="display text-lg text-cloud">Avalon Parfums</div>
        <div className="mt-1">Perfumaria de nicho · Baixada Santista</div>
        <div className="mt-1.5">
          <a href={STORE_URL} target="_blank" rel="noopener" className="text-gold transition-colors hover:text-gold-bright">
            avalonparfums.com.br
          </a>
          <span className="mx-2">·</span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="text-gold transition-colors hover:text-gold-bright">
            @avalon_parfum
          </a>
        </div>
      </footer>
    </main>
  );
}
