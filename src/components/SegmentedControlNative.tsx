import type { StyleProp, ViewStyle } from 'react-native';
import { useColorScheme } from 'nativewind';
import { SegmentedControl as ExpoSegmentedControl } from '@expo/ui/community/segmented-control';
import { useThemeColors } from '@/theme/useThemeColors';

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  style?: StyleProp<ViewStyle>;
};

// Piloto: mismo contrato que `SegmentedControl` (custom), pero renderiza el
// control segmentado nativo de @expo/ui (SwiftUI en iOS, Compose en Android)
// en vez del look Nocturne tejido a mano. Solo para comparar visualmente
// antes de decidir si reemplaza al custom en el resto de la app — ver
// evaluación de @expo/ui en el plan de actualización.
export function SegmentedControlNative<T extends string>({ options, value, onChange, style }: Props<T>) {
  const colors = useThemeColors();
  const { colorScheme } = useColorScheme();
  const selectedIndex = options.findIndex(opt => opt.value === value);

  return (
    <ExpoSegmentedControl
      values={options.map(opt => opt.label)}
      selectedIndex={selectedIndex}
      onValueChange={label => {
        const picked = options.find(opt => opt.label === label);
        if (picked) onChange(picked.value);
      }}
      tintColor={colors.accent}
      appearance={colorScheme ?? 'dark'}
      style={style}
    />
  );
}
