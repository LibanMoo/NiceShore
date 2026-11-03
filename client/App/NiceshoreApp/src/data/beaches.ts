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
