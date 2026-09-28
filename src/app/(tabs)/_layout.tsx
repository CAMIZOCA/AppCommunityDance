import { Tabs } from 'expo-router';
import { AppHeader, GlassSurface, Icon } from '@/components';
import { useThemeColors } from '@/theme/useThemeColors';
import { useT } from '@/i18n';

export default function TabsLayout() {
  const colors = useThemeColors();
  const { t } = useT();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: ({ options }) => <AppHeader title={options.title ?? ''} />,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.neutral[500],
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          overflow: 'hidden',
          paddingBottom: 8,
          paddingTop: 10,
          height: 84,
        },
        tabBarBackground: () => (
          <GlassSurface style={{ flex: 1 }}>
            <></>
          </GlassSurface>
        ),
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'Inter_500Medium',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.groups'),
          tabBarIcon: ({ color, focused }) => (
            <Icon name="people" size={24} color={color as string} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: t('tabs.gallery'),
          tabBarIcon: ({ color, focused }) => (
            <Icon name="gallery" size={24} color={color as string} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: t('tabs.events'),
          tabBarIcon: ({ color, focused }) => (
            <Icon name="calendar" size={24} color={color as string} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: t('tabs.progress'),
          tabBarIcon: ({ color, focused }) => (
            <Icon name="chart" size={24} color={color as string} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
    </Tabs>
  );
}
