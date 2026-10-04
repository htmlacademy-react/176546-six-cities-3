import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoutes } from './router';
import type { Offer } from './mocks/offers';
import type { Review } from './mocks/reviews';
import type { City } from './mocks/cities';

type AppProps = {
  offers: Offer[];
  reviews: Review[];
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
