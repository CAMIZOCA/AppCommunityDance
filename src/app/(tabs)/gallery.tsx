import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Screen } from '@/components';

interface DanceStep {
  id: string;
  name: string;
  duration: string;
  style: string;
  level: string;
  learned?: boolean;
}

const MOCK_STEPS: DanceStep[] = [
  {
    id: '1',
    name: 'Giro Básico',
    duration: '1:20',
    style: 'Mambo',
    level: 'Básico',
  },
  {
    id: '2',
    name: 'Paso Doble',
    duration: '2:15',
    style: 'Salsa',
    level: 'Intermedio',
    learned: true,
  },
  {
    id: '3',
    name: 'Cambio de Peso',
    duration: '0:45',
    style: 'Mambo',
    level: 'Básico',
  },
  {
    id: '4',
    name: 'Vuelta Lateral',
    duration: '1:50',
    style: 'Bachata',
    level: 'Intermedio',
  },
];

const STYLES = ['Todos', 'Mambo', 'Salsa', 'Bachata', 'Merengue'];
const LEVELS = ['Todos', 'Básico', 'Intermedio', 'Avanzado'];

export default function GalleryScreen() {
  return (
    <Screen className="bg-background flex-1">
      {/* Header */}
      <View className="px-5 py-3 pb-2">
        <Text className="text-7 font-medium text-text">Galería</Text>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-5 py-1 mb-2"
        contentContainerStyle={{ gap: 1.5 }}
      >
        {STYLES.map(style => (
          <TouchableOpacity
            key={style}
            className="px-3 py-0.75 rounded-full border border-divider"
          >
            <Text className="text-2xs font-medium text-text">{style}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Level Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-5 mb-2"
        contentContainerStyle={{ gap: 1.5 }}
      >
        {LEVELS.map(level => (
          <TouchableOpacity
            key={level}
            className="px-2.5 py-0.5 rounded-full border border-divider"
          >
            <Text className="text-2xs font-medium text-text">{level}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grid */}
      <FlatList
        data={STEPS}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 3 }}
        contentContainerStyle={{ paddingHorizontal: 5, paddingVertical: 3, gap: 3 }}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-1" onPress={() => {}}>
            {/* Video Thumbnail */}
            <View className="aspect-[4/5] rounded-md bg-surface items-center justify-center mb-1.75">
              <View className="w-10.5 h-10.5 rounded-full border border-accent items-center justify-center">
                <Text className="text-lg">▶</Text>
              </View>
              <Text className="absolute bottom-2 left-2 text-2xs text-neutral-500 font-mono">
                {item.duration}
              </Text>
              {item.learned ? (
                <View className="absolute top-2 left-2 px-2 py-0.5 rounded-2.75 bg-accentScale-800 flex-row items-center gap-1">
                  <Text>✓</Text>
                  <Text className="text-2xs text-accentScale-100">Aprendido</Text>
                </View>
              ) : null}
            </View>

            {/* Info */}
            <Text className="text-sm font-medium text-text leading-5 mb-1">{item.name}</Text>
            <Text className="text-2xs text-neutral-500">{item.style} • {item.level}</Text>
          </TouchableOpacity>
        )}
      />
    </Screen>
  );
}

const STEPS = MOCK_STEPS;
