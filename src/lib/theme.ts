import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme';

function readStored(): Theme {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === 'light' || value === 'dark' || value === 'system') return value;
  } catch {
    /* localStorage unavailable (SSR / privacy mode) */
  }
  return 'system';
}

/**
 * Kumo's color tokens are defined with `light-dark()`, so the active theme is
 * controlled purely by the `color-scheme` property: "light"/"dark" force a mode,
 * "light dark" follows the OS. We set it on the root element's inline style.
 */
function applyTheme(theme: Theme) {
  document.documentElement.style.colorScheme = theme === 'system' ? 'light dark' : theme;
}

// Module-level store so every <ThemeToggle> (desktop + mobile) stays in sync.
let current: Theme = typeof window !== 'undefined' ? readStored() : 'system';
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function setTheme(theme: Theme) {
  current = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
  applyTheme(theme);
  listeners.forEach((l) => l());
}

const ORDER: Theme[] = ['light', 'dark', 'system'];

/** Subscribe to the current theme and get setter + cycle helpers. */
export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    () => current,
    () => 'system' as Theme,
  );
  const cycle = () => setTheme(ORDER[(ORDER.indexOf(current) + 1) % ORDER.length]);
  return { theme, setTheme, cycle };
}
