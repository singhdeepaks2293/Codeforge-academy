import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api } from '../lib/api';

export interface User { id: string; email: string; displayName: string; role: string; status: string; }
interface AuthState { user: User | null; permissions: string[]; loading: boolean; refresh: () => Promise<void>; logout: () => Promise<void>; }

const AuthCtx = createContext<AuthState>({ user: null, permissions: [], loading: true, refresh: async () => {}, logout: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const d = await api<{ user: User; permissions: string[] }>('/api/auth/me');
      setUser(d.user);
      setPermissions(d.permissions);
    } catch {
      setUser(null);
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const logout = async () => {
    try { await api('/api/auth/logout', { method: 'POST' }); } catch { /* ignore */ }
    setUser(null);
    setPermissions([]);
  };

  return <AuthCtx.Provider value={{ user, permissions, loading, refresh, logout }}>{children}</AuthCtx.Provider>;
}

export function useAuth() { return useContext(AuthCtx); }
export function useCan(perm: string): boolean {
  const { user, permissions } = useAuth();
  if (user?.role === 'super-admin') return true;
  return permissions.includes(perm);
}
