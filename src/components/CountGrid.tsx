import { Text, View } from 'react-native';

type Props = {
  labels: string[];
  current: number; // 1-8, o 0 si el conteo no está activo
};

export function CountGrid({ labels, current }: Props) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {labels.map((label, i) => {
        const beat = i + 1;
        const active = beat === current;
        return (
          <View
            key={beat}
            className={`items-center justify-center gap-0.5 rounded-lg border py-2 ${
              active ? 'border-accent bg-accentScale-900' : 'border-divider bg-surface'
            }`}
            style={{
              width: '23%',
              boxShadow: active ? '0 0 14px 2px rgba(145,132,217,0.55)' : undefined,
            }}>
            <Text className={`font-heading text-base ${active ? 'text-accentScale-100' : 'text-text'}`}>{beat}</Text>
            <Text className={`font-body text-2xs ${active ? 'text-accentScale-200' : 'text-neutral-500'}`} numberOfLines={1}>
              {label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
