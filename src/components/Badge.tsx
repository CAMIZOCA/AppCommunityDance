import { Text, View } from 'react-native';

type Variant = 'accent' | 'neutral' | 'outline';

const VARIANT_CLASSES: Record<Variant, string> = {
  accent: 'bg-accent',
  neutral: 'bg-neutral-800',
  outline: 'border border-divider bg-transparent',
};

const TEXT_CLASSES: Record<Variant, string> = {
  accent: 'text-background font-bold',
  neutral: 'text-neutral-300 font-medium',
  outline: 'text-text font-medium',
};

type Props = {
  label: string | number;
  variant?: Variant;
  className?: string;
};

export function Badge({ label, variant = 'accent', className = '' }: Props) {
  return (
    <View
      className={`min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 ${VARIANT_CLASSES[variant]} ${className}`}>
      <Text className={`text-2xs ${TEXT_CLASSES[variant]}`}>{label}</Text>
    </View>
  );
}
