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

// Demo users for instant login (substitute by real API auth)
export const demoUsers: Record<string, { user: AuthUser; password: string }> = {
  admin: {
    password: 'admin',
    user: { id: 'u1', name: 'Camila Sanflait', email: 'admin@sanflait.com', role: 'ADMIN', initials: 'CS', avatarColor: '#8B5CF6' },
  },
  gerente: {
    password: 'gerente',
    user: { id: 'u2', name: 'Rafael Costa', email: 'gerente@sanflait.com', role: 'GERENTE', initials: 'RC', avatarColor: '#14B8A6' },
  },
  vendedor: {
    password: 'vendedor',
    user: { id: 'u3', name: 'Guilherme Melo', email: 'guilherme@sanflait.com', role: 'VENDEDOR', initials: 'GM', avatarColor: '#3B82F6' },
  },
  suporte: {
    password: 'suporte',
    user: { id: 'u4', name: 'Bruno Alves', email: 'suporte@sanflait.com', role: 'SUPORTE', initials: 'BA', avatarColor: '#F59E0B' },
  },
};
