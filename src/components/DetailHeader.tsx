import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useThemeColors } from '@/theme/useThemeColors';
import { Icon } from './Icon';

type Props = {
  title: string;
  actions?: React.ReactNode;
};

export function DetailHeader({ title, actions }: Props) {
  const colors = useThemeColors();

  return (
    <View className="flex-row items-center gap-2 px-3 py-3">
      <Pressable
        onPress={() => router.back()}
        hitSlop={8}
        className="w-9 h-9 items-center justify-center rounded-full active:bg-surface">
        <Icon name="chevronLeft" size={20} color={colors.text} />
      </Pressable>
      <Text className="font-heading text-lg text-text flex-1" numberOfLines={1}>
        {title}
      </Text>
      {actions ? <View className="flex-row items-center gap-1">{actions}</View> : null}
    </View>
  );
}
