import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BeachCard } from '@/components/home/beach-card';
import { FeaturedBeachCard } from '@/components/home/featured-beach-card';
import { Icon } from '@/components/ui/icon';
import { FontFamily, Palette, Radius, Space, Type } from '@/constants/design';
import { BottomTabInset, MaxContentWidth } from '@/constants/theme';
import { featuredBeach, nearbyBeaches } from '@/data/beaches';

/** Height of the web bottom navigation (see components/app-tabs.web.tsx). */
const WebTabBarHeight = 84;

function greeting(date = new Date()) {
  const h = date.getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const beaches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return nearbyBeaches;
    return nearbyBeaches.filter(
      (b) => b.name.toLowerCase().includes(q) || b.location.toLowerCase().includes(q)
    );
  }, [query]);

  const handleUseLocation = () => {
    // TODO: `npx expo install expo-location`, request permission, then sort
    // nearby beaches by distance from the user's coordinates.
    Alert.alert('Use my location', 'Location-based search is coming soon.');
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + Space.stackLg,
            paddingBottom:
              insets.bottom + (Platform.OS === 'web' ? WebTabBarHeight : BottomTabInset) + Space.stackLg,
          },
        ]}>
        <View style={styles.column}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>{greeting()}</Text>
            <Text style={styles.title} accessibilityRole="header">
              Where are you going?
            </Text>
          </View>

          {/* Search */}
          <View style={styles.searchSection}>
            <View style={styles.searchWrap}>
              <Icon name="search" size={22} color={Palette.outline} style={styles.searchIcon} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search beaches..."
                placeholderTextColor={Palette.outline}
                style={styles.searchInput}
                returnKeyType="search"
                autoCorrect={false}
                selectionColor={Palette.primary}
                accessibilityLabel="Search beaches"
              />
              {query.length > 0 && (
                <Pressable
                  onPress={() => setQuery('')}
                  hitSlop={10}
                  style={styles.clear}
                  accessibilityRole="button"
                  accessibilityLabel="Clear search">
                  <Icon name="close" size={20} color={Palette.outline} />
                </Pressable>
              )}
            </View>

            <Pressable
              onPress={handleUseLocation}
              accessibilityRole="button"
              style={({ pressed }) => [styles.locationButton, pressed && styles.locationPressed]}>
              <Icon name="myLocation" size={22} color={Palette.secondary} />
              <Text style={styles.locationText}>Use my location</Text>
            </Pressable>
          </View>

          {/* Nearby Beaches */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Nearby Beaches</Text>
              <Pressable hitSlop={8} onPress={() => router.push('/explore')} accessibilityRole="link">
                {({ pressed }) => (
                  <Text style={[styles.seeAll, pressed && { opacity: 0.6 }]}>See all</Text>
                )}
              </Pressable>
            </View>

            {beaches.length > 0 ? (
              <FlatList
                horizontal
                data={beaches}
                keyExtractor={(b) => b.id}
                renderItem={({ item }) => <BeachCard beach={item} />}
                showsHorizontalScrollIndicator={false}
                style={styles.carousel}
                contentContainerStyle={styles.carouselContent}
                decelerationRate="fast"
                snapToInterval={280 + Space.stackMd}
                snapToAlignment="start"
              />
            ) : (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>No beaches match “{query.trim()}”.</Text>
              </View>
            )}
          </View>

          {/* Featured Destination */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Destination</Text>
            <FeaturedBeachCard beach={featuredBeach} />
          </View>
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
    paddingHorizontal: Space.marginMobile,
    alignItems: 'center',
  },
  column: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Space.stackLg,
  },
  header: {
    gap: Space.stackSm,
  },
  greeting: {
    ...Type.bodyLg,
    color: Palette.onSurfaceVariant,
  },
  title: {
    ...Type.headlineXl,
    color: Palette.primary,
  },
  searchSection: {
    gap: Space.stackSm,
  },
  searchWrap: {
    justifyContent: 'center',
    backgroundColor: Palette.surfaceLow,
    borderRadius: Radius.lg,
    boxShadow: '0px 4px 16px 0px rgba(0, 51, 102, 0.04)',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
  },
  searchInput: {
    ...Type.bodyMd,
    color: Palette.onSurface,
    paddingVertical: 16,
    paddingLeft: 48,
    paddingRight: 44,
    outlineWidth: 0,
  },
  clear: {
    position: 'absolute',
    right: 14,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Space.stackSm,
    paddingVertical: 16,
    paddingHorizontal: Space.gutter,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.secondaryFixed,
    backgroundColor: 'transparent',
  },
  locationPressed: {
    backgroundColor: 'rgba(195, 232, 255, 0.25)',
  },
  locationText: {
    ...Type.button,
    color: Palette.primary,
  },
  section: {
    gap: Space.stackMd,
    paddingTop: Space.stackMd,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    ...Type.headlineMd,
    color: Palette.primary,
  },
  seeAll: {
    ...Type.button,
    color: Palette.secondary,
  },
  carousel: {
    marginHorizontal: -Space.marginMobile,
  },
  carouselContent: {
    paddingHorizontal: Space.marginMobile,
    // Room so card shadows aren't clipped by the horizontal scroller.
    paddingTop: 4,
    paddingBottom: Space.gutter,
    gap: Space.stackMd,
  },
  empty: {
    paddingVertical: Space.gutter,
    alignItems: 'center',
    backgroundColor: Palette.surfaceLow,
    borderRadius: Radius.lg,
  },
  emptyText: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Palette.onSurfaceVariant,
  },
});
