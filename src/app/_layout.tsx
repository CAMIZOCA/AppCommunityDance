import '@/global.css';

import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colorScheme, useColorScheme } from 'nativewind';

export default function RootLayout() {
  const { colorScheme: scheme } = useColorScheme();

  // MyMambo es una app oscura por diseño ("Nocturne"); el modo claro es una
  // preferencia que el usuario activa a mano desde Ajustes > Apariencia, no
  // algo que deba seguir el tema del sistema. Se fija al montar (no a nivel
  // de módulo) porque en web corre primero en un entorno sin `window`.
  useEffect(() => {
    colorScheme.set('dark');
  }, []);

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
