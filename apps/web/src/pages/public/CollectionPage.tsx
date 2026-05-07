import { Link, useParams } from 'react-router-dom';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import { products } from '@/lib/mock';
import { formatBRL } from '@/lib/utils';

export function CollectionPage() {
  const { slug } = useParams();
  const title = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Coleção';

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
          <button className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-charcoal">
            <SlidersHorizontal size={12} /> Filtrar
          </button>
          <select className="text-[10px] tracking-[0.18em] uppercase bg-transparent text-charcoal focus:outline-none">
            <option>Mais recentes</option>
            <option>Maior preço</option>
            <option>Menor preço</option>
            <option>Mais vendidos</option>
          </select>
        </div>
      </div>

      <section className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, i) => (
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

        <div className="text-center mt-16">
          <button className="public-cta">
            Carregar mais <ArrowRight size={12} />
          </button>
        </div>
      </section>
    </div>
  );
}
