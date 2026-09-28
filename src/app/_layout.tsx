import '@/global.css';

import { useEffect } from 'react';
import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colorScheme } from 'nativewind';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { ToastHost } from '@/components/ToastHost';
import { DownloadBanner } from '@/components/DownloadBanner';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium });

  // MyMambo es una app oscura por diseño ("Nocturne"): no sigue el tema del
  // sistema ni expone un toggle (no está en el spec).
  useEffect(() => {
    colorScheme.set('dark');
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <ToastHost />
      <DownloadBanner />
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
