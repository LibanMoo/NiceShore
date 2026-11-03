import { SymbolView } from 'expo-symbols';
import type { ColorValue, StyleProp, ViewStyle } from 'react-native';

/**
 * Icons from the NiceShore design (Material Symbols names), mapped to
 * SF Symbols on iOS. Add new entries here as more screens are built.
 */
const ICONS = {
  sailing: { ios: 'sailboat.fill', android: 'sailing', web: 'sailing' },
  mail: { ios: 'envelope', android: 'mail', web: 'mail' },
  lock: { ios: 'lock', android: 'lock', web: 'lock' },
  person: { ios: 'person.fill', android: 'person', web: 'person' },
  calendar: { ios: 'calendar', android: 'calendar_today', web: 'calendar_today' },
  visibility: { ios: 'eye', android: 'visibility', web: 'visibility' },
  visibilityOff: { ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' },
  error: { ios: 'exclamationmark.circle', android: 'error', web: 'error' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  myLocation: { ios: 'location', android: 'my_location', web: 'my_location' },
  waterDrop: { ios: 'drop', android: 'water_drop', web: 'water_drop' },
  locationOn: { ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' },
  trendingUp: { ios: 'arrow.up.right', android: 'trending_up', web: 'trending_up' },
  trendingDown: { ios: 'arrow.down.right', android: 'trending_down', web: 'trending_down' },
  slack: { ios: 'minus', android: 'horizontal_rule', web: 'horizontal_rule' },
  close: { ios: 'xmark.circle.fill', android: 'cancel', web: 'cancel' },
  logout: {
    ios: 'rectangle.portrait.and.arrow.right',
    android: 'logout',
    web: 'logout',
  },
  bookmark: { ios: 'bookmark', android: 'bookmark', web: 'bookmark' },
  home: { ios: 'house', android: 'home', web: 'home' },
  explore: { ios: 'safari', android: 'explore', web: 'explore' },
} as const;

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: IconName;
  size?: number;
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
};

export function Icon({ name, size = 24, color, style }: IconProps) {
  return <SymbolView name={ICONS[name]} size={size} tintColor={color} style={style} />;
}
