import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoutes } from './router';
import type { OfferDetails } from '@/types/offer';
import type { ReviewMock } from '@/mocks/reviews';

type AppProps = {
  offerDetails: OfferDetails[];
  reviews: ReviewMock[];
};

function App({ offerDetails, reviews }: AppProps): JSX.Element {
  const router = createBrowserRouter(createRoutes({ offerDetails, reviews }));

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
