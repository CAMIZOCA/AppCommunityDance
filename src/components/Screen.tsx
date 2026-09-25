import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      {scroll ? <ScrollView contentContainerClassName="grow">{content}</ScrollView> : content}
    </SafeAreaView>
  );
}
