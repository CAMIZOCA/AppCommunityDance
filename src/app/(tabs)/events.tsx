import { View, Text, FlatList, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Fab, MediaPlaceholder, Screen } from '@/components';
import { TAB_BAR_CLEARANCE } from '@/theme/layout';
import { useT } from '@/i18n';
import { useAppStore } from '@/store/useAppStore';

export default function EventsScreen() {
  const { t } = useT();
  const role = useAppStore(s => s.role);
  const events = useAppStore(s => s.events);

  return (
    <Screen scroll={false} className="bg-background flex-1">
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 8, paddingBottom: TAB_BAR_CLEARANCE, gap: 20 }}
        renderItem={({ item }) => {
          const videoCount = item.presentations.reduce((acc, p) => acc + p.videos.length, 0);
          return (
            <Pressable
              onPress={() => router.push({ pathname: '/evento/[id]', params: { id: item.id } })}
              className="active:opacity-90">
              <View className="relative">
                <MediaPlaceholder className="rounded-card" style={{ height: 170 }} />

                <View className="absolute left-3 top-3 h-16 w-14 items-center justify-center rounded-md bg-background/80">
                  <Text className="font-heading text-5.5 leading-tight text-text">{item.day}</Text>
                  <Text className="font-heading text-2xs tracking-widest text-accent">{item.month}</Text>
                </View>

                {!item.isPast ? (
                  <View className="absolute right-3 top-3.5 rounded-full bg-accentScale-900 px-2.5 py-1">
                    <Text className="font-heading text-2xs text-accentScale-200">{t('events.upcoming')}</Text>
                  </View>
                ) : null}
              </View>

              <View className="mt-2.5 gap-1">
                <Text className="font-heading text-4.25 text-text">{item.name}</Text>
                <Text className="font-body text-3 text-neutral-400">
                  {item.dateLabel} · {item.venue}
                </Text>
                <Text className="font-body text-2.75 text-neutral-500">
                  {t('events.presentationsCount', { n: item.presentations.length })} ·{' '}
                  {t('events.videosCount', { n: videoCount })} · {t('events.photosCount', { n: item.photos.length })}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />

      {role === 'profe' ? <Fab icon="add" label={t('events.fabNew')} onPress={() => router.push('/evento/nuevo')} /> : null}
    </Screen>
  );
}
