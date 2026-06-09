import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { stores } from '@/lib/mock';
import { formatBRL } from '@/lib/utils';
import { useProducts } from '@/hooks/useProducts';

const COLLECTIONS = [
  { slug: 'camisas-masculinas', label: 'Camisas Masc.' },
  { slug: 'camisas-femininas', label: 'Camisas Fem.' },
  { slug: 'calcas', label: 'Calças' },
  { slug: 'bermudas', label: 'Bermudas' },
  { slug: 'acessorios', label: 'Acessórios' },
  { slug: 'calcados', label: 'Calçados' },
];

export function HomePage() {
  const { data: products = [] } = useProducts();
  return (
    <div className="-mt-16 md:-mt-20">
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[640px] bg-charcoal-deep overflow-hidden flex items-end">
        {/* Layered atmospheric background */}
        <div
          className="absolute inset-0 opacity-95"
          style={{
            background:
              'radial-gradient(ellipse at 30% 20%, #1A5235 0%, transparent 55%), radial-gradient(ellipse at 80% 90%, #0A2E1C 0%, transparent 60%), linear-gradient(180deg, #061E14 0%, #0D3829 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 60%)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Soft figure silhouette using SVG */}
        <svg
          aria-hidden
          className="absolute right-0 top-0 h-full w-1/2 opacity-30"
          viewBox="0 0 600 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="figGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9ABFB0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#9ABFB0" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <ellipse cx="300" cy="200" rx="60" ry="80" fill="url(#figGrad)" />
          <path
            d="M 240 280 Q 240 360 230 480 L 240 720 L 360 720 L 370 480 Q 360 360 360 280 Q 350 260 300 260 Q 250 260 240 280 Z"
            fill="url(#figGrad)"
          />
        </svg>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 pb-16 md:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[10px] tracking-[0.25em] uppercase text-gold mb-5"
          >
            Coleção Primavera · 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-[44px] sm:text-[56px] md:text-[88px] lg:text-[120px] font-light text-cream leading-[0.96] mb-2 max-w-4xl"
          >
            A Arte<br />
            do <em className="italic text-sand">Vestir</em> Bem
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-[11px] tracking-[0.18em] uppercase text-warm-gray-light mt-6 mb-10"
          >
            Elegância contemporânea · Recife, PE
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link to="/colecoes/camisas-masculinas" className="public-cta-dark">
              <span>Explorar coleção</span>
              <ArrowRight size={12} />
            </Link>
            <Link
              to="/lojas"
              className="text-[10px] tracking-[0.2em] uppercase text-warm-gray-light hover:text-cream transition-colors flex items-center gap-2"
            >
              <span>Ver lojas físicas</span>
              <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-6 right-6 md:right-14 flex items-center gap-3 text-[9px] tracking-[0.25em] uppercase text-warm-gray">
          <span className="w-10 h-px bg-warm-gray" />
          <span>scroll</span>
        </div>
      </section>

      {/* COLLECTIONS BAR */}
      <div className="border-b border-beige overflow-x-auto no-scrollbar">
        <div className="max-w-[1440px] mx-auto flex">
          {COLLECTIONS.map((c, i) => (
            <Link
              key={c.slug}
              to={`/colecoes/${c.slug}`}
              className={`flex-1 min-w-[110px] text-center py-4 text-[10px] tracking-[0.18em] uppercase border-r border-beige last:border-r-0 transition-colors hover:bg-off-white ${
                i === 0 ? 'text-charcoal border-b-2 border-b-charcoal -mb-px' : 'text-warm-gray'
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      {/* EDITORIAL */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
          <p className="editorial-eyebrow mb-4">Editorial · Temporada 26</p>
          <h2 className="editorial-title text-5xl md:text-6xl lg:text-7xl mb-6">
            Formas<br /><em className="italic">Atemporais</em>
          </h2>
          <p className="text-[14px] leading-[1.8] text-warm-gray mb-8 max-w-md">
            Peças que transcendem tendências. Uma curadoria de silhuetas
            elegantes para o cotidiano contemporâneo, vestindo o homem e a
            mulher de Recife e região com sofisticação atemporal.
          </p>
          <Link to="/colecoes" className="editorial-link text-charcoal hover:text-gold">
            Ver lookbook completo <ArrowRight size={12} />
          </Link>
        </div>

        <div className="md:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
          {products.length === 0 ? (
            <div className="col-span-2 py-20 text-center text-warm-gray text-[13px] tracking-[0.1em]">
              Coleção em breve
            </div>
          ) : products.slice(0, 4).map((p, i) => (
            <Link
              key={p.id}
              to={`/produtos/${p.slug}`}
              className={`group ${i === 1 ? 'mt-12 md:mt-20' : ''} ${i === 3 ? 'mt-6 md:mt-12' : ''}`}
            >
              <div className="relative aspect-[3/4] bg-beige overflow-hidden">
                {p.images?.[0]
                  ? <img src={p.images[0]} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                  : <ProductPlaceholder index={i} />
                }
                {p.badge && (
                  <span className="absolute top-3 left-3 bg-charcoal text-cream text-[8px] tracking-[0.18em] uppercase px-2 py-1">
                    {p.badge}
                  </span>
                )}
                <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-charcoal/40 to-transparent">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-cream border-b border-cream pb-1">
                    Ver produto
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-[9px] tracking-[0.18em] uppercase text-warm-gray mb-0.5">
                  {p.collection}
                </p>
                <p className="font-serif text-base text-charcoal mb-1">{p.name}</p>
                <p className="text-[12px] text-warm-gray">
                  {p.oldPrice && (
                    <span className="line-through mr-2 text-sand">{formatBRL(p.oldPrice)}</span>
                  )}
                  {formatBRL(p.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CINEMATIC BANNER */}
      <section className="bg-charcoal text-cream relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, #1A5235 0%, transparent 55%), linear-gradient(180deg, #0D3829 0%, #061E14 100%)',
          }}
        />
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-gold mb-5">
              Manifesto
            </p>
            <h3 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-8">
              Para quem<br /><em className="italic text-sand">vive o agora</em><br />sem perder a essência
            </h3>
            <p className="text-[13px] leading-[1.8] text-warm-gray-light max-w-md mb-10">
              A Sanflait nasce do encontro entre o artesanato refinado e o
              espírito contemporâneo. Cada peça é pensada para durar — em
              tecidos nobres, em corte impecável, em design que não envelhece.
            </p>
            <Link to="/sobre" className="public-cta-dark">
              <span>Conheça nossa história</span>
              <ArrowRight size={12} />
            </Link>
          </div>
          <div className="relative aspect-[4/5] md:aspect-[3/4] bg-charcoal-deep overflow-hidden border border-warm-gray/20">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 30%, #9ABFB0 0%, #3A5E4E 40%, #0D3829 100%)',
                opacity: 0.45,
              }}
            />
            <div className="absolute inset-0 flex items-end p-10">
              <p className="font-serif italic text-2xl md:text-3xl text-cream leading-tight">
                "O essencial é<br />sempre invisível<br />aos olhos."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIS VENDIDOS */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28">
        <div className="flex justify-between items-baseline mb-10">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-charcoal">
            Mais <em className="italic">Desejados</em>
          </h2>
          <Link
            to="/produtos"
            className="text-[10px] tracking-[0.2em] uppercase text-warm-gray hover:text-charcoal transition-colors flex items-center gap-2"
          >
            Ver todos <ArrowRight size={12} />
          </Link>
        </div>
        {products.length === 0 ? (
          <p className="text-center text-warm-gray text-[13px] py-12 tracking-[0.1em]">
            Em breve — novidades chegando
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p, i) => (
              <Link key={p.id} to={`/produtos/${p.slug}`} className="group">
                <div className="relative aspect-[3/4] bg-beige overflow-hidden">
                  {p.images?.[0]
                    ? <img src={p.images[0]} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    : <ProductPlaceholder index={i} />
                  }
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-charcoal text-cream text-[8px] tracking-[0.18em] uppercase px-2 py-1">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <p className="text-[9px] tracking-[0.18em] uppercase text-warm-gray mb-0.5">
                    {p.category}
                  </p>
                  <p className="font-serif text-[15px] text-charcoal mb-1 group-hover:text-gold transition-colors">
                    {p.name}
                  </p>
                  <p className="text-[12px] text-warm-gray">
                    {p.oldPrice && (
                      <span className="line-through mr-2 text-sand">{formatBRL(p.oldPrice)}</span>
                    )}
                    {formatBRL(p.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* STORES TEASER */}
      <section className="bg-off-white py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="editorial-eyebrow mb-4">Onde estamos</p>
              <h2 className="font-serif text-4xl md:text-6xl font-light text-charcoal leading-tight">
                Visite uma de<br /><em className="italic">nossas lojas</em>
              </h2>
            </div>
            <Link
              to="/lojas"
              className="text-[10px] tracking-[0.2em] uppercase text-warm-gray hover:text-charcoal transition-colors flex items-center gap-2 self-start md:self-end"
            >
              Todas as lojas <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {stores.map((store, i) => (
              <div
                key={store.id}
                className="group relative bg-cream border border-beige overflow-hidden"
              >
                <div className="aspect-[16/9] bg-sand relative overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: i === 0
                        ? 'radial-gradient(circle at 30% 60%, #9ABFB0 0%, #3A5E4E 100%)'
                        : 'radial-gradient(circle at 70% 40%, #D4E8DD 0%, #0D3829 100%)',
                      opacity: 0.7,
                    }}
                  />
                  <div className="absolute top-4 left-4 text-[9px] tracking-[0.22em] uppercase text-cream bg-charcoal/80 px-3 py-1.5">
                    {store.city}
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">
                    {store.name}
                  </h3>
                  <p className="text-[13px] text-warm-gray mb-1">{store.address}</p>
                  <p className="text-[11px] tracking-[0.1em] uppercase text-sand mb-6">
                    {store.hours}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={store.mapsUrl}
                      target="_blank"
                      rel="noopener"
                      className="flex-1 text-[10px] tracking-[0.18em] uppercase border border-charcoal/15 px-4 py-2.5 hover:bg-charcoal hover:text-cream transition-all flex items-center justify-center gap-2"
                    >
                      <MapPin size={12} /> Maps
                    </a>
                    <a
                      href={store.wazeUrl}
                      target="_blank"
                      rel="noopener"
                      className="flex-1 text-[10px] tracking-[0.18em] uppercase border border-charcoal/15 px-4 py-2.5 hover:bg-charcoal hover:text-cream transition-all flex items-center justify-center gap-2"
                    >
                      <Navigation size={12} /> Waze
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLUBE BANNER */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-20">
        <div className="bg-beige px-8 md:px-16 py-16 md:py-20 relative overflow-hidden">
          <div
            className="absolute -right-20 -top-20 w-80 h-80 border border-sand rounded-full opacity-50"
            aria-hidden
          />
          <div className="relative grid md:grid-cols-2 items-center gap-10">
            <div>
              <p className="editorial-eyebrow mb-4">Exclusivo</p>
              <h3 className="font-serif text-4xl md:text-6xl font-light text-charcoal leading-tight mb-4">
                Clube<br /><em className="italic">Sanflait</em>
              </h3>
              <p className="text-[13px] text-warm-gray max-w-sm">
                Acesso antecipado a coleções, descontos exclusivos e um
                vendedor pessoal dedicado.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link to="/clube" className="public-cta bg-charcoal text-cream border-charcoal hover:bg-charcoal-deep">
                Cadastrar-se <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Stylized SVG product placeholder — generates a unique abstract image per product
function ProductPlaceholder({ index }: { index: number }) {
  const palettes = [
    { bg: '#D4E8DD', mid: '#9ABFB0', dark: '#3A5E4E' },
    { bg: '#F4F9F6', mid: '#D4E8DD', dark: '#0D3829' },
    { bg: '#0D3829', mid: '#3A5E4E', dark: '#9ABFB0' },
    { bg: '#9ABFB0', mid: '#D4E8DD', dark: '#0D3829' },
    { bg: '#D4E8DD', mid: '#F4F9F6', dark: '#C4A040' },
    { bg: '#F4F9F6', mid: '#9ABFB0', dark: '#3A5E4E' },
  ];
  const p = palettes[index % palettes.length];
  return (
    <svg
      viewBox="0 0 300 400"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id={`pp-${index}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="100%" stopColor={p.mid} />
        </linearGradient>
        <radialGradient id={`pp-r-${index}`} cx="50%" cy="35%" r="50%">
          <stop offset="0%" stopColor={p.dark} stopOpacity="0.18" />
          <stop offset="100%" stopColor={p.dark} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="400" fill={`url(#pp-${index})`} />
      <rect width="300" height="400" fill={`url(#pp-r-${index})`} />
      <ellipse cx="150" cy="120" rx="32" ry="42" fill={p.dark} opacity="0.18" />
      <path
        d="M 110 170 Q 110 220 100 290 L 110 380 L 190 380 L 200 290 Q 190 220 190 170 Q 180 158 150 158 Q 120 158 110 170 Z"
        fill={p.dark}
        opacity="0.18"
      />
    </svg>
  );
}
