import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontFamily, Palette, Type } from '@/constants/design';

type AuthPromptProps = {
  text: string;
  action: string;
  onPress: () => void;
};

/** Footer prompt that links between Log in and Sign up. */
export function AuthPrompt({ text, action, onPress }: AuthPromptProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>{text}</Text>
      <Pressable style={styles.link} accessibilityRole="link" onPress={onPress}>
        {({ pressed }) => <Text style={[styles.action, pressed && styles.pressed]}>{action}</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  text: {
    ...Type.bodyMd,
    color: Palette.onSurfaceVariant,
  },
  link: {
    minHeight: 44,
    justifyContent: 'center',
  },
  action: {
    ...Type.bodyMd,
    fontFamily: FontFamily.semiBold,
    color: Palette.secondary,
    textDecorationLine: 'underline',
  },
  pressed: {
    color: Palette.primary,
  },
});
