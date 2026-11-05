import type { TideExtreme } from '@/data/beaches';

export const MINUTES_PER_DAY = 24 * 60;

/** "09:25" -> 565 */
export function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

type Point = { minutes: number; heightM: number };

/**
 * Adds a mirrored extreme before the first and after the last one so the
 * curve can be drawn across the whole day.
 */
function padExtremes(extremes: TideExtreme[]): Point[] {
  const points = extremes.map((e) => ({ minutes: toMinutes(e.time), heightM: e.heightM }));
  if (points.length < 2) return points;
  const [first, second] = points;
  const [beforeLast, last] = points.slice(-2);
  return [
    { minutes: first.minutes - (second.minutes - first.minutes), heightM: second.heightM },
    ...points,
    { minutes: last.minutes + (last.minutes - beforeLast.minutes), heightM: beforeLast.heightM },
  ];
}

/** Tide height at a time of day, easing between highs and lows with a cosine. */
export function heightAt(extremes: TideExtreme[], minutes: number) {
  const points = padExtremes(extremes);
  const i = points.findIndex((p) => p.minutes >= minutes);
  if (i <= 0) return points[Math.max(i, 0)]?.heightM ?? 0;
  const a = points[i - 1];
  const b = points[i];
  const t = (minutes - a.minutes) / (b.minutes - a.minutes);
  return a.heightM + (b.heightM - a.heightM) * ((1 - Math.cos(Math.PI * t)) / 2);
}

/** The extremes on either side of `now`, and how far `now` is between them (0–1). */
export function tideProgress(extremes: TideExtreme[], now: string) {
  const minutes = toMinutes(now);
  const nextIndex = extremes.findIndex((e) => toMinutes(e.time) > minutes);
  const previous = nextIndex > 0 ? extremes[nextIndex - 1] : undefined;
  const next = nextIndex >= 0 ? extremes[nextIndex] : undefined;
  if (!previous || !next) return { previous, next, fraction: undefined };
  const start = toMinutes(previous.time);
  const fraction = (minutes - start) / (toMinutes(next.time) - start);
  return { previous, next, fraction };
}

/** The first high and low after `now`. */
export function nextExtremes(extremes: TideExtreme[], now: string) {
  const upcoming = extremes.filter((e) => toMinutes(e.time) > toMinutes(now));
  return {
    high: upcoming.find((e) => e.type === 'high'),
    low: upcoming.find((e) => e.type === 'low'),
  };
}
