import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TAB_BAR_CLEARANCE } from '@/theme/layout';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  className?: string;
};

export function Screen({ children, scroll = true, className = '' }: Props) {
  const content = (
    <View className={`flex-1 bg-background ${className}`}>
      {children}
    </View>
  );
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      {scroll ? (
        <ScrollView
          contentContainerClassName="grow"
          contentContainerStyle={{ paddingBottom: TAB_BAR_CLEARANCE }}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}
