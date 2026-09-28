import { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { useThemeColors } from '@/theme/useThemeColors';
import { useT } from '@/i18n';
import { useAppStore } from '@/store/useAppStore';
import { useUiStore } from '@/store/useUiStore';
import { PEOPLE, initialsOf } from '@/data/people';
import { LEVELS, STYLES, type Style } from '@/data/catalog';
import type { Level } from '@/data/people';
import { Avatar } from './Avatar';
import { Checkbox } from './Checkbox';
import { Chip } from './Chip';
import { DetailHeader } from './DetailHeader';
import { FixedBottomBar } from './FixedBottomBar';
import { Icon } from './Icon';
import { Screen } from './Screen';
import { Button } from './Button';

type Props = { groupId?: string };

export function GroupForm({ groupId }: Props) {
  const colors = useThemeColors();
  const { t } = useT();
  const group = useAppStore(s => (groupId ? s.groups.find(g => g.id === groupId) : undefined));
  const createGroup = useAppStore(s => s.createGroup);
  const updateGroup = useAppStore(s => s.updateGroup);
  const showToast = useUiStore(s => s.showToast);

  const [name, setName] = useState(group?.name ?? '');
  const [style, setStyle] = useState<Style>(group?.style ?? 'salsa');
  const [level, setLevel] = useState<Level>(group?.level ?? 'principiante');
  const [schedule, setSchedule] = useState(group?.schedule ?? '');
  const [studentIds, setStudentIds] = useState<string[]>(group?.memberIds ?? []);
  const [studentQuery, setStudentQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const students = useMemo(() => {
    const filtered = PEOPLE.filter(
      p => p.id !== 'profe-daniela' && p.name.toLowerCase().includes(studentQuery.toLowerCase())
    );
    return [...filtered].sort((a, b) => {
      const aMatch = a.level === level ? 0 : 1;
      const bMatch = b.level === level ? 0 : 1;
      return aMatch - bMatch;
    });
  }, [studentQuery, level]);

  function toggleStudent(id: string) {
    setStudentIds(ids => (ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]));
  }

  function handleSubmit() {
    if (!name.trim() || studentIds.length === 0) {
      setError(t('groupForm.missingFieldsError'));
      return;
    }
    setError(null);
    const input = { name: name.trim(), style, level, schedule, studentIds };
    if (groupId) {
      updateGroup(groupId, input);
      showToast(t('groupForm.savedToast'));
      router.back();
    } else {
      const id = createGroup(input);
      showToast(t('groupForm.createdToast'));
      router.replace({ pathname: '/grupo/[id]', params: { id, openInvite: '1' } });
    }
  }

  const isValid = name.trim().length > 0 && studentIds.length > 0;

  return (
    <Screen scroll={false} className="bg-background flex-1">
      <DetailHeader title={groupId ? t('groupForm.editTitle') : t('groupForm.newTitle')} />

      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <View className="gap-2">
          <Text className="font-body text-xs text-neutral-500">{t('groupForm.nameLabel')}</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={t('groupForm.namePlaceholder')}
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
          <Text className="font-body text-xs text-neutral-500">{t('groupForm.scheduleLabel')}</Text>
          <TextInput
            value={schedule}
            onChangeText={setSchedule}
            placeholder={t('groupForm.schedulePlaceholder')}
            placeholderTextColor={colors.neutral[600]}
            className="font-body rounded-2xl bg-surface px-4 py-3.5 text-text"
          />
        </View>

        <View className="gap-2">
          <View className="flex-row items-baseline justify-between">
            <Text className="font-body text-xs text-neutral-500">{t('groupForm.studentsLabel')}</Text>
            <Text className="font-heading text-xs text-accentScale-300">
              {t('common.selectedCount', { n: studentIds.length })}
            </Text>
          </View>
          <View className="h-11 flex-row items-center gap-2 rounded-full bg-surface px-4">
            <Icon name="search" size={15} color={colors.neutral[500]} />
            <TextInput
              value={studentQuery}
              onChangeText={setStudentQuery}
              placeholder={t('groupForm.studentsSearchPlaceholder')}
              placeholderTextColor={colors.neutral[500]}
              className="font-body flex-1 text-sm text-text"
            />
          </View>

          <View className="overflow-hidden rounded-card bg-surface">
            {students.map((p, i) => (
              <View
                key={p.id}
                className={`flex-row items-center gap-3 px-3.5 py-2.5 ${
                  i < students.length - 1 ? 'border-b border-divider' : ''
                }`}>
                <Avatar initials={initialsOf(p.name)} variant="student" size="sm" />
                <View className="flex-1">
                  <Text className="font-body text-sm text-text">{p.name}</Text>
                  <Text className="font-body text-2xs text-neutral-500">{t(`levels.${p.level}`)}</Text>
                </View>
                <Checkbox checked={studentIds.includes(p.id)} onPress={() => toggleStudent(p.id)} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <FixedBottomBar error={error}>
        <Button
          title={groupId ? t('groupForm.saveButton') : t('groupForm.createButton')}
          dimmed={!isValid}
          onPress={handleSubmit}
        />
      </FixedBottomBar>
    </Screen>
  );
}
