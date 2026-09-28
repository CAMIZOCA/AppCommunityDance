import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
  error?: string | null;
};

// Botones de acción de los formularios: fijos abajo, contenido desplazable arriba.
export function FixedBottomBar({ children, error }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="gap-2 border-t border-divider bg-background px-5 pt-3"
      style={{ paddingBottom: insets.bottom + 12 }}>
      {error ? <Text className="font-body text-center text-xs text-danger">{error}</Text> : null}
      {children}
    </View>
  );
}
