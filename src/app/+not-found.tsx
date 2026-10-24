import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Screen } from '@/components';
import { useT } from '@/i18n';

// Ruta comodín: se muestra cuando la URL no coincide con ninguna pantalla.
export default function NotFoundScreen() {
  const { t } = useT();

  return (
    <Screen scroll={false} className="bg-background flex-1 items-center justify-center gap-4 px-8">
      <Text className="font-heading text-center text-2xl text-text">{t('states.notFoundTitle')}</Text>
      <Text className="font-body text-center text-sm text-neutral-500">{t('states.notFoundBody')}</Text>
      <View className="w-full pt-2">
        <Button title={t('states.backHome')} onPress={() => router.replace('/')} />
      </View>
    </Screen>
  );
}
