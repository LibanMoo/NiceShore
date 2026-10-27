import { Platform, StyleSheet, View, type ViewStyle } from 'react-native';

type GlowOrbProps = {
  /** Orb colour as "r, g, b". */
  rgb: string;
  size: number;
  opacity?: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

/**
 * Soft blurred colour blob used as the ambient "glassmorphic" background
 * accent from the design. Implemented as a radial gradient so it renders
 * the same on iOS, Android and web without a blur library.
 */
export function GlowOrb({ rgb, size, opacity = 0.5, ...position }: GlowOrbProps) {
  const gradient = `radial-gradient(circle at center, rgba(${rgb}, ${opacity}) 0%, rgba(${rgb}, ${
    opacity * 0.45
  }) 35%, rgba(${rgb}, 0) 70%)`;

  const gradientStyle = Platform.select<ViewStyle>({
    // react-native-web passes CSS through directly.
    web: { backgroundImage: gradient } as ViewStyle,
    default: { experimental_backgroundImage: gradient },
  });

  return (
    <View
      pointerEvents="none"
      style={[styles.orb, { width: size, height: size, borderRadius: size / 2 }, position, gradientStyle]}
    />
  );
}

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
  },
});
