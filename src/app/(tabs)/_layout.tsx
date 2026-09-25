import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useColorScheme } from 'react-native';

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#9184d9',
        tabBarInactiveTintColor: '#9397ab',
        tabBarStyle: {
          backgroundColor: '#161826',
          borderTopColor: 'rgba(233, 233, 237, 0.16)',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Grupos',
          tabBarIcon: ({ color }) => <SymbolView name="person.2.fill" tintColor={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: 'Galería',
          tabBarIcon: ({ color }) => <SymbolView name="photo.on.rectangle.angled" tintColor={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progreso',
          tabBarIcon: ({ color }) => <SymbolView name="chart.bar.fill" tintColor={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Eventos',
          tabBarIcon: ({ color }) => <SymbolView name="calendar" tintColor={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
