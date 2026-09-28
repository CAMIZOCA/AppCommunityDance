import es from './es';
import en from './en';
import { useAppStore } from '@/store/useAppStore';

const DICTS = { es, en };

function getPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as object)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function interpolate(value: string, vars?: Record<string, string | number>): string {
  if (!vars) return value;
  return value.replace(/\{\{(\w+)\}\}/g, (_, k) => String(vars[k] ?? ''));
}

export type Lang = keyof typeof DICTS;

export function translate(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const raw = getPath(DICTS[lang], key);
  if (typeof raw === 'string') return interpolate(raw, vars);
  if (Array.isArray(raw)) return raw as unknown as string;
  return key;
}

export function countsFor(lang: Lang, style: string): string[] {
  const raw = getPath(DICTS[lang], `counts.${style}`);
  return Array.isArray(raw) ? (raw as string[]) : [];
}

/** Hook: t() ligado al idioma actual del store, se re-renderiza al cambiarlo. */
export function useT() {
  const lang = useAppStore(s => s.language);
  return {
    lang,
    t: (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars),
    counts: (style: string) => countsFor(lang, style),
  };
}
