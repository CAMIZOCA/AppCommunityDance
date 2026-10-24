import { View, Text, FlatList, Pressable } from 'react-native';
import { router } from 'expo-router';
import { MediaPlaceholder, ProgressBarGlow, Screen } from '@/components';
import { TAB_BAR_CLEARANCE } from '@/theme/layout';
import { useT } from '@/i18n';
import { useAppStore } from '@/store/useAppStore';
import { CURRENT_STUDENT_ID } from '@/data/people';
import { hashProgressPercent } from '@/data/progress';
import { fmtDuration } from '@/utils/format';

export default function ProgressScreen() {
  const { t } = useT();
  const role = useAppStore(s => s.role);
  const groups = useAppStore(s => s.groups);
  const steps = useAppStore(s => s.steps);
  const learnedStepIds = useAppStore(s => s.learnedStepIds);

  if (role === 'profe') {
    const rows = groups.map(g => {
      const total = steps.filter(s => s.groupIds.includes(g.id)).length;
      const percents = g.memberIds.map(pid =>
        pid === CURRENT_STUDENT_ID
          ? Math.round((steps.filter(s => s.groupIds.includes(g.id) && learnedStepIds.includes(s.id)).length / (total || 1)) * 100)
          : hashProgressPercent(pid, g.id)
      );
      const avg = percents.length ? Math.round(percents.reduce((a, b) => a + b, 0) / percents.length) : 0;
      return { group: g, avg };
    });

    return (
      <Screen scroll={false} className="bg-background flex-1">
        <FlatList
          data={rows}
          keyExtractor={item => item.group.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 8, gap: 12, paddingBottom: TAB_BAR_CLEARANCE }}
          ListEmptyComponent={
            <View className="items-center gap-2 px-6 py-16">
              <Text className="font-heading text-md text-text">{t('states.emptyTeacherProgressTitle')}</Text>
              <Text className="font-body text-center text-sm text-neutral-500">{t('states.emptyTeacherProgressBody')}</Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              className="rounded-card bg-surface px-4 py-4 active:opacity-80"
              onPress={() => router.push({ pathname: '/grupo/[id]', params: { id: item.group.id, tab: 'progreso' } })}>
              <View className="mb-3 flex-row items-baseline justify-between">
                <Text className="font-heading flex-1 text-md text-text">{item.group.name}</Text>
                <Text className="font-heading text-sm text-accentScale-300">{item.avg}%</Text>
              </View>
              <ProgressBarGlow percent={item.avg} className="mb-3" />
              <Text className="font-body text-2xs text-neutral-500">
                {t('groups.studentsCount', { n: item.group.memberIds.length })} · {t('progressTab.average')}
              </Text>
            </Pressable>
          )}
        />
      </Screen>
    );
  }

  const myGroups = groups.filter(g => g.memberIds.includes(CURRENT_STUDENT_ID));
  const cards = myGroups.map(g => {
    const groupSteps = steps.filter(s => s.groupIds.includes(g.id));
    const learnedCount = groupSteps.filter(s => learnedStepIds.includes(s.id)).length;
    return { group: g, total: groupSteps.length, learnedCount };
  });

  const myStepIds = new Set(myGroups.flatMap(g => steps.filter(s => s.groupIds.includes(g.id)).map(s => s.id)));
  const toReview = steps.filter(s => myStepIds.has(s.id) && !learnedStepIds.includes(s.id));

  return (
    <Screen scroll={false} className="bg-background flex-1">
      <FlatList
        data={cards}
        keyExtractor={item => item.group.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 8, gap: 12 }}
        ListEmptyComponent={
          <View className="items-center gap-2 px-6 py-16">
            <Text className="font-heading text-md text-text">{t('states.emptyStudentProgressTitle')}</Text>
            <Text className="font-body text-center text-sm text-neutral-500">{t('states.emptyStudentProgressBody')}</Text>
          </View>
        }
        renderItem={({ item }) => {
          const percent = item.total ? Math.round((item.learnedCount / item.total) * 100) : 0;
          return (
            <Pressable
              className="rounded-card bg-surface px-4 py-4 active:opacity-80"
              onPress={() => router.push({ pathname: '/grupo/[id]', params: { id: item.group.id } })}>
              <View className="mb-3 flex-row items-baseline justify-between">
                <Text className="font-heading flex-1 text-md text-text">{item.group.name}</Text>
                <Text className="font-heading text-sm text-accentScale-300">
                  {item.learnedCount}/{item.total}
                </Text>
              </View>
              <ProgressBarGlow percent={percent} className="mb-3" />
              <Text className="font-body text-2xs text-neutral-500">
                {t(`levels.${item.group.level}`)} · {item.learnedCount}{' '}
                {t('groupDetail.learned').toLowerCase()}
              </Text>
            </Pressable>
          );
        }}
        ListFooterComponent={cards.length === 0 ? null : (
          <View className="mt-2 gap-3">
            <Text className="font-heading text-2xs tracking-widest text-neutral-500 uppercase">
              {t('progressTab.toReview')}
            </Text>
            {toReview.length === 0 ? (
              <Text className="font-body text-sm text-neutral-500">{t('progressTab.allReviewed')}</Text>
            ) : (
              <View className="overflow-hidden rounded-card bg-surface">
                {toReview.map((step, i) => (
                  <Pressable
                    key={step.id}
                    onPress={() => router.push({ pathname: '/paso/[id]', params: { id: step.id } })}
                    className={`flex-row items-center gap-3 px-3 py-2.5 active:bg-black/10 ${
                      i < toReview.length - 1 ? 'border-b border-divider' : ''
                    }`}>
                    <MediaPlaceholder className="rounded-md" style={{ width: 44, height: 56 }} />
                    <View className="flex-1">
                      <Text className="font-heading text-sm text-text">{step.name}</Text>
                      <Text className="font-body text-2xs text-neutral-500">
                        {t(`styles.${step.style}`)} · {t(`levels.${step.level}`)} · {fmtDuration(step.durationSec)}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        )}
        ListFooterComponentStyle={{ paddingHorizontal: 20, paddingBottom: TAB_BAR_CLEARANCE }}
      />
    </Screen>
  );
}
