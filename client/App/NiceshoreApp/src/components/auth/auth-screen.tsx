import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthCardMaxWidth, Space } from '@/constants/design';

type AuthScreenProps = {
  backgroundColor: string;
  /** Decorative layer rendered behind the content (e.g. glow orbs). */
  background?: ReactNode;
  children: ReactNode;
};

/**
 * Shared shell for auth screens: safe area, keyboard avoidance, scrolling on
 * small phones, and a centred column capped at the design's max width.
 */
export function AuthScreen({ backgroundColor, background, children }: AuthScreenProps) {
  return (
    <View style={[styles.root, styles.clip, { backgroundColor }]}>
      <StatusBar style="dark" />
      {background}
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.root}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.column}>{children}</View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  clip: {
    overflow: 'hidden',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Space.marginMobile,
  },
  column: {
    width: '100%',
    maxWidth: AuthCardMaxWidth,
  },
});
