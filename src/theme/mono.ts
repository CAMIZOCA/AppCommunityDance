import { Platform } from 'react-native';

// RN no trae una fuente monoespaciada empaquetada multiplataforma: se usa la
// del sistema en cada plataforma (código de invitación, enlace, horarios).
export const MONO_FONT_FAMILY = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });
