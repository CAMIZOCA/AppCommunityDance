import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PEOPLE, CURRENT_STUDENT_ID, Person } from '@/data/people';
import { SEED_GROUPS, INITIAL_NEW_STEPS, Group } from '@/data/groups';
import { SEED_STEPS, SOFIA_INITIAL_LEARNED, groupIdsForStep, Step } from '@/data/steps';
import { SEED_EVENTS, EventItem, VideoAsset, PhotoAsset } from '@/data/events';
import { makeInviteCode } from '@/data/catalog';
import type { Level } from '@/data/people';
import type { Style } from '@/data/catalog';

export type Role = 'alumno' | 'profe';
export type Lang = 'es' | 'en';

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
  month: string;
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
  uploadPhotos: (eventId: string, count: number) => PhotoAsset[];
}

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
        const group = get().groups.find(g => g.id === groupId);
        const newCode = makeInviteCode(group?.style ?? 'salsa', group?.level ?? 'principiante');
        set(s => ({ groups: s.groups.map(g => (g.id === groupId ? { ...g, code: newCode } : g)) }));
        return newCode;
      },

      createGroup: input => {
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
        const id = nextId('paso');
        const step: StoreStep = {
          id,
          name: input.name,
          style: input.style,
          level: input.level,
          durationSec: input.durationSec ?? 20,
          notes: { es: input.notes, en: input.notes },
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
        const id = nextId('evento');
        let hour = 17;
        let minute = 0;
        const presentations = input.presentationNames.map((name, i) => {
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          minute += 15;
          if (minute >= 60) {
            minute -= 60;
            hour += 1;
          }
          return { id: `${id}-p${i + 1}`, time, name, videos: [] };
        });
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

      uploadPhotos: (eventId, count) => {
        const event = get().events.find(e => e.id === eventId);
        const startIndex = event ? event.photos.length : 0;
        const newPhotos: PhotoAsset[] = Array.from({ length: count }, (_, i) => ({
          id: nextId('foto'),
          index: startIndex + i + 1,
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
      partialize: s => ({ role: s.role, language: s.language, learnedStepIds: s.learnedStepIds }),
    }
  )
);
