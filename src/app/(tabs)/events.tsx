import { View, Text, FlatList, Pressable } from 'react-native';
import { Icon, Screen } from '@/components';
import { TAB_BAR_CLEARANCE } from '@/theme/layout';
import { colors } from '@/theme/tokens';

interface Event {
  id: string;
  name: string;
  date: string;
  day: string;
  month: string;
  venue: string;
  upcoming?: boolean;
  description: string;
}

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    name: 'Festival de Mambo Verano',
    date: '25 de julio • Teatro Central',
    day: '25',
    month: 'JUL',
    venue: 'Teatro Central',
    upcoming: true,
    description: 'Competencia regional de baile mambo',
  },
  {
    id: '2',
    name: 'Noche de Salsa en Vivo',
    date: '10 de agosto • Club Ritmo',
    day: '10',
    month: 'AGO',
    venue: 'Club Ritmo',
    description: 'Evento social con banda en vivo',
  },
  {
    id: '3',
    name: 'Masterclass: Bachata Avanzada',
    date: '2 de septiembre • Estudio de Danza',
    day: '02',
    month: 'SEP',
    venue: 'Estudio de Danza',
    description: 'Sesión especial con maestro internacional',
  },
];

export default function EventsScreen() {
  return (
    <Screen scroll={false} className="bg-background flex-1">
      {/* Header */}
      <View className="px-5 py-3 pb-2">
        <Text className="text-7 font-semibold text-text">Eventos</Text>
      </View>

      {/* Events List */}
      <FlatList
        data={MOCK_EVENTS}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 8, paddingBottom: TAB_BAR_CLEARANCE, gap: 20 }}
        renderItem={({ item }) => (
          <Pressable onPress={() => {}} className="active:opacity-90">
            {/* Event Card */}
            <View className="rounded-card overflow-hidden relative h-44 bg-surface items-center justify-center">
              <Icon name="photo" size={32} color={colors.neutral[800]} />

              {/* Date Badge */}
              <View className="absolute top-3 left-3 w-14 h-16 rounded-md bg-background/80 items-center justify-center z-10">
                <Text className="text-5.5 font-semibold leading-tight text-text">{item.day}</Text>
                <Text className="text-2xs tracking-widest text-accent">{item.month}</Text>
              </View>

              {/* Upcoming Badge */}
              {item.upcoming ? (
                <View className="absolute top-3.5 right-3 px-2.5 py-1 rounded-full bg-accentScale-800">
                  <Text className="text-2xs text-accentScale-100">Próximo</Text>
                </View>
              ) : null}
            </View>

            {/* Event Info */}
            <View className="gap-1 mt-2.5">
              <Text className="text-4.25 font-semibold text-text">{item.name}</Text>
              <View className="flex-row items-center gap-1">
                <Icon name="pin" size={12} color={colors.neutral[500]} />
                <Text className="text-3 text-neutral-400">{item.date}</Text>
              </View>
              <Text className="text-2.75 text-neutral-500">{item.description}</Text>
            </View>
          </Pressable>
        )}
      />
    </Screen>
  );
}
