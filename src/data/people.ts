export type Level = 'principiante' | 'intermedio' | 'avanzado' | 'profesional';

export interface Person {
  id: string;
  name: string;
  level: Level;
}

export const TEACHER_ID = 'profe-daniela';
export const CURRENT_STUDENT_ID = 'sofia';

export const PEOPLE: Person[] = [
  { id: TEACHER_ID, name: 'Profe Daniela', level: 'profesional' },
  { id: CURRENT_STUDENT_ID, name: 'Sofía Ramírez', level: 'intermedio' },
  { id: 'mateo', name: 'Mateo López', level: 'intermedio' },
  { id: 'valentina', name: 'Valentina Cruz', level: 'intermedio' },
  { id: 'camila', name: 'Camila Torres', level: 'intermedio' },
  { id: 'joaquin', name: 'Joaquín Paredes', level: 'intermedio' },
  { id: 'diego', name: 'Diego Herrera', level: 'principiante' },
  { id: 'isabella', name: 'Isabella Rojas', level: 'principiante' },
  { id: 'tomas', name: 'Tomás Ibarra', level: 'principiante' },
  { id: 'lucas', name: 'Lucas Mendoza', level: 'avanzado' },
  { id: 'andres', name: 'Andrés Vega', level: 'avanzado' },
  { id: 'martina', name: 'Martina Silva', level: 'profesional' },
  { id: 'renata', name: 'Renata Castillo', level: 'profesional' },
];

export function personById(id: string): Person | undefined {
  return PEOPLE.find(p => p.id === id);
}

export function initialsOf(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');
}
