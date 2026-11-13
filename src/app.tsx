import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import Spinner from '@/components/spinner/spinner';
import { AuthorizationStatus } from '@/const';
import { useAppSelector } from '@/hooks';
import { useFavoritesBootstrap } from '@/hooks/use-favorites-bootstrap';
import { getAuthorizationStatus } from '@/store/slices/auth';
import { router } from './router';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useFavoritesBootstrap();

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
