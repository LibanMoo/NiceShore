import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '@/components/ui/icon';
import { Palette, Radius, Space, Type } from '@/constants/design';

// Placeholder until the "Saved Beaches" design is built.
export default function SavedScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.center}>
        <View style={styles.iconTile}>
          <Icon name="bookmark" size={32} color={Palette.primary} />
        </View>
        <Text style={styles.title}>No saved beaches yet</Text>
        <Text style={styles.body}>Save beaches to check their tides at a glance.</Text>
        <Pressable
          onPress={() => router.navigate('/')}
          accessibilityRole="button"
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.9 }]}>
          <Text style={styles.buttonText}>Find beaches</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Palette.background },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Space.gutter,
    gap: Space.stackSm,
  },
  iconTile: {
    width: 64,
    height: 64,
    borderRadius: Radius.lg,
    backgroundColor: Palette.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Space.stackSm,
  },
  title: { ...Type.headlineMd, color: Palette.primary, textAlign: 'center' },
  body: { ...Type.bodyMd, color: Palette.onSurfaceVariant, textAlign: 'center' },
  button: {
    marginTop: Space.stackMd,
    backgroundColor: Palette.primary,
    borderRadius: Radius.lg,
    paddingVertical: 14,
    paddingHorizontal: Space.gutter,
  },
  buttonText: { ...Type.button, color: Palette.onPrimary },
});
