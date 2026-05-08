import { MapPin, Navigation, Clock, ExternalLink } from 'lucide-react';
import { stores } from '@/lib/mock';

export function StoresPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="bg-charcoal text-cream relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 80% 20%, #1A5235 0%, transparent 60%), linear-gradient(180deg, #0D3829 0%, #061E14 100%)',
          }}
        />
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
          <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-5">Onde estamos</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[120px] font-light leading-[1.0] max-w-4xl">
            Nossas<br /><em className="italic text-sand">lojas físicas</em>
          </h1>
          <p className="text-[13px] tracking-[0.12em] uppercase text-warm-gray-light mt-8">
            Paulo Afonso · Bahia
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28">
        <div className="space-y-20 md:space-y-32">
          {stores.map((store, i) => (
            <div
              key={store.id}
              className={`grid md:grid-cols-12 gap-8 md:gap-14 items-center ${
                i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="md:col-span-7 aspect-[4/3] bg-sand relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      i === 0
                        ? 'radial-gradient(circle at 30% 60%, #9ABFB0 0%, #3A5E4E 100%)'
                        : 'radial-gradient(circle at 70% 40%, #D4E8DD 0%, #0D3829 100%)',
                    opacity: 0.75,
                  }}
                />
                <div className="absolute bottom-6 left-6 text-[10px] tracking-[0.22em] uppercase text-cream bg-charcoal/80 px-3 py-2">
                  Loja {i + 1} · {store.city}
                </div>
              </div>

              <div className="md:col-span-5">
                <p className="editorial-eyebrow mb-4">Loja {String(i + 1).padStart(2, '0')}</p>
                <h2 className="font-serif text-4xl md:text-6xl font-light text-charcoal leading-tight mb-6">
                  {store.name}
                </h2>
                <p className="text-[13px] leading-[1.8] text-warm-gray mb-8 max-w-md">
                  {store.description}
                </p>

                <div className="space-y-3 mb-10 text-[13px]">
                  <div className="flex items-start gap-3">
                    <MapPin size={14} strokeWidth={1.5} className="mt-0.5 text-warm-gray" />
                    <span className="text-charcoal">{store.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={14} strokeWidth={1.5} className="mt-0.5 text-warm-gray" />
                    <span className="text-charcoal">{store.hours}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={store.mapsUrl}
                    target="_blank"
                    rel="noopener"
                    className="public-cta gap-2"
                  >
                    <MapPin size={12} /> Google Maps <ExternalLink size={10} />
                  </a>
                  <a
                    href={store.wazeUrl}
                    target="_blank"
                    rel="noopener"
                    className="public-cta gap-2"
                  >
                    <Navigation size={12} /> Waze
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
