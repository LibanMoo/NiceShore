import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TideChip } from '@/components/home/tide-trend';
import { AppHeader, CircleButton } from '@/components/ui/app-header';
import { Icon } from '@/components/ui/icon';
import { FontFamily, Palette, Radius, Shadow, Space, Type } from '@/constants/design';
import { BottomTabInset, MaxContentWidth, WebTabBarHeight } from '@/constants/theme';
import { useSavedBeaches } from '@/context/saved-beaches-context';
import { getBeach, type Beach } from '@/data/beaches';

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const { savedIds, toggleSaved } = useSavedBeaches();
  const beaches = savedIds.map((id) => getBeach(id)).filter((b): b is NonNullable<typeof b> => !!b);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <AppHeader
        action={
          <CircleButton onPress={() => router.navigate('/explore')} accessibilityLabel="Search beaches">
            <Icon name="search" size={22} color={Palette.primary} accent={Palette.secondaryContainer} />
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
          <View style={styles.header}>
            <Text style={styles.title} accessibilityRole="header">
              Saved beaches
            </Text>
            {beaches.length > 0 ? (
              <Text style={styles.subtitle}>
                {beaches.length} {beaches.length === 1 ? 'beach' : 'beaches'} with live tide status
              </Text>
            ) : null}
          </View>

          {beaches.length > 0 ? (
            <View style={styles.list}>
              {beaches.map((beach) => (
                <SavedBeachRow key={beach.id} beach={beach} onRemove={() => toggleSaved(beach.id)} />
              ))}
            </View>
          ) : (
            <EmptyState />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function SavedBeachRow({ beach, onRemove }: { beach: Beach; onRemove: () => void }) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => router.push({ pathname: '/beach/[id]', params: { id: beach.id } })}
        accessibilityRole="link"
        accessibilityLabel={`${beach.name}, ${beach.location}, tide ${beach.tideHeightM} metres`}
        style={({ pressed }) => [styles.rowMain, pressed && styles.pressed]}>
        <Image source={beach.image} style={styles.thumb} contentFit="cover" />
        <View style={styles.rowText}>
          <View>
            <Text style={styles.name} numberOfLines={2}>
              {beach.name}
            </Text>
            <Text style={styles.location} numberOfLines={1}>
              {beach.location}
            </Text>
          </View>
          <View style={styles.tideRow}>
            <Text style={styles.tideHeight}>{beach.tideHeightM.toFixed(1)} m</Text>
            <TideChip trend={beach.tideTrend} />
          </View>
        </View>
      </Pressable>
      <CircleButton
        onPress={onRemove}
        accessibilityLabel={`Remove ${beach.name} from saved`}
        style={styles.remove}>
        <Icon name="bookmarkFilled" size={20} color={Palette.primary} />
      </CircleButton>
    </View>
  );
}

function EmptyState() {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Icon name="bookmark" size={28} color={Palette.primary} />
      </View>
      <Text style={styles.emptyTitle}>No saved beaches yet</Text>
      <Text style={styles.emptyBody}>Save a beach from its details page to see its tide here.</Text>
      <Pressable
        onPress={() => router.navigate('/')}
        accessibilityRole="button"
        style={({ pressed }) => [styles.emptyButton, pressed && styles.pressed]}>
        <Text style={styles.emptyButtonText}>Find beaches</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  scroll: {
    paddingTop: Space.gutter,
    paddingHorizontal: Space.marginMobile,
    alignItems: 'center',
  },
  column: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Space.gutter,
  },
  header: {
    gap: 4,
  },
  title: {
    ...Type.headlineLg,
    color: Palette.primary,
  },
  subtitle: {
    ...Type.bodyMd,
    color: Palette.onSurfaceVariant,
  },
  list: {
    gap: Space.stackMd,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.stackMd,
    padding: Space.stackMd,
    borderRadius: Radius.xxl,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.surfaceVariant,
    boxShadow: Shadow.card,
  },
  rowMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.stackMd,
  },
  pressed: {
    opacity: 0.85,
  },
  thumb: {
    width: 88,
    height: 88,
    borderRadius: Radius.xl,
    backgroundColor: Palette.surfaceVariant,
  },
  rowText: {
    flex: 1,
    minWidth: 0,
    gap: Space.stackSm,
  },
  name: {
    ...Type.cardTitle,
    color: Palette.primary,
  },
  location: {
    ...Type.bodySm,
    color: Palette.onSurfaceVariant,
  },
  tideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.stackSm,
  },
  tideHeight: {
    ...Type.bodyMd,
    fontFamily: FontFamily.bold,
    color: Palette.primary,
  },
  remove: {
    alignSelf: 'flex-start',
  },
  empty: {
    alignItems: 'center',
    gap: Space.stackSm,
    paddingVertical: Space.stackLg,
    paddingHorizontal: Space.gutter,
    borderRadius: Radius.xxl,
    backgroundColor: Palette.sand,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: Radius.full,
    backgroundColor: Palette.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Space.stackSm,
  },
  emptyTitle: {
    ...Type.headlineMd,
    color: Palette.primary,
    textAlign: 'center',
  },
  emptyBody: {
    ...Type.bodyMd,
    color: Palette.onSurfaceVariant,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: Space.stackMd,
    height: 52,
    justifyContent: 'center',
    paddingHorizontal: Space.gutter,
    borderRadius: Radius.lg,
    backgroundColor: Palette.primary,
  },
  emptyButtonText: {
    ...Type.button,
    color: Palette.onPrimary,
  },
});
