/**
 * Saca el nombre del archivo de una uri (p. ej. "file:///.../Coreo%20final.mov" -> "Coreo final.mov").
 * Devuelve undefined si la uri no tiene un último segmento utilizable.
 */
export function fileNameFromUri(uri?: string | null): string | undefined {
  if (!uri) return undefined;
  const clean = uri.split(/[?#]/)[0];
  const last = clean.split('/').pop();
  if (!last) return undefined;
  try {
    return decodeURIComponent(last);
  } catch {
    return last;
  }
}
