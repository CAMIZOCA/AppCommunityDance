import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PEOPLE, CURRENT_STUDENT_ID, Person } from '@/data/people';
import { SEED_GROUPS, INITIAL_NEW_STEPS, Group } from '@/data/groups';
import { SEED_STEPS, SOFIA_INITIAL_LEARNED, groupIdsForStep, Step } from '@/data/steps';
import { SEED_EVENTS, EventItem, VideoAsset, PhotoAsset, slotTime } from '@/data/events';
import { makeInviteCode } from '@/data/catalog';
import type { Level } from '@/data/people';
import type { Style } from '@/data/catalog';

export type Role = 'alumno' | 'profe';
export type Lang = 'es' | 'en';

// Control de roles SOLO en cliente: oculta UI y bloquea acciones del store,
// pero no es seguridad real. Sin backend, cualquiera puede cambiar el rol.
export function isTeacher(state: { role: Role }): boolean {
  return state.role === 'profe';
}

export interface StoreStep extends Step {
  groupIds: string[];
}

export type JoinResult = 'invalid' | 'already' | { groupId: string; groupName: string };

let idSeq = 0;
function nextId(prefix: string) {
  idSeq += 1;
  return `${prefix}-${Date.now().toString(36)}-${idSeq}`;
}

interface NewGroupInput {
  name: string;
  style: Style;
  level: Level;
  schedule: string;
  studentIds: string[];
}

interface NewStepInput {
  name: string;
  style: Style;
  level: Level;
  notes: string;
  groupIds: string[];
  videoUri?: string;
  durationSec?: number;
}

interface NewEventInput {
  name: string;
  venue: string;
  dateLabel: string;
  day: string;
  month: number | null;
  presentationNames: string[];
}

interface AppState {
  role: Role;
  language: Lang;
  learnedStepIds: string[];
  filterResetKey: number;

  people: Person[];
  groups: Group[];
  steps: StoreStep[];
  events: EventItem[];
  newStepsCount: Record<string, number>;

  setRole: (role: Role) => void;
  setLanguage: (lang: Lang) => void;
  toggleLearned: (stepId: string) => void;
  isLearned: (stepId: string) => boolean;

  markGroupSeen: (groupId: string) => void;
  joinGroupByCode: (code: string) => JoinResult;
  renewInviteCode: (groupId: string) => string;
  createGroup: (input: NewGroupInput) => string;
  updateGroup: (groupId: string, input: NewGroupInput) => void;

  publishStep: (input: NewStepInput) => string;

  createEvent: (input: NewEventInput) => string;
  uploadVideoToPresentation: (eventId: string, presentationId: string, video: Omit<VideoAsset, 'id'>) => void;
  uploadPhotos: (eventId: string, photos: { uri: string }[]) => PhotoAsset[];
}

// Lo que se guarda en AsyncStorage. Las uris de medios pueden caducar (caché
// del sistema); si eso pasa, el medio dejará de cargarse hasta volver a subirlo.
type PersistedState = Pick<
  AppState,
  'role' | 'language' | 'learnedStepIds' | 'groups' | 'steps' | 'events' | 'newStepsCount'
>;

const STORE_VERSION = 1;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      role: 'alumno',
      language: 'es',
      learnedStepIds: [...SOFIA_INITIAL_LEARNED],
      filterResetKey: 0,

      people: PEOPLE,
      groups: SEED_GROUPS.map(g => ({ ...g, memberIds: [...g.memberIds] })),
      steps: SEED_STEPS.map(s => ({ ...s, groupIds: groupIdsForStep(s) })),
      events: SEED_EVENTS.map(e => ({ ...e, presentations: e.presentations.map(p => ({ ...p, videos: [...p.videos] })), photos: [...e.photos] })),
      newStepsCount: { ...INITIAL_NEW_STEPS },

      setRole: role => set(s => ({ role, filterResetKey: s.filterResetKey + 1 })),
      setLanguage: language => set({ language }),

      toggleLearned: stepId =>
        set(s => ({
          learnedStepIds: s.learnedStepIds.includes(stepId)
            ? s.learnedStepIds.filter(id => id !== stepId)
            : [...s.learnedStepIds, stepId],
        })),
      isLearned: stepId => get().learnedStepIds.includes(stepId),

      markGroupSeen: groupId => set(s => ({ newStepsCount: { ...s.newStepsCount, [groupId]: 0 } })),

      joinGroupByCode: code => {
        const normalized = code.trim().toUpperCase();
        const group = get().groups.find(g => g.code === normalized);
        if (!group) return 'invalid';
        if (group.memberIds.includes(CURRENT_STUDENT_ID)) return 'already';
        set(s => ({
          groups: s.groups.map(g =>
            g.id === group.id ? { ...g, memberIds: [...g.memberIds, CURRENT_STUDENT_ID] } : g
          ),
        }));
        return { groupId: group.id, groupName: group.name };
      },

      renewInviteCode: groupId => {
        if (!isTeacher(get())) return '';
        const group = get().groups.find(g => g.id === groupId);
        const newCode = makeInviteCode(group?.style ?? 'salsa', group?.level ?? 'principiante');
        set(s => ({ groups: s.groups.map(g => (g.id === groupId ? { ...g, code: newCode } : g)) }));
        return newCode;
      },

      createGroup: input => {
        if (!isTeacher(get())) return '';
        const id = nextId('grupo');
        const group: Group = {
          id,
          name: input.name,
          style: input.style,
          level: input.level,
          schedule: input.schedule,
          code: makeInviteCode(input.style, input.level),
          memberIds: input.studentIds,
        };
        set(s => ({ groups: [...s.groups, group] }));
        return id;
      },

      updateGroup: (groupId, input) => {
        if (!isTeacher(get())) return;
        set(s => ({
          groups: s.groups.map(g =>
            g.id === groupId
              ? {
                  ...g,
                  name: input.name,
                  style: input.style,
                  level: input.level,
                  schedule: input.schedule,
                  memberIds: input.studentIds,
                }
              : g
          ),
        }));
      },

      publishStep: input => {
        if (!isTeacher(get())) return '';
        const id = nextId('paso');
        const step: StoreStep = {
          id,
          name: input.name,
          style: input.style,
          level: input.level,
          durationSec: input.durationSec ?? 20,
          // La nota se guarda en el idioma activo; el otro queda vacío y la pantalla
          // del paso usa el idioma activo y, si falta, el otro.
          notes: get().language === 'en' ? { es: '', en: input.notes } : { es: input.notes, en: '' },
          videoUri: input.videoUri,
          groupIds: input.groupIds,
        };
        set(s => ({
          steps: [...s.steps, step],
          newStepsCount: input.groupIds.reduce(
            (acc, gid) => ({ ...acc, [gid]: (acc[gid] ?? s.newStepsCount[gid] ?? 0) + 1 }),
            { ...s.newStepsCount }
          ),
        }));
        return id;
      },

      createEvent: input => {
        if (!isTeacher(get())) return '';
        const id = nextId('evento');
        const presentations = input.presentationNames.map((name, i) => ({
          id: `${id}-p${i + 1}`,
          time: slotTime(i),
          name,
          videos: [],
        }));
        const event: EventItem = {
          id,
          name: input.name,
          venue: input.venue,
          day: input.day,
          month: input.month,
          dateLabel: input.dateLabel,
          isPast: false,
          presentations,
          photos: [],
        };
        set(s => ({ events: [...s.events, event] }));
        return id;
      },

      uploadVideoToPresentation: (eventId, presentationId, video) => {
        if (!isTeacher(get())) return;
        const vid: VideoAsset = { id: nextId('video'), ...video };
        set(s => ({
          events: s.events.map(e =>
            e.id !== eventId
              ? e
              : {
                  ...e,
                  presentations: e.presentations.map(p =>
                    p.id === presentationId ? { ...p, videos: [...p.videos, vid] } : p
                  ),
                }
          ),
        }));
      },

      uploadPhotos: (eventId, photos) => {
        if (!isTeacher(get())) return [];
        if (photos.length === 0) return [];
        const event = get().events.find(e => e.id === eventId);
        const startIndex = event ? event.photos.length : 0;
        // Solo se guardan las fotos reales que devolvió el picker (una por uri).
        const newPhotos: PhotoAsset[] = photos.map((p, i) => ({
          id: nextId('foto'),
          index: startIndex + i + 1,
          uri: p.uri,
        }));
        set(s => ({
          events: s.events.map(e => (e.id === eventId ? { ...e, photos: [...newPhotos, ...e.photos] } : e)),
        }));
        return newPhotos;
      },
    }),
    {
      name: 'mymambo-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: STORE_VERSION,
      partialize: (s): PersistedState => ({
        role: s.role,
        language: s.language,
        learnedStepIds: s.learnedStepIds,
        groups: s.groups,
        steps: s.steps,
        events: s.events,
        newStepsCount: s.newStepsCount,
      }),
      // v0 solo guardaba role, language y learnedStepIds. Lo que falte se completa
      // con el estado inicial (persist hace merge superficial con el estado actual).
      migrate: (persisted, version) => {
        const state = (persisted ?? {}) as Partial<PersistedState>;
        if (version < 1) {
          return {
            ...state,
            learnedStepIds: Array.isArray(state.learnedStepIds) ? state.learnedStepIds : [...SOFIA_INITIAL_LEARNED],
          } as PersistedState;
        }
        return state as PersistedState;
      },
    }
  )
);
