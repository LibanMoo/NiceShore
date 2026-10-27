import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Palette, Radius, Space, Type } from '@/constants/design';

type SocialAuthProps = {
  /** Divider caption, e.g. "Or continue with". */
  caption: string;
  onGoogle?: () => void;
  onFacebook?: () => void;
};

/**
 * Divider + Google / Facebook buttons. They render in the muted
 * "placeholder" state from the design until a handler is passed in.
 */
export function SocialAuth({ caption, onGoogle, onFacebook }: SocialAuthProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.dividerRow}>
        <View style={styles.rule} />
        <Text style={styles.caption}>{caption}</Text>
        <View style={styles.rule} />
      </View>

      <View style={styles.buttons}>
        <SocialButton
          label="Google"
          icon={require('@/assets/images/social/google.png')}
          onPress={onGoogle}
        />
        <SocialButton
          label="Facebook"
          icon={require('@/assets/images/social/facebook.png')}
          onPress={onFacebook}
        />
      </View>
    </View>
  );
}

function SocialButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: number;
  onPress?: () => void;
}) {
  const disabled = !onPress;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={`Continue with ${label}`}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.socialButton,
        disabled && styles.socialDisabled,
        pressed && styles.socialPressed,
      ]}>
      <Image source={icon} style={styles.socialIcon} contentFit="contain" />
      <Text style={styles.socialLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Space.stackMd,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rule: {
    flex: 1,
    height: StyleSheet.hairlineWidth * 2,
    backgroundColor: Palette.surfaceVariant,
  },
  caption: {
    ...Type.labelCaps,
    color: Palette.onSurfaceVariant,
    paddingHorizontal: Space.stackMd,
  },
  buttons: {
    flexDirection: 'row',
    gap: Space.stackMd,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Space.stackSm,
    minHeight: 50,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.surfaceVariant,
    backgroundColor: Palette.surfaceLow,
  },
  socialDisabled: {
    opacity: 0.65,
  },
  socialPressed: {
    backgroundColor: Palette.surfaceContainer,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  socialLabel: {
    ...Type.button,
    color: Palette.onSurfaceVariant,
  },
});
