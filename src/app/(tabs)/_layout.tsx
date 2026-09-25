import { Tabs } from 'expo-router';
import { Icon } from '@/components';
import { GlassSurface } from '@/components/GlassSurface';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#9184d9',
        tabBarInactiveTintColor: '#9397ab',
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
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Grupos',
          tabBarIcon: ({ color }) => <Icon name="people" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: 'Galería',
          tabBarIcon: ({ color }) => <Icon name="gallery" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progreso',
          tabBarIcon: ({ color }) => <Icon name="chart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Eventos',
          tabBarIcon: ({ color }) => <Icon name="calendar" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <Icon name="gear" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
