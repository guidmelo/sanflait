import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth, demoUsers } from '@/stores/auth';
import { SanflaitLogo } from '@/components/public/SanflaitLogo';
import api from '@/lib/api';

export function LoginPage() {
  const [email, setEmail] = useState('guilherme');
  const [password, setPassword] = useState('guilherme');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Try real API first when configured
    if (import.meta.env.VITE_API_URL) {
      try {
        const { data } = await api.post('/auth/login', { email, password });
        login(data.user, data.accessToken);
        navigate('/app/dashboard');
        return;
      } catch {
        // fall through to demo users
      } finally {
        setLoading(false);
      }
    }

    // Demo mode fallback
    const demo = demoUsers[email];
    if (demo && demo.password === password) {
      login(demo.user, `demo-${email}`);
      navigate('/app/dashboard');
      setLoading(false);
      return;
    }
    setError('Credenciais inválidas.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-ink-0 flex items-stretch text-ink-text-1">
      {/* Left side — branding */}
      <div className="hidden md:flex md:w-1/2 bg-charcoal relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 30%, #1A5235 0%, transparent 60%), linear-gradient(180deg, #0D3829 0%, #061E14 100%)',
          }}
        />
        <div className="relative z-10 p-12 lg:p-16 flex flex-col justify-between w-full">
          <Link to="/" aria-label="Sanflait" style={{ color: '#C4A040' }}>
            <SanflaitLogo className="text-2xl" />
          </Link>
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-5">Painel interno</p>
            <h1 className="font-serif text-5xl lg:text-6xl font-light text-cream leading-tight">
              Bem-vindo de<br /><em className="italic text-sand">volta.</em>
            </h1>
            <p className="text-[13px] text-warm-gray-light mt-6 max-w-md">
              Acesse o ecossistema Sanflait — vendas, CRM, analytics e
              inteligência comercial em um só lugar.
            </p>
          </div>
          <p className="text-[10px] tracking-[0.18em] text-warm-gray">© 2026 Sanflait</p>
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex-1 md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-8 text-center text-ink-text-1">
            <Link to="/" aria-label="Sanflait">
              <SanflaitLogo className="text-xl" />
            </Link>
          </div>

          <h2 className="text-2xl font-medium mb-2">Entrar na plataforma</h2>
          <p className="text-[13px] text-ink-text-3 mb-8">
            Acesse com seu e-mail corporativo.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] text-ink-text-2 mb-1.5 block">E-mail / Usuário</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="w-full bg-ink-2 border border-line rounded px-3 py-2.5 text-[13px] focus:border-accent-blue outline-none transition-colors"
                placeholder="seu@email.com"
                required
              />
            </div>
            <div>
              <label className="text-[11px] text-ink-text-2 mb-1.5 block">Senha</label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPwd ? 'text' : 'password'}
                  className="w-full bg-ink-2 border border-line rounded px-3 py-2.5 pr-10 text-[13px] focus:border-accent-blue outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-text-3 hover:text-ink-text-1"
                  aria-label="Mostrar senha"
                >
                  {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-accent-red-dim/30 border border-accent-red/30 rounded px-3 py-2 text-[12px] text-accent-red">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-blue text-white py-3 rounded text-[13px] font-medium hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
              {loading ? 'Autenticando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-line">
            <p className="text-[11px] text-ink-text-3 mb-3">Acesso demo:</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(demoUsers).map(([key, { user }]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setEmail(key);
                    setPassword(key);
                  }}
                  className="text-left bg-ink-2 border border-line rounded px-3 py-2 hover:bg-ink-3 transition-colors"
                >
                  <p className="text-[10px] tracking-[0.18em] uppercase text-ink-text-3">{user.role}</p>
                  <p className="text-[12px] text-ink-text-1">{user.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
