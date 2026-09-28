import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import {
  DetailHeader,
  Icon,
  MediaPlaceholder,
  MediaViewer,
  Screen,
  UploadPickSheet,
} from '@/components';
import type { ViewerItem } from '@/components/MediaViewer';
import { useThemeColors } from '@/theme/useThemeColors';
import { useT } from '@/i18n';
import { useAppStore } from '@/store/useAppStore';
import { useUiStore } from '@/store/useUiStore';
import { fmtDuration } from '@/utils/format';
import type { Presentation, VideoAsset } from '@/data/events';

type Tab = 'programa' | 'videos' | 'fotos';

export default function EventoDetailScreen() {
  const colors = useThemeColors();
  const { t } = useT();
  const { id } = useLocalSearchParams<{ id: string }>();
  const role = useAppStore(s => s.role);
  const event = useAppStore(s => s.events.find(e => e.id === id));
  const uploadVideoToPresentation = useAppStore(s => s.uploadVideoToPresentation);
  const uploadPhotos = useAppStore(s => s.uploadPhotos);
  const showToast = useUiStore(s => s.showToast);
  const startDownload = useUiStore(s => s.startDownload);

  const [tab, setTab] = useState<Tab>(event?.isPast ? 'fotos' : 'programa');
  const [expandedPresentation, setExpandedPresentation] = useState<string | null>(null);
  const [uploadSheetOpen, setUploadSheetOpen] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);
  const [viewer, setViewer] = useState<{ items: ViewerItem[]; index: number } | null>(null);

  const videoCount = useMemo(
    () => (event ? event.presentations.reduce((acc, p) => acc + p.videos.length, 0) : 0),
    [event]
  );

  if (!event) {
    return (
      <Screen className="bg-background flex-1">
        <DetailHeader title={t('events.notFound')} />
      </Screen>
    );
  }

  function download(label: string) {
    startDownload(label, () => showToast(t('eventDetail.savedToast')));
  }

  async function handlePickVideoFor(presentation: Presentation) {
    setUploadSheetOpen(false);
    let title = 'Video';
    let durationSec = 180;
    try {
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['videos'] });
      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        title = asset.fileName ?? 'Video';
        durationSec = asset.duration ? Math.round(asset.duration / 1000) : 180;
      } else {
        title = 'Coreografía';
      }
    } catch {
      title = 'Coreografía';
    }
    uploadVideoToPresentation(event!.id, presentation.id, { title, durationSec });
    setExpandedPresentation(presentation.id);
    showToast(t('eventDetail.videoUploadedToast', { name: presentation.name }));
  }

  async function handlePickPhotos() {
    let count = 3;
    try {
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsMultipleSelection: true });
      if (!result.canceled && result.assets?.length) count = result.assets.length;
    } catch {
      // usa el fallback de ejemplo
    }
    uploadPhotos(event!.id, count);
    showToast(t('eventDetail.photosUploadedToast', { n: count }));
  }

  function togglePhotoSelected(photoId: string) {
    setSelectedPhotoIds(ids => (ids.includes(photoId) ? ids.filter(x => x !== photoId) : [...ids, photoId]));
  }

  function openPhotoViewer(index: number) {
    setViewer({
      items: event!.photos.map(p => ({ id: p.id, kind: 'photo' as const, title: event!.name, subtitle: event!.dateLabel })),
      index,
    });
  }

  function openVideoViewer(all: { presentation: Presentation; video: VideoAsset }[], index: number) {
    setViewer({
      items: all.map(({ presentation, video }) => ({
        id: video.id,
        kind: 'video',
        title: video.title,
        subtitle: `${presentation.name} · ${fmtDuration(video.durationSec)}`,
      })),
      index,
    });
  }

  const allVideos = event.presentations.flatMap(p => p.videos.map(video => ({ presentation: p, video })));

  return (
    <Screen scroll={false} className="bg-background flex-1">
      <DetailHeader title={event.name} />

      <View className="px-5">
        <MediaPlaceholder className="mb-4 rounded-card" style={{ height: 180 }} />
        <Text className="font-heading mb-2 text-4xl text-text">{event.name}</Text>
        <View className="mb-1.5 flex-row items-center gap-1.5">
          <Icon name="calendar" size={13} color={colors.neutral[500]} />
          <Text className="font-body text-sm text-neutral-400">{event.dateLabel}</Text>
        </View>
        <View className="mb-4 flex-row items-center gap-1.5">
          <Icon name="pin" size={13} color={colors.neutral[500]} />
          <Text className="font-body text-sm text-neutral-400">{event.venue}</Text>
        </View>
      </View>

      <View className="flex-row gap-5 border-b border-divider px-5">
        {(
          [
            ['programa', t('eventDetail.tabProgram'), event.presentations.length],
            ['videos', t('eventDetail.tabVideos'), videoCount],
            ['fotos', t('eventDetail.tabPhotos'), event.photos.length],
          ] as [Tab, string, number][]
        ).map(([key, label, count]) => (
          <Pressable key={key} onPress={() => setTab(key)} className="items-center gap-2 pb-2.5">
            <View className="flex-row items-center gap-1.5">
              <Text className={`font-heading text-sm ${tab === key ? 'text-text' : 'text-neutral-500'}`}>{label}</Text>
              <Text className="font-body text-2xs text-neutral-600">{count}</Text>
            </View>
            <View className={`h-0.5 w-full rounded-full ${tab === key ? 'bg-accent' : 'bg-transparent'}`} />
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 140, gap: 16 }}>
        {tab === 'programa' ? (
          <View className="overflow-hidden rounded-card bg-surface">
            {event.presentations.map((p, i) => {
              const expanded = expandedPresentation === p.id;
              return (
                <View key={p.id} className={i < event.presentations.length - 1 ? 'border-b border-divider' : ''}>
                  <Pressable
                    onPress={() => setExpandedPresentation(expanded ? null : p.id)}
                    className="flex-row items-center gap-3 px-3.5 py-3 active:bg-black/10">
                    <Text className="font-body w-14 text-sm text-accentScale-300">{p.time}</Text>
                    <View className="flex-1">
                      <Text className="font-heading text-sm text-text">{p.name}</Text>
                      <Text className="font-body text-2xs text-neutral-500">
                        {p.style ? `${p.style} · ` : ''}
                        {t('events.videosCount', { n: p.videos.length })}
                      </Text>
                    </View>
                    <Icon
                      name="chevronDown"
                      size={16}
                      color={colors.neutral[600]}
                      style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }}
                    />
                  </Pressable>

                  {expanded ? (
                    <View className="gap-2 px-3.5 pb-3.5">
                      {p.videos.length === 0 ? (
                        <Text className="font-body text-xs text-neutral-500">{t('eventDetail.noVideoYet')}</Text>
                      ) : (
                        p.videos.map(v => (
                          <View key={v.id} className="flex-row items-center gap-3 rounded-xl bg-background px-3 py-2.5">
                            <MediaPlaceholder
                              className="rounded-lg"
                              style={{ width: 56, height: 42 }}
                              showPlay
                              playSize={22}
                              onPressPlay={() => openVideoViewer(allVideos, allVideos.findIndex(x => x.video.id === v.id))}
                            />
                            <View className="flex-1">
                              <Text className="font-body text-sm text-text" numberOfLines={1}>
                                {v.title}
                              </Text>
                              <Text className="font-body text-2xs text-neutral-500">{fmtDuration(v.durationSec)}</Text>
                            </View>
                            <Pressable
                              onPress={() => download(t('eventDetail.downloading', { name: v.title }))}
                              hitSlop={8}>
                              <Icon name="download" size={18} color={colors.accent} />
                            </Pressable>
                          </View>
                        ))
                      )}
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        ) : null}

        {tab === 'videos' ? (
          <View className="gap-4">
            {role === 'profe' ? (
              <Pressable
                onPress={() => setUploadSheetOpen(true)}
                className="items-center rounded-button border border-accent py-3 active:bg-accent/12">
                <Text className="font-heading text-sm text-accent">{t('eventDetail.uploadVideo')}</Text>
              </Pressable>
            ) : null}

            {allVideos.length > 0 ? (
              <Pressable
                onPress={() => download(t('eventDetail.downloadAll', { n: allVideos.length }))}
                className="flex-row items-center justify-center gap-2 rounded-button border border-divider bg-surface py-3 active:bg-divider">
                <Icon name="download" size={16} color={colors.text} />
                <Text className="font-heading text-sm text-text">
                  {t('eventDetail.downloadAll', { n: allVideos.length })}
                </Text>
              </Pressable>
            ) : null}

            {allVideos.length === 0 ? (
              <Text className="font-body py-6 text-center text-sm text-neutral-500">{t('eventDetail.noVideosYet')}</Text>
            ) : (
              allVideos.map(({ presentation, video }, i) => (
                <View key={video.id} className="gap-2">
                  <MediaPlaceholder
                    className="rounded-2xl"
                    style={{ aspectRatio: 16 / 9 }}
                    showPlay
                    onPressPlay={() => openVideoViewer(allVideos, i)}
                  />
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="font-heading text-sm text-text" numberOfLines={1}>
                        {presentation.name}
                      </Text>
                      <Text className="font-body text-2xs text-neutral-500">{video.title}</Text>
                    </View>
                    <Pressable
                      onPress={() => download(t('eventDetail.downloading', { name: video.title }))}
                      className="flex-row items-center gap-1.5 rounded-full border border-divider px-3 py-1.5">
                      <Icon name="download" size={13} color={colors.text} />
                      <Text className="font-body text-xs text-text">{t('eventDetail.download')}</Text>
                    </Pressable>
                  </View>
                </View>
              ))
            )}
          </View>
        ) : null}

        {tab === 'fotos' ? (
          <View className="gap-4">
            <View className="flex-row gap-2.5">
              {role === 'profe' ? (
                <Pressable
                  onPress={handlePickPhotos}
                  className="flex-1 items-center rounded-button border border-accent py-3 active:bg-accent/12">
                  <Text className="font-heading text-sm text-accent">{t('eventDetail.uploadPhotos')}</Text>
                </Pressable>
              ) : null}
              {event.photos.length > 0 ? (
                <Pressable
                  onPress={() => {
                    setSelecting(v => !v);
                    setSelectedPhotoIds([]);
                  }}
                  className="items-center rounded-button border border-divider bg-surface px-4 py-3 active:bg-divider">
                  <Text className="font-heading text-sm text-text">
                    {selecting ? t('eventDetail.cancelSelect') : t('eventDetail.select')}
                  </Text>
                </Pressable>
              ) : null}
            </View>

            {event.photos.length > 0 && !selecting ? (
              <Pressable
                onPress={() => download(t('eventDetail.downloadingPhotos', { n: event.photos.length }))}
                className="flex-row items-center justify-center gap-2 rounded-button border border-divider bg-surface py-3 active:bg-divider">
                <Icon name="download" size={16} color={colors.text} />
                <Text className="font-heading text-sm text-text">{t('eventDetail.downloadAllPhotos')}</Text>
              </Pressable>
            ) : null}

            {event.photos.length === 0 ? (
              <Text className="font-body py-6 text-center text-sm text-neutral-500">{t('eventDetail.noPhotosYet')}</Text>
            ) : (
              <View className="flex-row flex-wrap" style={{ gap: 3 }}>
                {event.photos.map((photo, i) => {
                  const isSelected = selectedPhotoIds.includes(photo.id);
                  return (
                    <Pressable
                      key={photo.id}
                      onPress={() => (selecting ? togglePhotoSelected(photo.id) : openPhotoViewer(i))}
                      style={{ width: '32.7%', aspectRatio: 1 }}>
                      <MediaPlaceholder
                        className="flex-1"
                        style={isSelected ? { borderWidth: 2, borderColor: colors.accent } : undefined}
                        label={t('eventDetail.photoLabel', { n: photo.index })}
                      />
                      {selecting ? (
                        <View className="absolute right-1.5 top-1.5">
                          <Icon
                            name="checkCircle"
                            size={18}
                            weight={isSelected ? 'fill' : 'regular'}
                            color={isSelected ? colors.accent : colors.neutral[100]}
                          />
                        </View>
                      ) : null}
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>
        ) : null}
      </ScrollView>

      {selecting && selectedPhotoIds.length > 0 ? (
        <View className="absolute inset-x-5 flex-row items-center justify-between rounded-full border border-divider bg-surface px-4 py-3" style={{ bottom: 24 }}>
          <Text className="font-body text-sm text-text">{t('common.selectedCount', { n: selectedPhotoIds.length })}</Text>
          <Pressable
            onPress={() => {
              download(t('eventDetail.downloadingPhotos', { n: selectedPhotoIds.length }));
              setSelecting(false);
              setSelectedPhotoIds([]);
            }}
            className="flex-row items-center gap-1.5 rounded-full border border-accent px-3.5 py-2 active:bg-accent/12">
            <Icon name="download" size={14} color={colors.accent} />
            <Text className="font-heading text-xs text-accent">{t('eventDetail.download')}</Text>
          </Pressable>
        </View>
      ) : null}

      <UploadPickSheet
        visible={uploadSheetOpen}
        onClose={() => setUploadSheetOpen(false)}
        presentations={event.presentations}
        onPick={handlePickVideoFor}
      />

      {viewer ? (
        <MediaViewer
          visible
          items={viewer.items}
          index={viewer.index}
          onClose={() => setViewer(null)}
          onChangeIndex={i => setViewer(v => (v ? { ...v, index: i } : v))}
          onDownload={item => download(t('eventDetail.downloading', { name: item.title }))}
        />
      ) : null}
    </Screen>
  );
}
