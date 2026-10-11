import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoutes } from './router';
import type { Offer } from '@/types/offer.ts';
import type { OfferPreview } from '@/types/offer.ts';
import type { ReviewMock } from '@/mocks/reviews.ts';
import type { City } from '@/types/city.ts';

type AppProps = {
  offers: OfferPreview[];
  offerDetail: Offer;
  reviews: ReviewMock[];
  cities: City[];
};

function App({ offers, offerDetail, reviews, cities }: AppProps): JSX.Element {
  const router = createBrowserRouter(createRoutes({ offers, offerDetail, reviews, cities }));

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
