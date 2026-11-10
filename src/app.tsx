import { useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Spinner from '@/components/spinner/spinner';
import { AuthorizationStatus } from '@/const';
import { useAppSelector } from '@/hooks';
import { getAuthorizationStatus } from '@/store/slices/auth';
import { createRoutes } from './router';
//

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const router = useMemo(() => createBrowserRouter(createRoutes()), []);

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
