import { Pressable, Text } from 'react-native';

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export function Chip({ label, active, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`h-[30px] items-center justify-center rounded-full border px-3.5 active:opacity-80 ${
        active ? 'border-accent bg-accent/14' : 'border-divider bg-transparent'
      }`}>
      <Text className={`font-body text-xs ${active ? 'text-accentScale-200' : 'text-neutral-300'}`}>{label}</Text>
    </Pressable>
  );
}
