import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatTime, TIDE_TREND } from '@/components/home/tide-trend';
import { Icon } from '@/components/ui/icon';
import { FontFamily, Palette, Radius, Shadow, Space, Type } from '@/constants/design';
import type { FeaturedBeach } from '@/data/beaches';

type FeaturedBeachCardProps = {
  beach: FeaturedBeach;
  onPress?: () => void;
};

export function FeaturedBeachCard({ beach, onPress }: FeaturedBeachCardProps) {
  const trend = TIDE_TREND[beach.tideTrend];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Featured destination: ${beach.name}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: beach.image }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={250}
          placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
        />
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.name}>{beach.name}</Text>
          <View style={styles.locationRow}>
            <Icon name="locationOn" size={22} color={Palette.onSurfaceVariant} />
            <Text style={styles.location}>{beach.location}</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Current Tide</Text>
            <View style={styles.statValueRow}>
              <Text style={styles.statValue}>{beach.tideHeightM.toFixed(1)} m</Text>
              <Icon name={trend.icon} size={22} color={trend.color} />
            </View>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Water Temp</Text>
            <Text style={styles.statValue}>{beach.waterTempC}°C</Text>
          </View>
        </View>

        <View style={styles.tides}>
          <TideRow
            label="Next High Tide"
            value={`${formatTime(beach.nextHighTide.time)} (${beach.nextHighTide.heightM}m)`}
          />
          <TideRow
            label="Next Low Tide"
            value={`${formatTime(beach.nextLowTide.time)} (${beach.nextLowTide.heightM}m)`}
          />
        </View>
      </View>
    </Pressable>
  );
}

function TideRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.tideRow}>
      <Text style={styles.tideLabel}>{label}</Text>
      <Text style={styles.tideValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surface,
    borderRadius: 32,
    padding: Space.stackLg,
    gap: Space.gutter,
    boxShadow: Shadow.card,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
  imageWrap: {
    height: 256,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: Palette.surfaceContainer,
  },
  content: {
    gap: Space.gutter,
  },
  name: {
    ...Type.headlineLg,
    color: Palette.primary,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    ...Type.bodyLg,
    color: Palette.onSurfaceVariant,
    flexShrink: 1,
  },
  stats: {
    flexDirection: 'row',
    gap: Space.stackMd,
  },
  stat: {
    flex: 1,
    backgroundColor: Palette.surfaceLow,
    borderRadius: Radius.lg,
    padding: Space.stackMd,
  },
  statLabel: {
    ...Type.labelCaps,
    textTransform: 'none',
    color: Palette.outline,
    marginBottom: 4,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.stackSm,
  },
  statValue: {
    ...Type.headlineMd,
    color: Palette.primary,
  },
  tides: {
    gap: Space.stackSm,
    paddingTop: Space.stackMd,
    borderTopWidth: 1,
    borderTopColor: Palette.surfaceVariant,
  },
  tideRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Space.stackSm,
  },
  tideLabel: {
    ...Type.bodyMd,
    color: Palette.onSurfaceVariant,
  },
  tideValue: {
    ...Type.bodyMd,
    fontFamily: FontFamily.medium,
    color: Palette.primary,
  },
});
