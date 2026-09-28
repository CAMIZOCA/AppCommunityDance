import { Pressable, Text, View } from 'react-native';
import { useT } from '@/i18n';
import { useThemeColors } from '@/theme/useThemeColors';
import type { Presentation } from '@/data/events';
import { BottomSheet } from './BottomSheet';
import { Icon } from './Icon';

type Props = {
  visible: boolean;
  onClose: () => void;
  presentations: Presentation[];
  onPick: (presentation: Presentation) => void;
};

export function UploadPickSheet({ visible, onClose, presentations, onPick }: Props) {
  const { t } = useT();
  const colors = useThemeColors();

  return (
    <BottomSheet visible={visible} onClose={onClose} title={t('eventDetail.uploadVideoSheetTitle')}>
      <View className="overflow-hidden rounded-card bg-background">
        {presentations.map((p, i) => (
          <Pressable
            key={p.id}
            onPress={() => onPick(p)}
            className={`flex-row items-center gap-3 px-3.5 py-3 active:bg-surface ${
              i < presentations.length - 1 ? 'border-b border-divider' : ''
            }`}>
            <Text className="font-body w-14 text-xs text-accentScale-300">{p.time}</Text>
            <Text className="font-body flex-1 text-sm text-text">
              {p.name}
              {p.style ? ` · ${p.style}` : ''}
            </Text>
            <Icon name="chevronRight" size={14} color={colors.neutral[700]} />
          </Pressable>
        ))}
      </View>
    </BottomSheet>
  );
}
