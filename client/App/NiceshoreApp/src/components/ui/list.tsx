import { Children, Fragment, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon, type IconName } from '@/components/ui/icon';
import { Palette, Radius, Shadow, Type } from '@/constants/design';

/** Card that stacks list rows with dividers between them. */
export function ListGroup({ title, children }: { title?: string; children: ReactNode }) {
  const rows = Children.toArray(children);
  return (
    <View style={styles.section}>
      {title ? (
        <Text style={styles.sectionTitle} accessibilityRole="header">
          {title}
        </Text>
      ) : null}
      <View style={styles.group}>
        {rows.map((row, i) => (
          <Fragment key={i}>
            {i > 0 && <View style={styles.divider} />}
            {row}
          </Fragment>
        ))}
      </View>
    </View>
  );
}

type ListRowProps = {
  icon: IconName;
  title: string;
  subtitle?: string;
  /** Shows the icon in a round sandy tile (Settings) instead of bare (Profile). */
  tile?: boolean;
  /** Replaces the chevron, e.g. a count badge or a switch. */
  trailing?: ReactNode;
  /** Rows with a trailing control can leave this out. */
  onPress?: () => void;
};

export function ListRow({ icon, title, subtitle, tile = false, trailing, onPress }: ListRowProps) {
  const content = (
    <>
      {tile ? (
        <View style={styles.tile}>
          <Icon name={icon} size={20} color={Palette.primary} accent={Palette.secondaryContainer} />
        </View>
      ) : (
        <Icon name={icon} size={22} color={Palette.primary} accent={Palette.secondaryContainer} />
      )}
      <View style={styles.text}>
        <Text style={[styles.title, tile && styles.titleTall]}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {trailing}
      {onPress ? <Icon name="chevronRight" size={20} color={Palette.onSurfaceVariant} /> : null}
    </>
  );

  const rowStyle = [styles.row, tile && styles.rowTile, subtitle ? styles.rowTall : null];

  if (!onPress) return <View style={rowStyle}>{content}</View>;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={subtitle ? `${title}, ${subtitle}` : title}
      style={({ pressed }) => [rowStyle, pressed && styles.pressed]}>
      {content}
    </Pressable>
  );
}

/** Small tinted pill with a number, e.g. the saved-beach count. */
export function CountBadge({ count }: { count: number }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 8,
  },
  sectionTitle: {
    ...Type.labelCaps,
    color: Palette.onSurfaceVariant,
    paddingHorizontal: 4,
  },
  group: {
    borderRadius: Radius.xxl,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.surfaceVariant,
    boxShadow: Shadow.card,
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    backgroundColor: Palette.surfaceVariant,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    minHeight: 64,
    paddingHorizontal: 20,
  },
  rowTile: {
    paddingVertical: 12,
  },
  rowTall: {
    minHeight: 72,
  },
  pressed: {
    backgroundColor: Palette.sand,
  },
  tile: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Palette.sand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
  },
  title: {
    ...Type.button,
    color: Palette.primary,
  },
  titleTall: {
    lineHeight: 24,
  },
  subtitle: {
    ...Type.bodySm,
    color: Palette.onSurfaceVariant,
  },
  badge: {
    minWidth: 28,
    height: 24,
    paddingHorizontal: 8,
    borderRadius: Radius.full,
    backgroundColor: Palette.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    ...Type.labelCaps,
    fontSize: 13,
    letterSpacing: 0,
    color: Palette.primary,
  },
});
