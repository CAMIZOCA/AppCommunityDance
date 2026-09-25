export interface DanceEvent {
  id: string;
  name: string;
  date: string;
  day: string;
  month: string;
  venue: string;
  upcoming?: boolean;
  description: string;
}

export const EVENTS: DanceEvent[] = [
  {
    id: '1',
    name: 'Festival de Mambo Verano',
    date: '25 de julio • Teatro Central',
    day: '25',
    month: 'JUL',
    venue: 'Teatro Central',
    upcoming: true,
    description: 'Competencia regional de baile mambo',
  },
  {
    id: '2',
    name: 'Noche de Salsa en Vivo',
    date: '10 de agosto • Club Ritmo',
    day: '10',
    month: 'AGO',
    venue: 'Club Ritmo',
    description: 'Evento social con banda en vivo',
  },
  {
    id: '3',
    name: 'Masterclass: Bachata Avanzada',
    date: '2 de septiembre • Estudio de Danza',
    day: '02',
    month: 'SEP',
    venue: 'Estudio de Danza',
    description: 'Sesión especial con maestro internacional',
  },
];
