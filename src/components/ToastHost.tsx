import { Text } from 'react-native';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutUp,
  ReduceMotion,
  useReducedMotion,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUiStore } from '@/store/useUiStore';
import { useThemeColors } from '@/theme/useThemeColors';
import { Icon } from './Icon';

// Altura aproximada de DownloadBanner (texto + barra + padding). Si la descarga
// está activa, el toast baja debajo de la barra para no taparla.
const DOWNLOAD_BANNER_OFFSET = 64;

export function ToastHost() {
  const { visible, message } = useUiStore(s => s.toast);
  const downloading = useUiStore(s => s.download.visible);
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const reduced = useReducedMotion();

  // No hay shared value ni efecto: el host se monta/desmonta según `visible`.
  // Reanimated ejecuta `exiting` al quitar el nodo, así que la salida sigue
  // animándose sin que el host ocupe la pantalla con opacidad 0.
  if (!visible) return null;

  // Con reducir movimiento: solo fundido, sin desplazamiento vertical.
  const entering = reduced
    ? FadeIn.duration(150).reduceMotion(ReduceMotion.System)
    : FadeInUp.duration(200).reduceMotion(ReduceMotion.System);
  const exiting = reduced
    ? FadeOut.duration(150).reduceMotion(ReduceMotion.System)
    : FadeOutUp.duration(200).reduceMotion(ReduceMotion.System);

  return (
    <Animated.View
      pointerEvents="none"
      entering={entering}
      exiting={exiting}
      style={{
        position: 'absolute',
        top: insets.top + 8 + (downloading ? DOWNLOAD_BANNER_OFFSET : 0),
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 100,
      }}>
      <Animated.View
        className="flex-row items-center gap-2 rounded-full bg-surface px-4 py-2.5"
        style={{ borderWidth: 1, borderColor: colors.neutral[700], boxShadow: '0px 6px 18px rgba(0,0,0,0.55)' }}>
        <Icon name="checkCircle" size={16} color={colors.accent} weight="fill" />
        <Text className="font-body text-sm text-text">{message}</Text>
      </Animated.View>
    </Animated.View>
  );
}
