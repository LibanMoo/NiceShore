import { StyleSheet, Text, View } from 'react-native';

import { Icon, type IconName } from '@/components/ui/icon';
import { FontFamily, Palette, Radius } from '@/constants/design';
import type { TideTrend } from '@/data/beaches';

export const TIDE_TREND: Record<
  TideTrend,
  { label: string; icon: IconName; iconColor: string; background: string; textColor: string }
> = {
  rising: {
    label: 'Rising',
    icon: 'arrowUp',
    iconColor: Palette.secondary,
    background: Palette.primaryFixed,
    textColor: Palette.primary,
  },
  falling: {
    label: 'Falling',
    icon: 'arrowDown',
    iconColor: Palette.primary,
    background: Palette.surfaceVariant,
    textColor: Palette.primary,
  },
  steady: {
    label: 'Steady',
    icon: 'dash',
    iconColor: Palette.onSurfaceVariant,
    background: Palette.surface,
    textColor: Palette.onSurfaceVariant,
  },
};

export function TideChip({ trend, size = 'sm' }: { trend: TideTrend; size?: 'sm' | 'md' }) {
  const { label, icon, iconColor, background, textColor } = TIDE_TREND[trend];
  const md = size === 'md';
  return (
    <View
      style={[
        styles.chip,
        md && styles.chipMd,
        { backgroundColor: background },
        trend === 'steady' && styles.outlined,
      ]}>
      <Icon name={icon} size={md ? 16 : 14} strokeWidth={2.5} color={iconColor} />
      <Text style={[styles.label, md && styles.labelMd, { color: textColor }]}>{label}</Text>
    </View>
  );
}

export function formatDistance(km: number) {
  return km < 10 ? `${km.toFixed(1)} km` : `${Math.round(km)} km`;
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 28,
    paddingHorizontal: 10,
    borderRadius: Radius.full,
  },
  chipMd: {
    gap: 6,
    height: 32,
    paddingHorizontal: 12,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Palette.outline,
  },
  label: {
    fontFamily: FontFamily.semiBold,
    fontSize: 13,
    lineHeight: 16,
  },
  labelMd: {
    fontSize: 14,
    lineHeight: 20,
  },
});
