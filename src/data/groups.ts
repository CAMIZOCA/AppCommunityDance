import type { Level } from './people';
import type { Style } from './catalog';

export interface Group {
  id: string;
  name: string;
  style: Style;
  level: Level;
  schedule: string;
  code: string;
  memberIds: string[];
}

export const SEED_GROUPS: Group[] = [
  {
    id: 'salsa-intermedio',
    name: 'Salsa Intermedio',
    style: 'salsa',
    level: 'intermedio',
    schedule: 'Lun y Mié · 19:00',
    code: 'SALI-7K2M',
    memberIds: ['sofia', 'mateo', 'valentina', 'camila', 'joaquin', 'lucas'],
  },
  {
    id: 'bachata-intermedio',
    name: 'Bachata Intermedio',
    style: 'bachata',
    level: 'intermedio',
    schedule: 'Mar y Jue · 20:00',
    code: 'BACI-3PX9',
    memberIds: ['sofia', 'camila', 'mateo', 'valentina', 'joaquin'],
  },
  {
    id: 'tropical-principiante',
    name: 'Tropical Principiante',
    style: 'tropical',
    level: 'principiante',
    schedule: 'Sáb · 11:00',
    code: 'TROP-5W1C',
    memberIds: ['sofia', 'diego', 'isabella', 'tomas'],
  },
  {
    id: 'salsa-principiante',
    name: 'Salsa Principiante',
    style: 'salsa',
    level: 'principiante',
    schedule: 'Lun y Mié · 18:00',
    code: 'SALP-4Q8D',
    memberIds: ['diego', 'isabella', 'tomas'],
  },
  {
    id: 'salsa-avanzado',
    name: 'Salsa Avanzado',
    style: 'salsa',
    level: 'avanzado',
    schedule: 'Mar y Jue · 21:00',
    code: 'SALA-9HT6',
    memberIds: ['lucas', 'andres', 'martina'],
  },
  {
    id: 'elenco-mymambo',
    name: 'Elenco MyMambo',
    style: 'elenco',
    level: 'profesional',
    schedule: 'Vie · 20:00',
    code: 'ELEP-2MB8',
    memberIds: ['martina', 'renata', 'andres', 'lucas'],
  },
];

// "Nuevos" iniciales por grupo (sección 15), se limpian al entrar al grupo.
export const INITIAL_NEW_STEPS: Record<string, number> = {
  'salsa-intermedio': 2,
  'tropical-principiante': 1,
  'salsa-avanzado': 3,
};
