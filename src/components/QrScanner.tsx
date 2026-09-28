import { useEffect, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '@/theme/useThemeColors';
import { useT } from '@/i18n';
import { Icon } from './Icon';

type Props = {
  visible: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
  onSimulate: () => void;
};

export function QrScanner({ visible, onClose, onScan, onSimulate }: Props) {
  const colors = useThemeColors();
  const { t } = useT();
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // Reinicia el estado de "ya escaneado" al abrir (ajuste durante el render,
  // no en un efecto, para que sea síncrono con el cambio de `visible`).
  const [wasVisible, setWasVisible] = useState(visible);
  if (visible !== wasVisible) {
    setWasVisible(visible);
    if (visible) setScanned(false);
  }

  useEffect(() => {
    if (visible && !permission?.granted) requestPermission();
  }, [visible, permission?.granted, requestPermission]);

  function handleBarcodeScanned(result: { data: string }) {
    if (scanned) return;
    setScanned(true);
    onScan(result.data);
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-black">
        {permission?.granted ? (
          <CameraView
            style={{ flex: 1 }}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            onBarcodeScanned={handleBarcodeScanned}
          />
        ) : (
          <View className="flex-1 bg-neutral-100" />
        )}

        <View className="absolute inset-0 items-center justify-center">
          <View
            className="h-56 w-56 rounded-3xl border-2 border-accent"
            style={{ boxShadow: '0 0 28px 6px rgba(145,132,217,0.6)' }}
          />
          <Text className="font-body mt-4 text-sm text-white">{t('join.cameraHint')}</Text>
        </View>

        <Pressable
          onPress={onClose}
          hitSlop={8}
          className="absolute h-10 w-10 items-center justify-center rounded-full bg-black/40"
          style={{ top: insets.top + 8, left: 16 }}>
          <Icon name="close" size={20} color={colors.foreground} />
        </Pressable>

        <View className="absolute inset-x-0 items-center" style={{ bottom: insets.bottom + 32 }}>
          <Pressable
            onPress={onSimulate}
            className="rounded-full border border-accent bg-black/40 px-5 py-3 active:bg-accent/20">
            <Text className="font-heading text-sm text-accent">{t('join.simulateScan')}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
