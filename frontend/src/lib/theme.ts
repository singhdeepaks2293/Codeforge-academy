import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

export const THEME_KEY = 'cf-theme';
export const THEME_CHANGE_EVENT = 'cf-theme-change';

/** Dark is the default; only an explicit saved 'light' opts out. */
export function getTheme(): Theme {
  try {
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* storage unavailable (e.g. private mode) — theme still applies */
  }
  window.dispatchEvent(new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: theme }));
}

/** Reactive theme hook: re-renders when the theme changes anywhere. */
export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(() => getTheme());
  useEffect(() => {
    const onChange = (e: Event) => setTheme((e as CustomEvent<Theme>).detail);
    window.addEventListener(THEME_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onChange);
  }, []);
  return theme;
}
