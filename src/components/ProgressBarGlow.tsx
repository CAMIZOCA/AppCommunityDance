import { View } from 'react-native';

type Props = {
  percent: number;
  height?: number;
  className?: string;
};

export function ProgressBarGlow({ percent, height = 6, className = '' }: Props) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <View className={`overflow-hidden rounded-full bg-neutral-900 ${className}`} style={{ height }}>
      <View
        className="h-full rounded-full bg-accent"
        style={{ width: `${clamped}%`, boxShadow: '0 0 12px 2px rgba(145,132,217,0.65)' }}
      />
    </View>
  );
}
