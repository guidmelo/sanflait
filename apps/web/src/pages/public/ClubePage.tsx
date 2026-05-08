import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

const BENEFITS = [
  'Acesso antecipado a coleções',
  '15% off na primeira compra',
  'Vendedor pessoal dedicado',
  'Convites para eventos exclusivos',
  'Frete grátis em todas as compras',
  'Embrulho premium gratuito',
];

export function ClubePage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', neighborhood: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-cream">
      <section className="bg-charcoal text-cream relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 30%, #2a2620 0%, transparent 60%), linear-gradient(180deg, #1a1916 0%, #0d0d0b 100%)',
          }}
        />
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 text-center">
          <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-5">Programa de fidelidade</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[110px] font-light leading-[1.0]">
            Clube<br /><em className="italic text-sand">Sanflait</em>
          </h1>
        </div>
      </section>

      <section className="max-w-[1024px] mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28 grid md:grid-cols-2 gap-14">
        <div>
          <p className="editorial-eyebrow mb-4">Benefícios exclusivos</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal leading-tight mb-6">
            O que <em className="italic">você ganha</em>
          </h2>
          <p className="text-[13px] leading-[1.8] text-warm-gray mb-10">
            Membros Sanflait são reconhecidos com atenção, exclusividade e
            vantagens em todas as etapas da experiência.
          </p>
          <ul className="space-y-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[13px] text-charcoal">
                <Check size={14} strokeWidth={1.5} className="mt-0.5 text-gold" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-off-white p-8 md:p-10 self-start">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-charcoal flex items-center justify-center mx-auto mb-5">
                <Check size={24} strokeWidth={1.5} className="text-cream" />
              </div>
              <p className="editorial-eyebrow mb-3">Solicitação enviada</p>
              <h3 className="font-serif text-2xl font-light text-charcoal mb-4">
                Bem-vinda ao Clube!
              </h3>
              <p className="text-[13px] leading-[1.8] text-warm-gray">
                Nossa equipe entrará em contato em até 24h para confirmar seu acesso.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="editorial-eyebrow mb-4">Cadastro</p>
              <h3 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-6">
                Solicite seu acesso
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-transparent border-0 border-b border-charcoal/15 py-3 text-sm placeholder:text-warm-gray focus:outline-none focus:border-charcoal"
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-0 border-b border-charcoal/15 py-3 text-sm placeholder:text-warm-gray focus:outline-none focus:border-charcoal"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-transparent border-0 border-b border-charcoal/15 py-3 text-sm placeholder:text-warm-gray focus:outline-none focus:border-charcoal"
                />
                <input
                  type="text"
                  placeholder="Bairro"
                  value={form.neighborhood}
                  onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
                  className="w-full bg-transparent border-0 border-b border-charcoal/15 py-3 text-sm placeholder:text-warm-gray focus:outline-none focus:border-charcoal"
                />
              </div>
              <button
                type="submit"
                disabled={!form.name || !form.email}
                className="w-full mt-8 bg-charcoal text-cream py-4 text-[10px] tracking-[0.22em] uppercase hover:bg-charcoal-deep transition-colors flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Quero ser membro <ArrowRight size={12} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
