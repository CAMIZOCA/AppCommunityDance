import es from '@/i18n/es';
import en from '@/i18n/en';

// Quita tildes y pasa a minúsculas para comparar nombres de mes.
function norm(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// Lee el mes en español o inglés (ej. "oct", "octubre", "Oct", "October").
// Devuelve el índice 0-11 o null. Ambas listas viven en i18n (monthsShort).
function monthIndexOf(word: string): number | null {
  const w = norm(word);
  if (w.length < 3) return null;
  for (const names of [es.monthsShort, en.monthsShort]) {
    const idx = names.findIndex(m => w.startsWith(norm(m)));
    if (idx !== -1) return idx;
  }
  return null;
}

/**
 * Extrae día y mes de un texto libre de fecha, en cualquier idioma.
 * Acepta "Sáb 24 oct · 17:00", "24 de octubre", "Sat Oct 24", "Oct 24".
 * Si no se entiende, devuelve day '--' y month null (el evento se crea igual).
 * Guardamos el mes como índice (no como texto) para mostrarlo en el idioma activo.
 */
export function parseEventDate(label: string): { day: string; month: number | null } {
  const dayFirst = label.match(/(\d{1,2})\s*(?:de\s*)?([a-záéíóúñ]{3,})/i);
  const monthFirst = label.match(/([a-záéíóúñ]{3,})\.?\s*(?:de\s*)?(\d{1,2})\b/i);

  let dayStr: string | undefined;
  let month: number | null = null;
  if (dayFirst) {
    dayStr = dayFirst[1];
    month = monthIndexOf(dayFirst[2]);
  }
  if (month === null && monthFirst) {
    dayStr = monthFirst[2];
    month = monthIndexOf(monthFirst[1]);
  }
  const day = dayStr ? Number(dayStr) : NaN;
  if (month === null || !Number.isInteger(day) || day < 1 || day > 31) {
    return { day: '--', month: null };
  }
  return { day: String(day).padStart(2, '0'), month };
}
