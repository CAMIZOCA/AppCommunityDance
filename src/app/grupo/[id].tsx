import { Pressable, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Avatar, DetailHeader, Icon, Screen } from '@/components';
import { useThemeColors } from '@/theme/useThemeColors';
import { GROUPS } from '@/data/groups';
import { STEPS } from '@/data/steps';

export default function GrupoDetailScreen() {
  const colors = useThemeColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const group = GROUPS.find(g => g.id === id);
  const relatedSteps = group ? STEPS.filter(s => s.style === group.style) : [];

  if (!group) {
    return (
      <Screen className="bg-background flex-1">
        <DetailHeader title="Grupo" />
        <Text className="text-sm text-neutral-500 px-5">No se encontró este grupo.</Text>
      </Screen>
    );
  }

  return (
    <Screen className="bg-background flex-1">
      <DetailHeader title={group.name} />

      <View className="px-5 items-center gap-3 mt-2 mb-6">
        <Avatar initials={group.initials} size="lg" />
        <View className="flex-row items-center gap-1.5">
          <Text className="text-2xs px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-300">
            {group.level}
          </Text>
          <Text className="text-2xs text-neutral-600">{group.steps} pasos</Text>
        </View>
        <Text className="text-sm text-neutral-500 text-center">{group.preview}</Text>
      </View>

      <View className="px-5">
        <Text className="text-2xs font-semibold tracking-widest text-neutral-500 uppercase mb-3.5">
          Pasos de {group.style}
        </Text>
        <View className="rounded-card bg-surface overflow-hidden">
          {relatedSteps.length === 0 ? (
            <Text className="text-sm text-neutral-500 px-3.5 py-3">
              Todavía no hay pasos publicados para este estilo.
            </Text>
          ) : (
            relatedSteps.map((step, i) => (
              <Pressable
                key={step.id}
                onPress={() => router.push({ pathname: '/paso/[id]', params: { id: step.id } })}
                className={`flex-row items-center gap-3 px-3.5 py-3 active:bg-black/10 ${
                  i < relatedSteps.length - 1 ? 'border-b border-divider' : ''
                }`}>
                <View className="w-9 h-9 rounded-full border border-accent items-center justify-center">
                  <Icon name="play" size={14} color={colors.accent} />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-text">{step.name}</Text>
                  <Text className="text-2xs text-neutral-500">{step.level} • {step.duration}</Text>
                </View>
                <Icon name="chevronRight" size={14} color={colors.neutral[700]} />
              </Pressable>
            ))
          )}
        </View>
      </View>
    </Screen>
  );
}
