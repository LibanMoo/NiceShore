import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Path, Text as SvgText } from 'react-native-svg';

import { FontFamily, Palette } from '@/constants/design';
import type { TideExtreme } from '@/data/beaches';
import { heightAt, MINUTES_PER_DAY, toMinutes } from '@/utils/tides';

const HEIGHT = 164;
const BASELINE = 140;
/** Highest and lowest tide of the day sit on these lines. */
const PLOT_TOP = 44;
const PLOT_BOTTOM = 116;
const STEP_MINUTES = 30;
const HOUR_LABELS = ['00:00', '06:00', '12:00', '18:00', '24:00'];

type TideChartProps = {
  extremes: TideExtreme[];
  /** Time of the current reading, "HH:MM". */
  now: string;
  nowHeightM: number;
};

/** Today's tide curve with highs, lows and a "now" marker. */
export function TideChart({ extremes, now, nowHeightM }: TideChartProps) {
  const [width, setWidth] = useState(0);

  const heights = extremes.map((e) => e.heightM);
  const min = Math.min(...heights);
  const max = Math.max(...heights);
  const x = (minutes: number) => (minutes / MINUTES_PER_DAY) * width;
  const y = (heightM: number) =>
    PLOT_BOTTOM - ((heightM - min) / (max - min || 1)) * (PLOT_BOTTOM - PLOT_TOP);

  const points: string[] = [];
  for (let m = 0; m <= MINUTES_PER_DAY; m += STEP_MINUTES) {
    points.push(`${x(m).toFixed(1)},${y(heightAt(extremes, m)).toFixed(1)}`);
  }
  const line = `M${points.join(' L')}`;
  const area = `${line} L${width},${BASELINE} L0,${BASELINE} Z`;

  const nowMinutes = toMinutes(now);
  const nowX = x(nowMinutes);

  const label = [
    'Tide height today:',
    ...extremes.map((e) => `${e.type} ${e.heightM} m at ${e.time}`),
    `Now ${nowHeightM} m at ${now}.`,
  ].join(' ');

  return (
    <View
      style={styles.wrap}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      accessible
      accessibilityRole="image"
      accessibilityLabel={label}>
      {width > 0 && (
        <Svg width={width} height={HEIGHT}>
          <Path d={area} fill={Palette.primaryFixed} />
          <Path d={line} fill="none" stroke={Palette.primary} strokeWidth={2} strokeLinejoin="round" />
          <Line x1={0} y1={BASELINE} x2={width} y2={BASELINE} stroke={Palette.surfaceVariant} />

          <Line
            x1={nowX}
            y1={18}
            x2={nowX}
            y2={BASELINE}
            stroke={Palette.secondary}
            strokeWidth={1.5}
            strokeDasharray="3 3"
          />
          <SvgText
            x={nowX}
            y={14}
            textAnchor="middle"
            fontSize={11}
            fontFamily={FontFamily.bold}
            fill={Palette.secondary}>
            NOW
          </SvgText>

          {extremes.map((e) => (
            <Circle
              key={`${e.type}-${e.time}`}
              cx={x(toMinutes(e.time))}
              cy={y(e.heightM)}
              r={4}
              fill={Palette.primary}
            />
          ))}
          <Circle
            cx={nowX}
            cy={y(heightAt(extremes, nowMinutes))}
            r={6}
            fill={Palette.secondaryContainer}
            stroke={Palette.surface}
            strokeWidth={2.5}
          />

          {HOUR_LABELS.map((text, i) => {
            const last = i === HOUR_LABELS.length - 1;
            return (
              <SvgText
                key={text}
                x={i === 0 ? 2 : last ? width - 2 : (width * i) / (HOUR_LABELS.length - 1)}
                y={158}
                textAnchor={i === 0 ? 'start' : last ? 'end' : 'middle'}
                fontSize={11}
                fontFamily={FontFamily.regular}
                fill={Palette.onSurfaceVariant}>
                {text}
              </SvgText>
            );
          })}
        </Svg>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: HEIGHT,
  },
});
