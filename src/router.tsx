import { Suspense } from 'react';
import { createRoutesFromElements, Route } from 'react-router-dom';
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

import type { Offer } from '@/mocks/offers';
import type { Review } from '@/mocks/reviews';
import type { City } from '@/mocks/cities';

type RoutesData = {
  offers: Offer[];
  reviews: Review[];
  cities: City[];
};

const withSuspense = (element: JSX.Element) => (
  <Suspense fallback={<div>Загрузка...</div>}>{element}</Suspense>
);

export const createRoutes = ({ offers, reviews, cities }: RoutesData) =>
  createRoutesFromElements(
    <>
      <Route
        path={AppRoute.Root}
        element={withSuspense(
          <MainPage cardCount={Settings.cardCount} offers={offers} cities={cities} />
        )}
        errorElement={withSuspense(<NotFoundPage />)}
      />
      <Route path={AppRoute.Login} element={withSuspense(<LoginPage />)} />
      <Route
        path={AppRoute.Favorites}
        element={withSuspense(
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <FavoritesPage />
          </PrivateRoute>
        )}
      />
      <Route
        path={AppRoute.Offer}
        element={withSuspense(<OfferPage offers={offers} reviews={reviews} />)}
      />
      <Route path="*" element={withSuspense(<NotFoundPage />)} />
    </>
  );
