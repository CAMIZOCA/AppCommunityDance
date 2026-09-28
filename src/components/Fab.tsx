import { Pressable, Text } from 'react-native';
import { TAB_BAR_CLEARANCE } from '@/theme/layout';
import { useThemeColors } from '@/theme/useThemeColors';
import { Icon, IconName } from './Icon';

type Props = {
  icon: IconName;
  label: string;
  onPress?: () => void;
  className?: string;
};

// Píldora de 48px, fondo surface, borde acento, texto+ícono acento, halo acento.
export function Fab({ icon, label, onPress, className = '' }: Props) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      className={`absolute right-5 h-12 flex-row items-center gap-2 rounded-full border border-accent bg-surface px-4 active:scale-95 active:bg-accent/12 ${className}`}
      style={{
        bottom: TAB_BAR_CLEARANCE,
        boxShadow: '0px 0px 16px 2px rgba(145,132,217,0.45)',
      }}>
      <Icon name={icon} size={18} color={colors.accent} />
      <Text className="font-heading text-sm text-accent">{label}</Text>
    </Pressable>
  );
}
