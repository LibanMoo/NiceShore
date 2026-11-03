/**
 * NiceShore "Coastal Precision" design tokens.
 * Source: Stitch export (login / sign_up screens + coastal_precision/DESIGN.md).
 */
import type { TextStyle } from 'react-native';

export const Palette = {
  primary: '#001e40', // Deep Ocean – headlines, primary buttons
  primaryContainer: '#003366',
  onPrimary: '#ffffff',
  primaryFixed: '#d5e3ff',

  secondary: '#00668a',
  secondaryContainer: '#00bdfd', // Sky Cyan – focus rings, accents
  secondaryFixed: '#c3e8ff',

  background: '#f9f9fe',
  sand: '#F5F7FA', // soft sandy grey canvas used on Sign Up
  surface: '#ffffff', // surface-container-lowest (cards)
  surfaceLow: '#f4f3f8', // surface-container-low (inputs, icon tiles)
  surfaceContainer: '#eeedf2',
  surfaceVariant: '#e2e2e7', // dividers, subtle borders

  onSurface: '#1a1c1f',
  onSurfaceVariant: '#43474f',
  outline: '#737780',

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
  headlineXl: { fontFamily: FontFamily.bold, fontSize: 40, lineHeight: 48, letterSpacing: -0.8 },
  headlineLg: { fontFamily: FontFamily.bold, fontSize: 32, lineHeight: 40, letterSpacing: -0.64 },
  headlineMd: { fontFamily: FontFamily.semiBold, fontSize: 24, lineHeight: 32 },
  bodyLg: { fontFamily: FontFamily.regular, fontSize: 18, lineHeight: 28 },
  bodyMd: { fontFamily: FontFamily.regular, fontSize: 16, lineHeight: 24 },
  bodySm: { fontFamily: FontFamily.medium, fontSize: 13, lineHeight: 18 },
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
  lg: 12, // buttons, inputs, small cards
  xl: 16, // large cards
  full: 9999,
} as const;

/** Ambient shadows tinted with Deep Ocean blue, per the design system. */
export const Shadow = {
  card: '0px 8px 32px 0px rgba(0, 51, 102, 0.08)',
  tile: '0px 4px 16px 0px rgba(0, 51, 102, 0.05)',
  button: '0px 4px 16px 0px rgba(0, 30, 64, 0.2)',
} as const;

export const AuthCardMaxWidth = 448;
