export interface Group {
  id: string;
  name: string;
  initials: string;
  preview: string;
  time: string;
  unread?: number;
  level: string;
  steps: number;
  style: string;
}

export const GROUPS: Group[] = [
  {
    id: '1',
    name: 'Mambo Básico',
    initials: 'MB',
    preview: 'Últimas pasos de la clase...',
    time: '2h',
    unread: 3,
    level: 'Básico',
    steps: 8,
    style: 'Mambo',
  },
  {
    id: '2',
    name: 'Salsa Intermedia',
    initials: 'SI',
    preview: 'Movimientos avanzados de giro',
    time: '4h',
    level: 'Intermedio',
    steps: 12,
    style: 'Salsa',
  },
  {
    id: '3',
    name: 'Bachata Romántica',
    initials: 'BR',
    preview: 'Técnica de pasos básicos',
    time: '1d',
    level: 'Básico',
    steps: 6,
    style: 'Bachata',
  },
];
