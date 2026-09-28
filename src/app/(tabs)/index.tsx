import { useState } from 'react';
import { View, Text, FlatList, Pressable, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Avatar, Fab, Icon, Screen } from '@/components';
import { TAB_BAR_CLEARANCE } from '@/theme/layout';
import { useThemeColors } from '@/theme/useThemeColors';
import { useT } from '@/i18n';
import { useAppStore } from '@/store/useAppStore';
import { CURRENT_STUDENT_ID, initialsOf } from '@/data/people';

export default function GroupsScreen() {
  const colors = useThemeColors();
  const { t } = useT();
  const role = useAppStore(s => s.role);
  const filterResetKey = useAppStore(s => s.filterResetKey);
  const groups = useAppStore(s => s.groups);
  const steps = useAppStore(s => s.steps);
  const newStepsCount = useAppStore(s => s.newStepsCount);
  const [searchQuery, setSearchQuery] = useState('');

  const visibleGroups = groups.filter(
    g => role === 'profe' || g.memberIds.includes(CURRENT_STUDENT_ID)
  );
  const filteredGroups = visibleGroups.filter(g =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Screen key={filterResetKey} scroll={false} className="bg-background flex-1">
      <View className="px-5 pb-3">
        <View className="h-11 flex-row items-center gap-2 rounded-full bg-surface px-4">
          <Icon name="search" size={16} color={colors.neutral[500]} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t('groups.searchPlaceholder')}
            placeholderTextColor={colors.neutral[500]}
            className="font-body flex-1 text-sm text-text"
          />
        </View>
      </View>

      <FlatList
        data={filteredGroups}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: TAB_BAR_CLEARANCE }}
        ItemSeparatorComponent={() => <View className="ml-[4.75rem] h-px bg-divider" />}
        ListEmptyComponent={
          <Text className="font-body px-5 py-6 text-center text-sm text-neutral-500">{t('groups.empty')}</Text>
        }
        renderItem={({ item }) => {
          const stepsCount = steps.filter(s => s.groupIds.includes(item.id)).length;
          const newCount = newStepsCount[item.id] ?? 0;
          return (
            <Pressable
              className="flex-row items-center gap-3 rounded-2xl px-3 py-3 active:bg-surface"
              onPress={() => router.push({ pathname: '/grupo/[id]', params: { id: item.id } })}>
              <Avatar initials={initialsOf(item.name)} variant="group" size="md" />

              <View className="min-w-0 flex-1">
                <View className="mb-0.5 flex-row items-baseline gap-2">
                  <Text className="font-heading flex-1 text-md text-text" numberOfLines={1}>
                    {item.name}
                  </Text>
                  {newCount > 0 ? (
                    <Text className="font-heading text-2xs text-accent">
                      {newCount} {t('groups.newBadge')}
                    </Text>
                  ) : null}
                </View>
                <Text className="font-body mb-1.5 text-xs text-neutral-500">{item.schedule}</Text>
                <View className="flex-row items-center gap-1.5">
                  <Text className="font-body text-2xs px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-300">
                    {t(`levels.${item.level}`)}
                  </Text>
                  <Text className="font-body text-2xs text-neutral-600">
                    {t('groups.stepsCount', { n: stepsCount })} · {t('groups.studentsCount', { n: item.memberIds.length })}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        }}
      />

      {role === 'alumno' ? (
        <Fab icon="qrcode" label={t('groups.fabJoin')} onPress={() => router.push('/grupo/unirse')} />
      ) : (
        <Fab icon="add" label={t('groups.fabNew')} onPress={() => router.push('/grupo/nuevo')} />
      )}
    </Screen>
  );
}
