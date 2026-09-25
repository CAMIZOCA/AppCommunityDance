import { Text } from 'react-native';

import { Card, Screen } from '@/components';

export default function SettingsScreen() {
  return (
    <Screen>
      <Text className="text-3xl font-bold text-text dark:text-text-dark">Ajustes</Text>
      <Card title="Versión">
        <Text className="text-muted dark:text-muted-dark">1.0.0</Text>
      </Card>
    </Screen>
  );
}
