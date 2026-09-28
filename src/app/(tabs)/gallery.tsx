import { useState } from 'react';
import { View, Text, FlatList, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Chip, Fab, MediaPlaceholder, Screen } from '@/components';
import { TAB_BAR_CLEARANCE } from '@/theme/layout';
import { useT } from '@/i18n';
import { useAppStore } from '@/store/useAppStore';
import { CURRENT_STUDENT_ID } from '@/data/people';
import type { Style } from '@/data/catalog';
import { STYLES, LEVELS } from '@/data/catalog';
import type { Level } from '@/data/people';
import { fmtDuration } from '@/utils/format';

type StyleFilter = Style | 'todos';
type LevelFilter = Level | 'todos';

export default function GalleryScreen() {
  const { t } = useT();
  const role = useAppStore(s => s.role);
  const filterResetKey = useAppStore(s => s.filterResetKey);
  const steps = useAppStore(s => s.steps);
  const groups = useAppStore(s => s.groups);
  const learnedStepIds = useAppStore(s => s.learnedStepIds);
  const [style, setStyle] = useState<StyleFilter>('todos');
  const [level, setLevel] = useState<LevelFilter>('todos');

  const myGroupIds = groups.filter(g => g.memberIds.includes(CURRENT_STUDENT_ID)).map(g => g.id);

  const visibleSteps = steps.filter(s => role === 'profe' || s.groupIds.some(gid => myGroupIds.includes(gid)));
  const filteredSteps = visibleSteps.filter(
    s => (style === 'todos' || s.style === style) && (level === 'todos' || s.level === level)
  );

  return (
    <Screen key={filterResetKey} scroll={false} className="bg-background flex-1">
      <View style={{ height: 46, overflow: 'hidden' }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 20, alignItems: 'center' }}>
          <Chip label={t('gallery.all')} active={style === 'todos'} onPress={() => setStyle('todos')} />
          {STYLES.map(s => (
            <Chip key={s} label={t(`styles.${s}`)} active={style === s} onPress={() => setStyle(s)} />
          ))}
        </ScrollView>
      </View>

      <View style={{ height: 50, overflow: 'hidden' }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 20, alignItems: 'center' }}>
          <Chip label={t('gallery.all')} active={level === 'todos'} onPress={() => setLevel('todos')} />
          {LEVELS.map(l => (
            <Chip key={l} label={t(`levels.${l}`)} active={level === l} onPress={() => setLevel(l)} />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredSteps}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: TAB_BAR_CLEARANCE, gap: 16 }}
        ListEmptyComponent={
          <Text className="font-body px-1 py-6 text-center text-sm text-neutral-500">{t('gallery.empty')}</Text>
        }
        renderItem={({ item }) => {
          const learned = learnedStepIds.includes(item.id);
          return (
            <Pressable
              className="flex-1 active:opacity-80"
              onPress={() => router.push({ pathname: '/paso/[id]', params: { id: item.id, from: 'gallery' } })}>
              <MediaPlaceholder
                className="mb-2 rounded-2xl"
                style={{ aspectRatio: 4 / 5 }}
                showPlay
                label={`video · ${fmtDuration(item.durationSec)}`}
              />
              {role === 'alumno' && learned ? (
                <View className="absolute left-2 top-2 flex-row items-center gap-1 rounded-full bg-accentScale-900 px-2 py-1">
                  <Text className="font-heading text-2xs text-accentScale-200">{t('gallery.learnedBadge')}</Text>
                </View>
              ) : null}
              <Text className="font-heading mb-1 text-sm leading-5 text-text">{item.name}</Text>
              <Text className="font-body text-2xs text-neutral-500">
                {t(`styles.${item.style}`)} · {t(`levels.${item.level}`)}
              </Text>
            </Pressable>
          );
        }}
      />

      {role === 'profe' ? <Fab icon="add" label={t('gallery.fabNew')} onPress={() => router.push('/paso/nuevo')} /> : null}
    </Screen>
  );
}
