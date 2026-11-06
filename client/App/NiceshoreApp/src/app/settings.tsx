import Constants from 'expo-constants';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CircleButton } from '@/components/ui/app-header';
import { Icon } from '@/components/ui/icon';
import { ListGroup, ListRow } from '@/components/ui/list';
import { Toggle } from '@/components/ui/toggle';
import { Palette, Radius, Space, Type } from '@/constants/design';
import { MaxContentWidth } from '@/constants/theme';

const comingSoon = (title: string) => () => Alert.alert(title, 'This setting is coming soon.');

function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/profile');
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  // TODO: persist this and register for push notifications (expo-notifications).
  const [tideAlerts, setTideAlerts] = useState(true);

  const confirmDelete = () =>
    // TODO: call the server's delete-account endpoint once it exists, then sign out.
    Alert.alert('Delete account', 'Account deletion isn’t available yet. Contact support to remove your account.');

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={[styles.bar, { paddingTop: insets.top }]}>
        <View style={styles.barInner}>
          <CircleButton onPress={goBack} accessibilityLabel="Back to profile">
            <Icon name="arrowBack" size={22} color={Palette.primary} />
          </CircleButton>
          <Text style={styles.barTitle} accessibilityRole="header">
            Settings
          </Text>
          <View style={styles.barSpacer} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 40 }]}>
        <View style={styles.column}>
          <ListGroup title="Preferences">
            <ListRow
              tile
              icon="bell"
              title="Tide alerts"
              subtitle="Push notifications for saved beaches"
              trailing={
                <Toggle value={tideAlerts} onValueChange={setTideAlerts} accessibilityLabel="Tide alerts" />
              }
            />
            <ListRow tile icon="globe" title="Language" subtitle="English (US)" onPress={comingSoon('Language')} />
            <ListRow tile icon="sun" title="Appearance" subtitle="Light" onPress={comingSoon('Appearance')} />
          </ListGroup>

          <ListGroup title="Privacy & security">
            <ListRow tile icon="locationOn" title="Location access" onPress={() => Linking.openSettings()} />
            <ListRow tile icon="shield" title="Privacy policy" onPress={comingSoon('Privacy policy')} />
          </ListGroup>

          <ListGroup title="Account">
            <ListRow tile icon="person" title="Account information" onPress={comingSoon('Account information')} />
          </ListGroup>

          <View style={styles.danger}>
            <Pressable
              onPress={confirmDelete}
              accessibilityRole="button"
              style={({ pressed }) => [styles.delete, pressed && styles.deletePressed]}>
              <Icon name="trash" size={20} color={Palette.error} />
              <Text style={styles.deleteText}>Delete account</Text>
            </Pressable>
            <Text style={styles.note}>Permanently removes your account and saved beaches.</Text>
          </View>

          <Text style={styles.version}>NiceShore v{Constants.expoConfig?.version ?? '1.0.0'}</Text>
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
  bar: {
    backgroundColor: Palette.surface,
    borderBottomWidth: 1,
    borderBottomColor: Palette.surfaceVariant,
  },
  barInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    paddingHorizontal: Space.marginMobile,
  },
  barTitle: {
    ...Type.cardTitle,
    color: Palette.primary,
  },
  barSpacer: {
    width: 44,
  },
  scroll: {
    paddingTop: Space.gutter,
    paddingHorizontal: Space.marginMobile,
    alignItems: 'center',
  },
  column: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Space.stackLg,
  },
  danger: {
    gap: Space.stackSm,
  },
  delete: {
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
  deletePressed: {
    backgroundColor: Palette.errorContainer,
  },
  deleteText: {
    ...Type.button,
    color: Palette.error,
  },
  note: {
    ...Type.bodySm,
    color: Palette.onSurfaceVariant,
    textAlign: 'center',
  },
  version: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Type.bodySm.fontFamily,
    color: Palette.onSurfaceVariant,
    textAlign: 'center',
  },
});
