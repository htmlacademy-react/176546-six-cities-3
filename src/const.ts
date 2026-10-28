import type { City } from '@/types/city';

export const MAX_RATING = 5;

export const SORT_OPTIONS = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
] as const;

export type SortType = (typeof SORT_OPTIONS)[number];

export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Root = '/',
  Offer = '/offer/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const MARKER_WIDTH = 27;

export const MARKER_HEIGHT = 39;

export const CITIES = [
  {
    name: 'Paris',
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
  },
  {
    name: 'Cologne',
    location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 },
  },
  {
    name: 'Brussels',
    location: { latitude: 50.846557, longitude: 4.351697, zoom: 13 },
  },
  {
    name: 'Amsterdam',
    location: { latitude: 52.37454, longitude: 4.897976, zoom: 13 },
  },
  {
    name: 'Hamburg',
    location: { latitude: 53.550341, longitude: 10.000654, zoom: 13 },
  },
  {
    name: 'Dusseldorf',
    location: { latitude: 51.225402, longitude: 6.776314, zoom: 13 },
  },
] as const satisfies readonly City[];
