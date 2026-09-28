import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColors } from '@/theme/useThemeColors';

type Props = { className?: string };

// Línea de 1px que se desvanece hacia los extremos (48px por lado).
export function FadingDivider({ className = '' }: Props) {
  const colors = useThemeColors();
  const solid = colors.divider;
  const clear = 'transparent';

  return (
    <View className={`h-px flex-row ${className}`}>
      <LinearGradient colors={[clear, solid]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: 48, height: 1 }} />
      <View className="h-px flex-1" style={{ backgroundColor: solid }} />
      <LinearGradient colors={[solid, clear]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: 48, height: 1 }} />
    </View>
  );
}
