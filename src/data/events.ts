export interface VideoAsset {
  id: string;
  title: string;
  durationSec: number;
  /** uri de un video subido en esta sesión (nunca se reproduce de verdad, ver plan). */
  uri?: string;
}

export interface Presentation {
  id: string;
  time: string;
  name: string;
  style?: string;
  videos: VideoAsset[];
}

export interface PhotoAsset {
  id: string;
  index: number;
  uri?: string;
}

export interface EventItem {
  id: string;
  name: string;
  venue: string;
  day: string;
  month: string;
  dateLabel: string;
  isPast: boolean;
  presentations: Presentation[];
  photos: PhotoAsset[];
}

function photos(eventId: string, count: number): PhotoAsset[] {
  return Array.from({ length: count }, (_, i) => ({ id: `${eventId}-foto-${i + 1}`, index: i + 1 }));
}

let videoSeq = 0;
function video(title: string, durationSec: number): VideoAsset {
  videoSeq += 1;
  return { id: `video-${videoSeq}`, title, durationSec };
}

export const SEED_EVENTS: EventItem[] = [
  {
    id: 'show-ventura-mall',
    name: 'Show MyMambo · Ventura Mall',
    venue: 'Ventura Mall · Plaza central',
    day: '19',
    month: 'SEP',
    dateLabel: 'Sáb 19 sep · 17:00',
    isPast: true,
    presentations: [
      { id: 'p1', time: '17:00', name: 'Kids MyMambo', style: 'K-pop', videos: [video('Coreografía completa', 192), video('Toma lateral', 185)] },
      { id: 'p2', time: '17:15', name: 'Kids MyMambo', style: 'Tropical', videos: [video('Coreografía completa', 160)] },
      { id: 'p3', time: '17:30', name: 'Bachata Lady', style: 'Bachata', videos: [video('Coreografía completa', 200)] },
      { id: 'p4', time: '17:45', name: 'Tropical Principiante', videos: [video('Coreografía completa', 175)] },
      { id: 'p5', time: '18:00', name: 'Salsa Intermedio', videos: [video('Coreografía completa', 210)] },
      { id: 'p6', time: '18:15', name: 'Bachata Intermedio', videos: [video('Coreografía completa', 190)] },
      { id: 'p7', time: '18:30', name: 'Elenco Bachata', videos: [video('Coreografía', 220), video('Detrás de escena', 105)] },
      {
        id: 'p8',
        time: '18:45',
        name: 'Elenco Salsa · Mambo Night',
        videos: [video('Bloque 1', 130), video('Bloque 2', 145), video('Final con cargada', 65)],
      },
    ],
    photos: photos('show-ventura-mall', 36),
  },
  {
    id: 'presentacion-mensual',
    name: 'Presentación mensual · Sala MyMambo',
    venue: 'Sala MyMambo',
    day: '24',
    month: 'OCT',
    dateLabel: 'Sáb 24 oct · 18:00',
    isPast: false,
    presentations: [
      { id: 'p1', time: '18:00', name: 'Kids MyMambo', style: 'K-pop', videos: [] },
      { id: 'p2', time: '18:15', name: 'Salsa Principiante', videos: [] },
      { id: 'p3', time: '18:30', name: 'Bachata Intermedio', videos: [] },
      { id: 'p4', time: '18:45', name: 'Tropical Principiante', videos: [] },
      { id: 'p5', time: '19:00', name: 'Elenco MyMambo', videos: [] },
    ],
    photos: [],
  },
  {
    id: 'noche-de-elenco',
    name: 'Noche de Elenco',
    venue: 'Teatro Municipal',
    day: '28',
    month: 'AGO',
    dateLabel: 'Vie 28 ago · 20:00',
    isPast: true,
    presentations: [
      { id: 'p1', time: '20:00', name: 'Elenco Bachata', videos: [video('Coreografía', 215)] },
      { id: 'p2', time: '20:20', name: 'Elenco Salsa', videos: [video('Coreografía', 242)] },
      { id: 'p3', time: '20:40', name: 'Elenco MyMambo · Final', videos: [] },
    ],
    photos: photos('noche-de-elenco', 18),
  },
];
