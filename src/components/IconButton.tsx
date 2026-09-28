import { Pressable } from 'react-native';
import { useThemeColors } from '@/theme/useThemeColors';
import { Icon, IconName } from './Icon';

type Props = {
  icon: IconName;
  onPress: () => void;
  outlined?: boolean;
  color?: string;
};

export function IconButton({ icon, onPress, outlined, color }: Props) {
  const colors = useThemeColors();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      className={`h-9 w-9 items-center justify-center rounded-full active:bg-surface ${
        outlined ? 'border border-accent' : ''
      }`}>
      <Icon name={icon} size={18} color={color ?? colors.text} />
    </Pressable>
  );
}
