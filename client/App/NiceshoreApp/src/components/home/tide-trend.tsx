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

export function TideChip({ trend }: { trend: TideTrend }) {
  const { label, icon, iconColor, background, textColor } = TIDE_TREND[trend];
  return (
    <View style={[styles.chip, { backgroundColor: background }, trend === 'steady' && styles.outlined]}>
      <Icon name={icon} size={14} strokeWidth={2.5} color={iconColor} />
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
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
  outlined: {
    borderWidth: 1,
    borderColor: Palette.outline,
  },
  label: {
    fontFamily: FontFamily.semiBold,
    fontSize: 13,
    lineHeight: 16,
  },
});
