import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useThemeColors } from '@/theme/useThemeColors';
import { useT } from '@/i18n';
import { useAppStore } from '@/store/useAppStore';
import { useUiStore } from '@/store/useUiStore';
import { STYLES, type Style } from '@/data/catalog';
import type { Level } from '@/data/people';
import { LEVELS } from '@/data/catalog';
import { fmtDuration } from '@/utils/format';
import { fileNameFromUri } from '@/utils/media';
import { Button, Checkbox, Chip, DetailHeader, FixedBottomBar, MediaPlaceholder, Screen } from '@/components';

type VideoInfo = { name: string; durationSec: number; uri?: string };

export default function NuevoPasoScreen() {
  const colors = useThemeColors();
  const { t } = useT();
  const params = useLocalSearchParams<{ groupId?: string; style?: string; level?: string }>();
  const groups = useAppStore(s => s.groups);
  const publishStep = useAppStore(s => s.publishStep);
  const role = useAppStore(s => s.role);
  const showToast = useUiStore(s => s.showToast);

  const [style, setStyle] = useState<Style>((params.style as Style) ?? 'salsa');
  const [level, setLevel] = useState<Level>((params.level as Level) ?? 'principiante');
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [video, setVideo] = useState<VideoInfo | null>(null);
  const [groupIds, setGroupIds] = useState<string[]>(params.groupId ? [params.groupId] : []);
  const [error, setError] = useState<string | null>(null);

  // Al cambiar estilo/nivel se preseleccionan automáticamente los grupos de
  // ese estilo y nivel (se ajusta durante el render, no en un efecto, para
  // que sea síncrono con el cambio de chip que lo dispara).
  const [matchedKey, setMatchedKey] = useState(`${style}|${level}`);
  const currentKey = `${style}|${level}`;
  if (currentKey !== matchedKey) {
    setMatchedKey(currentKey);
    setGroupIds(groups.filter(g => g.style === style && g.level === level).map(g => g.id));
  }

  // Solo se guarda el video que devuelve el picker. Si se cancela o falla,
  // no se toca el estado: sin video real, la validación "Falta video" bloquea.
  async function handlePickVideo() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['videos'],
        videoMaxDuration: 60,
      });
      if (result.canceled || !result.assets?.[0]) return;
      const asset = result.assets[0];
      setVideo({
        name: asset.fileName ?? fileNameFromUri(asset.uri) ?? t('eventDetail.defaultVideoTitle'),
        durationSec: asset.duration ? Math.round(asset.duration / 1000) : 0,
        uri: asset.uri,
      });
    } catch {
      // Picker fallido: no hay video que mostrar.
    }
  }

  function toggleGroup(id: string) {
    setGroupIds(ids => (ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]));
  }

  const isValid = !!video && name.trim().length > 0 && groupIds.length > 0;

  function handleSubmit() {
    if (!isValid) {
      setError(t('newStep.missingError'));
      return;
    }
    setError(null);
    publishStep({
      name: name.trim(),
      style,
      level,
      notes,
      groupIds,
      videoUri: video!.uri,
      durationSec: video!.durationSec,
    });
    showToast(t('newStep.publishedToast'));
    if (params.groupId) {
      router.replace({ pathname: '/grupo/[id]', params: { id: params.groupId } });
    } else {
      router.replace('/gallery');
    }
  }

  // Redirect después de todos los hooks.
  if (role !== 'profe') return <Redirect href="/" />;

  return (
    <Screen scroll={false} className="bg-background flex-1">
      <DetailHeader title={t('newStep.title')} />

      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <Pressable onPress={handlePickVideo}>
          {video ? (
            <View
              className="items-center justify-center rounded-2xl border border-accent bg-surface"
              style={{ height: 165 }}>
              <MediaPlaceholder className="absolute inset-0 rounded-2xl" showPlay playSize={40} />
              <View className="rounded-full bg-black/50 px-3 py-1.5">
                <Text className="font-body text-xs text-white">
                  {t('newStep.videoZoneFilled', { name: video.name, duration: fmtDuration(video.durationSec) })}
                </Text>
              </View>
            </View>
          ) : (
            <View
              className="items-center justify-center rounded-2xl border border-dashed border-divider"
              style={{ height: 165 }}>
              <Text className="font-body px-6 text-center text-sm text-neutral-500">{t('newStep.videoZoneEmpty')}</Text>
            </View>
          )}
        </Pressable>

        <View className="gap-2">
          <Text className="font-body text-xs text-neutral-500">{t('newStep.nameLabel')}</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={t('newStep.namePlaceholder')}
            placeholderTextColor={colors.neutral[600]}
            className="font-body rounded-2xl bg-surface px-4 py-3.5 text-text"
          />
        </View>

        <View className="gap-2">
          <Text className="font-body text-xs text-neutral-500">{t('groupForm.styleLabel')}</Text>
          <View className="flex-row flex-wrap gap-2">
            {STYLES.map(s => (
              <Chip key={s} label={t(`styles.${s}`)} active={style === s} onPress={() => setStyle(s)} />
            ))}
          </View>
        </View>

        <View className="gap-2">
          <Text className="font-body text-xs text-neutral-500">{t('groupForm.levelLabel')}</Text>
          <View className="flex-row flex-wrap gap-2">
            {LEVELS.map(l => (
              <Chip key={l} label={t(`levels.${l}`)} active={level === l} onPress={() => setLevel(l)} />
            ))}
          </View>
        </View>

        <View className="gap-2">
          <Text className="font-body text-xs text-neutral-500">{t('newStep.notesLabel')}</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder={t('newStep.notesPlaceholder')}
            placeholderTextColor={colors.neutral[600]}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="font-body min-h-[96px] rounded-2xl bg-surface px-4 py-3.5 text-text"
          />
        </View>

        <View className="gap-2">
          <Text className="font-body text-xs text-neutral-500">{t('newStep.groupsLabel')}</Text>
          <View className="overflow-hidden rounded-card bg-surface">
            {groups.map((g, i) => (
              <View
                key={g.id}
                className={`flex-row items-center gap-3 px-3.5 py-3 ${
                  i < groups.length - 1 ? 'border-b border-divider' : ''
                }`}>
                <View className="flex-1">
                  <Text className="font-body text-sm text-text">{g.name}</Text>
                  <Text className="font-body text-2xs text-neutral-500">
                    {t(`styles.${g.style}`)} · {t(`levels.${g.level}`)}
                  </Text>
                </View>
                <Checkbox checked={groupIds.includes(g.id)} onPress={() => toggleGroup(g.id)} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <FixedBottomBar error={error}>
        <Button title={t('newStep.publishButton')} dimmed={!isValid} onPress={handleSubmit} />
      </FixedBottomBar>
    </Screen>
  );
}
