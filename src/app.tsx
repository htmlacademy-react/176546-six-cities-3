import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoutes } from './router';
import type { OfferMaximum } from '@/types/offer.ts';
import type { ReviewMock } from '@/mocks/reviews.ts';
import type { City } from '@/types/city.ts';

type AppProps = {
  offers: OfferMaximum[];
  reviews: ReviewMock[];
  cities: City[];
};

function App({ offers, reviews, cities }: AppProps): JSX.Element {
  const router = createBrowserRouter(createRoutes({ offers, reviews, cities }));

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
