/**
 * Sample beach data from the Home screen design.
 * TODO: replace with data from the NiceShore server (nearby beaches + tides).
 */

export type TideTrend = 'rising' | 'falling' | 'slack';

export type Beach = {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  tideHeightM: number;
  tideTrend: TideTrend;
  image: string;
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
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDuhtECPyV-cj0gfrjbsqSOThXAsUYfWY817S3mha9lD6mkXkn9yp_ofG7Qr73ZTtYCHRsLlxZnE2kTTm__o0U8s6ZlOM86vByBS9bh6m2cJmvOvdTvy4WuHI5nGLg9ytMCTtWp4OSg8_uR08JyVI7AB1mX3_1xXVEI_el0o7hd7hg4hishcWf8taAxqqjE02A_bp5u7liYOu9q4uWb0aPdFGvQrXIrAgWseqNvWBcDxibmSgOTIwh2',
  },
  {
    id: 'warsheekh',
    name: 'Warsheekh Coast',
    location: 'Warsheekh, SO',
    distanceKm: 24,
    tideHeightM: 0.8,
    tideTrend: 'falling',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCdRIN9HXaOUOF-MbKZyurViO-vjumho5saJEqrGHZnvF_S8kEi9SF6EUcniYUGaY-YocLFWZh1TWKOsfIcTW5SulOUY_-8BGqxiKG63to7sYHY-U0gwKpyZedbRzpA704bkRIvmUOCrNkmH4UfkC9utG6YRThOZeBDS4yQHofea0v4S5sN9gurdaR3dGLrIXDz-0Rn3q71qeXaAHziYOOq04h68BRtccqei0gwRiSb_7jLLdhHFlGF',
  },
  {
    id: 'jazeera',
    name: 'Jazeera Beach',
    location: 'Mogadishu, SO',
    distanceKm: 15,
    tideHeightM: 2.1,
    tideTrend: 'slack',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBvTQn8VzTcmrOttRm8dMue6hhKEEStGvWUh94vuhLEVUvC4BvS74ncAOtyre1iaQM_8bXQjTvVwsRFdw4c1lne_vLRi56BFTuYbCqaJzbGu_-FGQX60ocsLP-KgpZPwXy6BVT9GHnnCQuZRUvUQcxxpAqmT9YuKX9wMbvY9wSbjCrHuuuOXHlJX5OqH6-wiVkjB9v6eFpOCB55tM3rVIPfIC2mIdzCuILP-TMDUObCsDum330AT2pu',
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
  nextHighTide: { time: '14:30', heightM: 2.4 },
  nextLowTide: { time: '08:15', heightM: 0.3 },
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAPS2ZNeS2y5qQSkJtxNUku6Ht6nSLc0nIAO0tM9m_r1Zfu4Evp2oyxWaiWOOowwiPUfaH63TbQwG67r6sSjAgCuUWO-5SRkkOgeAryOYeeQq1ryILu2m9hgIytPdFLjUGu_0aqKeEFxEdAV4OhPmXSFlmfqA0DnyshuL1AYoh5qjcAepitutC90wwNjbxMQ8mOvJqX5N82CQdOLbN5yG9Ms0VHsXTCheKmwaKuVnMmVy5kewAoyTKE',
};
