import { View, Text, Pressable, ScrollView } from 'react-native';
import { Avatar, Icon, IconName, Screen } from '@/components';
import { colors } from '@/theme/tokens';

type SettingsRow = {
  icon: IconName;
  iconBg: string;
  label: string;
  value?: string;
};

type SettingsSection = {
  title?: string;
  rows: SettingsRow[];
};

const SECTIONS: SettingsSection[] = [
  {
    title: 'Cuenta',
    rows: [
      { icon: 'bell', iconBg: 'bg-red-500', label: 'Notificaciones' },
      { icon: 'lock', iconBg: 'bg-emerald-600', label: 'Privacidad' },
    ],
  },
  {
    title: 'Preferencias',
    rows: [
      { icon: 'moon', iconBg: 'bg-indigo-600', label: 'Apariencia', value: 'Oscuro' },
      { icon: 'globe', iconBg: 'bg-sky-600', label: 'Idioma', value: 'Español' },
    ],
  },
  {
    title: 'Soporte',
    rows: [
      { icon: 'help', iconBg: 'bg-amber-600', label: 'Ayuda' },
      { icon: 'info', iconBg: 'bg-neutral-600', label: 'Acerca de', value: '1.0.0' },
    ],
  },
];

function SettingsGroup({ section }: { section: SettingsSection }) {
  return (
    <View className="px-5 mb-6">
      {section.title ? (
        <Text className="text-2xs font-semibold tracking-widest text-neutral-500 uppercase mb-2 px-1">
          {section.title}
        </Text>
      ) : null}
      <View className="rounded-card bg-surface overflow-hidden">
        {section.rows.map((row, i) => (
          <Pressable
            key={row.label}
            className={`flex-row items-center gap-3 px-3.5 py-3 active:bg-black/10 ${
              i < section.rows.length - 1 ? 'border-b border-divider' : ''
            }`}
            onPress={() => {}}>
            <View className={`w-7 h-7 rounded-[8px] items-center justify-center ${row.iconBg}`}>
              <Icon name={row.icon} size={15} color={colors.primary.foreground} />
            </View>
            <Text className="flex-1 text-sm font-medium text-text">{row.label}</Text>
            {row.value ? <Text className="text-sm text-neutral-500">{row.value}</Text> : null}
            <Icon name="chevronRight" size={14} color={colors.neutral[700]} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  return (
    <Screen scroll={false} className="bg-background flex-1">
      <View className="px-5 py-3 pb-2">
        <Text className="text-7 font-semibold text-text">Ajustes</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <View className="px-5 mb-6">
          <Pressable
            className="flex-row items-center gap-4 rounded-card bg-surface px-4 py-4 active:bg-black/10"
            onPress={() => {}}>
            <Avatar initials="TU" size="lg" />
            <View className="flex-1">
              <Text className="text-lg font-semibold text-text">Tu Perfil</Text>
              <Text className="text-xs text-neutral-500">Ver y editar tu perfil</Text>
            </View>
            <Icon name="chevronRight" size={14} color={colors.neutral[700]} />
          </Pressable>
        </View>

        {SECTIONS.map(section => (
          <SettingsGroup key={section.title} section={section} />
        ))}

        {/* Cerrar sesión */}
        <View className="px-5 mb-6">
          <Pressable
            className="flex-row items-center justify-center gap-2 rounded-card bg-surface px-4 py-3.5 active:bg-black/10"
            onPress={() => {}}>
            <Icon name="logout" size={16} color={colors.danger.DEFAULT} />
            <Text className="text-sm font-semibold text-danger">Cerrar sesión</Text>
          </Pressable>
        </View>

        <Text className="text-center text-2xs text-neutral-600">MyMambo • v1.0.0</Text>
      </ScrollView>
    </Screen>
  );
}
