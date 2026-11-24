import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { applyTheme, getTheme, useTheme, THEME_KEY } from './theme';

describe('theme preference', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('defaults to dark when nothing is saved', () => {
    expect(getTheme()).toBe('dark');
  });

  it('returns light when light was saved', () => {
    localStorage.setItem(THEME_KEY, 'light');
    expect(getTheme()).toBe('light');
  });

  it('applyTheme persists the choice and toggles the .dark class', () => {
    applyTheme('light');
    expect(localStorage.getItem(THEME_KEY)).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    applyTheme('dark');
    expect(localStorage.getItem(THEME_KEY)).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('useTheme reacts when the theme changes elsewhere', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current).toBe('dark');
    act(() => { applyTheme('light'); });
    expect(result.current).toBe('light');
    act(() => { applyTheme('dark'); });
    expect(result.current).toBe('dark');
  });
});
