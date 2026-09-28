import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useAppStore, Role } from '@/store/useAppStore';
import { useT } from '@/i18n';
import { useThemeColors } from '@/theme/useThemeColors';
import { Icon } from './Icon';
import { SegmentedControl } from './SegmentedControl';

type Props = { title: string };

export function AppHeader({ title }: Props) {
  const colors = useThemeColors();
  const { t, lang } = useT();
  const role = useAppStore(s => s.role);
  const setRole = useAppStore(s => s.setRole);
  const language = useAppStore(s => s.language);
  const setLanguage = useAppStore(s => s.setLanguage);

  function handleRoleChange(next: Role) {
    if (next === role) return;
    setRole(next);
    router.navigate('/');
  }

  const greetingName = role === 'alumno' ? 'Sofía' : 'Profe Daniela';
  const greetingKey = role === 'alumno' ? 'header.greetingStudent' : 'header.greetingTeacher';

  return (
    <View className="gap-3 px-5 pb-3 pt-2">
      <View className="flex-row items-center gap-2">
        <View className="h-2 w-2 rounded-full bg-accent" style={{ boxShadow: '0 0 8px 3px rgba(145,132,217,0.85)' }} />
        <Text className="font-heading text-base text-text" style={{ letterSpacing: -0.3 }}>
          MyMambo
        </Text>

        <View className="ml-auto flex-row items-center gap-2">
          <Pressable
            onPress={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="h-8 flex-row items-center gap-1 rounded-full border border-divider px-2.5 active:opacity-70">
            <Icon name="globe" size={13} color={colors.text} />
            <Text className="font-heading text-xs text-text">{lang.toUpperCase()}</Text>
          </Pressable>

          <SegmentedControl
            value={role}
            onChange={handleRoleChange}
            options={[
              { value: 'alumno', label: t('header.roleStudent') },
              { value: 'profe', label: t('header.roleTeacher') },
            ]}
          />
        </View>
      </View>

      <View>
        <Text className="font-body text-xs text-neutral-500">{t(greetingKey, { name: greetingName })}</Text>
        <Text className="font-heading text-5xl leading-tight text-text" style={{ letterSpacing: -0.4 }}>
          {title}
        </Text>
      </View>
    </View>
  );
}
