/// <reference types="jest" />
import { useAppStore, isTeacher } from '../useAppStore';

// Prueba del control de roles del store (solo cliente; no es seguridad real).

const groupInput = {
  name: 'Grupo test',
  style: 'salsa' as const,
  level: 'principiante' as const,
  schedule: 'Lunes 19:00',
  studentIds: ['sofia'],
};

const stepInput = {
  name: 'Paso test',
  style: 'salsa' as const,
  level: 'principiante' as const,
  notes: '',
  groupIds: [],
};

const eventInput = {
  name: 'Evento test',
  venue: 'Sala',
  dateLabel: '12 de mayo',
  day: '12',
  month: 'MAY',
  presentationNames: ['Grupo A'],
};

beforeEach(() => {
  useAppStore.setState({ role: 'alumno' });
});

describe('control de roles', () => {
  it('isTeacher solo es true para el profe', () => {
    expect(isTeacher({ role: 'profe' })).toBe(true);
    expect(isTeacher({ role: 'alumno' })).toBe(false);
  });

  it('el alumno no puede crear grupos', () => {
    const before = useAppStore.getState().groups;
    const id = useAppStore.getState().createGroup(groupInput);
    expect(id).toBe('');
    expect(useAppStore.getState().groups).toBe(before);
  });

  it('el alumno no puede publicar pasos', () => {
    const before = useAppStore.getState().steps;
    const id = useAppStore.getState().publishStep(stepInput);
    expect(id).toBe('');
    expect(useAppStore.getState().steps).toBe(before);
  });

  it('el alumno no puede crear eventos', () => {
    const before = useAppStore.getState().events;
    const id = useAppStore.getState().createEvent(eventInput);
    expect(id).toBe('');
    expect(useAppStore.getState().events).toBe(before);
  });

  it('el alumno no puede renovar el código de invitación ni editar grupos', () => {
    const group = useAppStore.getState().groups[0];
    const beforeGroups = useAppStore.getState().groups;
    useAppStore.getState().updateGroup(group.id, groupInput);
    expect(useAppStore.getState().groups).toBe(beforeGroups);
    expect(useAppStore.getState().renewInviteCode(group.id)).toBe('');
    expect(useAppStore.getState().groups).toBe(beforeGroups);
  });

  it('el alumno no puede subir vídeos ni fotos', () => {
    const event = useAppStore.getState().events[0];
    const beforeEvents = useAppStore.getState().events;
    useAppStore.getState().uploadVideoToPresentation(event.id, event.presentations[0].id, {
      title: 'v',
      durationSec: 10,
    } as never);
    expect(useAppStore.getState().events).toBe(beforeEvents);
    expect(useAppStore.getState().uploadPhotos(event.id, 3)).toEqual([]);
    expect(useAppStore.getState().events).toBe(beforeEvents);
  });

  it('el profe sí puede crear grupos, pasos y eventos', () => {
    useAppStore.setState({ role: 'profe' });
    const groupsBefore = useAppStore.getState().groups.length;
    const stepsBefore = useAppStore.getState().steps.length;
    const eventsBefore = useAppStore.getState().events.length;

    expect(useAppStore.getState().createGroup(groupInput)).not.toBe('');
    expect(useAppStore.getState().publishStep(stepInput)).not.toBe('');
    expect(useAppStore.getState().createEvent(eventInput)).not.toBe('');

    expect(useAppStore.getState().groups.length).toBe(groupsBefore + 1);
    expect(useAppStore.getState().steps.length).toBe(stepsBefore + 1);
    expect(useAppStore.getState().events.length).toBe(eventsBefore + 1);
  });
});
