import { useEffect } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '@/theme/useThemeColors';

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export function BottomSheet({ visible, onClose, title, children }: Props) {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  const progress = useSharedValue(0);

  useEffect(() => {
    if (visible) progress.value = withTiming(1, { duration: 240 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - progress.value) * 400 }],
  }));
  const backdropStyle = useAnimatedStyle(() => ({ opacity: progress.value * 0.6 }));

  function handleClose() {
    // Un shared value de Reanimated se muta desde fuera de un efecto por
    // diseño (así funciona `.value`); el linter de hooks todavía no reconoce
    // ese patrón y lo marca como si fuera un valor de React mutado a mano.
    // eslint-disable-next-line react-hooks/immutability
    progress.value = withTiming(0, { duration: 180 });
    setTimeout(onClose, 180);
  }

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <View className="flex-1 justify-end">
        <Animated.View style={[{ position: 'absolute', inset: 0, backgroundColor: colors.overlay }, backdropStyle]}>
          <Pressable className="flex-1" onPress={handleClose} />
        </Animated.View>
        <Animated.View
          className="rounded-t-[26px] bg-surface px-5 pt-3"
          style={[{ paddingBottom: insets.bottom + 20 }, sheetStyle]}>
          <View className="mb-3 h-1 w-10 self-center rounded-full bg-neutral-700" />
          {title ? <Text className="font-heading mb-4 text-xl text-text">{title}</Text> : null}
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}
