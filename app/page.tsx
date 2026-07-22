const STORE_URL = "https://avalonparfums.com.br";
const INSTAGRAM_URL = "https://instagram.com/avalon_parfum";

type IconProps = { className?: string };

const ArrowIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="13 6 19 12 13 18" />
  </svg>
);

const InstagramIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const NicheIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3l7 5v8l-7 5-7-5V8z" />
    <path d="M12 3v18M5 8l7 4 7-4" />
  </svg>
);

const ImportedIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a.5.5 0 0 0-.5.8l4 4-2 2H4l-1 1 3 1.5L10 21l1-1v-2.3l2-2 4 4a.5.5 0 0 0 .8-.5z" />
  </svg>
);

const NeecheIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2l2.4 5.4L20 8.2l-4 4 1 5.8-5-3-5 3 1-5.8-4-4 5.6-.8z" />
  </svg>
);

const ArabicIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8z" />
  </svg>
);

const CreamIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 3h6v3H9z" />
    <path d="M8 6h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
    <line x1="9" y1="12" x2="15" y2="12" />
  </svg>
);

const TruckIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h10v9H3z" />
    <path d="M13 9h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </svg>
);

const catalogItems = [
  {
    Icon: NicheIcon,
    tile: "bg-amber",
    title: "Nicho",
    description: "Fragrâncias raras e exclusivas das melhores casas de perfumaria.",
  },
  {
    Icon: ImportedIcon,
    tile: "bg-copper",
    title: "Importados",
    description: "Grandes marcas internacionais com procedência garantida.",
  },
  {
    Icon: NeecheIcon,
    tile: "bg-rose",
    title: "Neeche Collection",
    description: "Inspirações de nicho com identidade autoral.",
    badge: "a partir de R$ 69,90",
  },
  {
    Icon: ArabicIcon,
    tile: "bg-bronze",
    title: "Árabes",
    description: "Perfumes orientais intensos, marcantes e de alta fixação.",
  },
  {
    Icon: CreamIcon,
    tile: "bg-sand",
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

const primaryBtn =
  "inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-gold px-7 text-[15px] font-medium text-obsidian transition-colors hover:bg-gold-bright";
const ghostBtn =
  "inline-flex h-12 items-center justify-center gap-2.5 rounded-lg border border-white/20 px-7 text-[15px] font-medium text-cloud transition-colors hover:bg-white/5";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-obsidian">
      {/* Navigation — glassmorphic sticky bar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-obsidian/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          <a href="#" className="display text-xl tracking-wide">
            Avalon Parfums
          </a>
          <a href={STORE_URL} target="_blank" rel="noopener" className="inline-flex h-9 items-center gap-2 rounded-lg bg-gold px-4 text-[13px] font-medium text-obsidian transition-colors hover:bg-gold-bright">
            Visitar a loja
            <ArrowIcon className="size-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[1200px] px-6 pb-28 pt-44 text-center">
        <span className="eyebrow text-[11px]">Perfumaria de nicho · Baixada Santista</span>
        <h1 className="display mx-auto mt-8 max-w-4xl text-[clamp(46px,9vw,80px)]">
          Exclusividade que <em className="italic">desperta sentidos</em>
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-ash">
          Composições marcantes em frascos exclusivos. Perfumes de nicho, importados e árabes com
          curadoria autoral.
        </p>
        <div className="mt-11 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <a href={STORE_URL} target="_blank" rel="noopener" className={primaryBtn}>
            Visitar a loja
            <ArrowIcon className="size-[18px]" />
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className={ghostBtn}>
            <InstagramIcon className="size-[18px]" />
            Seguir no Instagram
          </a>
        </div>
      </section>

      {/* Sobre */}
      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-[11px]">Sobre nós</span>
          <h2 className="display mt-4 text-[clamp(32px,6vw,48px)]">Bem-vindo à Avalon</h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ash">
            Somos uma perfumaria especializada em fragrâncias de nicho e importadas, com curadoria
            autoral para quem busca um perfume fora do comum. Do clássico ao exclusivo, temos a
            fragrância certa para cada momento.
          </p>
        </div>
        <div className="mx-auto mt-10 flex max-w-lg items-center gap-5 rounded-2xl bg-graphite p-6">
          <TruckIcon className="size-8 shrink-0 text-gold" />
          <p className="text-[15px] leading-snug text-ash">
            <strong className="font-medium text-cloud">Frete grátis com entrega em até 24h</strong>
            <br />
            para toda a Baixada Santista
          </p>
        </div>
      </section>

      {/* Catálogo — feature category tiles */}
      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="text-center">
          <span className="eyebrow text-[11px]">Catálogo</span>
          <h2 className="display mt-4 text-[clamp(32px,6vw,48px)]">O que você encontra</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {catalogItems.map(({ Icon, tile, title, description, badge }) => (
            <div
              key={title}
              className={`group flex flex-col rounded-[30px] ${tile} p-8 text-obsidian transition-transform duration-300 hover:-translate-y-1`}
            >
              <Icon className="size-9 text-obsidian/90" />
              <h3 className="display mt-8 text-[clamp(26px,4vw,38px)] text-obsidian">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-obsidian/75">{description}</p>
              {badge && (
                <span className="mt-5 inline-flex w-fit rounded-full bg-obsidian/15 px-3.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-obsidian">
                  {badge}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap justify-center gap-2">
          {families.map((family) => (
            <span
              key={family}
              className="rounded-full border border-white/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ash"
            >
              {family}
            </span>
          ))}
        </div>
      </section>

      {/* Vantagens */}
      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-[11px]">Vantagens</span>
          <h2 className="display mt-4 text-[clamp(32px,6vw,48px)]">Por que comprar com a gente</h2>
        </div>
        <ul className="mx-auto mt-10 flex max-w-xl flex-col gap-3">
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
        </ul>

        {/* Cupom — single inverted silver card (design.md stat card) */}
        <div className="mx-auto mt-10 max-w-sm rounded-[30px] bg-silver px-8 py-8 text-center text-obsidian">
          <div className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-obsidian/60">
            Primeira compra?
          </div>
          <div className="display mt-3 text-4xl tracking-[0.08em] text-obsidian">BEMVINDO10</div>
          <div className="mt-2 text-[14px] text-obsidian/70">
            Use o cupom e ganhe <strong className="font-medium text-obsidian">10% de desconto</strong>{" "}
            no site
          </div>
        </div>
      </section>

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
        <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
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
        </div>
        <div className="mt-8 text-center">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className={ghostBtn}>
            <InstagramIcon className="size-[18px]" />
            Ver mais no Instagram
          </a>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-[1200px] px-6 pb-28 pt-16">
        <div className="mx-auto max-w-3xl rounded-[30px] bg-abyss px-7 py-16 text-center">
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
        </div>
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
