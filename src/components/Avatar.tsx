import { Text, View } from 'react-native';

type Size = 'sm' | 'md' | 'lg';

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

type Props = {
  initials: string;
  size?: Size;
  className?: string;
};

export function Avatar({ initials, size = 'md', className = '' }: Props) {
  return (
    <View
      className={`items-center justify-center rounded-full bg-accentScale-800 ${SIZE_CLASSES[size]} ${className}`}>
      <Text className={`font-semibold text-accentScale-100 ${TEXT_CLASSES[size]}`}>
        {initials}
      </Text>
    </View>
  );
}
