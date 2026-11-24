import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

interface Toast { id: number; message: string; kind: 'success' | 'error' | 'info'; }
const ToastCtx = createContext<(message: string, kind?: Toast['kind']) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((message: string, kind: Toast['kind'] = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4500);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} role="alert"
            className={`rounded-lg border border-line px-4 py-2 text-sm font-medium shadow-md transition-all duration-200 ${t.kind === 'success' ? 'bg-success text-white' : t.kind === 'error' ? 'bg-danger text-white' : 'bg-elevated text-ink'}`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
export function useToast() { return useContext(ToastCtx); }
