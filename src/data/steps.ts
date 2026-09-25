export interface DanceStep {
  id: string;
  name: string;
  duration: string;
  style: string;
  level: string;
  learned?: boolean;
  description: string;
}

export const STEPS: DanceStep[] = [
  {
    id: '1',
    name: 'Giro Básico',
    duration: '1:20',
    style: 'Mambo',
    level: 'Básico',
    description: 'El giro fundamental del mambo: marca el tiempo, gira sobre el eje y vuelve a la posición inicial sin perder el compás.',
  },
  {
    id: '2',
    name: 'Paso Doble',
    duration: '2:15',
    style: 'Salsa',
    level: 'Intermedio',
    learned: true,
    description: 'Combinación de dos pasos enlazados con cambio de peso rápido, ideal para conectar figuras de salsa en pareja.',
  },
  {
    id: '3',
    name: 'Cambio de Peso',
    duration: '0:45',
    style: 'Mambo',
    level: 'Básico',
    description: 'Transferencia de peso de un pie al otro manteniendo el torso estable, la base de casi todos los pasos de mambo.',
  },
  {
    id: '4',
    name: 'Vuelta Lateral',
    duration: '1:50',
    style: 'Bachata',
    level: 'Intermedio',
    description: 'Giro lateral guiado, con desplazamiento suave de cadera, típico de la bachata romántica.',
  },
];
