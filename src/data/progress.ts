// El id de cada tarjeta coincide con el id del grupo correspondiente en
// src/data/groups.ts, así que el detalle de progreso reutiliza /grupo/[id].
export interface ProgressCard {
  id: string;
  name: string;
  progress: number;
  label: string;
  subtitle: string;
}

export const PROGRESS: ProgressCard[] = [
  {
    id: '1',
    name: 'Mambo Básico',
    progress: 75,
    label: '75%',
    subtitle: '6 de 8 pasos completados',
  },
  {
    id: '2',
    name: 'Salsa Intermedia',
    progress: 42,
    label: '42%',
    subtitle: '5 de 12 pasos completados',
  },
  {
    id: '3',
    name: 'Bachata Romántica',
    progress: 100,
    label: '100%',
    subtitle: 'Todos los pasos dominados',
  },
];
