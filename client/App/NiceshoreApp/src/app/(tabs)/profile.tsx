import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader, CircleButton } from '@/components/ui/app-header';
import { Icon } from '@/components/ui/icon';
import { CountBadge, ListGroup, ListRow } from '@/components/ui/list';
import { FontFamily, Palette, Radius, Shadow, Space, Type } from '@/constants/design';
import { BottomTabInset, MaxContentWidth, WebTabBarHeight } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useSavedBeaches } from '@/context/saved-beaches-context';

/** "test sailor" or "test.sailor" (from an email) -> "Test Sailor" */
function displayName(name: string) {
  return name
    .trim()
    .split(/[\s._-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuth();
  const { savedIds } = useSavedBeaches();
  const name = user ? displayName(user.name) : 'Guest';

  const openSettings = () => router.push('/settings');

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <AppHeader
        action={
          <CircleButton onPress={openSettings} accessibilityLabel="Settings">
            <Icon name="tune" size={22} color={Palette.primary} accent={Palette.secondaryContainer} />
          </CircleButton>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          {
            paddingBottom:
              insets.bottom + (Platform.OS === 'web' ? WebTabBarHeight : BottomTabInset) + Space.stackLg,
          },
        ]}>
        <View style={styles.column}>
          <View style={styles.identity}>
            <View style={styles.avatar} aria-hidden>
              <Text style={styles.avatarText}>{name.charAt(0)}</Text>
            </View>
            <View style={styles.identityText}>
              <Text style={styles.name} accessibilityRole="header">
                {name}
              </Text>
              {user?.email ? <Text style={styles.email}>{user.email}</Text> : null}
            </View>
          </View>

          <ListGroup>
            <ListRow
              icon="bookmark"
              title="Saved beaches"
              trailing={<CountBadge count={savedIds.length} />}
              onPress={() => router.navigate('/saved')}
            />
            <ListRow icon="tune" title="Settings" onPress={openSettings} />
            <ListRow
              icon="info"
              title="About NiceShore"
              onPress={() =>
                // TODO: link to an About page once it's designed.
                Alert.alert('About NiceShore', 'Tide times and conditions for beaches along the Somali coast.')
              }
            />
          </ListGroup>

          <Pressable
            onPress={signOut}
            accessibilityRole="button"
            style={({ pressed }) => [styles.logout, pressed && styles.logoutPressed]}>
            <Icon name="logout" size={20} color={Palette.error} />
            <Text style={styles.logoutText}>Log out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  scroll: {
    paddingTop: Space.stackLg,
    paddingHorizontal: Space.marginMobile,
    alignItems: 'center',
  },
  column: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Space.stackLg,
  },
  identity: {
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: Radius.full,
    backgroundColor: Palette.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: Shadow.card,
  },
  avatarText: {
    fontFamily: FontFamily.bold,
    fontSize: 36,
    lineHeight: 44,
    color: Palette.primary,
  },
  identityText: {
    alignItems: 'center',
    gap: 2,
  },
  name: {
    ...Type.headlineMd,
    color: Palette.primary,
    textAlign: 'center',
  },
  email: {
    ...Type.bodyMd,
    color: Palette.onSurfaceVariant,
    textAlign: 'center',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Space.stackSm,
    height: 52,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.surfaceVariant,
    backgroundColor: Palette.surface,
  },
  logoutPressed: {
    backgroundColor: Palette.errorContainer,
  },
  logoutText: {
    ...Type.button,
    color: Palette.error,
  },
});
