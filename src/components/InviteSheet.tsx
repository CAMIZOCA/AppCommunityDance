import { Share, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';
import { useThemeColors } from '@/theme/useThemeColors';
import { MONO_FONT_FAMILY } from '@/theme/mono';
import { useAppStore } from '@/store/useAppStore';
import { useUiStore } from '@/store/useUiStore';
import { useT } from '@/i18n';
import { BottomSheet } from './BottomSheet';
import { Button } from './Button';

type Props = {
  visible: boolean;
  onClose: () => void;
  groupId: string;
};

export function InviteSheet({ visible, onClose, groupId }: Props) {
  const colors = useThemeColors();
  const { t } = useT();
  const group = useAppStore(s => s.groups.find(g => g.id === groupId));
  const renewInviteCode = useAppStore(s => s.renewInviteCode);
  const showToast = useUiStore(s => s.showToast);

  if (!group) return null;

  const link = `https://mymambo.app/unirse/${group.code}`;

  async function handleCopy() {
    await Clipboard.setStringAsync(group!.code);
    showToast(t('invite.copiedToast'));
  }

  async function handleShare() {
    await Share.share({ message: link });
  }

  function handleRenew() {
    // El store devuelve '' si el rol no puede renovar; en ese caso no hay aviso.
    const newCode = renewInviteCode(group!.id);
    if (newCode) showToast(t('invite.renewedToast'));
  }

  return (
    <BottomSheet visible={visible} onClose={onClose} title={`${t('invite.title')} · ${group.name}`}>
      <View className="items-center gap-4">
        <View
          className="items-center justify-center rounded-2xl bg-neutral-100 p-4"
          style={{ boxShadow: '0 0 24px 4px rgba(145,132,217,0.35)' }}>
          <QRCode value={link} size={176} backgroundColor={colors.neutral[100]} color={colors.background} />
        </View>

        <View className="items-center gap-1">
          <Text className="font-body text-xs text-neutral-500">{t('invite.codeLabel')}</Text>
          <Text
            className="text-accentScale-200"
            style={{ fontFamily: MONO_FONT_FAMILY, fontSize: 21 }}>
            {group.code}
          </Text>
        </View>

        <Button title={t('invite.copy')} variant="neutral" onPress={handleCopy} />

        <Text className="font-body text-center text-2xs text-neutral-500">{t('invite.note')}</Text>

        <View className="w-full gap-2.5">
          <Button title={t('invite.shareLink')} variant="primary" onPress={handleShare} />
          <Button title={t('invite.newCode')} variant="neutral" onPress={handleRenew} />
        </View>

        <Text
          className="text-center text-2xs text-neutral-600"
          style={{ fontFamily: MONO_FONT_FAMILY }}
          numberOfLines={1}>
          {link}
        </Text>
      </View>
    </BottomSheet>
  );
}
