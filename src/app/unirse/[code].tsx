import { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, DetailHeader, Screen } from '@/components';
import { useT } from '@/i18n';
import { useAppStore } from '@/store/useAppStore';
import { useUiStore } from '@/store/useUiStore';
import { CURRENT_STUDENT_ID } from '@/data/people';
import { goBackOr } from '@/utils/navigation';

// Destino de los enlaces de invitación: https://mymambo.app/unirse/<código>.
// Alumno: se une con el código (joinGroupByCode, igual que grupo/unirse) y entra al grupo.
// Profe: no se une a grupos, se le avisa. Código inexistente: estado de error.
export default function UnirseConCodigoScreen() {
  const { t } = useT();
  const { code = '' } = useLocalSearchParams<{ code: string }>();
  const role = useAppStore(s => s.role);
  const groups = useAppStore(s => s.groups);
  const joinGroupByCode = useAppStore(s => s.joinGroupByCode);
  const showToast = useUiStore(s => s.showToast);
  const handled = useRef(false);

  const normalized = code.trim().toUpperCase();
  const group = groups.find(g => g.code === normalized);

  useEffect(() => {
    // Una sola vez por montaje (StrictMode puede ejecutar el efecto dos veces).
    if (role !== 'alumno' || !group || handled.current) return;
    handled.current = true;

    // Ya es miembro: solo lo llevamos al grupo.
    if (group.memberIds.includes(CURRENT_STUDENT_ID)) {
      router.replace({ pathname: '/grupo/[id]', params: { id: group.id } });
      return;
    }
    const result = joinGroupByCode(normalized);
    if (typeof result === 'object') {
      showToast(t('join.joinedToast', { name: result.groupName }));
      router.replace({ pathname: '/grupo/[id]', params: { id: result.groupId } });
    }
  }, [role, group, normalized, joinGroupByCode, showToast, t]);

  // Estados que se deducen en el render (sin setState dentro del efecto).
  let message: string | null = null;
  if (role === 'profe') message = t('join.teacherOnly');
  else if (role === 'alumno' && !group) message = t('join.invalidCode');
  const showBack = message !== null;

  return (
    <Screen scroll={false} className="bg-background flex-1">
      <DetailHeader title={t('join.title')} />
      <View className="flex-1 items-center justify-center gap-5 px-8">
        <Text className="font-body text-center text-sm text-neutral-500">{message ?? t('states.loading')}</Text>
        {showBack ? <Button title={t('common.back')} variant="neutral" onPress={() => goBackOr('/')} /> : null}
      </View>
    </Screen>
  );
}
