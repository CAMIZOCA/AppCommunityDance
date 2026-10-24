/// <reference types="jest" />
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppStore } from '../useAppStore';

// Comprueba que lo que cambia el profe llega a AsyncStorage (persist).

const STORAGE_KEY = 'mymambo-storage';

const groupInput = {
  name: 'Grupo persistido',
  style: 'salsa' as const,
  level: 'principiante' as const,
  schedule: 'Martes 20:00',
  studentIds: ['sofia'],
};

// zustand escribe en AsyncStorage de forma asíncrona: esperamos un ciclo de eventos.
const flush = () => new Promise(resolve => setTimeout(resolve, 0));

beforeEach(() => {
  useAppStore.setState({ role: 'profe' });
});

describe('persistencia del store', () => {
  it('tras createGroup, AsyncStorage contiene el grupo nuevo', async () => {
    const id = useAppStore.getState().createGroup(groupInput);
    expect(id).not.toBe('');

    await flush();
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    expect(raw).not.toBeNull();

    const persisted = JSON.parse(raw as string);
    expect(persisted.version).toBe(1);
    const saved = persisted.state.groups.find((g: { id: string }) => g.id === id);
    expect(saved).toBeDefined();
    expect(saved.name).toBe('Grupo persistido');
  });
});
