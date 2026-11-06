import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Logo } from '@/components/ui/logo';
import { Palette, Radius, Space } from '@/constants/design';

/** Top bar on the tab screens: logo on the left, one round action on the right. */
export function AppHeader({ action }: { action?: ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingTop: insets.top }]}>
      <View style={styles.inner}>
        <Pressable
          onPress={() => router.navigate('/')}
          accessibilityRole="link"
          accessibilityLabel="NiceShore home"
          style={styles.logo}>
          <Logo markSize={32} fontSize={20} lineHeight={28} gap={10} />
        </Pressable>
        {action}
      </View>
    </View>
  );
}

type CircleButtonProps = {
  onPress: () => void;
  accessibilityLabel: string;
  children: ReactNode;
  /** Sandy grey by default; pass a colour for the tinted avatar. */
  background?: string;
  style?: ViewStyle;
};

/** 44px round icon button used in headers and list rows. */
export function CircleButton({
  onPress,
  accessibilityLabel,
  children,
  background = Palette.sand,
  style,
}: CircleButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.circle,
        { backgroundColor: background },
        pressed && styles.pressed,
        style,
      ]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: Palette.surface,
    borderBottomWidth: 1,
    borderBottomColor: Palette.surfaceVariant,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    paddingHorizontal: Space.marginMobile,
  },
  logo: {
    minHeight: 44,
    justifyContent: 'center',
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});
