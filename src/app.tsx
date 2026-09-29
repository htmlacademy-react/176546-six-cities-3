import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainPage from '@/pages/main-page.tsx';
import LoginPage from '@/pages/login-page.tsx';
import FavoritesPage from '@/pages/favorites-page.tsx';
import OfferPage from '@/pages/offer-page.tsx';
import NotFoundPage from '@/pages/not-found-page.tsx';
import { AppRoute, AuthorizationStatus } from '@/const.ts';
import PrivateRoute from './components/private-route';

const Settings = {
  cardCount: 5,
} as const;

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<MainPage cardCount={Settings.cardCount} />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Offer}>
            <Route index element={<OfferPage />} />
            <Route path=":id" element={<OfferPage />} />
          </Route>
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
