// MyMambo — Nocturne design system tokens
// Modo oscuro (por defecto) + modo claro. Los valores de color viven aquí
// y en src/global.css como variables CSS (:root = claro, .dark = oscuro);
// si cambias un color, actualiza ambos archivos.
//
// IMPORTANTE sobre las escalas `neutral` y `accentScale`: no son una simple
// inversión de valores. En oscuro, los números bajos (300-500) son tonos
// claros usados como texto legible sobre fondo oscuro, y los números altos
// (800-900) son tonos oscuros usados como relleno sutil. En claro, esos
// mismos roles necesitan lo contrario (texto oscuro, relleno claro), así
// que la escala "claro" está invertida en luminosidad respecto a "oscuro"
// para que cada número siga cumpliendo el mismo rol visual en ambos modos.

const dark = {
  background: '#161826',
  surface: '#232532',
  text: '#e9e9ed',
  accent: '#9184d9',
  danger: '#ef4444',
  divider: 'rgba(233, 233, 237, 0.16)',
  muted: '#9397ab',
  foreground: '#FFFFFF',
  neutral: {
    100: '#f3f5fe',
    200: '#e4e7f5',
    300: '#cfd3e5',
    400: '#b2b6ca',
    500: '#9397ab',
    600: '#75798c',
    700: '#595d6c',
    800: '#3f424d',
    900: '#292b31',
  },
  accentScale: {
    100: '#f5f4ff',
    200: '#e7e5fe',
    300: '#d2cefd',
    400: '#b5abfc',
    500: '#968ae0',
    600: '#796cbf',
    700: '#5d5294',
    800: '#423a6a',
    900: '#2b2741',
  },
};

const light = {
  background: '#f7f6fb',
  surface: '#ffffff',
  text: '#1c1b26',
  accent: '#6a5bc9',
  danger: '#dc2626',
  divider: 'rgba(28, 27, 38, 0.1)',
  muted: '#6b6f82',
  foreground: '#FFFFFF',
  neutral: {
    100: '#20222c',
    200: '#2b2d3a',
    300: '#33354a',
    400: '#4a4d63',
    500: '#6b6f82',
    600: '#8a8da0',
    700: '#a6a8b8',
    800: '#dedce6',
    900: '#ece9f2',
  },
  accentScale: {
    100: '#3c3470',
    200: '#4a4187',
    300: '#5d5294',
    400: '#796cbf',
    500: '#968ae0',
    600: '#b5abfc',
    700: '#d2cefd',
    800: '#efeaff',
    900: '#f5f4ff',
  },
};

// Paletas resueltas (hex reales) para usos que no pasan por className, como
// el prop `color` de <Icon>/expo-symbols o tabBarActiveTintColor. Úsalas a
// través de useThemeColors(), que elige la paleta según el modo activo.
const palettes = { light, dark };

// Colores para tailwind.config.js: apuntan a las variables CSS definidas en
// src/global.css, así que className="bg-background" (etc.) cambia solo con
// el modo activo, sin necesitar clases `dark:` por separado.
const colors = {
  background: 'var(--color-background)',
  surface: 'var(--color-surface)',
  text: 'var(--color-text)',
  accent: { DEFAULT: 'var(--color-accent)', foreground: dark.foreground },
  primary: { DEFAULT: 'var(--color-accent)', foreground: dark.foreground },
  danger: { DEFAULT: 'var(--color-danger)', foreground: dark.foreground },
  divider: 'var(--color-divider)',
  muted: 'var(--color-muted)',
  border: 'var(--color-divider)',
  neutral: {
    100: 'var(--color-neutral-100)',
    200: 'var(--color-neutral-200)',
    300: 'var(--color-neutral-300)',
    400: 'var(--color-neutral-400)',
    500: 'var(--color-neutral-500)',
    600: 'var(--color-neutral-600)',
    700: 'var(--color-neutral-700)',
    800: 'var(--color-neutral-800)',
    900: 'var(--color-neutral-900)',
  },
  accentScale: {
    100: 'var(--color-accent-scale-100)',
    200: 'var(--color-accent-scale-200)',
    300: 'var(--color-accent-scale-300)',
    400: 'var(--color-accent-scale-400)',
    500: 'var(--color-accent-scale-500)',
    600: 'var(--color-accent-scale-600)',
    700: 'var(--color-accent-scale-700)',
    800: 'var(--color-accent-scale-800)',
    900: 'var(--color-accent-scale-900)',
  },
};

module.exports = {
  colors,
  palettes,
  radius: {
    sm: '8px',
    md: '12px',
    lg: '18px',
    xl: '24px',
    card: '18px',
    button: '14px',
    full: '9999px',
  },
  fontFamily: {
    'body': 'Inter',
    'heading': 'Inter',
  },
  fontSize: {
    '2xs': '10px',
    xs: '11px',
    sm: '12px',
    3: '13px',
    base: '14px',
    md: '15px',
    lg: '16px',
    '4.25': '16px',
    xl: '17px',
    '4.5': '17px',
    '2xl': '18px',
    '2.75': '12px',
    '3xl': '20px',
    '5.5': '20px',
    '4xl': '24px',
    '5xl': '28px',
    7: '28px',
    '6xl': '48px',
    '7xl': '132px',
  },
  spacing: {
    0: '0',
    1: '2.8px',
    2: '5.6px',
    3: '8.4px',
    4: '11.2px',
    6: '16.8px',
    8: '22.4px',
    10: '28px',
    12: '33.6px',
    14: '39.2px',
    16: '44.8px',
    20: '56px',
    24: '67.2px',
    32: '89.6px',
  },
};
