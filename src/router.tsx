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
} from '@/const';

import type { OfferDetails } from '@/types/offer';
import type { OfferPreview } from '@/types/offer';
import type { ReviewMock } from '@/mocks/reviews';

type RoutesData = {
  offers: OfferPreview[];
  offerDetails: OfferDetails[];
  reviews: ReviewMock[];
};

const withSuspense = (element: JSX.Element) => (
  <Suspense fallback={<div>Загрузка...</div>}>{element}</Suspense>
);

export const createRoutes = ({ offers, offerDetails, reviews }: RoutesData) =>
  createRoutesFromElements(
    <>
      <Route
        path={AppRoute.Root}
        element={withSuspense(<MainPage offers={offers} />)}
        errorElement={withSuspense(<NotFoundPage />)}
      />
      <Route path={AppRoute.Login} element={withSuspense(<LoginPage />)} />
      <Route
        path={AppRoute.Favorites}
        element={withSuspense(
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <FavoritesPage offers={offers} />
          </PrivateRoute>
        )}
      />
      <Route
        path={AppRoute.Offer}
        element={withSuspense(
          <OfferPage offers={offers} offerDetails={offerDetails} reviews={reviews} />
        )}
      />
      <Route path="*" element={withSuspense(<NotFoundPage />)} />
    </>
  );
