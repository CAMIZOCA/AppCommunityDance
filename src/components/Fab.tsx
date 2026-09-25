import { Pressable } from 'react-native';
import { TAB_BAR_CLEARANCE } from '@/theme/layout';
import { colors } from '@/theme/tokens';
import { Icon, IconName } from './Icon';

type Props = {
  icon?: IconName;
  onPress?: () => void;
  className?: string;
};

export function Fab({ icon = 'add', onPress, className = '' }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`absolute right-5 h-14 w-14 items-center justify-center rounded-full bg-accent active:scale-95 active:opacity-90 ${className}`}
      style={{
        bottom: TAB_BAR_CLEARANCE,
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.35)',
      }}>
      <Icon name={icon} size={26} color={colors.primary.foreground} />
    </Pressable>
  );
}
