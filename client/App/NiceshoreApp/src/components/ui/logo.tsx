import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { FontFamily, Palette } from '@/constants/design';

const SMALL_MARK = 24;

/** Sun setting into a two-line tide. At 24px and below the second wave is dropped. */
export function LogoMark({ size }: { size: number }) {
  const small = size <= SMALL_MARK;
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <Rect width={48} height={48} rx={14} fill={Palette.primary} />
      <Path d="M14.5 24a9.5 9.5 0 0 1 19 0z" fill={Palette.secondaryContainer} />
      <Path
        d="M9 24c2.5-2.4 5-2.4 7.5 0s5 2.4 7.5 0 5-2.4 7.5 0 5 2.4 7.5 0"
        fill="none"
        stroke={Palette.onPrimary}
        strokeWidth={small ? 3.5 : 3}
        strokeLinecap="round"
      />
      {!small && (
        <Path
          d="M15 31c2-1.8 4-1.8 6 0s4 1.8 6 0 4-1.8 6 0"
          fill="none"
          stroke={Palette.onPrimary}
          strokeOpacity={0.55}
          strokeWidth={3}
          strokeLinecap="round"
        />
      )}
    </Svg>
  );
}

type LogoProps = {
  markSize: number;
  fontSize: number;
  lineHeight: number;
  gap: number;
  stacked?: boolean;
};

/** Mark + "NiceShore" wordmark. */
export function Logo({ markSize, fontSize, lineHeight, gap, stacked = false }: LogoProps) {
  return (
    <View style={[styles.logo, stacked && styles.stacked, { gap }]}>
      <LogoMark size={markSize} />
      <Text style={[styles.wordmark, { fontSize, lineHeight, letterSpacing: fontSize * -0.02 }]}>
        Nice<Text style={styles.shore}>Shore</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stacked: {
    flexDirection: 'column',
  },
  wordmark: {
    fontFamily: FontFamily.extraBold,
    color: Palette.primary,
  },
  shore: {
    color: Palette.secondary,
  },
});
