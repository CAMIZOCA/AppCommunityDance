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
  /** uri de un video elegido con el picker en esta sesión (nunca se reproduce de verdad, ver plan). */
  videoUri?: string;
}

export const SEED_STEPS: Step[] = [
  // Salsa · principiante
  {
    id: 'salsa-p-basico',
    name: 'Paso básico',
    style: 'salsa',
    level: 'principiante',
    durationSec: 13,
    notes: {
      es: 'La base de la salsa: adelante, atrás y cierra sin perder el eje.',
      en: 'The foundation of salsa: forward, back and close without losing your axis.',
    },
  },
  {
    id: 'salsa-p-lateral',
    name: 'Paso lateral',
    style: 'salsa',
    level: 'principiante',
    durationSec: 12,
    notes: {
      es: 'Desplazamiento lateral marcando bien el tiempo de pausa.',
      en: 'Side movement, marking the pause beat clearly.',
    },
  },
  {
    id: 'salsa-p-crossbody',
    name: 'Cross body lead',
    style: 'salsa',
    level: 'principiante',
    durationSec: 16,
    notes: {
      es: 'Guía al compañero a cruzar por delante mientras rotás sobre tu eje.',
      en: 'Lead your partner across in front of you while rotating on your axis.',
    },
  },
  // Salsa · intermedio
  {
    id: 'salsa-i-crossbody-vuelta',
    name: 'Cross body con vuelta',
    style: 'salsa',
    level: 'intermedio',
    durationSec: 18,
    notes: {
      es: 'Cross body lead que termina con una vuelta completa antes de cerrar.',
      en: 'A cross body lead that finishes with a full turn before closing.',
    },
  },
  {
    id: 'salsa-i-setenta',
    name: 'Setenta',
    style: 'salsa',
    level: 'intermedio',
    durationSec: 22,
    notes: {
      es: 'Figura de enlaces con cambios de mano en los tiempos 5-6-7.',
      en: 'A linking figure with hand changes on beats 5-6-7.',
    },
  },
  {
    id: 'salsa-i-enchufla',
    name: 'Enchufla',
    style: 'salsa',
    level: 'intermedio',
    durationSec: 17,
    notes: {
      es: 'Intercambio de lugares en pareja, brazo firme y giro sincronizado.',
      en: 'Partners exchange places with a firm arm and a synced turn.',
    },
  },
  {
    id: 'salsa-i-copa',
    name: 'Copa',
    style: 'salsa',
    level: 'intermedio',
    durationSec: 15,
    notes: {
      es: 'Los brazos dibujan una copa mientras giran alrededor del centro.',
      en: 'The arms trace a cup shape while turning around the center.',
    },
  },
  {
    id: 'salsa-i-sombrero',
    name: 'Sombrero',
    style: 'salsa',
    level: 'intermedio',
    durationSec: 24,
    notes: {
      es: 'Cambio de mano por arriba de la cabeza, ojo con el tiempo de pausa.',
      en: 'A hand change above the head — watch the pause beat.',
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
  // Bachata · intermedio
  {
    id: 'bachata-i-basico-quiebre',
    name: 'Básico con quiebre',
    style: 'bachata',
    level: 'intermedio',
    durationSec: 14,
    notes: {
      es: 'El básico de bachata con un quiebre de cadera marcado en el tiempo 4.',
      en: 'The bachata basic with a hip pop marked on beat 4.',
    },
  },
  {
    id: 'bachata-i-ola',
    name: 'Ola de cuerpo',
    style: 'bachata',
    level: 'intermedio',
    durationSec: 19,
    notes: {
      es: 'La ola sube desde las rodillas hasta el pecho de forma continua.',
      en: 'The wave rises continuously from the knees to the chest.',
    },
  },
  {
    id: 'bachata-i-vuelta-sombra',
    name: 'Vuelta en sombra',
    style: 'bachata',
    level: 'intermedio',
    durationSec: 21,
    notes: {
      es: 'Vuelta con ambos bailarines mirando en la misma dirección.',
      en: 'A turn with both dancers facing the same direction.',
    },
  },
  {
    id: 'bachata-i-hip-roll',
    name: 'Hip roll',
    style: 'bachata',
    level: 'intermedio',
    durationSec: 16,
    notes: {
      es: 'Círculo de cadera continuo sin mover los hombros.',
      en: 'A continuous hip circle without moving the shoulders.',
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
  'salsa-i-crossbody-vuelta',
  'salsa-i-enchufla',
  'bachata-i-basico-quiebre',
  'tropical-p-merengue-basico',
  'tropical-p-cumbia-basica',
];
