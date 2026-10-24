import { Redirect, useLocalSearchParams } from 'expo-router';
import { GroupForm } from '@/components';
import { useAppStore } from '@/store/useAppStore';

export default function EditarGrupoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const role = useAppStore(s => s.role);
  // Hooks arriba; el Redirect va después de ellos.
  if (role !== 'profe') return <Redirect href="/" />;
  return <GroupForm groupId={id} />;
}
