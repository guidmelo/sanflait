import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { INSTAGRAM_URL, FACEBOOK_URL, WHATSAPP_URL } from '@/lib/constants';
import { SanflaitLogo } from '@/components/public/SanflaitLogo';

const FOOTER_LINKS = [
  { label: 'Novidades', to: '/colecoes/novidades' },
  { label: 'Coleções', to: '/colecoes' },
  { label: 'Clube Sanflait', to: '/clube' },
  { label: 'Produtos', to: '/produtos' },
  { label: 'Lojas', to: '/lojas' },
  { label: 'Contato', to: '/contato' },
];

export function PublicFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-cream border-t border-beige">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 pt-20 pb-10">
        {/* Newsletter */}
        <div className="border-b border-beige pb-14 mb-14 grid md:grid-cols-2 gap-12 items-end">
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-gold mb-3">Newsletter</p>
            <h3 className="font-serif text-3xl md:text-5xl font-light text-charcoal leading-tight">
              15% off na sua<br /><em>primeira compra</em>
            </h3>
          </div>
          {subscribed ? (
            <div className="flex flex-col gap-4">
              <p className="font-serif text-xl text-charcoal">Obrigada por se inscrever!</p>
              <p className="text-[13px] text-warm-gray">Seu cupom de 15% off foi enviado para o seu e-mail.</p>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
                required
                className="border-0 border-b border-charcoal/20 bg-transparent py-3 text-sm placeholder:text-warm-gray focus:outline-none focus:border-charcoal"
              />
              <button
                type="submit"
                className="self-start text-[10px] tracking-[0.2em] uppercase border border-charcoal/15 px-7 py-3 hover:bg-charcoal hover:text-cream transition-all"
              >
                Inscrever-se
              </button>
            </form>
          )}
        </div>

        {/* Logo + Links */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block text-charcoal text-3xl md:text-4xl hover:text-gold transition-colors" aria-label="Sanflait">
            <SanflaitLogo />
          </Link>
        </div>

        <div className="flex justify-center flex-wrap gap-x-8 gap-y-3 mb-10">
          {FOOTER_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[10px] tracking-[0.18em] uppercase text-warm-gray hover:text-charcoal transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex justify-center gap-6 mb-10">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-warm-gray hover:text-charcoal transition-colors">
            <Instagram size={18} strokeWidth={1.25} />
          </a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-warm-gray hover:text-charcoal transition-colors">
            <Facebook size={18} strokeWidth={1.25} />
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-warm-gray hover:text-charcoal transition-colors">
            <MessageCircle size={18} strokeWidth={1.25} />
          </a>
        </div>

        <p className="text-center text-[10px] tracking-[0.08em] text-sand">
          © 2026 Sanflait · Todos os direitos reservados · Recife, PE
        </p>
      </div>
    </footer>
  );
}
