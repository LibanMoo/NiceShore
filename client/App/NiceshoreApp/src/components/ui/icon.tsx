import type { ColorValue, StyleProp, ViewStyle } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

type Strokes = { color: ColorValue; accent: ColorValue };

/**
 * Stroke icons from the NiceShore design, drawn on a 24px grid. Duotone icons
 * use `accent` for the part the design paints Sky Cyan.
 */
const ICONS = {
  mail: ({ color }: Strokes) => (
    <>
      <Rect x={3} y={5} width={18} height={14} rx={2} stroke={color} />
      <Path d="m3.5 6.5 8.5 6.5 8.5-6.5" stroke={color} />
    </>
  ),
  lock: ({ color }: Strokes) => (
    <>
      <Rect x={5} y={11} width={14} height={10} rx={2} stroke={color} />
      <Path d="M8 11V8a4 4 0 0 1 8 0v3" stroke={color} />
    </>
  ),
  person: ({ color, accent }: Strokes) => (
    <>
      <Circle cx={12} cy={8} r={4} stroke={color} />
      <Path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" stroke={accent} />
    </>
  ),
  calendar: ({ color }: Strokes) => (
    <>
      <Rect x={3} y={5} width={18} height={16} rx={2} stroke={color} />
      <Path d="M3 10h18M8 3v4M16 3v4" stroke={color} />
    </>
  ),
  visibility: ({ color, accent }: Strokes) => (
    <>
      <Path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" stroke={color} />
      <Circle cx={12} cy={12} r={3} stroke={accent} />
    </>
  ),
  visibilityOff: ({ color, accent }: Strokes) => (
    <>
      <Path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" stroke={color} />
      <Circle cx={12} cy={12} r={3} stroke={accent} />
      <Path d="M4 4l16 16" stroke={color} />
    </>
  ),
  error: ({ color }: Strokes) => (
    <>
      <Circle cx={12} cy={12} r={9} stroke={color} />
      <Path d="M12 8v5M12 16.5v.01" stroke={color} />
    </>
  ),
  search: ({ color, accent }: Strokes) => (
    <>
      <Circle cx={11} cy={11} r={7} stroke={color} />
      <Path d="m20 20-3.6-3.6" stroke={accent} />
    </>
  ),
  myLocation: ({ color, accent }: Strokes) => (
    <>
      <Circle cx={12} cy={12} r={7} stroke={color} />
      <Circle cx={12} cy={12} r={2.5} fill={accent} stroke={accent} />
      <Path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke={color} />
    </>
  ),
  locationOn: ({ color, accent }: Strokes) => (
    <>
      <Path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" stroke={color} />
      <Circle cx={12} cy={9.5} r={2.5} stroke={accent} />
    </>
  ),
  arrowBack: ({ color }: Strokes) => <Path d="M19 12H5M11 6l-6 6 6 6" stroke={color} />,
  arrowUp: ({ color }: Strokes) => <Path d="M12 19V5M6 11l6-6 6 6" stroke={color} />,
  arrowDown: ({ color }: Strokes) => <Path d="M12 5v14M6 13l6 6 6-6" stroke={color} />,
  dash: ({ color }: Strokes) => <Path d="M5 12h14" stroke={color} />,
  close: ({ color }: Strokes) => <Path d="M6 6l12 12M18 6 6 18" stroke={color} />,
  logout: ({ color }: Strokes) => (
    <Path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11" stroke={color} />
  ),
  chevronRight: ({ color }: Strokes) => <Path d="m9 6 6 6-6 6" stroke={color} />,
  tune: ({ color, accent }: Strokes) => (
    <>
      <Path d="M4 7h9M17 7h3M4 17h3M11 17h9" stroke={color} />
      <Circle cx={15} cy={7} r={2} stroke={accent} />
      <Circle cx={9} cy={17} r={2} stroke={accent} />
    </>
  ),
  bell: ({ color, accent }: Strokes) => (
    <>
      <Path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z" stroke={color} />
      <Path d="M10 20.5a2 2 0 0 0 4 0" stroke={accent} />
    </>
  ),
  globe: ({ color, accent }: Strokes) => (
    <>
      <Circle cx={12} cy={12} r={9} stroke={color} />
      <Path
        d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"
        stroke={accent}
      />
    </>
  ),
  sun: ({ color, accent }: Strokes) => (
    <>
      <Circle cx={12} cy={12} r={4} stroke={color} />
      <Path
        d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"
        stroke={accent}
      />
    </>
  ),
  shield: ({ color, accent }: Strokes) => (
    <>
      <Path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" stroke={color} />
      <Path d="m9 12 2 2 4-4" stroke={accent} />
    </>
  ),
  trash: ({ color }: Strokes) => <Path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" stroke={color} />,
  bookmark: ({ color }: Strokes) => (
    <Path d="M7 3.5h10a1 1 0 0 1 1 1V21l-6-4-6 4V4.5a1 1 0 0 1 1-1z" stroke={color} />
  ),
  bookmarkFilled: ({ color }: Strokes) => (
    <Path d="M7 3.5h10a1 1 0 0 1 1 1V21l-6-4-6 4V4.5a1 1 0 0 1 1-1z" stroke={color} fill={color} />
  ),
  info: ({ color, accent }: Strokes) => (
    <>
      <Circle cx={12} cy={12} r={9} stroke={color} />
      <Path d="M12 11v5" stroke={color} />
      <Path d="M12 8h.01" stroke={accent} strokeWidth={2.5} />
    </>
  ),
  home: ({ color }: Strokes) => (
    <Path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" stroke={color} />
  ),
  explore: ({ color }: Strokes) => (
    <>
      <Circle cx={12} cy={12} r={9} stroke={color} />
      <Path d="m15.5 8.5-2 5-5 2 2-5z" stroke={color} />
    </>
  ),
} as const;

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: IconName;
  size?: number;
  color?: ColorValue;
  /** Second colour on duotone icons. Defaults to `color`. */
  accent?: ColorValue;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
};

export function Icon({
  name,
  size = 24,
  color = '#000000',
  accent = color,
  strokeWidth = 2,
  style,
}: IconProps) {
  const Glyph = ICONS[name];
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden>
      <Glyph color={color} accent={accent} />
    </Svg>
  );
}
