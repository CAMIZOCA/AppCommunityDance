import { Pressable } from 'react-native';
import { TAB_BAR_CLEARANCE } from '@/theme/layout';
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
        shadowColor: '#000',
        shadowOpacity: 0.35,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 8,
      }}>
      <Icon name={icon} size={26} color="#FFFFFF" />
    </Pressable>
  );
}
