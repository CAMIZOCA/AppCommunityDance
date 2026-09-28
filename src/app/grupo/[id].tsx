import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Avatar, DetailHeader, Icon, IconButton, InviteSheet, MediaPlaceholder, ProgressBarGlow, Screen } from '@/components';
import { useThemeColors } from '@/theme/useThemeColors';
import { useT } from '@/i18n';
import { useAppStore } from '@/store/useAppStore';
import { CURRENT_STUDENT_ID, initialsOf, personById } from '@/data/people';
import { hashLearnedCount, hashProgressPercent } from '@/data/progress';
import { fmtDuration } from '@/utils/format';

type Tab = 'pasos' | 'progreso';

export default function GrupoDetailScreen() {
  const colors = useThemeColors();
  const { t } = useT();
  const { id, openInvite, tab: initialTab } = useLocalSearchParams<{ id: string; openInvite?: string; tab?: Tab }>();
  const role = useAppStore(s => s.role);
  const group = useAppStore(s => s.groups.find(g => g.id === id));
  const steps = useAppStore(s => s.steps);
  const learnedStepIds = useAppStore(s => s.learnedStepIds);
  const markGroupSeen = useAppStore(s => s.markGroupSeen);
  const [tab, setTab] = useState<Tab>(initialTab === 'progreso' ? 'progreso' : 'pasos');
  const [inviteOpen, setInviteOpen] = useState(openInvite === '1');

  useEffect(() => {
    if (id) markGroupSeen(id);
  }, [id, markGroupSeen]);

  const groupSteps = useMemo(
    () => (group ? steps.filter(s => s.groupIds.includes(group.id)) : []),
    [group, steps]
  );

  if (!group) {
    return (
      <Screen className="bg-background flex-1">
        <DetailHeader title={t('groupDetail.notFound')} />
      </Screen>
    );
  }

  const learnedCount = groupSteps.filter(s => learnedStepIds.includes(s.id)).length;
  const progressPercent = groupSteps.length ? Math.round((learnedCount / groupSteps.length) * 100) : 0;

  return (
    <Screen scroll={false} className="bg-background flex-1">
      <DetailHeader
        title={group.name}
        actions={
          role === 'profe' ? (
            <>
              <IconButton icon="qrcode" onPress={() => setInviteOpen(true)} />
              <IconButton icon="edit" onPress={() => router.push({ pathname: '/grupo/editar/[id]', params: { id: group.id } })} />
              <IconButton
                icon="camera"
                outlined
                color={colors.accent}
                onPress={() =>
                  router.push({
                    pathname: '/paso/nuevo',
                    params: { groupId: group.id, style: group.style, level: group.level },
                  })
                }
              />
            </>
          ) : undefined
        }
      />

      <View className="items-center gap-2 px-5 pb-4 pt-1">
        <Avatar initials={initialsOf(group.name)} variant="group" size="lg" />
        <Text className="font-body text-sm text-neutral-500">
          {t('groups.studentsCount', { n: group.memberIds.length })} · {group.schedule}
        </Text>
      </View>

      <View className="flex-row gap-5 border-b border-divider px-5">
        {(['pasos', 'progreso'] as Tab[]).map(key => (
          <Pressable key={key} onPress={() => setTab(key)} className="items-center gap-2 pb-2.5">
            <View className="flex-row items-center gap-1.5">
              <Text className={`font-heading text-sm ${tab === key ? 'text-text' : 'text-neutral-500'}`}>
                {key === 'pasos' ? t('groupDetail.tabSteps') : t('groupDetail.tabProgress')}
              </Text>
              {key === 'pasos' ? (
                <Text className="font-body text-2xs text-neutral-600">{groupSteps.length}</Text>
              ) : null}
            </View>
            <View className={`h-0.5 w-full rounded-full ${tab === key ? 'bg-accent' : 'bg-transparent'}`} />
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 140 }}>
        {tab === 'pasos' ? (
          <>
            {role === 'alumno' && groupSteps.length > 0 ? (
              <View className="mb-4 gap-2">
                <View className="flex-row items-baseline justify-between">
                  <Text className="font-body text-xs text-neutral-500">
                    {t(`styles.${group.style}`)} · {t(`levels.${group.level}`)}
                  </Text>
                  <Text className="font-heading text-xs text-accentScale-300">
                    {t('groupDetail.learnedOf', { n: learnedCount, total: groupSteps.length })}
                  </Text>
                </View>
                <ProgressBarGlow percent={progressPercent} />
              </View>
            ) : null}

            <View className="overflow-hidden rounded-card bg-surface">
              {groupSteps.length === 0 ? (
                <Text className="font-body px-3.5 py-4 text-sm text-neutral-500">{t('groupDetail.noSteps')}</Text>
              ) : (
                groupSteps.map((step, i) => {
                  const learned = learnedStepIds.includes(step.id);
                  return (
                    <Pressable
                      key={step.id}
                      onPress={() => router.push({ pathname: '/paso/[id]', params: { id: step.id, from: `group:${group.id}` } })}
                      className={`flex-row items-center gap-3 px-3 py-2.5 active:bg-black/10 ${
                        i < groupSteps.length - 1 ? 'border-b border-divider' : ''
                      }`}>
                      <MediaPlaceholder
                        className="rounded-lg"
                        style={{ width: 64, height: 76 }}
                        showPlay
                        playSize={28}
                      />
                      <View className="flex-1">
                        <Text className="font-heading text-sm text-text" numberOfLines={1}>
                          {step.name}
                        </Text>
                        <Text className="font-body text-2xs text-neutral-500">
                          8 tiempos · {fmtDuration(step.durationSec)}
                        </Text>
                      </View>
                      {role === 'alumno' ? (
                        <Icon
                          name="checkCircle"
                          size={22}
                          weight={learned ? 'fill' : 'regular'}
                          color={learned ? colors.accent : colors.neutral[700]}
                        />
                      ) : (
                        <Icon name="chevronRight" size={16} color={colors.neutral[700]} />
                      )}
                    </Pressable>
                  );
                })
              )}
            </View>

            {role === 'profe' ? (
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/paso/nuevo',
                    params: { groupId: group.id, style: group.style, level: group.level },
                  })
                }
                className="mt-4 items-center rounded-card border border-dashed border-divider py-3.5 active:bg-surface">
                <Text className="font-heading text-sm text-accent">+ {t('groupDetail.newStep')}</Text>
              </Pressable>
            ) : null}
          </>
        ) : role === 'alumno' ? (
          <StudentProgress groupSteps={groupSteps} learnedStepIds={learnedStepIds} />
        ) : (
          <TeacherProgress groupId={group.id} groupSteps={groupSteps} />
        )}
      </ScrollView>

      <InviteSheet visible={inviteOpen} onClose={() => setInviteOpen(false)} groupId={group.id} />
    </Screen>
  );
}

function StudentProgress({
  groupSteps,
  learnedStepIds,
}: {
  groupSteps: ReturnType<typeof useAppStore.getState>['steps'];
  learnedStepIds: string[];
}) {
  const { t } = useT();
  const total = groupSteps.length;
  const learnedCount = groupSteps.filter(s => learnedStepIds.includes(s.id)).length;
  const percent = total ? Math.round((learnedCount / total) * 100) : 0;

  return (
    <View className="gap-6">
      <View className="items-center gap-1">
        <Text className="font-body text-xs text-neutral-500">{t('groupDetail.yourProgress')}</Text>
        <Text className="font-heading text-6xl text-text">{percent}%</Text>
        <Text className="font-body text-xs text-neutral-500">{t('groupDetail.ofStepsLearned')}</Text>
      </View>

      <View className="flex-row flex-wrap gap-2">
        {groupSteps.map(step => {
          const learned = learnedStepIds.includes(step.id);
          return (
            <View
              key={step.id}
              className={`h-8 rounded-md ${learned ? 'bg-accent' : 'bg-neutral-900'}`}
              style={{
                width: `${Math.max(8, 100 / Math.min(8, Math.max(groupSteps.length, 1)) - 2)}%`,
                boxShadow: learned ? '0 0 10px 2px rgba(145,132,217,0.6)' : undefined,
              }}
            />
          );
        })}
      </View>

      <View className="overflow-hidden rounded-card bg-surface">
        {groupSteps.map((step, i) => {
          const learned = learnedStepIds.includes(step.id);
          return (
            <View
              key={step.id}
              className={`flex-row items-center justify-between px-3.5 py-3 ${
                i < groupSteps.length - 1 ? 'border-b border-divider' : ''
              }`}>
              <Text className="font-body text-sm text-text">{step.name}</Text>
              <Text className={`font-body text-2xs ${learned ? 'text-accentScale-300' : 'text-neutral-500'}`}>
                {learned ? t('groupDetail.learned') : t('groupDetail.pending')}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function TeacherProgress({ groupId, groupSteps }: { groupId: string; groupSteps: ReturnType<typeof useAppStore.getState>['steps'] }) {
  const { t } = useT();
  const group = useAppStore(s => s.groups.find(g => g.id === groupId));
  const learnedStepIds = useAppStore(s => s.learnedStepIds);
  const total = groupSteps.length;

  const rows = (group?.memberIds ?? [])
    .map(personId => {
      const person = personById(personId);
      const count =
        personId === CURRENT_STUDENT_ID
          ? groupSteps.filter(s => learnedStepIds.includes(s.id)).length
          : hashLearnedCount(personId, groupId, total);
      const percent =
        personId === CURRENT_STUDENT_ID ? hashProgressPercent(personId, groupId) : Math.round((count / (total || 1)) * 100);
      return { person, count, percent: total ? Math.round((count / total) * 100) : percent };
    })
    .filter(r => r.person)
    .sort((a, b) => b.percent - a.percent);

  const avg = rows.length ? Math.round(rows.reduce((acc, r) => acc + r.percent, 0) / rows.length) : 0;

  return (
    <View className="gap-4">
      <Text className="font-heading text-sm text-text">{t('groupDetail.groupAvgProgress', { pct: avg })}</Text>
      <View className="gap-3">
        {rows.map(({ person, count, percent }) => (
          <View key={person!.id} className="flex-row items-center gap-3">
            <Avatar initials={initialsOf(person!.name)} variant="student" size="sm" />
            <View className="flex-1 gap-1">
              <View className="flex-row items-baseline justify-between">
                <Text className="font-body text-sm text-text">{person!.name}</Text>
                <Text className="font-body text-2xs text-neutral-500">
                  {count}/{total}
                </Text>
              </View>
              <ProgressBarGlow percent={percent} height={4} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
