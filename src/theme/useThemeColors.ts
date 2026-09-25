import { useColorScheme } from 'nativewind';
import { palettes } from './tokens';

// Paleta resuelta (hex reales) según el modo activo, para props nativos
// que no pasan por className (p. ej. color de <Icon>, tabBarActiveTintColor).
export function useThemeColors() {
  const { colorScheme } = useColorScheme();
  return palettes[colorScheme ?? 'dark'] as typeof palettes.dark;
}
