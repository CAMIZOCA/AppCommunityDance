import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUiStore } from '@/store/useUiStore';

export function DownloadBanner() {
  const { visible, label, percent } = useUiStore(s => s.download);
  const insets = useSafeAreaInsets();

  if (!visible) return null;

  return (
    <View
      pointerEvents="none"
      style={{ position: 'absolute', top: insets.top + 8, left: 16, right: 16, zIndex: 90 }}
      className="gap-2 rounded-2xl border border-divider bg-surface px-4 py-3"
    >
      <View className="flex-row items-baseline justify-between">
        <Text className="font-body flex-1 text-xs text-neutral-300" numberOfLines={1}>
          {label}
        </Text>
        <Text className="font-heading text-xs text-accentScale-300">{percent}%</Text>
      </View>
      <View className="h-1.5 overflow-hidden rounded-full bg-neutral-900">
        <View
          className="h-full rounded-full bg-accent"
          style={{ width: `${percent}%`, boxShadow: '0 0 10px 1px rgba(145,132,217,0.7)' }}
        />
      </View>
    </View>
  );
}
