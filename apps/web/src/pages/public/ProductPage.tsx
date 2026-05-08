import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Heart, MessageCircle, Truck, RefreshCw, Shield, Loader2 } from 'lucide-react';
import { useProducts, useProduct } from '@/hooks/useProducts';
import { formatBRL } from '@/lib/utils';
import { useTracking } from '@/stores/tracking';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export function ProductPage() {
  const { slug } = useParams();
  const { data: product, isLoading } = useProduct(slug);
  const { data: allProducts = [] } = useProducts();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const { vendorSlug } = useTracking();

  const colors = Array.from(new Set((product?.variants ?? []).map((v) => v.color)));
  const sizes = Array.from(new Set((product?.variants ?? []).map((v) => v.size)));
  const color = selectedColor || colors[0] || '';
  const size = selectedSize || sizes[0] || '';

  const handleWhatsApp = () => {
    const name = product?.name ?? slug;
    const msg = vendorSlug
      ? `Olá! Vim pelo link do(a) vendedor(a) ${vendorSlug}. Tenho interesse em: ${name} (${color}, tamanho ${size}).`
      : `Olá! Tenho interesse no produto ${name} (${color}, tamanho ${size}).`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-cream">
        <Loader2 size={24} className="animate-spin text-warm-gray" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-cream gap-4">
        <p className="font-serif text-3xl text-charcoal">Produto não encontrado</p>
        <Link to="/colecoes" className="editorial-link text-charcoal hover:text-gold">
          Ver coleção <ArrowRight size={12} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-10">
        {/* Breadcrumb */}
        <nav className="text-[10px] tracking-[0.18em] uppercase text-warm-gray mb-8">
          <Link to="/" className="hover:text-charcoal">Home</Link>
          <span className="mx-3">/</span>
          <Link to="/colecoes" className="hover:text-charcoal">{product.collection}</Link>
          <span className="mx-3">/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          {/* Gallery */}
          <div className="md:col-span-7">
            {product.images && product.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {product.images.slice(0, 4).map((img, i) => (
                  <div key={i} className={`relative bg-beige overflow-hidden ${i === 0 ? 'col-span-2 aspect-[4/5]' : 'aspect-square'}`}>
                    <img src={img} alt={`${product.name} ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                ))}
                {product.images.length < 4 && Array.from({ length: 4 - product.images.length }).map((_, i) => (
                  <div key={`ph-${i}`} className="relative bg-beige overflow-hidden aspect-square">
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, #D4E8DD, #9ABFB0)', opacity: 0.5 }} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`relative bg-beige overflow-hidden ${i === 0 ? 'col-span-2 aspect-[4/5]' : 'aspect-square'}`}>
                    <div className="absolute inset-0" style={{ background: ['radial-gradient(circle at 50% 30%, #D4E8DD, #3A5E4E)', 'radial-gradient(circle at 30% 60%, #F4F9F6, #9ABFB0)', 'radial-gradient(circle at 70% 40%, #0D3829, #3A5E4E)', 'radial-gradient(circle at 50% 50%, #9ABFB0, #F4F9F6)'][i], opacity: 0.75 }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
            <p className="editorial-eyebrow mb-3">{product.collection}</p>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-4 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-serif text-2xl text-charcoal">
                {formatBRL(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-[13px] line-through text-sand">
                  {formatBRL(product.oldPrice)}
                </span>
              )}
            </div>
            {product.description && (
              <p className="text-[13px] leading-[1.8] text-warm-gray mb-10">
                {product.description}
              </p>
            )}

            {/* Color selector */}
            {colors.length > 0 && (
              <div className="mb-7">
                <p className="text-[10px] tracking-[0.2em] uppercase text-charcoal mb-3">
                  Cor: <span className="text-warm-gray">{color}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase border transition-colors ${
                        color === c
                          ? 'border-charcoal bg-charcoal text-cream'
                          : 'border-charcoal/15 text-charcoal hover:border-charcoal'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {sizes.length > 0 && (
              <div className="mb-10">
                <p className="text-[10px] tracking-[0.2em] uppercase text-charcoal mb-3">
                  Tamanho: <span className="text-warm-gray">{size}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-12 h-12 text-[12px] border transition-colors ${
                        size === s
                          ? 'border-charcoal bg-charcoal text-cream'
                          : 'border-charcoal/15 text-charcoal hover:border-charcoal'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="space-y-3 mb-8">
              <button
                onClick={handleWhatsApp}
                className="w-full bg-charcoal text-cream py-4 text-[10px] tracking-[0.22em] uppercase hover:bg-charcoal-deep transition-colors flex items-center justify-center gap-3"
              >
                <MessageCircle size={14} />
                Conversar via WhatsApp
              </button>
              <button className="w-full border border-charcoal/15 py-4 text-[10px] tracking-[0.22em] uppercase hover:bg-charcoal hover:text-cream transition-colors flex items-center justify-center gap-3">
                <Heart size={14} /> Adicionar aos favoritos
              </button>
            </div>

            {vendorSlug && (
              <div className="bg-beige/50 border border-beige px-4 py-3 mb-8">
                <p className="text-[10px] tracking-[0.18em] uppercase text-warm-gray mb-1">
                  Você está sendo atendido(a) por
                </p>
                <p className="font-serif text-base text-charcoal capitalize">
                  {vendorSlug.replace('-', ' ')}
                </p>
              </div>
            )}

            {/* Perks */}
            <div className="border-t border-beige pt-6 space-y-3 text-[12px] text-warm-gray">
              <div className="flex items-center gap-3">
                <Truck size={14} strokeWidth={1.5} />
                <span>Frete grátis acima de R$ 499</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw size={14} strokeWidth={1.5} />
                <span>Troca grátis em até 30 dias na loja física</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield size={14} strokeWidth={1.5} />
                <span>Pagamento seguro · PIX e cartão</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <section className="mt-24 md:mt-32">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light">
              Você também pode <em className="italic">gostar</em>
            </h2>
            <Link to="/produtos" className="text-[10px] tracking-[0.2em] uppercase text-warm-gray flex items-center gap-2 hover:text-charcoal">
              Ver mais <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allProducts
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p, i) => (
                <Link key={p.id} to={`/produtos/${p.slug}`} className="group">
                  <div className="aspect-[3/4] bg-beige relative overflow-hidden">
                    {p.images?.[0]
                      ? <img src={p.images[0]} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                      : <div className="absolute inset-0" style={{ background: ['radial-gradient(circle at 50% 30%, #D4E8DD, #3A5E4E)', 'radial-gradient(circle at 30% 60%, #F4F9F6, #9ABFB0)', 'radial-gradient(circle at 70% 40%, #0D3829, #3A5E4E)', 'radial-gradient(circle at 50% 50%, #9ABFB0, #F4F9F6)'][i], opacity: 0.7 }} />
                    }
                  </div>
                  <p className="font-serif text-[14px] text-charcoal mt-3">{p.name}</p>
                  <p className="text-[12px] text-warm-gray">{formatBRL(p.price)}</p>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
