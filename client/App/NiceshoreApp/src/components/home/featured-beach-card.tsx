import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { TIDE_TREND } from '@/components/home/tide-trend';
import { Icon } from '@/components/ui/icon';
import { FontFamily, Palette, Radius, Shadow, Type } from '@/constants/design';
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
      accessibilityLabel={`Featured beach: ${beach.name}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image source={beach.image} style={styles.image} contentFit="cover" transition={250} />

      <View style={styles.content}>
        <View style={styles.heading}>
          <Text style={styles.name}>{beach.name}</Text>
          <View style={styles.locationRow}>
            <Icon
              name="locationOn"
              size={18}
              color={Palette.primary}
              accent={Palette.secondaryContainer}
            />
            <Text style={styles.location}>{beach.location}</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Current tide</Text>
            <View style={styles.statValueRow}>
              <Text style={styles.statValue}>{beach.tideHeightM.toFixed(1)} m</Text>
              <Icon name={trend.icon} size={18} strokeWidth={2.5} color={trend.iconColor} />
            </View>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Water temp</Text>
            <Text style={styles.statValue}>{beach.waterTempC}°C</Text>
          </View>
        </View>

        <View style={styles.tides}>
          <TideRow label="Next high tide" tide={beach.nextHighTide} />
          <TideRow label="Next low tide" tide={beach.nextLowTide} />
        </View>
      </View>
    </Pressable>
  );
}

function TideRow({ label, tide }: { label: string; tide: FeaturedBeach['nextHighTide'] }) {
  return (
    <View style={styles.tideRow}>
      <Text style={styles.tideLabel}>{label}</Text>
      <Text style={styles.tideValue}>
        {tide.time} · {tide.heightM} m
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surface,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Palette.surfaceVariant,
    boxShadow: Shadow.card,
    overflow: 'hidden',
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
  image: {
    height: 200,
    backgroundColor: Palette.surfaceVariant,
  },
  content: {
    padding: 32,
    gap: 24,
  },
  heading: {
    gap: 4,
  },
  name: {
    ...Type.headlineMd,
    color: Palette.primary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    ...Type.bodyMd,
    color: Palette.onSurfaceVariant,
    flexShrink: 1,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  stat: {
    flex: 1,
    gap: 4,
    padding: 16,
    borderRadius: Radius.xl,
    backgroundColor: Palette.sand,
  },
  statLabel: {
    ...Type.labelCaps,
    color: Palette.onSurfaceVariant,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    ...Type.headlineMd,
    color: Palette.primary,
  },
  tides: {
    gap: 12,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Palette.surfaceVariant,
  },
  tideRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  tideLabel: {
    ...Type.bodyMd,
    color: Palette.onSurfaceVariant,
  },
  tideValue: {
    ...Type.bodyMd,
    fontFamily: FontFamily.semiBold,
    color: Palette.primary,
  },
});
