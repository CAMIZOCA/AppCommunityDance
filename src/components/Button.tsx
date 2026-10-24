import { Pressable, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { usePressScale } from './usePressScale';

type Variant = 'primary' | 'tinted' | 'neutral';

// Botones primarios van con contorno (nunca relleno sólido): borde accent,
// fondo transparente, y al presionar se tiñen con el acento al 12%.
// El press también escala a 0.97 (ver usePressScale).
const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'border border-accent bg-transparent active:bg-accent/12',
  tinted: 'border border-accent bg-accent/14 active:bg-accent/24',
  neutral: 'border border-divider bg-surface active:bg-divider',
};

const TEXT_CLASSES: Record<Variant, string> = {
  primary: 'text-accent',
  tinted: 'text-accentScale-200',
  neutral: 'text-text',
};

type Props = {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  /** Bloquea onPress además de atenuar (para acciones realmente inhabilitadas). */
  disabled?: boolean;
  /** Solo atenúa visualmente pero deja pasar el onPress (para mostrar el error de validación al tocar). */
  dimmed?: boolean;
};

export function Button({ title, onPress, variant = 'primary', disabled = false, dimmed = false }: Props) {
  const { animatedStyle, onPressIn, onPressOut } = usePressScale();

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        className={`min-h-[44px] items-center justify-center rounded-button px-5 py-3.5 ${
          VARIANT_CLASSES[variant]
        } ${disabled || dimmed ? 'opacity-40' : ''}`}>
        <Text className={`text-base font-heading ${TEXT_CLASSES[variant]}`}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}
