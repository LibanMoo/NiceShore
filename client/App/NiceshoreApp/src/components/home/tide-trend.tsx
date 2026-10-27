import type { IconName } from '@/components/ui/icon';
import { Palette } from '@/constants/design';
import type { TideTrend } from '@/data/beaches';

export const TIDE_TREND: Record<TideTrend, { label: string; icon: IconName; color: string }> = {
  rising: { label: 'Tide Rising', icon: 'trendingUp', color: Palette.secondary },
  falling: { label: 'Tide Falling', icon: 'trendingDown', color: Palette.primary },
  slack: { label: 'Slack Tide', icon: 'slack', color: Palette.outline },
};

/** "14:30" -> "2:30 PM" */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

export function formatDistance(km: number) {
  return km < 10 ? `${km.toFixed(1)} km away` : `${Math.round(km)} km away`;
}
