@AGENTS.md

# Proyecto

App iOS/Android con **Expo (SDK 57) + Expo Router + NativeWind v4 + TypeScript**.
Responde y comenta el código en español.

## Estructura

- `src/app/` — solo pantallas y layouts (Expo Router). `(tabs)/` = pestañas.
- `src/components/` — componentes reutilizables (`Screen`, `Button`, `Card`). Exporta todo desde `index.ts`.
- `src/theme/tokens.js` — **única fuente** de colores, radios y fuentes. Tailwind los lee desde `tailwind.config.js`.
- `design/` — material que viene de Claude Design (ver abajo).

## Estilos

- Usa siempre `className` de NativeWind. No uses `StyleSheet` salvo que sea imprescindible.
- Nunca pongas colores en hex dentro de componentes: agrégalos a `src/theme/tokens.js` y usa la clase (`bg-primary`, `text-muted`...).
- Soporta modo oscuro con el prefijo `dark:` (ej. `bg-background dark:bg-background-dark`).
- Envuelve cada pantalla en `<Screen>` para respetar el safe area.

## Implementar un diseño de Claude Design

Cuando el usuario pida implementar un diseño:

1. Lee lo que hay en `design/export/` (HTML/CSS/README del handoff) y mira las imágenes de `design/screenshots/`.
2. Primero extrae colores, tipografía, espaciados y radios y actualiza `src/theme/tokens.js`.
3. Crea los componentes reutilizables en `src/components/` antes de armar pantallas.
4. Crea una ruta en `src/app/` por cada pantalla del diseño.
5. Traduce HTML → React Native: `div`→`View`, texto→`Text`, `button`/links→`Pressable` o `Link`, `img`→`expo-image`, listas largas→`FlatList`. Nada de CSS de web que no exista en RN (grid, hover, `position: fixed`).
6. Iconos: `expo-symbols` (SF Symbols) en iOS.
7. Al terminar: `npx tsc --noEmit` y `npx expo lint`, y pide al usuario que lo pruebe en Expo Go.

## Reglas

- Instala paquetes con `npx expo install <paquete>`, nunca con `npm install` directo.
- Solo librerías compatibles con Expo Go mientras sea posible (evita módulos nativos custom).
- Cambios pequeños y verificables; una pantalla a la vez.
