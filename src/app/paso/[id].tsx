import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, CountGrid, DetailHeader, Icon, MediaPlaceholder, Screen, SegmentedControlNative } from '@/components';
import { useThemeColors } from '@/theme/useThemeColors';
import { useT } from '@/i18n';
import { useAppStore } from '@/store/useAppStore';
import { useUiStore } from '@/store/useUiStore';
import { CURRENT_STUDENT_ID } from '@/data/people';
import { fmtDuration } from '@/utils/format';

const TOTAL_BEATS = 32;
const BEAT_MS = 430;

function mirrorLabel(label: string): string {
  return label
    .replace(/\bIzq\./g, '\u0000')
    .replace(/\bDer\./g, 'Izq.')
    .replace(/\u0000/g, 'Der.')
    .replace(/^L (?=\w)/, '\u0000')
    .replace(/^R (?=\w)/, 'L ')
    .replace(/\u0000/, 'R ');
}

type Speed = 0.5 | 0.75 | 1;

export default function PasoDetailScreen() {
  const colors = useThemeColors();
  const { t, counts, lang } = useT();
  const { id, from } = useLocalSearchParams<{ id: string; from?: string }>();
  const role = useAppStore(s => s.role);
  const steps = useAppStore(s => s.steps);
  const groups = useAppStore(s => s.groups);
  const learnedStepIds = useAppStore(s => s.learnedStepIds);
  const toggleLearned = useAppStore(s => s.toggleLearned);
  const showToast = useUiStore(s => s.showToast);

  const step = steps.find(s => s.id === id);

  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<Speed>(1);
  const [mirror, setMirror] = useState(false);
  const [loop, setLoop] = useState(false);
  const [countOn, setCountOn] = useState(true);
  const [beatIndex, setBeatIndex] = useState(0); // 0..TOTAL_BEATS-1

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setBeatIndex(prev => {
        const next = prev + 1;
        if (next >= TOTAL_BEATS) {
          if (loop) return 0;
          setPlaying(false);
          return TOTAL_BEATS - 1;
        }
        return next;
      });
    }, BEAT_MS / speed);
    return () => clearInterval(interval);
  }, [playing, speed, loop]);

  const myGroupIds = groups.filter(g => g.memberIds.includes(CURRENT_STUDENT_ID)).map(g => g.id);
  const nextStep = useMemo(() => {
    if (!step) return undefined;
    let list = steps;
    if (from?.startsWith('group:')) {
      const groupId = from.replace('group:', '');
      list = steps.filter(s => s.groupIds.includes(groupId));
    } else {
      list = steps.filter(s => role === 'profe' || s.groupIds.some(gid => myGroupIds.includes(gid)));
    }
    if (list.length <= 1) return undefined;
    const idx = list.findIndex(s => s.id === step.id);
    if (idx === -1) return undefined;
    return list[(idx + 1) % list.length];
  }, [step, steps, from, role, myGroupIds]);

  // El alumno solo ve pasos de sus grupos; el profe ve todos.
  const canView = role === 'profe' || (!!step && step.groupIds.some(gid => myGroupIds.includes(gid)));
  if (!step || !canView) {
    return (
      <Screen className="bg-background flex-1">
        <DetailHeader title={t('stepPlayer.notFound')} />
      </Screen>
    );
  }

  const learned = learnedStepIds.includes(step.id);
  const cueLabels = counts(step.style);
  const beatInCycle = (beatIndex % 8) + 1;
  const displayCues = mirror ? cueLabels.map(mirrorLabel) : cueLabels;
  const currentTimeSec = ((beatIndex + 1) / TOTAL_BEATS) * step.durationSec;
  const progressPercent = ((beatIndex + 1) / TOTAL_BEATS) * 100;

  function handleToggleLearned() {
    toggleLearned(step!.id);
    if (!learned) showToast(t('stepPlayer.learnedToast', { name: step!.name }));
  }

  return (
    <Screen scroll={false} className="bg-background flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="relative overflow-hidden rounded-b-[22px]" style={{ height: 420 }}>
          <View style={{ flex: 1, transform: [{ scaleX: mirror ? -1 : 1 }] }}>
            <MediaPlaceholder className="flex-1" />
          </View>

          <Pressable className="absolute inset-0 items-center justify-center" onPress={() => setPlaying(p => !p)}>
            {playing && countOn ? (
              <Text
                className="font-heading text-accentScale-100"
                style={{ fontSize: 132, textShadowColor: 'rgba(145,132,217,0.85)', textShadowRadius: 30 }}>
                {beatInCycle}
              </Text>
            ) : !playing ? (
              <View
                className="h-16 w-16 items-center justify-center rounded-full border border-accent"
                style={{ backgroundColor: `${colors.background}B3` }}>
                <Icon name="play" size={26} color={colors.accent} weight="fill" />
              </View>
            ) : null}
          </Pressable>

          <View
            className="absolute left-4 h-9 w-9 items-center justify-center rounded-full bg-black/40"
            style={{ top: 14 }}>
            <Pressable onPress={() => router.back()} hitSlop={8}>
              <Icon name="chevronLeft" size={20} color={colors.foreground} />
            </Pressable>
          </View>

          <View className="absolute right-3 flex-row gap-1.5" style={{ top: 14 }}>
            {mirror ? (
              <View className="rounded-full bg-black/50 px-2.5 py-1">
                <Text className="font-heading text-2xs text-white">{t('stepPlayer.mirrorBadge')}</Text>
              </View>
            ) : null}
            {speed !== 1 ? (
              <View className="rounded-full bg-black/50 px-2.5 py-1">
                <Text className="font-heading text-2xs text-white">{speed}×</Text>
              </View>
            ) : null}
          </View>

          <View className="absolute inset-x-4 gap-1.5" style={{ bottom: 14 }}>
            <Text className="font-body text-2xs text-neutral-200">
              {fmtDuration(currentTimeSec)} / {fmtDuration(step.durationSec)}
            </Text>
            <View className="h-1.5 overflow-hidden rounded-full bg-white/20">
              <View
                className="h-full rounded-full bg-accent"
                style={{ width: `${progressPercent}%`, boxShadow: '0 0 10px 2px rgba(145,132,217,0.75)' }}
              />
            </View>
          </View>
        </View>

        <View className="gap-5 px-5 pt-5">
          <Pressable
            onPress={() => setPlaying(p => !p)}
            className="h-[52px] w-[52px] items-center justify-center self-center rounded-full border border-accent active:bg-accent/12">
            <Icon name={playing ? 'pause' : 'play'} size={22} color={colors.accent} weight="fill" />
          </Pressable>

          <View className="gap-2">
            <Text className="font-body text-xs text-neutral-500">{t('stepPlayer.speed')}</Text>
            <SegmentedControlNative
              value={String(speed)}
              onChange={v => setSpeed(Number(v) as Speed)}
              options={[
                { value: '0.5', label: '0.5×' },
                { value: '0.75', label: '0.75×' },
                { value: '1', label: '1×' },
              ]}
            />
          </View>

          <View className="flex-row gap-2.5">
            <ToggleTile icon="mirror" label={t('stepPlayer.mirror')} active={mirror} onPress={() => setMirror(v => !v)} />
            <ToggleTile icon="loop" label={t('stepPlayer.loop')} active={loop} onPress={() => setLoop(v => !v)} />
            <ToggleTile icon="count" label={t('stepPlayer.count')} active={countOn} onPress={() => setCountOn(v => !v)} />
          </View>

          <CountGrid labels={displayCues} current={countOn ? beatInCycle : 0} />

          <View className="flex-row items-center gap-1.5">
            <Text className="font-body text-2xs rounded-full bg-accent/14 px-2 py-0.5 text-accentScale-200">
              {t(`styles.${step.style}`)}
            </Text>
            <Text className="font-body text-2xs rounded-full bg-neutral-900 px-2 py-0.5 text-neutral-300">
              {t(`levels.${step.level}`)}
            </Text>
          </View>

          <Text className="font-heading text-4xl text-text">{step.name}</Text>
          <Text className="font-body text-sm leading-5 text-neutral-300">
            {step.notes[lang]}
          </Text>

          {role === 'alumno' ? (
            <Button
              title={learned ? t('stepPlayer.markedLearned') : t('stepPlayer.markLearned')}
              variant={learned ? 'tinted' : 'primary'}
              onPress={handleToggleLearned}
            />
          ) : null}

          {nextStep ? (
            <Pressable
              onPress={() => router.replace({ pathname: '/paso/[id]', params: { id: nextStep.id, from: from ?? '' } })}
              className="flex-row items-center gap-3 rounded-card bg-surface px-3.5 py-3 active:opacity-80">
              <View className="flex-1">
                <Text className="font-body text-2xs text-neutral-500">{t('stepPlayer.nextStep')}</Text>
                <Text className="font-heading text-sm text-text">{nextStep.name}</Text>
              </View>
              <Icon name="chevronRight" size={16} color={colors.neutral[600]} />
            </Pressable>
          ) : null}
        </View>
      </ScrollView>
    </Screen>
  );
}

function ToggleTile({
  icon,
  label,
  active,
  onPress,
}: {
  icon: 'mirror' | 'loop' | 'count';
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const colors = useThemeColors();
  return (
    <Pressable
      onPress={onPress}
      className={`h-14 flex-1 items-center justify-center gap-1 rounded-xl border ${
        active ? 'border-accent bg-accent/14' : 'border-divider bg-surface'
      }`}>
      <Icon name={icon} size={17} color={active ? colors.accent : colors.neutral[400]} />
      <Text className={`font-body text-2xs ${active ? 'text-accentScale-200' : 'text-neutral-400'}`}>{label}</Text>
    </Pressable>
  );
}
