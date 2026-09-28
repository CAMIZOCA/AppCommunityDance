import { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUiStore } from '@/store/useUiStore';
import { useThemeColors } from '@/theme/useThemeColors';
import { Icon } from './Icon';

export function ToastHost() {
  const { visible, message } = useUiStore(s => s.toast);
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(visible ? 1 : 0, { duration: 200 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const style = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * -16 }],
  }));

  if (!visible && progress.value === 0) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[{ position: 'absolute', top: insets.top + 8, left: 0, right: 0, alignItems: 'center', zIndex: 100 }, style]}>
      <Animated.View
        className="flex-row items-center gap-2 rounded-full bg-surface px-4 py-2.5"
        style={{ borderWidth: 1, borderColor: colors.neutral[700], boxShadow: '0px 6px 18px rgba(0,0,0,0.55)' }}>
        <Icon name="checkCircle" size={16} color={colors.accent} weight="fill" />
        <Text className="font-body text-sm text-text">{message}</Text>
      </Animated.View>
    </Animated.View>
  );
}
