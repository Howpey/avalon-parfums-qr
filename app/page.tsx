const STORE_URL = "https://avalonparfums.com.br";
const INSTAGRAM_URL = "https://instagram.com/avalon.parfums";

const catalogItems = [
  {
    icon: "💎",
    title: "Nicho",
    description: "Fragrâncias raras e exclusivas das melhores casas de perfumaria.",
  },
  {
    icon: "✈️",
    title: "Importados",
    description: "Grandes marcas internacionais com procedência garantida.",
  },
  {
    icon: "⚜️",
    title: "Neeche Collection",
    description: "Inspirações de nicho com identidade autoral.",
    badge: "a partir de R$ 69,90",
  },
  {
    icon: "🌙",
    title: "Árabes",
    description: "Perfumes orientais intensos, marcantes e de alta fixação.",
  },
  {
    icon: "🤍",
    title: "Cremes corporais",
    description: "Hidratantes e body splash para completar o ritual.",
  },
];

const families = ["Cítricos", "Amadeirados", "Doces", "Florais", "Frutados", "Especiados"];

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
    <main className="relative min-h-screen">
      <div className="hero-veil pointer-events-none fixed inset-0 -z-10" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-noir/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
          <a href="#" className="font-display text-xl font-semibold tracking-wide">
            Avalon <span className="text-gold-gradient">Parfums</span>
          </a>
          <a
            href={STORE_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex h-9 items-center rounded-full bg-gold px-5 text-[13px] font-semibold text-noir shadow-[0_0_18px_rgba(201,162,75,0.25)] transition-all hover:bg-gold-bright hover:shadow-[0_0_28px_rgba(201,162,75,0.4)]"
          >
            Visitar a loja
          </a>
        </div>
      </header>

      <section className="px-6 pb-24 pt-40 text-center">
        <div>
          <div className="mx-auto mb-8 inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-white/[0.03] px-5 py-2 text-[13px] text-paper-dim backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(227,195,120,0.9)]" />
            Perfumaria de nicho · Baixada Santista
          </div>
          <h1 className="font-display mx-auto max-w-3xl text-balance text-[clamp(44px,9vw,84px)] font-medium leading-[1.04] tracking-tight">
            Exclusividade que <em className="text-gold-gradient not-italic">desperta sentidos</em>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-[17px] leading-relaxed text-paper-dim">
            Composições marcantes em frascos exclusivos. Perfumes de nicho, importados e árabes com
            curadoria autoral.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-gold px-8 text-[15px] font-semibold text-noir shadow-[0_0_24px_rgba(201,162,75,0.3)] transition-all hover:bg-gold-bright hover:shadow-[0_0_36px_rgba(201,162,75,0.45)] active:scale-[0.98]"
            >
              Visitar a loja
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-gold/40 bg-white/[0.02] px-8 text-[15px] font-medium text-paper backdrop-blur-md transition-all hover:border-gold/70 hover:bg-gold/10 active:scale-[0.98]"
            >
              Seguir no Instagram
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <div>
            <span className="mb-4 block text-center text-[12px] font-semibold uppercase tracking-[0.24em] text-gold">
              Sobre nós
            </span>
            <h2 className="font-display text-center text-[clamp(32px,6vw,48px)] font-medium leading-tight">
              Bem-vindo à Avalon
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-center leading-relaxed text-paper-dim">
              Somos uma perfumaria especializada em fragrâncias de nicho e importadas, com curadoria
              autoral para quem busca um perfume fora do comum. Do clássico ao exclusivo, temos a
              fragrância certa para cada momento.
            </p>
          </div>
          <div className="mt-10">
            <div className="relative mx-auto flex max-w-lg items-center gap-5 overflow-hidden rounded-xl border border-gold/25 bg-noir-soft p-6">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/5" />
              <span className="text-3xl">🚚</span>
              <p className="text-[15px] leading-snug text-paper-dim">
                <strong className="font-semibold text-paper">
                  Frete grátis com entrega em até 24h
                </strong>
                <br />
                para toda a Baixada Santista
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div>
            <span className="mb-4 block text-center text-[12px] font-semibold uppercase tracking-[0.24em] text-gold">
              Catálogo
            </span>
            <h2 className="font-display text-center text-[clamp(32px,6vw,48px)] font-medium leading-tight">
              O que você encontra
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {catalogItems.map((item) => (
              <div
                key={item.title}
                className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-7 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/30 hover:bg-white/[0.04]"
              >
                <span className="mb-3 block text-[26px]">{item.icon}</span>
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-paper-dim">
                  {item.description}
                </p>
                {item.badge && (
                  <span className="mt-3 inline-block rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1 text-[12px] font-semibold text-gold-bright">
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-9 text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {families.map((family) => (
                <span
                  key={family}
                  className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 text-[12.5px] text-paper-dim"
                >
                  {family}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <div>
            <span className="mb-4 block text-center text-[12px] font-semibold uppercase tracking-[0.24em] text-gold">
              Vantagens
            </span>
            <h2 className="font-display text-center text-[clamp(32px,6vw,48px)] font-medium leading-tight">
              Por que comprar com a gente
            </h2>
          </div>
          <ul className="mx-auto mt-10 flex max-w-xl flex-col gap-3.5">
            {advantages.map((advantage) => (
              <li
                key={advantage.title}
                className="flex items-start gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 text-[15px] text-paper-dim transition-colors hover:border-gold/25"
              >
                <span className="text-gold-gradient mt-0.5 shrink-0 text-[15px]">✦</span>
                <span>
                  <strong className="font-semibold text-paper">{advantage.title}</strong>{" "}
                  {advantage.text}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <div className="mx-auto max-w-sm rounded-xl border-[1.5px] border-dashed border-gold/45 bg-gold/[0.06] px-7 py-6 text-center">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-paper-dim">
                Primeira compra?
              </div>
              <div className="text-gold-gradient font-display mt-1.5 text-3xl font-bold tracking-[0.1em]">
                BEMVINDO10
              </div>
              <div className="mt-1 text-[13.5px] text-paper-dim">
                Use o cupom e ganhe{" "}
                <strong className="font-semibold text-paper">10% de desconto</strong> no site
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div>
            <span className="mb-4 block text-center text-[12px] font-semibold uppercase tracking-[0.24em] text-gold">
              Instagram
            </span>
            <h2 className="font-display text-center text-[clamp(32px,6vw,48px)] font-medium leading-tight">
              Direto do nosso feed
            </h2>
            <p className="mx-auto mt-4 max-w-md text-center text-[15.5px] leading-relaxed text-paper-dim">
              Acompanhe lançamentos, promoções e bastidores no{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener"
                className="text-gold transition-colors hover:text-gold-bright"
              >
                @avalon.parfums
              </a>
            </p>
          </div>
          <div>
            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
              {instagramPosts.map((permalink) => (
                <div
                  key={permalink}
                  className="overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]"
                >
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={permalink}
                    data-instgrm-version="14"
                    style={{ background: "transparent", border: 0, margin: 0, padding: 0, width: "100%", minWidth: 0 }}
                  >
                    <a
                      href={permalink}
                      target="_blank"
                      rel="noopener"
                      className="block p-6 text-center text-[13px] text-paper-dim"
                    >
                      Ver post no Instagram
                    </a>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-gold/40 bg-white/[0.02] px-8 text-[15px] font-medium text-paper backdrop-blur-md transition-all hover:border-gold/70 hover:bg-gold/10 active:scale-[0.98]"
            >
              Ver mais no Instagram
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 pb-28 pt-16">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl border border-gold/25 bg-noir-soft px-7 py-14 text-center shadow-[0_0_80px_rgba(201,162,75,0.1)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_120%,rgba(201,162,75,0.14),transparent_70%)]" />
            <span className="mb-4 block text-center text-[12px] font-semibold uppercase tracking-[0.24em] text-gold">
              Encontre seu perfume
            </span>
            <h2 className="font-display text-[clamp(32px,6vw,48px)] font-medium leading-tight">
              Vamos começar?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15.5px] leading-relaxed text-paper-dim">
              Explore o catálogo completo no nosso site ou acompanhe as novidades e lançamentos no
              Instagram.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <a
                href={STORE_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-gold px-8 text-[15px] font-semibold text-noir shadow-[0_0_24px_rgba(201,162,75,0.3)] transition-all hover:bg-gold-bright hover:shadow-[0_0_36px_rgba(201,162,75,0.45)] active:scale-[0.98]"
              >
                avalonparfums.com.br
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-gold/40 bg-white/[0.02] px-8 text-[15px] font-medium text-paper backdrop-blur-md transition-all hover:border-gold/70 hover:bg-gold/10 active:scale-[0.98]"
              >
                @avalon.parfums
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-6 py-10 text-center text-[13px] text-paper-faint">
        <div className="font-display text-lg font-semibold text-paper">Avalon Parfums</div>
        <div className="mt-1">Perfumaria de nicho · Baixada Santista</div>
        <div className="mt-1.5">
          <a
            href={STORE_URL}
            target="_blank"
            rel="noopener"
            className="text-gold transition-colors hover:text-gold-bright"
          >
            avalonparfums.com.br
          </a>
          <span className="mx-2">·</span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener"
            className="text-gold transition-colors hover:text-gold-bright"
          >
            @avalon.parfums
          </a>
        </div>
      </footer>
    </main>
  );
}
