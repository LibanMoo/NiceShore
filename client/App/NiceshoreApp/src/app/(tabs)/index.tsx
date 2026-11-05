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

import { BEACH_CARD_WIDTH, BeachCard } from '@/components/home/beach-card';
import { FeaturedBeachCard } from '@/components/home/featured-beach-card';
import { Icon } from '@/components/ui/icon';
import { Logo } from '@/components/ui/logo';
import { FontFamily, Palette, Radius, Shadow, Space, Type } from '@/constants/design';
import { BottomTabInset, MaxContentWidth } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { featuredBeach, nearbyBeaches } from '@/data/beaches';

/** Height of the web bottom navigation (see components/app-tabs.web.tsx). */
const WebTabBarHeight = 89;

function greeting(date = new Date()) {
  const h = date.getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

/** "liban mohamed" -> "Liban" */
function firstName(name: string) {
  const first = name.trim().split(/\s+/)[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const name = user ? firstName(user.name) : '';

  const beaches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return nearbyBeaches;
    return nearbyBeaches.filter(
      (b) => b.name.toLowerCase().includes(q) || b.location.toLowerCase().includes(q)
    );
  }, [query]);

  const openBeach = (id: string) => router.push({ pathname: '/beach/[id]', params: { id } });

  const handleUseLocation = () => {
    // TODO: `npx expo install expo-location`, request permission, then sort
    // nearby beaches by distance from the user's coordinates.
    Alert.alert('Use my location', 'Location-based search is coming soon.');
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* App header */}
      <View style={[styles.appBar, { paddingTop: insets.top }]}>
        <View style={styles.appBarInner}>
          <Logo markSize={32} fontSize={20} lineHeight={28} gap={10} />
          <Pressable
            onPress={() => router.push('/profile')}
            accessibilityRole="button"
            accessibilityLabel="Your profile"
            style={({ pressed }) => [styles.avatar, pressed && { opacity: 0.8 }]}>
            <Text style={styles.avatarText}>{name.charAt(0)}</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          {
            paddingBottom:
              insets.bottom + (Platform.OS === 'web' ? WebTabBarHeight : BottomTabInset) + Space.stackLg,
          },
        ]}>
        <View style={styles.column}>
          {/* Greeting + search */}
          <View style={styles.intro}>
            <View style={styles.header}>
              <Text style={styles.greeting}>
                {greeting()}
                {name ? `, ${name}` : ''}
              </Text>
              <Text style={styles.title} accessibilityRole="header">
                Where are you heading today?
              </Text>
            </View>

            <View style={styles.searchSection}>
              <View style={[styles.searchWrap, searchFocused && styles.searchFocused]}>
                <Icon
                  name="search"
                  size={22}
                  color={Palette.primary}
                  accent={Palette.secondaryContainer}
                  style={styles.searchIcon}
                />
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search beaches or towns"
                  placeholderTextColor={Palette.placeholder}
                  style={styles.searchInput}
                  returnKeyType="search"
                  autoCorrect={false}
                  selectionColor={Palette.secondaryContainer}
                  cursorColor={Palette.primary}
                  accessibilityLabel="Search beaches"
                />
                {query.length > 0 && (
                  <Pressable
                    onPress={() => setQuery('')}
                    style={styles.clear}
                    accessibilityRole="button"
                    accessibilityLabel="Clear search">
                    <Icon name="close" size={20} color={Palette.onSurfaceVariant} />
                  </Pressable>
                )}
              </View>

              <Pressable
                onPress={handleUseLocation}
                accessibilityRole="button"
                style={({ pressed }) => [styles.locationButton, pressed && styles.locationPressed]}>
                <Icon
                  name="myLocation"
                  size={22}
                  color={Palette.primary}
                  accent={Palette.secondaryContainer}
                />
                <Text style={styles.locationText}>Use my location</Text>
              </Pressable>
            </View>
          </View>

          {/* Nearby beaches */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle} accessibilityRole="header">
                Nearby beaches
              </Text>
              <Pressable
                style={styles.seeAll}
                onPress={() => router.push('/explore')}
                accessibilityRole="link">
                {({ pressed }) => (
                  <Text style={[styles.seeAllText, pressed && { color: Palette.primary }]}>See all</Text>
                )}
              </Pressable>
            </View>

            {beaches.length > 0 ? (
              <FlatList
                horizontal
                data={beaches}
                keyExtractor={(b) => b.id}
                renderItem={({ item }) => <BeachCard beach={item} onPress={() => openBeach(item.id)} />}
                showsHorizontalScrollIndicator={false}
                style={styles.carousel}
                contentContainerStyle={styles.carouselContent}
                decelerationRate="fast"
                snapToInterval={BEACH_CARD_WIDTH + Space.stackMd}
                snapToAlignment="start"
              />
            ) : (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>No beaches match “{query.trim()}”.</Text>
              </View>
            )}
          </View>

          {/* Featured beach */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle} accessibilityRole="header">
              Featured beach
            </Text>
            <FeaturedBeachCard beach={featuredBeach} onPress={() => openBeach(featuredBeach.id)} />
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
  appBar: {
    backgroundColor: Palette.surface,
    borderBottomWidth: 1,
    borderBottomColor: Palette.surfaceVariant,
  },
  appBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    paddingHorizontal: Space.marginMobile,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Palette.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...Type.bodyMd,
    fontFamily: FontFamily.bold,
    color: Palette.primary,
  },
  scroll: {
    paddingTop: Space.gutter,
    paddingHorizontal: Space.marginMobile,
    alignItems: 'center',
  },
  column: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: 40,
  },
  intro: {
    gap: Space.gutter,
  },
  header: {
    gap: 4,
  },
  greeting: {
    ...Type.bodyMd,
    color: Palette.onSurfaceVariant,
  },
  title: {
    ...Type.headlineLg,
    color: Palette.primary,
  },
  searchSection: {
    gap: 12,
  },
  searchWrap: {
    height: 52,
    justifyContent: 'center',
    backgroundColor: Palette.sand,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Palette.outline,
  },
  searchFocused: {
    borderColor: Palette.secondaryContainer,
    backgroundColor: Palette.surface,
    boxShadow: Shadow.focus,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
  },
  searchInput: {
    ...Type.bodyMd,
    height: '100%',
    color: Palette.onSurface,
    paddingVertical: 0,
    paddingLeft: 50,
    paddingRight: 48,
    outlineWidth: 0,
  },
  clear: {
    position: 'absolute',
    right: 4,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Space.stackSm,
    height: 52,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Palette.secondaryContainer,
    backgroundColor: Palette.surface,
  },
  locationPressed: {
    backgroundColor: Palette.primaryFixed,
  },
  locationText: {
    ...Type.button,
    color: Palette.primary,
  },
  section: {
    gap: Space.stackMd,
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
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  seeAllText: {
    ...Type.button,
    color: Palette.secondary,
  },
  carousel: {
    marginHorizontal: -Space.marginMobile,
    marginBottom: -Space.gutter,
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
    backgroundColor: Palette.sand,
    borderRadius: Radius.lg,
  },
  emptyText: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Palette.onSurfaceVariant,
  },
});
