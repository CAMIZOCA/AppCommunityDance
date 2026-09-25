import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Screen } from '@/components';

interface Group {
  id: string;
  name: string;
  initials: string;
  preview: string;
  time: string;
  unread?: number;
  level: string;
  steps: number;
}

const MOCK_GROUPS: Group[] = [
  {
    id: '1',
    name: 'Mambo Básico',
    initials: 'MB',
    preview: 'Últimas pasos de la clase...',
    time: '2h',
    unread: 3,
    level: 'Básico',
    steps: 8,
  },
  {
    id: '2',
    name: 'Salsa Intermedia',
    initials: 'SI',
    preview: 'Movimientos avanzados de giro',
    time: '4h',
    level: 'Intermedio',
    steps: 12,
  },
  {
    id: '3',
    name: 'Bachata Romántica',
    initials: 'BR',
    preview: 'Técnica de pasos básicos',
    time: '1d',
    level: 'Básico',
    steps: 6,
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState(MOCK_GROUPS);

  const filteredGroups = groups.filter(g =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Screen className="bg-background flex-1 pt-2">
      {/* Header */}
      <View className="px-5 pb-3.5">
        <View className="flex-row items-center gap-2 mb-3.5">
          <View className="w-2.25 h-2.25 rounded-full bg-accent shadow-lg" />
          <Text className="text-4.5 font-medium text-text">MyMambo</Text>
          <TouchableOpacity className="ml-auto px-2.5 h-7.5 rounded-md border border-divider flex-row items-center gap-1">
            <Text className="text-xs font-medium text-text">ES</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-xs text-neutral-500">¡Hola de nuevo!</Text>
        <Text className="text-7 font-medium text-text leading-tight">Mis grupos</Text>
      </View>

      {/* Search */}
      <View className="px-5 pb-2">
        <View className="h-9.5 rounded-md bg-surface flex-row items-center gap-2 px-3">
          <Text className="text-xs text-neutral-500">🔍</Text>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar grupo..."
            placeholderTextColor="#9397ab"
            className="flex-1 text-sm text-text"
          />
        </View>
      </View>

      {/* Groups List */}
      <FlatList
        data={filteredGroups}
        keyExtractor={item => item.id}
        scrollEnabled={true}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-row gap-3 items-center py-2.5 px-5 active:bg-black/5 rounded-md"
            onPress={() => {}}
          >
            {/* Avatar */}
            <View className="w-12.5 h-12.5 rounded-full bg-accentScale-900 border border-accentScale-800 items-center justify-center flex-shrink-0">
              <Text className="text-xs font-medium text-accentScale-300">{item.initials}</Text>
            </View>

            {/* Content */}
            <View className="flex-1 min-w-0">
              <View className="flex-row items-baseline gap-2 mb-0.75">
                <Text className="text-md font-medium text-text flex-1" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text className="text-2xs text-neutral-500">{item.time}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text
                  className="text-xs text-neutral-500 flex-1"
                  numberOfLines={1}
                >
                  {item.preview}
                </Text>
                {item.unread ? (
                  <View className="w-5 h-5 rounded-2.5 bg-accent items-center justify-center flex-shrink-0">
                    <Text className="text-2xs font-bold text-background">
                      {item.unread}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View className="flex-row items-center gap-1.5 mt-1.5 text-2xs text-neutral-600">
                <Text className="text-2xs px-1.75 py-0.25 rounded bg-neutral-900 text-neutral-300">
                  {item.level}
                </Text>
                <Text className="text-2xs text-neutral-600">
                  {item.steps} pasos
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </Screen>
  );
}
