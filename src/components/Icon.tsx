import type { ComponentType } from 'react';
import type { IconProps as PhosphorIconProps } from 'phosphor-react-native';
import {
  MagnifyingGlass,
  X,
  XCircle,
  Plus,
  CaretRight,
  CaretLeft,
  CaretDown,
  Play,
  Pause,
  Check,
  CheckCircle,
  CalendarBlank,
  MapPin,
  Image,
  Images,
  Users,
  QrCode,
  PencilSimple,
  Camera,
  ShareNetwork,
  Copy,
  ArrowClockwise,
  FlipHorizontal,
  Repeat,
  ListNumbers,
  Globe,
  ChartBar,
  SquaresFour,
  Funnel,
  DownloadSimple,
} from 'phosphor-react-native';

// Mapa central de iconos: nombre semántico -> componente Phosphor. Cambiar de
// ícono en toda la app es cambiar una sola línea acá.
const ICONS = {
  search: MagnifyingGlass,
  close: X,
  closeCircle: XCircle,
  add: Plus,
  chevronRight: CaretRight,
  chevronLeft: CaretLeft,
  chevronDown: CaretDown,
  play: Play,
  pause: Pause,
  check: Check,
  checkCircle: CheckCircle,
  calendar: CalendarBlank,
  pin: MapPin,
  photo: Image,
  gallery: Images,
  people: Users,
  qrcode: QrCode,
  edit: PencilSimple,
  camera: Camera,
  share: ShareNetwork,
  copy: Copy,
  renew: ArrowClockwise,
  mirror: FlipHorizontal,
  loop: Repeat,
  count: ListNumbers,
  globe: Globe,
  chart: ChartBar,
  grid: SquaresFour,
  filter: Funnel,
  download: DownloadSimple,
} satisfies Record<string, ComponentType<PhosphorIconProps>>;

export type IconName = keyof typeof ICONS;

type Props = Omit<PhosphorIconProps, 'color'> & {
  name: IconName;
  size?: number;
  color?: string;
};

export function Icon({ name, size = 20, color, weight = 'regular', ...rest }: Props) {
  const Cmp = ICONS[name];
  return <Cmp size={size} color={color} weight={weight} {...rest} />;
}
