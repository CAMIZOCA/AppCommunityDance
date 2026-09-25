import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Screen } from '@/components';

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
    <Screen className="bg-background flex-1">
      {/* Header */}
      <View className="px-5 py-3 pb-2">
        <Text className="text-7 font-medium text-text">Mi Progreso</Text>
      </View>

      {/* Progress Cards */}
      <FlatList
        data={MOCK_PROGRESS}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 5, paddingVertical: 2.5, gap: 2.5 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="px-3.5 py-3.5 rounded-md bg-surface active:bg-surface/80"
            onPress={() => {}}
          >
            {/* Title and Percentage */}
            <View className="flex-row items-baseline justify-between mb-2.5">
              <Text className="text-md font-medium text-text flex-1">{item.name}</Text>
              <Text className="text-sm text-accentScale-300">{item.label}</Text>
            </View>

            {/* Progress Bar */}
            <View className="h-1 rounded-0.5 bg-neutral-900 overflow-hidden mb-2.5">
              <View
                className="h-full bg-accent rounded-0.5 shadow-lg"
                style={{ width: `${item.progress}%` }}
              />
            </View>

            {/* Subtitle */}
            <Text className="text-2xs text-neutral-500">{item.subtitle}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Review Section */}
      <View className="px-5 mt-3.5 mb-5">
        <Text className="text-2xs font-semibold tracking-widest text-neutral-500 uppercase mb-3.5">
          Para Revisar
        </Text>
        <TouchableOpacity
          className="flex-row items-center gap-3 px-3 py-1.5 rounded-md bg-surface active:bg-surface/80"
          onPress={() => {}}
        >
          <View className="w-11 h-14 rounded-md bg-surface flex-shrink-0 items-center justify-center">
            <Text className="text-lg">▶</Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm font-medium text-text">Paso Doble</Text>
            <Text className="text-2xs text-neutral-500">Salsa • Intermedio</Text>
          </View>
          <Text className="text-neutral-600">›</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
