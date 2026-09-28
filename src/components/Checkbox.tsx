import { Pressable, View } from 'react-native';
import { useThemeColors } from '@/theme/useThemeColors';
import { Icon } from './Icon';

type Props = {
  checked: boolean;
  onPress: () => void;
};

export function Checkbox({ checked, onPress }: Props) {
  const colors = useThemeColors();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      className={`h-[22px] w-[22px] items-center justify-center rounded-[6px] border ${
        checked ? 'border-accent bg-accent' : 'border-divider bg-transparent'
      }`}>
      {checked ? <Icon name="check" size={14} color={colors.background} weight="bold" /> : <View />}
    </Pressable>
  );
}
