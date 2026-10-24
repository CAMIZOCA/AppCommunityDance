import { useCallback } from 'react';
import { useReducedMotion, useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';

// Feedback de press unificado para botones tipo píldora/tarjeta (Button, Fab).
// Escala 0.97 con spring: un tap rápido reversa desde donde estaba (un timing
// lo reiniciaba). Con reducir movimiento no hay escala; el feedback de color
// del className (active:bg-*) sigue cubriendo la respuesta visual.
const PRESS_SCALE = 0.97;
const PRESS_SPRING = { duration: 280, dampingRatio: 1 };

export function usePressScale() {
  const reduced = useReducedMotion();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));

  const onPressIn = useCallback(() => {
    if (reduced) return;
    scale.set(withSpring(PRESS_SCALE, PRESS_SPRING));
  }, [reduced, scale]);

  const onPressOut = useCallback(() => {
    if (reduced) return;
    scale.set(withSpring(1, PRESS_SPRING));
  }, [reduced, scale]);

  return { animatedStyle, onPressIn, onPressOut };
}
