import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatDistance, TIDE_TREND } from '@/components/home/tide-trend';
import { Icon } from '@/components/ui/icon';
import { FontFamily, Palette, Shadow, Space, Type } from '@/constants/design';
import type { Beach } from '@/data/beaches';

export const BEACH_CARD_WIDTH = 280;

type BeachCardProps = {
  beach: Beach;
  onPress?: () => void;
};

export function BeachCard({ beach, onPress }: BeachCardProps) {
  const trend = TIDE_TREND[beach.tideTrend];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${beach.name}, ${beach.location}, ${formatDistance(beach.distanceKm)}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: beach.image }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={250}
          placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
        />
        <View style={styles.tideBadge}>
          <Icon name="waterDrop" size={14} color={Palette.primary} />
          <Text style={styles.tideBadgeText}>{beach.tideHeightM.toFixed(1)} m</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>
            {beach.name}
          </Text>
          <Text style={styles.distance}>{formatDistance(beach.distanceKm)}</Text>
        </View>

        <View style={styles.locationRow}>
          <Icon name="locationOn" size={16} color={Palette.onSurfaceVariant} />
          <Text style={styles.location} numberOfLines={1}>
            {beach.location}
          </Text>
        </View>

        <View style={styles.trendRow}>
          <Icon name={trend.icon} size={18} color={trend.color} />
          <Text style={[styles.trendText, { color: trend.color }]}>{trend.label}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: BEACH_CARD_WIDTH,
    backgroundColor: Palette.surface,
    borderRadius: 24,
    boxShadow: Shadow.card,
    overflow: 'hidden',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  imageWrap: {
    height: 160,
    backgroundColor: Palette.surfaceContainer,
  },
  tideBadge: {
    position: 'absolute',
    top: Space.stackMd,
    right: Space.stackMd,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(249, 249, 254, 0.85)',
  },
  tideBadgeText: {
    ...Type.labelCaps,
    textTransform: 'none',
    color: Palette.primary,
  },
  body: {
    padding: Space.stackMd,
    gap: Space.stackSm,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Space.stackSm,
  },
  name: {
    ...Type.button,
    color: Palette.primary,
    flexShrink: 1,
  },
  distance: {
    ...Type.labelCaps,
    textTransform: 'none',
    color: Palette.secondary,
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: Palette.onSurfaceVariant,
    flexShrink: 1,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.stackSm,
    paddingTop: Space.stackSm,
    borderTopWidth: 1,
    borderTopColor: Palette.surfaceVariant,
  },
  trendText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
  },
});
