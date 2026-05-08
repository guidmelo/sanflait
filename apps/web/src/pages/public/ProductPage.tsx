import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Heart, MessageCircle, Truck, RefreshCw, Shield } from 'lucide-react';
import { products } from '@/lib/mock';
import { formatBRL } from '@/lib/utils';
import { useTracking } from '@/stores/tracking';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug) ?? products[0];
  const [selectedColor, setSelectedColor] = useState(product.variants[0].color);
  const [selectedSize, setSelectedSize] = useState(product.variants[0].size);
  const { vendorSlug } = useTracking();

  const colors = Array.from(new Set(product.variants.map((v) => v.color)));
  const sizes = Array.from(new Set(product.variants.map((v) => v.size)));

  const handleWhatsApp = () => {
    const msg = vendorSlug
      ? `Olá! Vim pelo link do(a) vendedor(a) ${vendorSlug}. Tenho interesse em: ${product.name} (${selectedColor}, tamanho ${selectedSize}).`
      : `Olá! Tenho interesse no produto ${product.name} (${selectedColor}, tamanho ${selectedSize}).`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

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
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`relative bg-beige overflow-hidden ${
                    i === 0 ? 'col-span-2 aspect-[4/5]' : 'aspect-square'
                  }`}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: [
                        'radial-gradient(circle at 50% 30%, #E8E0D5, #8A8278)',
                        'radial-gradient(circle at 30% 60%, #FAF8F4, #D4C9B8)',
                        'radial-gradient(circle at 70% 40%, #1A1916, #8A8278)',
                        'radial-gradient(circle at 50% 50%, #D4C9B8, #FAF8F4)',
                      ][i],
                      opacity: 0.75,
                    }}
                  />
                </div>
              ))}
            </div>
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
            <p className="text-[13px] leading-[1.8] text-warm-gray mb-10">
              {product.description}
            </p>

            {/* Color selector */}
            <div className="mb-7">
              <p className="text-[10px] tracking-[0.2em] uppercase text-charcoal mb-3">
                Cor: <span className="text-warm-gray">{selectedColor}</span>
              </p>
              <div className="flex gap-2">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase border transition-colors ${
                      selectedColor === c
                        ? 'border-charcoal bg-charcoal text-cream'
                        : 'border-charcoal/15 text-charcoal hover:border-charcoal'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.2em] uppercase text-charcoal mb-3">
                Tamanho: <span className="text-warm-gray">{selectedSize}</span>
              </p>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-12 h-12 text-[12px] border transition-colors ${
                      selectedSize === s
                        ? 'border-charcoal bg-charcoal text-cream'
                        : 'border-charcoal/15 text-charcoal hover:border-charcoal'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

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
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p, i) => (
                <Link key={p.id} to={`/produtos/${p.slug}`} className="group">
                  <div className="aspect-[3/4] bg-beige relative overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: [
                          'radial-gradient(circle at 50% 30%, #E8E0D5, #8A8278)',
                          'radial-gradient(circle at 30% 60%, #FAF8F4, #D4C9B8)',
                          'radial-gradient(circle at 70% 40%, #1A1916, #8A8278)',
                          'radial-gradient(circle at 50% 50%, #D4C9B8, #FAF8F4)',
                        ][i],
                        opacity: 0.7,
                      }}
                    />
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
