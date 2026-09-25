import { BlurView } from 'expo-blur';
import { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable } from 'expo-glass-effect';

type Props = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

// Superficie translúcida: Liquid Glass nativo en iOS 26+, blur en el resto.
export function GlassSurface({ style, children }: Props) {
  const canUseGlass = useMemo(() => isLiquidGlassAvailable() && isGlassEffectAPIAvailable(), []);

  if (canUseGlass) {
    return (
      <GlassView style={style} glassEffectStyle="regular" colorScheme="dark">
        {children}
      </GlassView>
    );
  }

  return (
    <View style={style}>
      <BlurView
        tint="dark"
        intensity={80}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      {children}
    </View>
  );
}
