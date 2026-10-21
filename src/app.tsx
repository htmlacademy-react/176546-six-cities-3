import { useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoutes } from './router';
import type { OfferDetails } from '@/types/offer.ts';
import type { OfferPreview } from '@/types/offer.ts';
import type { ReviewMock } from '@/mocks/reviews.ts';
import type { City } from '@/types/city.ts';

type AppProps = {
  offers: OfferPreview[];
  offerDetails: OfferDetails[];
  reviews: ReviewMock[];
  cities: City[];
};

function App({ offers, offerDetails, reviews, cities }: AppProps): JSX.Element {
  const router = useMemo(
    () => createBrowserRouter(createRoutes({ offers, offerDetails, reviews, cities })),
    [offers, offerDetails, reviews, cities]
  );

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
