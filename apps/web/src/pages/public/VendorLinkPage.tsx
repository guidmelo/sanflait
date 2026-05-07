import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTracking } from '@/stores/tracking';
import { vendors } from '@/lib/mock';

export function VendorLinkPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { attributeToVendor } = useTracking();

  useEffect(() => {
    if (!slug) return;
    const vendor = vendors.find((v) => v.slug === slug);
    if (vendor) {
      attributeToVendor(vendor.slug, vendor.id);
    }
    // POST /api/tracking/sessions
    fetch('/api/tracking/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vendorSlug: slug,
        landingPage: window.location.pathname,
        referrer: document.referrer,
      }),
    }).catch(() => {});

    const t = setTimeout(() => navigate('/', { replace: true }), 1400);
    return () => clearTimeout(t);
  }, [slug, attributeToVendor, navigate]);

  const vendor = vendors.find((v) => v.slug === slug);

  return (
    <div className="min-h-[80vh] bg-cream flex items-center justify-center px-6">
      <div className="text-center max-w-md animate-fade-up">
        <p className="editorial-eyebrow mb-6">Bem-vindo</p>
        {vendor ? (
          <>
            <div
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-cream font-serif text-2xl"
              style={{ background: vendor.color }}
            >
              {vendor.initials}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-charcoal leading-tight mb-3">
              Você está com<br /><em className="italic">{vendor.name}</em>
            </h1>
            <p className="text-[13px] text-warm-gray mb-8">
              Seu atendimento exclusivo na Sanflait. Vamos te direcionar à
              nossa coleção...
            </p>
          </>
        ) : (
          <>
            <h1 className="font-serif text-4xl font-light text-charcoal mb-3">
              Bem-vindo à Sanflait
            </h1>
            <p className="text-[13px] text-warm-gray mb-8">
              Direcionando você...
            </p>
          </>
        )}
        <div className="w-full h-0.5 bg-beige overflow-hidden">
          <div className="h-full bg-charcoal animate-[shimmer_1.4s_linear_forwards]" style={{ width: '100%', transformOrigin: 'left' }} />
        </div>
      </div>
    </div>
  );
}
