import { View, Text, FlatList, Pressable } from 'react-native';
import { Icon, Screen } from '@/components';
import { TAB_BAR_CLEARANCE } from '@/theme/layout';
import { colors } from '@/theme/tokens';

interface ProgressCard {
  id: string;
  name: string;
  progress: number;
  label: string;
  subtitle: string;
}

const MOCK_PROGRESS: ProgressCard[] = [
  {
    id: '1',
    name: 'Mambo Básico',
    progress: 75,
    label: '75%',
    subtitle: '6 de 8 pasos completados',
  },
  {
    id: '2',
    name: 'Salsa Intermedia',
    progress: 42,
    label: '42%',
    subtitle: '5 de 12 pasos completados',
  },
  {
    id: '3',
    name: 'Bachata Romántica',
    progress: 100,
    label: '100%',
    subtitle: 'Todos los pasos dominados',
  },
];

export default function ProgressScreen() {
  return (
    <Screen scroll={false} className="bg-background flex-1">
      {/* Header */}
      <View className="px-5 py-3 pb-2">
        <Text className="text-7 font-semibold text-text">Mi Progreso</Text>
      </View>

      {/* Progress Cards */}
      <FlatList
        data={MOCK_PROGRESS}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 8, gap: 12 }}
        renderItem={({ item }) => (
          <Pressable
            className="px-4 py-4 rounded-card bg-surface active:opacity-80"
            onPress={() => {}}
          >
            {/* Title and Percentage */}
            <View className="flex-row items-baseline justify-between mb-3">
              <Text className="text-md font-medium text-text flex-1">{item.name}</Text>
              <Text className="text-sm font-semibold text-accentScale-300">{item.label}</Text>
            </View>

            {/* Progress Bar */}
            <View className="h-1.5 rounded-full bg-neutral-900 overflow-hidden mb-3">
              <View
                className="h-full bg-accent rounded-full"
                style={{ width: `${item.progress}%` }}
              />
            </View>

            {/* Subtitle */}
            <Text className="text-2xs text-neutral-500">{item.subtitle}</Text>
          </Pressable>
        )}
        ListFooterComponent={
          <View className="mt-2">
            <Text className="text-2xs font-semibold tracking-widest text-neutral-500 uppercase mb-3.5">
              Para Revisar
            </Text>
            <Pressable
              className="flex-row items-center gap-3 px-3 py-2 rounded-card bg-surface active:opacity-80"
              onPress={() => {}}
            >
              <View className="w-11 h-14 rounded-md bg-neutral-900 flex-shrink-0 items-center justify-center">
                <Icon name="play" size={16} color={colors.accent.DEFAULT} />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-medium text-text">Paso Doble</Text>
                <Text className="text-2xs text-neutral-500">Salsa • Intermedio</Text>
              </View>
              <Icon name="chevronRight" size={16} color={colors.neutral[600]} />
            </Pressable>
          </View>
        }
        ListFooterComponentStyle={{ paddingHorizontal: 20, paddingBottom: TAB_BAR_CLEARANCE }}
      />
    </Screen>
  );
}
