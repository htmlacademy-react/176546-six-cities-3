import { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import PrivateRoute from './components/private-route';

import { AppRoute } from '@/const';

const MainPage = lazy(() => import('@/pages/main-page'));
const LoginPage = lazy(() => import('@/pages/login-page/login-page'));
const FavoritesPage = lazy(() => import('@/pages/favorites-page'));
const OfferPage = lazy(() => import('@/pages/offer-page'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page/not-found-page'));

const withSuspense = (element: JSX.Element) => (
  <Suspense fallback={<div>Загрузка...</div>}>{element}</Suspense>
);

export const createRoutes = () =>
  createRoutesFromElements(
    <>
      <Route
        path={AppRoute.Root}
        element={withSuspense(<MainPage />)}
        errorElement={withSuspense(<NotFoundPage />)}
      />
      <Route path={AppRoute.Login} element={withSuspense(<LoginPage />)} />
      <Route
        path={AppRoute.Favorites}
        element={withSuspense(
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        )}
      />
      <Route path={AppRoute.Offer} element={withSuspense(<OfferPage />)} />
      <Route path={AppRoute.NotFound} element={withSuspense(<NotFoundPage />)} />
      <Route path="*" element={withSuspense(<NotFoundPage />)} />
    </>
  );

export const router = createBrowserRouter(createRoutes());
