import { useEffect, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '@/theme/useThemeColors';
import { useT } from '@/i18n';
import { Icon } from './Icon';
import { Button } from './Button';

type Props = {
  visible: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
};

export function QrScanner({ visible, onClose, onScan }: Props) {
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

  // Permiso respondido con "no" (o aún sin respuesta mientras se pide).
  const denied = !!permission && !permission.granted;

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
        ) : null}

        {denied ? (
          <View className="flex-1 items-center justify-center gap-4 px-8">
            <Icon name="qrcode" size={40} color={colors.neutral[500]} />
            <Text className="font-heading text-center text-md text-text">{t('states.cameraDeniedTitle')}</Text>
            <Text className="font-body text-center text-sm text-neutral-400">{t('states.cameraDeniedBody')}</Text>
            <View className="w-full gap-3 pt-2">
              <Button title={t('states.retry')} onPress={() => requestPermission()} />
              <Button title={t('common.back')} variant="neutral" onPress={onClose} />
            </View>
          </View>
        ) : null}

        {permission?.granted ? (
          <View className="absolute inset-0 items-center justify-center">
            <View
              className="h-56 w-56 rounded-3xl border-2 border-accent"
              style={{ boxShadow: '0 0 28px 6px rgba(145,132,217,0.6)' }}
            />
            <Text className="font-body mt-4 text-sm text-white">{t('join.cameraHint')}</Text>
          </View>
        ) : null}

        <Pressable
          onPress={onClose}
          hitSlop={8}
          className="absolute h-10 w-10 items-center justify-center rounded-full bg-black/40"
          style={{ top: insets.top + 8, left: 16 }}>
          <Icon name="close" size={20} color={colors.foreground} />
        </Pressable>
      </View>
    </Modal>
  );
}
