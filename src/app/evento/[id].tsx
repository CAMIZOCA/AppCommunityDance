import { useState } from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Button, DetailHeader, Icon, Screen } from '@/components';
import { useThemeColors } from '@/theme/useThemeColors';
import { EVENTS } from '@/data/events';

export default function EventoDetailScreen() {
  const colors = useThemeColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = EVENTS.find(e => e.id === id);
  const [interested, setInterested] = useState(false);

  if (!event) {
    return (
      <Screen className="bg-background flex-1">
        <DetailHeader title="Evento" />
        <Text className="text-sm text-neutral-500 px-5">No se encontró este evento.</Text>
      </Screen>
    );
  }

  return (
    <Screen className="bg-background flex-1">
      <DetailHeader title="Evento" />

      <View className="px-5">
        <View className="rounded-card overflow-hidden relative h-48 bg-surface items-center justify-center mb-4">
          <Icon name="photo" size={40} color={colors.neutral[800]} />

          <View className="absolute top-3 left-3 w-14 h-16 rounded-md bg-background/80 items-center justify-center z-10">
            <Text className="text-5.5 font-semibold leading-tight text-text">{event.day}</Text>
            <Text className="text-2xs tracking-widest text-accent">{event.month}</Text>
          </View>

          {event.upcoming ? (
            <View className="absolute top-3.5 right-3 px-2.5 py-1 rounded-full bg-accentScale-800">
              <Text className="text-2xs text-accentScale-100">Próximo</Text>
            </View>
          ) : null}
        </View>

        <Text className="text-xl font-semibold text-text mb-2">{event.name}</Text>
        <View className="flex-row items-center gap-1 mb-4">
          <Icon name="pin" size={13} color={colors.neutral[500]} />
          <Text className="text-sm text-neutral-400">{event.venue}</Text>
        </View>
        <Text className="text-sm text-neutral-300 leading-5 mb-6">{event.description}</Text>

        <Button
          title={interested ? '¡Genial! Te avisaremos ✓' : 'Me interesa'}
          variant={interested ? 'secondary' : 'primary'}
          onPress={() => setInterested(v => !v)}
        />
      </View>
    </Screen>
  );
}
