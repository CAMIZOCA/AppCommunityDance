import { Pressable, Text, View, ViewStyle } from 'react-native';
import Svg, { Defs, Pattern, Rect } from 'react-native-svg';
import { useThemeColors } from '@/theme/useThemeColors';
import { MONO_FONT_FAMILY } from '@/theme/mono';
import { Icon } from './Icon';

type Props = {
  label?: string;
  showPlay?: boolean;
  onPressPlay?: () => void;
  playSize?: number;
  className?: string;
  style?: ViewStyle;
};

// Placeholder de video/foto: franjas diagonales (surface / neutral-900) con
// una etiqueta monoespaciada abajo a la izquierda, y opcionalmente un botón
// de play circular. Nunca se muestra un thumbnail real (ver plan).
export function MediaPlaceholder({ label, showPlay, onPressPlay, playSize = 44, className = '', style }: Props) {
  const colors = useThemeColors();

  return (
    <View className={`overflow-hidden bg-surface ${className}`} style={style}>
      <Svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <Defs>
          <Pattern id="stripes" width={16} height={16} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <Rect width={16} height={16} fill={colors.surface} />
            <Rect width={8} height={16} fill={colors.neutral[900]} />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#stripes)" />
      </Svg>

      {showPlay ? (
        <View className="flex-1 items-center justify-center">
          <Pressable
            onPress={onPressPlay}
            hitSlop={8}
            className="items-center justify-center rounded-full border border-accent active:opacity-80"
            style={{ width: playSize, height: playSize, backgroundColor: `${colors.background}B3` }}>
            <Icon name="play" size={playSize * 0.4} color={colors.accent} weight="fill" />
          </Pressable>
        </View>
      ) : null}

      {label ? (
        <Text
          className="absolute bottom-2 left-2 text-2xs text-neutral-300"
          style={{ fontFamily: MONO_FONT_FAMILY }}>
          {label}
        </Text>
      ) : null}
    </View>
  );
}
