import { SymbolView, SymbolViewProps } from 'expo-symbols';
import { ColorValue } from 'react-native';

// Mapa central de iconos: nombre semántico -> símbolo nativo por plataforma
// (SF Symbols en iOS, Material Symbols en Android/web vía expo-symbols).
const ICONS = {
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  close: { ios: 'xmark', android: 'close', web: 'close' },
  closeCircle: { ios: 'xmark.circle.fill', android: 'cancel', web: 'cancel' },
  add: { ios: 'plus', android: 'add', web: 'add' },
  chevronRight: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  play: { ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  checkCircle: { ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' },
  calendar: { ios: 'calendar', android: 'calendar_month', web: 'calendar_month' },
  pin: { ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' },
  photo: { ios: 'photo', android: 'image', web: 'image' },
  person: { ios: 'person.crop.circle.fill', android: 'account_circle', web: 'account_circle' },
  people: { ios: 'person.2.fill', android: 'group', web: 'group' },
  bell: { ios: 'bell.fill', android: 'notifications', web: 'notifications' },
  bellSlash: { ios: 'bell.slash.fill', android: 'notifications_off', web: 'notifications_off' },
  lock: { ios: 'lock.fill', android: 'lock', web: 'lock' },
  help: { ios: 'questionmark.circle.fill', android: 'help', web: 'help' },
  gear: { ios: 'gearshape.fill', android: 'settings', web: 'settings' },
  moon: { ios: 'moon.fill', android: 'dark_mode', web: 'dark_mode' },
  globe: { ios: 'globe', android: 'language', web: 'language' },
  logout: { ios: 'rectangle.portrait.and.arrow.right', android: 'logout', web: 'logout' },
  trash: { ios: 'trash.fill', android: 'delete', web: 'delete' },
  chart: { ios: 'chart.bar.fill', android: 'bar_chart', web: 'bar_chart' },
  gallery: { ios: 'photo.on.rectangle.angled', android: 'photo_library', web: 'photo_library' },
  info: { ios: 'info.circle.fill', android: 'info', web: 'info' },
  star: { ios: 'star.fill', android: 'star', web: 'star' },
} as const;

export type IconName = keyof typeof ICONS;

type Props = Omit<SymbolViewProps, 'name' | 'tintColor'> & {
  name: IconName;
  size?: number;
  color?: ColorValue;
};

export function Icon({ name, size = 20, color, style, ...rest }: Props) {
  return (
    <SymbolView
      name={ICONS[name]}
      size={size}
      tintColor={color}
      resizeMode="scaleAspectFit"
      style={[{ width: size, height: size }, style]}
      {...rest}
    />
  );
}
