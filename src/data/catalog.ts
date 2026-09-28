import type { Level } from './people';

export type Style = 'salsa' | 'bachata' | 'tropical' | 'elenco';

export const STYLES: Style[] = ['salsa', 'bachata', 'tropical', 'elenco'];
export const LEVELS: Level[] = ['principiante', 'intermedio', 'avanzado', 'profesional'];

// Letra de nivel usada en los códigos de invitación (sección 15 del spec:
// Profesional también usa "P", igual que Principiante).
export function levelCode(level: Level): string {
  switch (level) {
    case 'principiante':
      return 'P';
    case 'intermedio':
      return 'I';
    case 'avanzado':
      return 'A';
    case 'profesional':
      return 'P';
  }
}

export function styleCode(style: Style): string {
  switch (style) {
    case 'salsa':
      return 'SAL';
    case 'bachata':
      return 'BAC';
    case 'tropical':
      return 'TRO';
    case 'elenco':
      return 'ELE';
  }
}

const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export function randomInviteSuffix(): string {
  let out = '';
  for (let i = 0; i < 4; i++) {
    out += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return out;
}

export function makeInviteCode(style: Style, level: Level): string {
  return `${styleCode(style)}${levelCode(level)}-${randomInviteSuffix()}`;
}
