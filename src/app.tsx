import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoutes } from './router';
import type { OfferDetails } from '@/types/offer.ts';
import type { OfferPreview } from '@/types/offer.ts';
import type { ReviewMock } from '@/mocks/reviews.ts';

type AppProps = {
  offers: OfferPreview[];
  offerDetails: OfferDetails[];
  reviews: ReviewMock[];
};

function App({ offers, offerDetails, reviews }: AppProps): JSX.Element {
  const router = createBrowserRouter(createRoutes({ offers, offerDetails, reviews }));

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
