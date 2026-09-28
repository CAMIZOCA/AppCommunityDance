import type { Level } from './people';
import type { Style } from './catalog';
import { SEED_GROUPS } from './groups';
export { fmtDuration } from '@/utils/format';

export interface Step {
  id: string;
  name: string;
  style: Style;
  level: Level;
  durationSec: number;
  notes: { es: string; en: string };
  /** Número de combo dentro del pénsum (ej. Salsa: 1 = Fundamentos, 2 = Básico). */
  combo?: number;
  /** uri de un video elegido con el picker en esta sesión (nunca se reproduce de verdad, ver plan). */
  videoUri?: string;
}

// Orden del array = secuencia del pénsum MyMambo (así se listan en cada grupo).
export const SEED_STEPS: Step[] = [
  // Salsa · Fundamentos (Combo 1) → principiante
  {
    id: 'salsa-p-clasica',
    name: 'Clásica',
    style: 'salsa',
    level: 'principiante',
    durationSec: 13,
    combo: 1,
    notes: {
      es: 'Primera figura del pénsum: la base de la que salen todas las demás.',
      en: 'The first figure of the curriculum: the base every other figure builds on.',
    },
  },
  {
    id: 'salsa-p-sombrero',
    name: 'Sombrero',
    style: 'salsa',
    level: 'principiante',
    durationSec: 16,
    combo: 1,
    notes: {
      es: 'Los brazos pasan por encima de la cabeza como un sombrero; cuida el tiempo de pausa.',
      en: 'The arms pass over the head like a hat — watch the pause beat.',
    },
  },
  {
    id: 'salsa-p-ocho',
    name: 'Ocho',
    style: 'salsa',
    level: 'principiante',
    durationSec: 15,
    combo: 1,
    notes: {
      es: 'La pareja dibuja un ocho en el piso sin soltar la conexión de manos.',
      en: 'The couple traces a figure eight on the floor without losing the hand connection.',
    },
  },
  {
    id: 'salsa-p-cubano',
    name: 'Cubano',
    style: 'salsa',
    level: 'principiante',
    durationSec: 14,
    combo: 1,
    notes: {
      es: 'Básico cubano: marca el compás con el peso bien asentado.',
      en: 'Cuban basic: mark the beat with your weight well grounded.',
    },
  },
  {
    id: 'salsa-p-paseos',
    name: 'Paseos 0, 1 y 2',
    style: 'salsa',
    level: 'principiante',
    durationSec: 20,
    combo: 1,
    notes: {
      es: 'Serie de paseos en progresión: domina el 0 antes de pasar al 1 y al 2.',
      en: 'A progressive series of walks: master 0 before moving on to 1 and 2.',
    },
  },
  // Salsa · Básico (Combo 2) → intermedio
  {
    id: 'salsa-i-tunel',
    name: 'Túnel por debajo',
    style: 'salsa',
    level: 'intermedio',
    durationSec: 16,
    combo: 2,
    notes: {
      es: 'La pareja pasa por debajo del brazo como por un túnel, sin perder el compás.',
      en: 'Your partner passes under the arm as if through a tunnel, staying on the beat.',
    },
  },
  {
    id: 'salsa-i-open',
    name: 'Open',
    style: 'salsa',
    level: 'intermedio',
    durationSec: 14,
    combo: 2,
    notes: {
      es: 'Apertura de la pareja hacia afuera para pasar a posición abierta.',
      en: 'The couple opens outward into open position.',
    },
  },
  {
    id: 'salsa-i-mariposa',
    name: 'Mariposa',
    style: 'salsa',
    level: 'intermedio',
    durationSec: 18,
    combo: 2,
    notes: {
      es: 'Los brazos se abren como alas mientras la pareja gira.',
      en: 'The arms open like wings while the couple turns.',
    },
  },
  {
    id: 'salsa-i-copa',
    name: 'Copa',
    style: 'salsa',
    level: 'intermedio',
    durationSec: 15,
    combo: 2,
    notes: {
      es: 'Los brazos dibujan una copa mientras giran alrededor del centro.',
      en: 'The arms trace a cup shape while turning around the center.',
    },
  },
  {
    id: 'salsa-i-carabali',
    name: 'Carabalí',
    style: 'salsa',
    level: 'intermedio',
    durationSec: 20,
    combo: 2,
    notes: {
      es: 'Cierre del Combo 2: une las figuras anteriores con fluidez.',
      en: 'The Combo 2 closer: link the previous figures together smoothly.',
    },
  },
  // Salsa · avanzado
  {
    id: 'salsa-a-doble-vuelta',
    name: 'Doble vuelta',
    style: 'salsa',
    level: 'avanzado',
    durationSec: 14,
    notes: {
      es: 'Dos vueltas seguidas sin perder el centro ni el compás.',
      en: 'Two consecutive turns without losing your center or the beat.',
    },
  },
  {
    id: 'salsa-a-suzie-q',
    name: 'Shine: Suzie Q',
    style: 'salsa',
    level: 'avanzado',
    durationSec: 20,
    notes: {
      es: 'Shine en solitario con torsión de rodillas cruzada.',
      en: 'A solo shine with a crossed-knee twist.',
    },
  },
  // Bachata · pénsum completo → intermedio
  {
    id: 'bachata-i-esencia',
    name: 'Esencia',
    style: 'bachata',
    level: 'intermedio',
    durationSec: 14,
    notes: {
      es: 'La base de la bachata: básico con el toque en el tiempo 4.',
      en: 'The bachata foundation: the basic with the tap on beat 4.',
    },
  },
  {
    id: 'bachata-i-sombrero',
    name: 'Sombrero',
    style: 'bachata',
    level: 'intermedio',
    durationSec: 16,
    notes: {
      es: 'Brazos por encima de la cabeza para cambiar de mano sin cortar el básico.',
      en: 'Arms over the head to switch hands without breaking the basic.',
    },
  },
  {
    id: 'bachata-i-prep-giro',
    name: 'Preparación de giro',
    style: 'bachata',
    level: 'intermedio',
    durationSec: 13,
    notes: {
      es: 'Prepara el giro marcando la dirección con la mano antes de soltarlo.',
      en: 'Set up the turn by signaling the direction with your hand before releasing it.',
    },
  },
  {
    id: 'bachata-i-candado',
    name: 'Candado',
    style: 'bachata',
    level: 'intermedio',
    durationSec: 16,
    notes: {
      es: 'Los brazos se cruzan y traban la posición como un candado.',
      en: 'The arms cross and lock the position like a padlock.',
    },
  },
  {
    id: 'bachata-i-contra-reloj',
    name: 'Contra reloj',
    style: 'bachata',
    level: 'intermedio',
    durationSec: 15,
    notes: {
      es: 'Giro en sentido contrario a las agujas del reloj, sin perder el eje.',
      en: 'A counterclockwise turn without losing your axis.',
    },
  },
  {
    id: 'bachata-i-pivot',
    name: 'Pivot',
    style: 'bachata',
    level: 'intermedio',
    durationSec: 14,
    notes: {
      es: 'Giro sobre el pie de apoyo manteniendo el peso centrado.',
      en: 'A turn on the supporting foot while keeping your weight centered.',
    },
  },
  {
    id: 'bachata-i-dominicano',
    name: 'Básico dominicano',
    style: 'bachata',
    level: 'intermedio',
    durationSec: 15,
    notes: {
      es: 'Básico con juego de pies al estilo dominicano, cerca del piso.',
      en: 'A basic with Dominican-style footwork, close to the floor.',
    },
  },
  {
    id: 'bachata-i-candado-complicado',
    name: 'Candado complicado',
    style: 'bachata',
    level: 'intermedio',
    durationSec: 20,
    notes: {
      es: 'Variante del candado con más cruces de brazos; primero domina el candado.',
      en: 'A candado variation with more arm crossings — master the basic candado first.',
    },
  },
  {
    id: 'bachata-i-helicoptero',
    name: 'Helicóptero',
    style: 'bachata',
    level: 'intermedio',
    durationSec: 18,
    notes: {
      es: 'El brazo gira por encima de la cabeza como las aspas de un helicóptero.',
      en: 'The arm circles overhead like helicopter blades.',
    },
  },
  {
    id: 'bachata-i-catapulta',
    name: 'Catapulta',
    style: 'bachata',
    level: 'intermedio',
    durationSec: 17,
    notes: {
      es: 'Impulso que lanza a la pareja hacia afuera y la recibe de vuelta.',
      en: 'A push that sends your partner out and catches them back.',
    },
  },
  {
    id: 'bachata-i-paraguas',
    name: 'Paraguas',
    style: 'bachata',
    level: 'intermedio',
    durationSec: 19,
    notes: {
      es: 'Cierre del pénsum: los brazos forman un paraguas sobre la pareja.',
      en: 'The curriculum closer: the arms form an umbrella over the couple.',
    },
  },
  // Tropical · principiante
  {
    id: 'tropical-p-merengue-basico',
    name: 'Merengue básico',
    style: 'tropical',
    level: 'principiante',
    durationSec: 10,
    notes: {
      es: 'Marcha lateral simple, un paso por cada tiempo.',
      en: 'A simple side march, one step per beat.',
    },
  },
  {
    id: 'tropical-p-cumbia-basica',
    name: 'Cumbia básica',
    style: 'tropical',
    level: 'principiante',
    durationSec: 12,
    notes: {
      es: 'Paso de cumbia con balanceo suave de cadera.',
      en: 'A cumbia step with a gentle hip sway.',
    },
  },
  {
    id: 'tropical-p-vuelta-merengue',
    name: 'Vuelta de merengue',
    style: 'tropical',
    level: 'principiante',
    durationSec: 14,
    notes: {
      es: 'Vuelta simple sin soltar la mano de tu pareja.',
      en: 'A simple turn without letting go of your partner’s hand.',
    },
  },
  // Elenco · profesional
  {
    id: 'elenco-mambo-bloque-1',
    name: 'Mambo Night · Bloque 1',
    style: 'elenco',
    level: 'profesional',
    durationSec: 32,
    notes: {
      es: 'Entrada de la coreografía grupal, marcar bien las formaciones.',
      en: 'The opening of the group choreography — mark the formations clearly.',
    },
  },
  {
    id: 'elenco-mambo-bloque-2',
    name: 'Mambo Night · Bloque 2',
    style: 'elenco',
    level: 'profesional',
    durationSec: 28,
    notes: {
      es: 'Bloque central con cruces de parejas y cambios de nivel.',
      en: 'The middle block with partner crossings and level changes.',
    },
  },
  {
    id: 'elenco-cargada-final',
    name: 'Cargada final',
    style: 'elenco',
    level: 'profesional',
    durationSec: 18,
    notes: {
      es: 'Cargada de cierre, coordinar el conteo con la pareja de base.',
      en: 'The closing lift — sync the count with your base partner.',
    },
  },
];

export function stepsForGroup(groupId: string): Step[] {
  const group = SEED_GROUPS.find(g => g.id === groupId);
  if (!group) return [];
  return SEED_STEPS.filter(s => s.style === group.style && s.level === group.level);
}

export function groupIdsForStep(step: Step): string[] {
  return SEED_GROUPS.filter(g => g.style === step.style && g.level === step.level).map(g => g.id);
}

// Aprendidos iniciales de Sofía (sección 15).
export const SOFIA_INITIAL_LEARNED = [
  'salsa-i-tunel',
  'salsa-i-open',
  'bachata-i-esencia',
  'bachata-i-sombrero',
  'tropical-p-merengue-basico',
  'tropical-p-cumbia-basica',
];
