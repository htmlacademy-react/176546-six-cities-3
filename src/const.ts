import { lazy } from 'react';

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const MAX_RATING = 5;

export const DEFAULT_CITY = 'Amsterdam';

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

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

const MainPage = lazy(() => import('@/pages/main-page'));
const LoginPage = lazy(() => import('@/pages/login-page'));
const FavoritesPage = lazy(() => import('@/pages/favorites-page'));
const OfferPage = lazy(() => import('@/pages/offer-page'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page/not-found-page.tsx'));

export { MainPage, LoginPage, FavoritesPage, OfferPage, NotFoundPage };
