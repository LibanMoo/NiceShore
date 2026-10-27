import { StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { FontFamily, Palette, Radius, Space } from '@/constants/design';

/** Banner for errors that aren't tied to one field (e.g. wrong password). */
export function FormError({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <View style={styles.banner} accessibilityRole="alert">
      <Icon name="error" size={20} color={Palette.onErrorContainer} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.stackSm,
    backgroundColor: Palette.errorContainer,
    borderRadius: Radius.lg,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  text: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    color: Palette.onErrorContainer,
  },
});
