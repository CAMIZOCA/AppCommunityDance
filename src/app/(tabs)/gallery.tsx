import { useState } from 'react';
import { View, Text, FlatList, Pressable, ScrollView } from 'react-native';
import { Icon, Screen } from '@/components';
import { TAB_BAR_CLEARANCE } from '@/theme/layout';

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

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`px-3.5 py-1.5 rounded-full border active:opacity-80 ${
        active ? 'bg-accent border-accent' : 'border-divider bg-surface'
      }`}>
      <Text className={`text-2xs font-medium ${active ? 'text-primary-foreground' : 'text-text'}`}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function GalleryScreen() {
  const [style, setStyle] = useState('Todos');
  const [level, setLevel] = useState('Todos');

  const steps = MOCK_STEPS.filter(
    s => (style === 'Todos' || s.style === style) && (level === 'Todos' || s.level === level)
  );

  return (
    <Screen scroll={false} className="bg-background flex-1">
      {/* Header */}
      <View className="px-5 py-3 pb-2">
        <Text className="text-7 font-semibold text-text">Galería</Text>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-2"
        contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}
      >
        {STYLES.map(item => (
          <FilterChip key={item} label={item} active={style === item} onPress={() => setStyle(item)} />
        ))}
      </ScrollView>

      {/* Level Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-3"
        contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}
      >
        {LEVELS.map(item => (
          <FilterChip key={item} label={item} active={level === item} onPress={() => setLevel(item)} />
        ))}
      </ScrollView>

      {/* Grid */}
      <FlatList
        data={steps}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: TAB_BAR_CLEARANCE, gap: 16 }}
        renderItem={({ item }) => (
          <Pressable className="flex-1 active:opacity-80" onPress={() => {}}>
            {/* Video Thumbnail */}
            <View className="aspect-[4/5] rounded-2xl bg-surface items-center justify-center mb-2 overflow-hidden">
              <View className="w-11 h-11 rounded-full border border-accent items-center justify-center">
                <Icon name="play" size={16} color="#9184d9" />
              </View>
              <Text className="absolute bottom-2 left-2 text-2xs text-neutral-400 font-medium">
                {item.duration}
              </Text>
              {item.learned ? (
                <View className="absolute top-2 left-2 px-2 py-1 rounded-full bg-accentScale-800 flex-row items-center gap-1">
                  <Icon name="check" size={10} color="#f5f4ff" />
                  <Text className="text-2xs text-accentScale-100">Aprendido</Text>
                </View>
              ) : null}
            </View>

            {/* Info */}
            <Text className="text-sm font-medium text-text leading-5 mb-1">{item.name}</Text>
            <Text className="text-2xs text-neutral-500">{item.style} • {item.level}</Text>
          </Pressable>
        )}
      />
    </Screen>
  );
}
