import { Text, View } from 'react-native';

type Size = 'sm' | 'md' | 'lg';
type Variant = 'group' | 'student';

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'w-9 h-9',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
};

const TEXT_CLASSES: Record<Size, string> = {
  sm: 'text-xs',
  md: 'text-md',
  lg: 'text-3xl',
};

// Grupo: fondo accent-900, anillo accent-800, iniciales accent-300.
// Alumno: fondo neutral-900, iniciales neutral-300.
const VARIANT_CLASSES: Record<Variant, string> = {
  group: 'bg-accentScale-900 border border-accentScale-800',
  student: 'bg-neutral-900',
};

const VARIANT_TEXT_CLASSES: Record<Variant, string> = {
  group: 'text-accentScale-300',
  student: 'text-neutral-300',
};

type Props = {
  initials: string;
  size?: Size;
  variant?: Variant;
  className?: string;
};

export function Avatar({ initials, size = 'md', variant = 'group', className = '' }: Props) {
  return (
    <View
      className={`items-center justify-center rounded-full ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}>
      <Text className={`font-heading ${VARIANT_TEXT_CLASSES[variant]} ${TEXT_CLASSES[size]}`}>{initials}</Text>
    </View>
  );
}
