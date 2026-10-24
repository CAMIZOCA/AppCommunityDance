import '@/global.css';

import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { ToastHost } from '@/components/ToastHost';
import { DownloadBanner } from '@/components/DownloadBanner';
import { Screen } from '@/components/Screen';
import { useThemeColors } from '@/theme/useThemeColors';
import { useT } from '@/i18n';
import { useAppStore } from '@/store/useAppStore';

export default function RootLayout() {
  const colors = useThemeColors();
  const { t } = useT();
  // El tema sigue al sistema (claro u oscuro). NativeWind también sigue al sistema por defecto.
  const systemScheme = useColorScheme();
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium });

  // Espera a que zustand cargue AsyncStorage antes de pintar las rutas; si no,
  // las pantallas leerían el estado inicial (grupos, pasos, eventos) y luego cambiarían.
  const [hydrated, setHydrated] = useState(() => useAppStore.persist.hasHydrated());
  useEffect(() => {
    const unsubscribe = useAppStore.persist.onFinishHydration(() => setHydrated(true));
    // Por si la hidratación terminó entre el primer render y la suscripción.
    queueMicrotask(() => {
      if (useAppStore.persist.hasHydrated()) setHydrated(true);
    });
    return unsubscribe;
  }, []);

  if (!fontsLoaded || !hydrated) {
    return (
      <Screen scroll={false} className="flex-1 items-center justify-center gap-3">
        <ActivityIndicator color={colors.accent} />
        <Text className="font-body text-sm text-neutral-500">{t('states.loading')}</Text>
      </Screen>
    );
  }

  return (
    <ThemeProvider value={systemScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <ToastHost />
      <DownloadBanner />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
