// MyMambo — Nocturne design system tokens
// Dark theme with purple accent
module.exports = {
  colors: {
    // Base colors
    background: { DEFAULT: '#161826', dark: '#161826' },
    surface: { DEFAULT: '#232532', dark: '#232532' },
    text: { DEFAULT: '#e9e9ed', dark: '#e9e9ed' },
    accent: { DEFAULT: '#9184d9', foreground: '#FFFFFF' },
    primary: { DEFAULT: '#9184d9', foreground: '#FFFFFF' },
    danger: { DEFAULT: '#ef4444', foreground: '#FFFFFF' },
    divider: { DEFAULT: 'rgba(233, 233, 237, 0.16)', dark: 'rgba(233, 233, 237, 0.16)' },

    // Neutral scale (100-900)
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

    // Accent scale (100-900)
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

    // Semantic aliases
    muted: { DEFAULT: '#9397ab', dark: '#9397ab' },
    border: { DEFAULT: 'rgba(233, 233, 237, 0.16)', dark: 'rgba(233, 233, 237, 0.16)' },
  },
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
