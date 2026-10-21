import { lazy, Suspense } from 'react';
import { createRoutesFromElements, Route } from 'react-router-dom';
import PrivateRoute from './components/private-route';

import { AppRoute, AuthorizationStatus } from '@/const';

import type { OfferDetails } from '@/types/offer.ts';
import type { OfferPreview } from '@/types/offer.ts';
import type { ReviewMock } from '@/mocks/reviews.ts';
import type { City } from '@/types/city.ts';

type RoutesData = {
  offers: OfferPreview[];
  offerDetails: OfferDetails[];
  reviews: ReviewMock[];
  cities: City[];
};

const withSuspense = (element: JSX.Element) => (
  <Suspense fallback={<div>Загрузка...</div>}>{element}</Suspense>
);

export const createRoutes = ({ offers, offerDetails, reviews, cities }: RoutesData) => {
  const MainPage = lazy(() => import('@/pages/main-page'));
  const LoginPage = lazy(() => import('@/pages/login-page'));
  const FavoritesPage = lazy(() => import('@/pages/favorites-page'));
  const OfferPage = lazy(() => import('@/pages/offer-page'));
  const NotFoundPage = lazy(() => import('@/pages/not-found-page/not-found-page.tsx'));

  return createRoutesFromElements(
    <>
      <Route
        path={AppRoute.Root}
        element={withSuspense(<MainPage offers={offers} cities={cities} />)}
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
};
