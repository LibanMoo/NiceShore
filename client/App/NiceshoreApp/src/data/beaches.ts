/**
 * Sample beach data from the Home screen design.
 * TODO: replace with data from the NiceShore server (nearby beaches + tides).
 */

export type TideTrend = 'rising' | 'falling' | 'steady';

export type Beach = {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  tideHeightM: number;
  tideTrend: TideTrend;
  /** Result of `require()` on a bundled image. */
  image: number;
};

export type FeaturedBeach = Beach & {
  waterTempC: number;
  nextHighTide: { time: string; heightM: number };
  nextLowTide: { time: string; heightM: number };
};

export const nearbyBeaches: Beach[] = [
  {
    id: 'liido',
    name: 'Liido Beach',
    location: 'Mogadishu, SO',
    distanceKm: 1.2,
    tideHeightM: 1.2,
    tideTrend: 'rising',
    image: require('@/assets/images/beaches/liido.jpg'),
  },
  {
    id: 'jazeera',
    name: 'Jazeera Beach',
    location: 'Mogadishu, SO',
    distanceKm: 15,
    tideHeightM: 1.1,
    tideTrend: 'rising',
    image: require('@/assets/images/beaches/jazeera.jpg'),
  },
  {
    id: 'warsheekh',
    name: 'Warsheekh Coast',
    location: 'Warsheekh, SO',
    distanceKm: 24,
    tideHeightM: 1.3,
    tideTrend: 'rising',
    image: require('@/assets/images/beaches/warsheekh.jpg'),
  },
];

export const featuredBeach: FeaturedBeach = {
  id: 'hobyo',
  name: 'Hobyo Shores',
  location: 'Hobyo, Mudug, SO',
  distanceKm: 480,
  tideHeightM: 1.5,
  tideTrend: 'rising',
  waterTempC: 26,
  nextHighTide: { time: '12:50', heightM: 2.3 },
  nextLowTide: { time: '19:05', heightM: 0.4 },
  image: require('@/assets/images/beaches/hobyo.jpg'),
};

export type TideExtreme = { type: 'high' | 'low'; time: string; heightM: number };

export type BeachDetails = {
  /** Location spelled out for the details screen, e.g. "Mogadishu, Somalia". */
  fullLocation: string;
  description?: string;
  coordinates?: string;
  tides: {
    /** Time of the latest reading ("HH:MM"); `tideHeightM` is the height then. */
    now: string;
    updatedMinutesAgo: number;
    /** Today's highs and lows in time order. */
    extremes: TideExtreme[];
  };
};

/**
 * Sample tide tables for the Beach details screen. Only Liido's come from the
 * design; the others are placeholders until the server provides real tides.
 */
const beachDetails: Record<string, BeachDetails> = {
  liido: {
    fullLocation: 'Mogadishu, Somalia',
    description:
      'A well-known stretch of soft white sand on Mogadishu’s coast, with a lively local atmosphere and wide views over the Indian Ocean.',
    coordinates: '2.0392° N, 45.3400° E',
    tides: {
      now: '09:25',
      updatedMinutesAgo: 10,
      extremes: [
        { type: 'low', time: '06:20', heightM: 0.4 },
        { type: 'high', time: '12:35', heightM: 2.1 },
        { type: 'low', time: '18:50', heightM: 0.5 },
      ],
    },
  },
  jazeera: {
    fullLocation: 'Mogadishu, Somalia',
    tides: {
      now: '09:25',
      updatedMinutesAgo: 10,
      extremes: [
        { type: 'low', time: '06:05', heightM: 0.3 },
        { type: 'high', time: '12:20', heightM: 2.0 },
        { type: 'low', time: '18:35', heightM: 0.4 },
      ],
    },
  },
  warsheekh: {
    fullLocation: 'Warsheekh, Somalia',
    tides: {
      now: '09:25',
      updatedMinutesAgo: 10,
      extremes: [
        { type: 'low', time: '05:50', heightM: 0.4 },
        { type: 'high', time: '12:05', heightM: 2.2 },
        { type: 'low', time: '18:20', heightM: 0.5 },
      ],
    },
  },
  hobyo: {
    fullLocation: 'Hobyo, Mudug, Somalia',
    tides: {
      now: '09:25',
      updatedMinutesAgo: 10,
      extremes: [
        { type: 'low', time: '06:35', heightM: 0.3 },
        { type: 'high', time: '12:50', heightM: 2.3 },
        { type: 'low', time: '19:05', heightM: 0.4 },
      ],
    },
  },
};

export function getBeach(id: string): (Beach & { details: BeachDetails }) | undefined {
  const beach = [...nearbyBeaches, featuredBeach].find((b) => b.id === id);
  const details = beachDetails[id];
  return beach && details ? { ...beach, details } : undefined;
}
