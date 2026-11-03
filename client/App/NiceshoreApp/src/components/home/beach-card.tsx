import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatDistance, TIDE_TREND, TideChip } from '@/components/home/tide-trend';
import { Icon } from '@/components/ui/icon';
import { FontFamily, Palette, Radius, Shadow, Type } from '@/constants/design';
import type { Beach } from '@/data/beaches';

export const BEACH_CARD_WIDTH = 260;

type BeachCardProps = {
  beach: Beach;
  onPress?: () => void;
};

export function BeachCard({ beach, onPress }: BeachCardProps) {
  const distance = formatDistance(beach.distanceKm);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${beach.name}, ${beach.location}, ${distance}, tide ${beach.tideHeightM} metres, ${TIDE_TREND[beach.tideTrend].label}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image source={beach.image} style={styles.image} contentFit="cover" transition={250} />

      <View style={styles.body}>
        <View style={styles.heading}>
          <View style={styles.titleRow}>
            <Text style={styles.name} numberOfLines={1}>
              {beach.name}
            </Text>
            <Text style={styles.distance}>{distance}</Text>
          </View>

          <View style={styles.locationRow}>
            <Icon
              name="locationOn"
              size={16}
              color={Palette.primary}
              accent={Palette.secondaryContainer}
            />
            <Text style={styles.location} numberOfLines={1}>
              {beach.location}
            </Text>
          </View>
        </View>

        <View style={styles.tideRow}>
          <Text style={styles.tideHeight}>{beach.tideHeightM.toFixed(1)} m</Text>
          <TideChip trend={beach.tideTrend} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: BEACH_CARD_WIDTH,
    backgroundColor: Palette.surface,
    borderRadius: Radius.xxl,
    borderWidth: 1,
    borderColor: Palette.surfaceVariant,
    boxShadow: Shadow.card,
    overflow: 'hidden',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  image: {
    height: 140,
    backgroundColor: Palette.surfaceVariant,
  },
  body: {
    padding: 20,
    gap: 12,
  },
  heading: {
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 8,
  },
  name: {
    ...Type.cardTitle,
    color: Palette.primary,
    flexShrink: 1,
  },
  distance: {
    ...Type.bodySm,
    fontFamily: FontFamily.semiBold,
    color: Palette.onSurfaceVariant,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    ...Type.bodySm,
    color: Palette.onSurfaceVariant,
    flexShrink: 1,
  },
  tideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Palette.surfaceVariant,
  },
  tideHeight: {
    ...Type.bodyMd,
    fontFamily: FontFamily.bold,
    color: Palette.primary,
  },
});
