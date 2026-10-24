import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { Button, DetailHeader, Icon, QrScanner, Screen } from '@/components';
import { useThemeColors } from '@/theme/useThemeColors';
import { useT } from '@/i18n';
import { useAppStore } from '@/store/useAppStore';
import { useUiStore } from '@/store/useUiStore';
import { MONO_FONT_FAMILY } from '@/theme/mono';

export default function UnirseScreen() {
  const colors = useThemeColors();
  const { t } = useT();
  const joinGroupByCode = useAppStore(s => s.joinGroupByCode);
  const showToast = useUiStore(s => s.showToast);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [scannerOpen, setScannerOpen] = useState(false);
  const role = useAppStore(s => s.role);

  // Solo el alumno se une a grupos con código; el profe crea y gestiona desde su vista.
  if (role === 'profe') return <Redirect href="/" />;

  function attemptJoin(rawCode: string) {
    const result = joinGroupByCode(rawCode);
    if (result === 'invalid') {
      setError(t('join.invalidCode'));
      return;
    }
    if (result === 'already') {
      setError(t('join.alreadyMember'));
      return;
    }
    setError(null);
    setScannerOpen(false);
    showToast(t('join.joinedToast', { name: result.groupName }));
    router.replace({ pathname: '/grupo/[id]', params: { id: result.groupId } });
  }

  function handleScan(data: string) {
    const match = data.match(/([A-Z0-9]{3,4}-[A-Z0-9]{4})/i);
    attemptJoin(match ? match[1] : data);
  }

  return (
    <Screen className="bg-background flex-1">
      <DetailHeader title={t('join.title')} />

      <View className="gap-6 px-5 pt-2">
        <Pressable
          onPress={() => setScannerOpen(true)}
          className="items-center gap-3 rounded-card border border-dashed border-divider bg-surface px-5 py-8 active:opacity-80">
          <View className="h-16 w-16 items-center justify-center rounded-full border border-accent">
            <Icon name="qrcode" size={28} color={colors.accent} />
          </View>
          <Text className="font-heading text-base text-text">{t('join.scanCard')}</Text>
          <Text className="font-body text-center text-xs text-neutral-500">{t('join.scanSubtitle')}</Text>
        </Pressable>

        <View className="gap-2">
          <Text className="font-body text-xs text-neutral-500">{t('join.orEnterCode')}</Text>
          <TextInput
            value={code}
            onChangeText={txt => {
              setCode(txt.toUpperCase());
              setError(null);
            }}
            onSubmitEditing={() => attemptJoin(code)}
            autoCapitalize="characters"
            placeholder={t('join.codePlaceholder')}
            placeholderTextColor={colors.neutral[600]}
            className="rounded-2xl bg-surface px-4 py-3.5 text-center text-text"
            style={{ fontFamily: MONO_FONT_FAMILY, fontSize: 22, letterSpacing: 1 }}
          />
          {error ? <Text className="font-body text-center text-xs text-danger">{error}</Text> : null}
        </View>

        <Button title={t('join.joinButton')} disabled={code.length < 4} onPress={() => attemptJoin(code)} />
      </View>

      <QrScanner visible={scannerOpen} onClose={() => setScannerOpen(false)} onScan={handleScan} />
    </Screen>
  );
}
