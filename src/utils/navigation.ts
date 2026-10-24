import { router, type Href } from 'expo-router';

/**
 * Vuelve atrás si hay historial. Si no lo hay (p. ej. se abrió un enlace directo),
 * reemplaza la pantalla por `fallback` para no quedar sin salida.
 */
export function goBackOr(fallback: Href) {
  if (router.canGoBack()) router.back();
  else router.replace(fallback);
}
