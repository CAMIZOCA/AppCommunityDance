import { Text, View } from 'react-native';

type Props = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
};

export function Card({ title, children, className = '' }: Props) {
  return (
    <View className={`gap-2 rounded-md border border-divider bg-surface p-4 ${className}`}>
      {title && <Text className="text-lg font-semibold text-text">{title}</Text>}
      {children}
    </View>
  );
}
