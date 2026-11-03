import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthCardMaxWidth, Palette, Space } from '@/constants/design';

type AuthScreenProps = {
  /** Space above the content. Never less than the status bar needs. */
  paddingTop: number;
  /** Vertical space between the screen's sections. */
  gap: number;
  /** Pinned to the bottom of the screen, e.g. the "Log in" prompt. */
  footer: ReactNode;
  children: ReactNode;
};

/**
 * Shared shell for auth screens: safe area, keyboard avoidance, scrolling on
 * small phones, and a column capped at the design's max width.
 */
export function AuthScreen({ paddingTop, gap, footer, children }: AuthScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: Math.max(paddingTop, insets.top + Space.stackSm),
              paddingBottom: Math.max(Space.stackLg, insets.bottom + Space.stackSm),
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={[styles.column, { gap }]}>
            {children}
            <View style={styles.footer}>{footer}</View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: Space.marginMobile,
  },
  column: {
    flex: 1,
    width: '100%',
    maxWidth: AuthCardMaxWidth,
  },
  footer: {
    marginTop: 'auto',
  },
});
