import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'ADMIN' | 'GERENTE' | 'VENDEDOR' | 'SUPORTE';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  initials: string;
  avatarColor?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: 'sanflait-auth' },
  ),
);

// Usuários do sistema Sanflait
export const demoUsers: Record<string, { user: AuthUser; password: string }> = {
  guilherme: {
    password: 'guilherme',
    user: { id: 'u1', name: 'Guilherme T.I', email: 'guilherme@sanflait.com', role: 'ADMIN', initials: 'GT', avatarColor: '#C4A040' },
  },
  amanda: {
    password: 'amanda',
    user: { id: 'u2', name: 'Amanda', email: 'amanda@sanflait.com', role: 'GERENTE', initials: 'AM', avatarColor: '#0D3829' },
  },
  josy: {
    password: 'josy',
    user: { id: 'u3', name: 'Josy', email: 'josy@sanflait.com', role: 'GERENTE', initials: 'JO', avatarColor: '#3B82F6' },
  },
  monique: {
    password: 'monique',
    user: { id: 'u4', name: 'Monique', email: 'monique@sanflait.com', role: 'GERENTE', initials: 'MO', avatarColor: '#8B5CF6' },
  },
  gildson: {
    password: 'gildson',
    user: { id: 'u5', name: 'Gildson', email: 'gildson@sanflait.com', role: 'VENDEDOR', initials: 'GI', avatarColor: '#14B8A6' },
  },
  teresa: {
    password: 'teresa',
    user: { id: 'u6', name: 'Teresa', email: 'teresa@sanflait.com', role: 'VENDEDOR', initials: 'TE', avatarColor: '#F59E0B' },
  },
};
