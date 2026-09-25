import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Screen } from '@/components';

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
    <Screen className="bg-background flex-1">
      {/* Header */}
      <View className="px-5 py-3 pb-2">
        <Text className="text-7 font-medium text-text">Eventos</Text>
      </View>

      {/* Events List */}
      <FlatList
        data={MOCK_EVENTS}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 5, paddingVertical: 3, gap: 5 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {}}>
            {/* Event Card */}
            <View className="rounded-md overflow-hidden relative h-42.5 bg-surface">
              {/* Date Badge */}
              <View className="absolute top-3 left-3 w-13.5 h-14.5 rounded-md bg-background/80 items-center justify-center z-10">
                <Text className="text-5.5 font-medium leading-tight text-text">{item.day}</Text>
                <Text className="text-2xs letter tracking-widest text-accent">{item.month}</Text>
              </View>

              {/* Upcoming Badge */}
              {item.upcoming ? (
                <View className="absolute top-3.5 right-3 px-2.5 py-0.75 rounded bg-accentScale-800">
                  <Text className="text-2xs text-accentScale-100">Próximo</Text>
                </View>
              ) : null}

              {/* Cover Image Placeholder */}
              <Text className="absolute right-3 bottom-2.5 text-2xs text-neutral-500 font-mono">
                foto de portada
              </Text>
            </View>

            {/* Event Info */}
            <View className="gap-0.5 mt-1">
              <Text className="text-4.25 font-medium text-text">{item.name}</Text>
              <Text className="text-3 text-neutral-400">{item.date}</Text>
              <Text className="text-2.75 text-neutral-500">{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </Screen>
  );
}
