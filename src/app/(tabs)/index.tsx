import { useState } from 'react';
import { View, Text, FlatList, Pressable, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Avatar, Badge, Fab, Icon, Screen } from '@/components';
import { TAB_BAR_CLEARANCE } from '@/theme/layout';
import { useThemeColors } from '@/theme/useThemeColors';
import { GROUPS } from '@/data/groups';

export default function HomeScreen() {
  const colors = useThemeColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [groups] = useState(GROUPS);

  const filteredGroups = groups.filter(g =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Screen scroll={false} className="bg-background flex-1 pt-2">
      {/* Header */}
      <View className="px-5 pb-3.5">
        <View className="flex-row items-center gap-2 mb-3.5">
          <View className="w-2 h-2 rounded-full bg-accent" />
          <Text className="text-4.5 font-medium text-text">MyMambo</Text>
          <Pressable className="ml-auto px-2.5 h-8 rounded-full border border-divider flex-row items-center gap-1 active:opacity-70">
            <Text className="text-xs font-medium text-text">ES</Text>
          </Pressable>
        </View>

        <Text className="text-xs text-neutral-500">¡Hola de nuevo!</Text>
        <Text className="text-7 font-semibold text-text leading-tight">Mis grupos</Text>
      </View>

      {/* Search */}
      <View className="px-5 pb-3">
        <View className="h-11 rounded-full bg-surface flex-row items-center gap-2 px-4">
          <Icon name="search" size={16} color={colors.neutral[500]} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar grupo..."
            placeholderTextColor={colors.neutral[500]}
            className="flex-1 text-sm text-text"
          />
        </View>
      </View>

      {/* Groups List */}
      <FlatList
        data={filteredGroups}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: TAB_BAR_CLEARANCE }}
        ItemSeparatorComponent={() => <View className="ml-[4.75rem] h-px bg-divider" />}
        renderItem={({ item }) => (
          <Pressable
            className="flex-row gap-3 items-center py-3 px-3 rounded-2xl active:bg-surface"
            onPress={() => router.push({ pathname: '/grupo/[id]', params: { id: item.id } })}
          >
            <Avatar initials={item.initials} size="md" />

            {/* Content */}
            <View className="flex-1 min-w-0">
              <View className="flex-row items-baseline gap-2 mb-1">
                <Text
                  className={`text-md flex-1 ${item.unread ? 'font-semibold text-text' : 'font-medium text-text'}`}
                  numberOfLines={1}>
                  {item.name}
                </Text>
                <Text className={`text-2xs ${item.unread ? 'text-accent font-medium' : 'text-neutral-500'}`}>
                  {item.time}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text
                  className={`text-xs flex-1 ${item.unread ? 'text-neutral-300' : 'text-neutral-500'}`}
                  numberOfLines={1}
                >
                  {item.preview}
                </Text>
                {item.unread ? <Badge label={item.unread} /> : null}
              </View>
              <View className="flex-row items-center gap-1.5 mt-1.5">
                <Text className="text-2xs px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-300">
                  {item.level}
                </Text>
                <Text className="text-2xs text-neutral-600">
                  {item.steps} pasos
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />

      <Fab onPress={() => {}} />
    </Screen>
  );
}
