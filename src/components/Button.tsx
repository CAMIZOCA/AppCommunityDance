import { Pressable, Text } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary'
};

export function Button({ title, onPress, variant = 'primary' }: Props) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      className={`items-center rounded-button px-5 py-3.5 active:scale-[0.97] active:opacity-90 ${
        isPrimary
          ? 'bg-accent'
          : 'border border-divider bg-surface'
      }`}>
      <Text
        className={`text-base font-semibold ${
          isPrimary ? 'text-primary-foreground' : 'text-text'
        }`}>
        {title}
      </Text>
    </Pressable>
  );
}
