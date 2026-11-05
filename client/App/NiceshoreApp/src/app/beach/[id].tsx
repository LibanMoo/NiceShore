import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { TideChart } from '@/components/beach/tide-chart';
import { TIDE_TREND, TideChip } from '@/components/home/tide-trend';
import { Icon, type IconName } from '@/components/ui/icon';
import { FontFamily, Palette, Radius, Shadow, Space, Type } from '@/constants/design';
import { MaxContentWidth } from '@/constants/theme';
import { useSavedBeaches } from '@/context/saved-beaches-context';
import { getBeach, type TideExtreme , TideTrend } from '@/data/beaches';
import { nextExtremes, tideProgress } from '@/utils/tides';

const HERO_HEIGHT = 260;

const TIDE_STATES: { trend: TideTrend; text: string }[] = [
  { trend: 'rising', text: 'water is coming in toward high tide.' },
  { trend: 'falling', text: 'water is going out toward low tide.' },
  { trend: 'steady', text: 'the short pause at high or low tide, also called slack water.' },
];

function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/');
}

function minutesAgo(minutes: number) {
  if (minutes < 1) return 'Updated just now';
  return `Updated ${minutes} minute${minutes === 1 ? '' : 's'} ago`;
}

export default function BeachDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { isSaved, toggleSaved } = useSavedBeaches();
  const beach = getBeach(id);

  if (!beach) {
    return (
      <View style={[styles.notFound, { paddingTop: insets.top + Space.gutter }]}>
        <StatusBar style="dark" />
        <Text style={styles.sectionTitle}>Beach not found</Text>
        <Text style={styles.body}>This beach may have been removed.</Text>
        <Pressable onPress={goBack} accessibilityRole="button" style={styles.notFoundButton}>
          <Text style={styles.notFoundButtonText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const { details } = beach;
  const { extremes, now, updatedMinutesAgo } = details.tides;
  const progress = tideProgress(extremes, now);
  const next = nextExtremes(extremes, now);
  const saved = isSaved(beach.id);
  const percent = Math.round((progress.fraction ?? 0) * 100);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 48 }}>
        {/* Hero */}
        <View style={[styles.hero, { height: HERO_HEIGHT + insets.top }]}>
          <Image source={beach.image} style={StyleSheet.absoluteFill} contentFit="cover" />
          <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" aria-hidden>
            <Defs>
              <LinearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0.35" stopColor="#001e40" stopOpacity={0} />
                <Stop offset="1" stopColor="#001e40" stopOpacity={0.88} />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#shade)" />
          </Svg>

          <View style={[styles.heroActions, { top: insets.top + 12 }]}>
            <Pressable
              onPress={goBack}
              accessibilityRole="button"
              accessibilityLabel="Back"
              style={({ pressed }) => [styles.roundButton, pressed && styles.roundPressed]}>
              <Icon name="arrowBack" size={22} color={Palette.primary} />
            </Pressable>
            <Pressable
              onPress={() => toggleSaved(beach.id)}
              accessibilityRole="button"
              accessibilityLabel={saved ? `Remove ${beach.name} from saved` : `Save ${beach.name}`}
              accessibilityState={{ selected: saved }}
              style={({ pressed }) => [styles.roundButton, pressed && styles.roundPressed]}>
              <Icon name={saved ? 'bookmarkFilled' : 'bookmark'} size={20} color={Palette.primary} />
            </Pressable>
          </View>

          <View style={styles.heroText}>
            <Text style={styles.heroTitle} accessibilityRole="header">
              {beach.name}
            </Text>
            <View style={styles.row}>
              <Icon
                name="locationOn"
                size={18}
                color={Palette.onPrimary}
                accent={Palette.secondaryContainer}
              />
              <Text style={styles.heroLocation}>{details.fullLocation}</Text>
            </View>
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.column}>
            {/* Current tide */}
            <Card>
              <View style={styles.nowHeader}>
                <View style={styles.nowValue}>
                  <Text style={styles.label}>Current tide</Text>
                  <Text style={styles.bigValue}>{beach.tideHeightM.toFixed(1)} m</Text>
                </View>
                <TideChip trend={beach.tideTrend} size="md" />
              </View>

              {progress.previous && progress.next ? (
                <View style={styles.progressGroup}>
                  <View
                    style={styles.track}
                    accessibilityRole="progressbar"
                    accessibilityLabel={`Progress from ${progress.previous.type} tide to ${progress.next.type} tide`}
                    accessibilityValue={{ min: 0, max: 100, now: percent }}>
                    <View style={[styles.fill, { width: `${percent}%` }]} />
                  </View>
                  <View style={styles.spread}>
                    <Text style={styles.small}>{extremeLabel(progress.previous)}</Text>
                    <Text style={styles.small}>{extremeLabel(progress.next)}</Text>
                  </View>
                </View>
              ) : null}

              <Text style={styles.small}>{minutesAgo(updatedMinutesAgo)}</Text>
            </Card>

            {/* Today's tides */}
            <Card>
              <Text style={styles.sectionTitle} accessibilityRole="header">
                Today’s tides
              </Text>
              <TideChart extremes={extremes} now={now} nowHeightM={beach.tideHeightM} />
              <View style={styles.extremes}>
                {extremes.map((e) => {
                  const high = e.type === 'high';
                  return (
                    <View
                      key={`${e.type}-${e.time}`}
                      style={[styles.extreme, high && styles.extremeHigh]}>
                      <Text style={[styles.label, high && styles.onTint]}>{high ? 'High' : 'Low'}</Text>
                      <Text style={styles.extremeHeight}>{e.heightM.toFixed(1)} m</Text>
                      <Text style={[styles.small, high && styles.onTint]}>{e.time}</Text>
                    </View>
                  );
                })}
              </View>
            </Card>

            {/* Next high / low */}
            <View style={styles.nextRow}>
              {next.high ? <NextTide icon="arrowUp" iconColor={Palette.secondary} title="Next high" tide={next.high} /> : null}
              {next.low ? <NextTide icon="arrowDown" iconColor={Palette.primary} title="Next low" tide={next.low} /> : null}
            </View>

            {/* About */}
            {details.description ? (
              <Card>
                <Text style={styles.sectionTitle} accessibilityRole="header">
                  About {beach.name}
                </Text>
                <Text style={styles.body}>{details.description}</Text>
                {details.coordinates ? (
                  <View style={styles.coordinates}>
                    <Icon
                      name="locationOn"
                      size={18}
                      color={Palette.primary}
                      accent={Palette.secondaryContainer}
                    />
                    <Text style={styles.coordinatesText}>{details.coordinates}</Text>
                  </View>
                ) : null}
              </Card>
            ) : null}

            {/* Tide states explainer */}
            <View style={styles.learn}>
              <View style={styles.row}>
                <Icon name="info" size={22} color={Palette.primary} accent={Palette.secondaryContainer} />
                <Text style={styles.learnTitle} accessibilityRole="header">
                  What do tide states mean?
                </Text>
              </View>
              {TIDE_STATES.map(({ trend, text }) => {
                const state = TIDE_TREND[trend];
                return (
                  <View key={trend} style={styles.learnRow}>
                    <View
                      style={[
                        styles.learnIcon,
                        { backgroundColor: state.background },
                        trend === 'steady' && styles.learnIconOutlined,
                      ]}>
                      <Icon name={state.icon} size={16} strokeWidth={2.5} color={state.iconColor} />
                    </View>
                    <Text style={styles.learnText}>
                      <Text style={styles.strong}>{state.label}</Text> — {text}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function extremeLabel(e: TideExtreme) {
  return `${e.type === 'high' ? 'High' : 'Low'} · ${e.time}`;
}

function Card({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

function NextTide({
  icon,
  iconColor,
  title,
  tide,
}: {
  icon: IconName;
  iconColor: string;
  title: string;
  tide: TideExtreme;
}) {
  return (
    <View style={styles.nextCard}>
      <View style={styles.nextTitle}>
        <Icon name={icon} size={18} color={iconColor} />
        <Text style={styles.label}>{title}</Text>
      </View>
      <View>
        <Text style={styles.sectionTitle}>{tide.heightM.toFixed(1)} m</Text>
        <Text style={styles.small}>at {tide.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  hero: {
    borderBottomLeftRadius: Radius.xxl,
    borderBottomRightRadius: Radius.xxl,
    overflow: 'hidden',
    backgroundColor: Palette.primary,
  },
  heroActions: {
    position: 'absolute',
    left: Space.marginMobile,
    right: Space.marginMobile,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roundButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundPressed: {
    backgroundColor: Palette.surface,
  },
  heroText: {
    position: 'absolute',
    left: Space.marginMobile,
    right: Space.marginMobile,
    bottom: Space.gutter,
    gap: 4,
  },
  heroTitle: {
    ...Type.headlineLg,
    color: Palette.onPrimary,
  },
  heroLocation: {
    ...Type.bodyMd,
    color: Palette.onPrimary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  main: {
    alignItems: 'center',
    paddingTop: Space.gutter,
    paddingHorizontal: Space.marginMobile,
  },
  column: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Space.gutter,
  },
  card: {
    gap: Space.stackMd,
    padding: Space.stackLg,
    borderRadius: Radius.xxl,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.surfaceVariant,
    boxShadow: Shadow.card,
  },
  nowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  nowValue: {
    gap: 4,
  },
  label: {
    ...Type.labelCaps,
    color: Palette.onSurfaceVariant,
  },
  bigValue: {
    fontFamily: FontFamily.bold,
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -0.96,
    color: Palette.primary,
  },
  progressGroup: {
    gap: Space.stackSm,
  },
  track: {
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: Palette.surfaceVariant,
    overflow: 'hidden',
  },
  fill: {
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: Palette.secondaryContainer,
  },
  spread: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  small: {
    ...Type.bodySm,
    color: Palette.onSurfaceVariant,
  },
  body: {
    ...Type.bodyMd,
    color: Palette.onSurfaceVariant,
  },
  sectionTitle: {
    ...Type.headlineMd,
    color: Palette.primary,
  },
  extremes: {
    flexDirection: 'row',
    gap: Space.stackSm,
  },
  extreme: {
    flex: 1,
    gap: 2,
    padding: 12,
    borderRadius: Radius.lg,
    backgroundColor: Palette.sand,
  },
  extremeHigh: {
    backgroundColor: Palette.primaryFixed,
  },
  extremeHeight: {
    ...Type.bodyMd,
    fontFamily: FontFamily.bold,
    color: Palette.primary,
  },
  onTint: {
    color: Palette.primary,
  },
  nextRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nextCard: {
    flex: 1,
    gap: 12,
    padding: 20,
    borderRadius: Radius.xl,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.surfaceVariant,
  },
  nextTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  coordinates: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.stackSm,
    paddingVertical: 12,
    paddingHorizontal: Space.stackMd,
    borderRadius: Radius.lg,
    backgroundColor: Palette.sand,
  },
  coordinatesText: {
    ...Type.bodySm,
    fontFamily: FontFamily.semiBold,
    color: Palette.primary,
  },
  learn: {
    gap: 20,
    padding: Space.stackLg,
    borderRadius: Radius.xxl,
    backgroundColor: Palette.sand,
  },
  learnTitle: {
    ...Type.cardTitle,
    color: Palette.primary,
    flexShrink: 1,
  },
  learnRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  learnIcon: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  learnIconOutlined: {
    borderWidth: 1,
    borderColor: Palette.outline,
  },
  learnText: {
    ...Type.bodyMd,
    color: Palette.onSurfaceVariant,
    flex: 1,
  },
  strong: {
    fontFamily: FontFamily.bold,
    color: Palette.primary,
  },
  notFound: {
    flex: 1,
    gap: Space.stackSm,
    paddingHorizontal: Space.marginMobile,
    backgroundColor: Palette.background,
  },
  notFoundButton: {
    alignSelf: 'flex-start',
    marginTop: Space.stackMd,
    height: 52,
    paddingHorizontal: Space.gutter,
    justifyContent: 'center',
    borderRadius: Radius.lg,
    backgroundColor: Palette.primary,
  },
  notFoundButtonText: {
    ...Type.button,
    color: Palette.onPrimary,
  },
});
