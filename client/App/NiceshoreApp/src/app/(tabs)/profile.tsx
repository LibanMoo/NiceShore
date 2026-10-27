import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '@/components/ui/icon';
import { Palette, Radius, Shadow, Space, Type } from '@/constants/design';
import { useAuth } from '@/context/auth-context';

// Placeholder until the "User Profile" design is built.
export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.center}>
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Icon name="person" size={36} color={Palette.primary} />
          </View>
          <Text style={styles.name}>{user?.name ?? 'Guest'}</Text>
          {user?.email ? <Text style={styles.email}>{user.email}</Text> : null}

          <Pressable
            onPress={signOut}
            accessibilityRole="button"
            style={({ pressed }) => [styles.signOut, pressed && { opacity: 0.85 }]}>
            <Icon name="logout" size={20} color={Palette.error} />
            <Text style={styles.signOutText}>Sign out</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Palette.background },
  center: { flex: 1, justifyContent: 'center', padding: Space.marginMobile },
  card: {
    alignItems: 'center',
    gap: Space.stackSm,
    backgroundColor: Palette.surface,
    borderRadius: 24,
    padding: Space.stackLg,
    boxShadow: Shadow.card,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Palette.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Space.stackSm,
  },
  name: { ...Type.headlineMd, color: Palette.primary, textTransform: 'capitalize' },
  email: { ...Type.bodyMd, color: Palette.onSurfaceVariant },
  signOut: {
    marginTop: Space.gutter,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.stackSm,
    paddingVertical: 12,
    paddingHorizontal: Space.gutter,
    borderRadius: Radius.lg,
    backgroundColor: Palette.errorContainer,
  },
  signOutText: { ...Type.button, color: Palette.onErrorContainer },
});
