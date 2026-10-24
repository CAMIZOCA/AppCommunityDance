import { Redirect } from 'expo-router';
import { GroupForm } from '@/components';
import { useAppStore } from '@/store/useAppStore';

export default function NuevoGrupoScreen() {
  // Solo el profe puede crear grupos (control de UI; ver store).
  const role = useAppStore(s => s.role);
  if (role !== 'profe') return <Redirect href="/" />;
  return <GroupForm />;
}
