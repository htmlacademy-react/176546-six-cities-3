import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/private-route';
import {
  AppRoute,
  AuthorizationStatus,
  FavoritesPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  OfferPage,
  Settings,
} from '@/const';

const withSuspense = (element: JSX.Element) => (
  <Suspense fallback={<div>Загрузка...</div>}>{element}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: AppRoute.Root,
    element: withSuspense(<MainPage cardCount={Settings.cardCount} />),
    errorElement: withSuspense(<NotFoundPage />),
  },
  {
    path: AppRoute.Login,
    element: withSuspense(<LoginPage />),
  },
  {
    path: AppRoute.Favorites,
    element: withSuspense(
      <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
        <FavoritesPage />
      </PrivateRoute>
    ),
  },
  {
    path: AppRoute.Offer,
    children: [
      { index: true, element: withSuspense(<OfferPage />) },
      { path: ':id', element: withSuspense(<OfferPage />) },
    ],
  },
  {
    path: '*',
    element: withSuspense(<NotFoundPage />),
  },
]);
