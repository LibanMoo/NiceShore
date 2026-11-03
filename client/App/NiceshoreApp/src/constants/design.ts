/**
 * NiceShore "Coastal Precision" design tokens.
 * Source: NiceShore Redesign canvas, "Brand & UI kit" artboard.
 */
import type { TextStyle } from 'react-native';

export const Palette = {
  primary: '#003366', // Deep Ocean – headlines, primary buttons, brand
  onPrimary: '#ffffff',
  primaryFixed: '#d9f5ff', // Cyan 15% – active chips, active tab, rising tide

  secondary: '#00668a', // Sea Link – cyan for text: links and text actions
  secondaryContainer: '#00bfff', // Sky Cyan – accents and focus, never text on white

  background: '#ffffff',
  sand: '#f5f7fa', // Sandy Grey – input fills and secondary surfaces
  surface: '#ffffff',
  surfaceLow: '#f5f7fa',
  surfaceVariant: '#e2e8f0', // Mist – dividers, static card borders

  onSurface: '#111c2c', // typed input text
  onSurfaceVariant: '#4a5568', // Slate – body text, labels, inactive tabs
  outline: '#8a94a6', // input borders
  placeholder: '#5f6b7a',

  error: '#BA1A1A',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
} as const;

/** Font family names registered in the root layout via `useFonts`. */
export const FontFamily = {
  regular: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',
  semiBold: 'PlusJakartaSans-SemiBold',
  bold: 'PlusJakartaSans-Bold',
  extraBold: 'PlusJakartaSans-ExtraBold',
} as const;

export const FontAssets = {
  [FontFamily.regular]: require('@/assets/fonts/PlusJakartaSans_400Regular.ttf'),
  [FontFamily.medium]: require('@/assets/fonts/PlusJakartaSans_500Medium.ttf'),
  [FontFamily.semiBold]: require('@/assets/fonts/PlusJakartaSans_600SemiBold.ttf'),
  [FontFamily.bold]: require('@/assets/fonts/PlusJakartaSans_700Bold.ttf'),
  [FontFamily.extraBold]: require('@/assets/fonts/PlusJakartaSans_800ExtraBold.ttf'),
};

/**
 * Type scale. Each weight is its own font file, so we set `fontFamily`
 * instead of `fontWeight` (Android ignores fontWeight on custom fonts).
 */
export const Type = {
  headlineLg: { fontFamily: FontFamily.bold, fontSize: 32, lineHeight: 40, letterSpacing: -0.32 },
  headlineMd: { fontFamily: FontFamily.bold, fontSize: 22, lineHeight: 28 },
  cardTitle: { fontFamily: FontFamily.bold, fontSize: 18, lineHeight: 28 },
  bodyMd: { fontFamily: FontFamily.regular, fontSize: 16, lineHeight: 24 },
  bodySm: { fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 20 },
  button: { fontFamily: FontFamily.semiBold, fontSize: 16, lineHeight: 20 },
  labelCaps: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
} satisfies Record<string, TextStyle>;

export const Space = {
  stackSm: 8,
  stackMd: 16,
  gutter: 24,
  stackLg: 32,
  marginMobile: 20,
} as const;

export const Radius = {
  sm: 4,
  md: 8,
  lg: 12, // buttons, inputs
  xl: 16, // stat tiles
  xxl: 24, // cards
  full: 9999,
} as const;

/** Ambient shadows tinted with Deep Ocean blue, per the design system. */
export const Shadow = {
  card: '0px 10px 25px -5px rgba(0, 51, 102, 0.08)',
  focus: '0px 0px 0px 4px rgba(0, 191, 255, 0.2)',
} as const;

export const AuthCardMaxWidth = 448;
