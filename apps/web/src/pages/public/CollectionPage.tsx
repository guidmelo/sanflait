import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, SlidersHorizontal, X } from 'lucide-react';
import { products } from '@/lib/mock';
import { formatBRL } from '@/lib/utils';

const PAGE_SIZE = 8;

export function CollectionPage() {
  const { slug } = useParams();
  const title = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Coleção';
  const [sort, setSort] = useState('newest');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [showFilters, setShowFilters] = useState(false);

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
    else if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
    return list;
  }, [sort]);

  const displayed = sorted.slice(0, visible);
  const hasMore = visible < sorted.length;

  return (
    <div className="bg-cream">
      <section className="border-b border-beige py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
          <p className="editorial-eyebrow mb-4">Coleção</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-charcoal leading-none">
            {title}
          </h1>
          <p className="text-[13px] text-warm-gray mt-6 max-w-xl">
            Curadoria de peças selecionadas pela equipe Sanflait — silhuetas
            atemporais, tecidos nobres, design contemporâneo.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="border-b border-beige sticky top-16 md:top-20 bg-cream/95 backdrop-blur-md z-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 h-12 flex items-center justify-between">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-charcoal"
          >
            {showFilters ? <X size={12} /> : <SlidersHorizontal size={12} />}
            {showFilters ? 'Fechar' : 'Filtrar'}
          </button>
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setVisible(PAGE_SIZE); }}
            className="text-[10px] tracking-[0.18em] uppercase bg-transparent text-charcoal focus:outline-none cursor-pointer"
          >
            <option value="newest">Mais recentes</option>
            <option value="price-high">Maior preço</option>
            <option value="price-low">Menor preço</option>
            <option value="bestseller">Mais vendidos</option>
          </select>
        </div>

        {showFilters && (
          <div className="border-t border-beige px-6 md:px-10 lg:px-14 py-4 flex flex-wrap gap-3">
            <p className="text-[10px] tracking-[0.18em] uppercase text-warm-gray self-center mr-4">Coleção:</p>
            {Array.from(new Set(products.map((p) => p.collection))).map((col) => (
              <button key={col} className="text-[10px] tracking-[0.15em] uppercase border border-charcoal/15 px-4 py-1.5 hover:bg-charcoal hover:text-cream transition-colors text-charcoal">
                {col}
              </button>
            ))}
          </div>
        )}
      </div>

      <section className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayed.map((p, i) => (
            <Link key={p.id} to={`/produtos/${p.slug}`} className="group">
              <div className="relative aspect-[3/4] bg-beige overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: [
                      'radial-gradient(circle at 50% 30%, #E8E0D5, #8A8278)',
                      'radial-gradient(circle at 30% 60%, #FAF8F4, #D4C9B8)',
                      'radial-gradient(circle at 70% 40%, #1A1916, #8A8278)',
                      'radial-gradient(circle at 50% 50%, #D4C9B8, #1A1916)',
                      'radial-gradient(circle at 40% 30%, #FAF8F4, #B8973A)',
                      'radial-gradient(circle at 60% 50%, #D4C9B8, #FAF8F4)',
                    ][i % 6],
                    opacity: 0.7,
                  }}
                />
                {p.badge && (
                  <span className="absolute top-3 left-3 bg-charcoal text-cream text-[8px] tracking-[0.18em] uppercase px-2 py-1">
                    {p.badge}
                  </span>
                )}
                <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-all bg-gradient-to-t from-charcoal/40 to-transparent">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-cream border-b border-cream pb-1">
                    Ver produto
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-[9px] tracking-[0.18em] uppercase text-warm-gray mb-0.5">
                  {p.collection}
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

        {hasMore && (
          <div className="text-center mt-16">
            <button className="public-cta" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Carregar mais <ArrowRight size={12} />
            </button>
          </div>
        )}
        {!hasMore && sorted.length > PAGE_SIZE && (
          <p className="text-center mt-10 text-[11px] tracking-[0.15em] uppercase text-warm-gray">
            Todos os {sorted.length} produtos exibidos
          </p>
        )}
      </section>
    </div>
  );
}
