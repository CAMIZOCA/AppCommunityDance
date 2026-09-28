import { useLocalSearchParams } from 'expo-router';
import { GroupForm } from '@/components';

export default function EditarGrupoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <GroupForm groupId={id} />;
}
