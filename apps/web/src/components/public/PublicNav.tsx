import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { products } from '@/lib/mock';

const NAV = [
  { label: 'Novidades', to: '/colecoes/novidades' },
  { label: 'Coleções', to: '/colecoes' },
  { label: 'Lojas', to: '/lojas' },
  { label: 'Clube Sanflait', to: '/clube' },
];

export function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShowSearch(false);
    setSearchQuery('');
  }, [location.pathname]);

  useEffect(() => {
    if (showSearch) setTimeout(() => inputRef.current?.focus(), 50);
  }, [showSearch]);

  const searchResults = searchQuery.length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.collection.toLowerCase().includes(searchQuery.toLowerCase()),
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(`/produtos/${searchResults[0].slug}`);
      setShowSearch(false);
    }
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
          scrolled
            ? 'bg-cream/85 backdrop-blur-xl border-b border-beige'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 h-16 md:h-20 flex items-center justify-between">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-charcoal"
            aria-label="Menu"
          >
            <Menu size={20} strokeWidth={1.25} />
          </button>

          <Link to="/" className="font-serif text-lg md:text-2xl tracking-[0.18em] font-light text-charcoal">
            SANFLAIT
          </Link>

          <div className="hidden md:flex items-center gap-7 lg:gap-10">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-[10px] tracking-[0.15em] uppercase text-warm-gray hover:text-charcoal transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-5 text-charcoal">
            <button aria-label="Buscar" onClick={() => setShowSearch((v) => !v)}>
              <Search size={16} strokeWidth={1.25} />
            </button>
            <button aria-label="Favoritos" className="hidden md:block">
              <Heart size={16} strokeWidth={1.25} />
            </button>
            <Link to="/login" aria-label="Conta"><User size={16} strokeWidth={1.25} /></Link>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-cream/95 backdrop-blur-xl flex flex-col">
          <div className="max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-14 h-16 md:h-20 flex items-center gap-4">
            <Search size={18} strokeWidth={1.25} className="text-warm-gray flex-shrink-0" />
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <input
                ref={inputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar peças, coleções..."
                className="w-full bg-transparent text-charcoal text-lg md:text-2xl font-serif font-light placeholder:text-warm-gray focus:outline-none"
              />
            </form>
            <button onClick={() => setShowSearch(false)} aria-label="Fechar busca">
              <X size={20} strokeWidth={1.25} className="text-charcoal" />
            </button>
          </div>
          {searchResults.length > 0 && (
            <div className="max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-14 border-t border-beige mt-2">
              {searchResults.map((p) => (
                <Link
                  key={p.id}
                  to={`/produtos/${p.slug}`}
                  className="flex items-center gap-4 py-4 border-b border-beige hover:text-gold transition-colors"
                >
                  <div className="w-10 h-14 bg-beige flex-shrink-0" />
                  <div>
                    <p className="font-serif text-base text-charcoal">{p.name}</p>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-warm-gray">{p.collection}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {searchQuery.length > 1 && searchResults.length === 0 && (
            <p className="max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-14 mt-8 text-[13px] text-warm-gray">
              Nenhum resultado para "{searchQuery}"
            </p>
          )}
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-cream md:hidden animate-fade-in">
          <div className="px-6 h-16 flex items-center justify-between border-b border-beige">
            <span className="font-serif text-lg tracking-[0.18em] text-charcoal">SANFLAIT</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Fechar"><X size={20} strokeWidth={1.25} /></button>
          </div>
          <div className="p-6 flex flex-col gap-6">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="font-serif text-3xl text-charcoal"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
