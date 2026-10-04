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

export const Settings = {
  cardCount: 5,
} as const;

const MainPage = lazy(() => import('@/pages/main-page'));
const LoginPage = lazy(() => import('@/pages/login-page'));
const FavoritesPage = lazy(() => import('@/pages/favorites-page'));
const OfferPage = lazy(() => import('@/pages/offer-page'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page/not-found-page.tsx'));

export { MainPage, LoginPage, FavoritesPage, OfferPage, NotFoundPage };
