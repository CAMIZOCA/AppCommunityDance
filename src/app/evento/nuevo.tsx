import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Chip, DetailHeader, FixedBottomBar, Icon, Screen } from '@/components';
import { useThemeColors } from '@/theme/useThemeColors';
import { useT } from '@/i18n';
import { useAppStore } from '@/store/useAppStore';
import { useUiStore } from '@/store/useUiStore';

const CANDIDATE_NAMES = ['Kids MyMambo', 'Bachata Lady', 'Elenco Bachata', 'Elenco Salsa'];

function parseDayMonth(dateLabel: string): { day: string; month: string } {
  const match = dateLabel.match(/(\d{1,2})\s*(?:de\s*)?([a-zA-Z]{3})/);
  if (!match) return { day: '--', month: '---' };
  return { day: match[1].padStart(2, '0'), month: match[2].toUpperCase() };
}

export default function NuevoEventoScreen() {
  const colors = useThemeColors();
  const { t } = useT();
  const groups = useAppStore(s => s.groups);
  const createEvent = useAppStore(s => s.createEvent);
  const showToast = useUiStore(s => s.showToast);

  const [name, setName] = useState('');
  const [venue, setVenue] = useState('');
  const [dateLabel, setDateLabel] = useState('');
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [otherName, setOtherName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const chipOptions = [...CANDIDATE_NAMES, ...groups.map(g => g.name)];

  function toggleChip(chipName: string) {
    setSelectedNames(names =>
      names.includes(chipName) ? names.filter(n => n !== chipName) : [...names, chipName]
    );
  }

  function handleAddOther() {
    if (!otherName.trim()) return;
    setSelectedNames(names => [...names, otherName.trim()]);
    setOtherName('');
  }

  function removeAt(index: number) {
    setSelectedNames(names => names.filter((_, i) => i !== index));
  }

  const isValid = name.trim().length > 0 && dateLabel.trim().length > 0 && selectedNames.length > 0;

  function handleSubmit() {
    if (!isValid) {
      setError(t('newEvent.missingError'));
      return;
    }
    setError(null);
    const { day, month } = parseDayMonth(dateLabel);
    const id = createEvent({ name: name.trim(), venue: venue.trim(), dateLabel: dateLabel.trim(), day, month, presentationNames: selectedNames });
    showToast(t('newEvent.createdToast'));
    router.replace({ pathname: '/evento/[id]', params: { id } });
  }

  const scheduleRows = selectedNames.map((name_, i) => {
    const totalMinutes = i * 15;
    const hour = 17 + Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    return { name: name_, time };
  });

  return (
    <Screen scroll={false} className="bg-background flex-1">
      <DetailHeader title={t('newEvent.title')} />

      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <View className="gap-2">
          <Text className="font-body text-xs text-neutral-500">{t('newEvent.nameLabel')}</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={t('newEvent.namePlaceholder')}
            placeholderTextColor={colors.neutral[600]}
            className="font-body rounded-2xl bg-surface px-4 py-3.5 text-text"
          />
        </View>

        <View className="gap-2">
          <Text className="font-body text-xs text-neutral-500">{t('newEvent.venueLabel')}</Text>
          <TextInput
            value={venue}
            onChangeText={setVenue}
            placeholder={t('newEvent.venuePlaceholder')}
            placeholderTextColor={colors.neutral[600]}
            className="font-body rounded-2xl bg-surface px-4 py-3.5 text-text"
          />
        </View>

        <View className="gap-2">
          <Text className="font-body text-xs text-neutral-500">{t('newEvent.dateLabel')}</Text>
          <TextInput
            value={dateLabel}
            onChangeText={setDateLabel}
            placeholder={t('newEvent.datePlaceholder')}
            placeholderTextColor={colors.neutral[600]}
            className="font-body rounded-2xl bg-surface px-4 py-3.5 text-text"
          />
        </View>

        <View className="gap-2">
          <View className="flex-row items-baseline justify-between">
            <Text className="font-body text-xs text-neutral-500">{t('newEvent.presentationsLabel')}</Text>
            <Text className="font-heading text-xs text-accentScale-300">
              {t('newEvent.presentationsCount', { n: selectedNames.length })}
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-2">
            {chipOptions.map(opt => (
              <Chip key={opt} label={opt} active={selectedNames.includes(opt)} onPress={() => toggleChip(opt)} />
            ))}
          </View>

          <View className="flex-row gap-2">
            <TextInput
              value={otherName}
              onChangeText={setOtherName}
              onSubmitEditing={handleAddOther}
              placeholder={t('newEvent.otherGroupPlaceholder')}
              placeholderTextColor={colors.neutral[600]}
              className="font-body flex-1 rounded-2xl bg-surface px-4 py-3 text-text"
            />
            <Pressable
              onPress={handleAddOther}
              className="items-center justify-center rounded-2xl border border-accent px-4 active:bg-accent/12">
              <Text className="font-heading text-sm text-accent">{t('newEvent.add')}</Text>
            </Pressable>
          </View>

          {scheduleRows.length > 0 ? (
            <View className="overflow-hidden rounded-card bg-surface">
              {scheduleRows.map((row, i) => (
                <View
                  key={`${row.name}-${i}`}
                  className={`flex-row items-center gap-3 px-3.5 py-3 ${
                    i < scheduleRows.length - 1 ? 'border-b border-divider' : ''
                  }`}>
                  <Text className="font-body w-14 text-sm text-accentScale-300">{row.time}</Text>
                  <Text className="font-body flex-1 text-sm text-text">{row.name}</Text>
                  <Pressable onPress={() => removeAt(i)} hitSlop={8}>
                    <Icon name="close" size={16} color={colors.neutral[600]} />
                  </Pressable>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>

      <FixedBottomBar error={error}>
        <Button title={t('newEvent.createButton')} dimmed={!isValid} onPress={handleSubmit} />
      </FixedBottomBar>
    </Screen>
  );
}
