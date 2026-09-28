import { Modal, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '@/theme/useThemeColors';
import { useT } from '@/i18n';
import { Icon } from './Icon';
import { MediaPlaceholder } from './MediaPlaceholder';

export type ViewerItem = {
  id: string;
  kind: 'photo' | 'video';
  title: string;
  subtitle?: string;
};

type Props = {
  visible: boolean;
  items: ViewerItem[];
  index: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
  onDownload: (item: ViewerItem) => void;
};

export function MediaViewer({ visible, items, index, onClose, onChangeIndex, onDownload }: Props) {
  const colors = useThemeColors();
  const { t } = useT();
  const insets = useSafeAreaInsets();
  const item = items[index];

  if (!item) return null;

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 bg-black">
        <View
          className="flex-row items-center justify-between px-4"
          style={{ paddingTop: insets.top + 8 }}>
          <Pressable onPress={onClose} hitSlop={8} className="h-9 w-9 items-center justify-center">
            <Icon name="close" size={22} color={colors.foreground} />
          </Pressable>
          <Text className="font-body text-sm text-white">{t('viewer.counter', { i: index + 1, total: items.length })}</Text>
          <Pressable onPress={() => onDownload(item)} hitSlop={8} className="h-9 w-9 items-center justify-center">
            <Icon name="download" size={20} color={colors.foreground} />
          </Pressable>
        </View>

        <View className="flex-1 items-center justify-center px-6">
          <MediaPlaceholder
            className="w-full rounded-2xl"
            style={{ aspectRatio: item.kind === 'video' ? 16 / 9 : 1 }}
            showPlay={item.kind === 'video'}
            playSize={56}
          />
        </View>

        <View className="flex-row items-center justify-center gap-8 pb-2">
          <Pressable
            onPress={() => onChangeIndex((index - 1 + items.length) % items.length)}
            className="h-11 w-11 items-center justify-center rounded-full border border-divider">
            <Icon name="chevronLeft" size={18} color={colors.foreground} />
          </Pressable>
          <Pressable
            onPress={() => onChangeIndex((index + 1) % items.length)}
            className="h-11 w-11 items-center justify-center rounded-full border border-divider">
            <Icon name="chevronRight" size={18} color={colors.foreground} />
          </Pressable>
        </View>

        <View className="items-center gap-0.5" style={{ paddingBottom: insets.bottom + 16 }}>
          <Text className="font-heading text-sm text-white">{item.title}</Text>
          {item.subtitle ? <Text className="font-body text-xs text-neutral-400">{item.subtitle}</Text> : null}
        </View>
      </View>
    </Modal>
  );
}
