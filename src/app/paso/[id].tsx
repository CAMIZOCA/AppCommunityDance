import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Button, DetailHeader, Icon, Screen } from '@/components';
import { useThemeColors } from '@/theme/useThemeColors';
import { STEPS } from '@/data/steps';

export default function PasoDetailScreen() {
  const colors = useThemeColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const step = STEPS.find(s => s.id === id);
  const [learned, setLearned] = useState(step?.learned ?? false);

  if (!step) {
    return (
      <Screen className="bg-background flex-1">
        <DetailHeader title="Paso" />
        <Text className="text-sm text-neutral-500 px-5">No se encontró este paso.</Text>
      </Screen>
    );
  }

  return (
    <Screen className="bg-background flex-1">
      <DetailHeader title={step.name} />

      <View className="px-5">
        <View className="aspect-[4/3] rounded-2xl bg-surface items-center justify-center mb-4 overflow-hidden">
          <Pressable className="w-16 h-16 rounded-full border border-accent items-center justify-center active:opacity-80">
            <Icon name="play" size={24} color={colors.accent} />
          </Pressable>
          <Text className="absolute bottom-3 right-3 text-2xs text-neutral-400 font-medium">
            {step.duration}
          </Text>
        </View>

        <View className="flex-row items-center gap-1.5 mb-3">
          <Text className="text-2xs px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-300">
            {step.style}
          </Text>
          <Text className="text-2xs px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-300">
            {step.level}
          </Text>
          {learned ? (
            <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-full bg-accentScale-800">
              <Icon name="check" size={10} color={colors.accentScale[100]} />
              <Text className="text-2xs text-accentScale-100">Aprendido</Text>
            </View>
          ) : null}
        </View>

        <Text className="text-sm text-neutral-300 leading-5 mb-6">{step.description}</Text>

        <Button
          title={learned ? 'Marcado como aprendido ✓' : 'Marcar como aprendido'}
          variant={learned ? 'secondary' : 'primary'}
          onPress={() => setLearned(v => !v)}
        />
      </View>
    </Screen>
  );
}
