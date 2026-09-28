import { Pressable, Text, View } from 'react-native';

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

// Contenedor con borde divider; la opción activa lleva un anillo interno de
// acento y el tinte al 14%.
export function SegmentedControl<T extends string>({ options, value, onChange, className = '' }: Props<T>) {
  return (
    <View className={`flex-row rounded-full border border-divider p-0.5 ${className}`}>
      {options.map(opt => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            className={`items-center justify-center rounded-full px-3 py-1.5 active:opacity-80 ${
              active ? 'border border-accent bg-accent/14' : ''
            }`}>
            <Text className={`font-body text-xs ${active ? 'text-accentScale-200' : 'text-neutral-400'}`}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
