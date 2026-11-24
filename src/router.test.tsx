import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createRoutes } from '@/router';
import { withStore } from '@/utils/mock-component';
import { makeFakeStore } from '@/utils/mocks';
import { RequestStatus } from '@/store/types';
import { AuthorizationStatus } from '@/const';
import type { RootState } from '@/store';

const initialState = makeFakeStore();

const authState = (authorizationStatus: AuthorizationStatus) => ({
  ...initialState.auth,
  authorizationStatus,
});

const offersState = (offersStatus: RequestStatus) => ({
  ...initialState.offers,
  offersStatus,
});

const favoritesState = (favoritesStatus: RequestStatus) => ({
  ...initialState.favorites,
  favoritesStatus,
});

const renderAt = (path: string, state: Partial<RootState> = {}) => {
  const router = createMemoryRouter(createRoutes(), { initialEntries: [path] });
  const { withStoreComponent } = withStore(<RouterProvider router={router} />, state);

  return { router, ...render(withStoreComponent, { wrapper: HelmetProvider }) };
};

describe('маршрутизация', () => {
  it('открывает главную страницу по адресу /', async () => {
    renderAt('/', { offers: offersState(RequestStatus.Success) });

    expect(await screen.findByText('No places to stay available')).toBeInTheDocument();
  });

  it('открывает страницу входа по адресу /login', async () => {
    renderAt('/login');

    expect(await screen.findByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('перенаправляет неавторизованного пользователя с /favorites на /login', async () => {
    const { router } = renderAt('/favorites', { auth: authState(AuthorizationStatus.NoAuth) });

    expect(await screen.findByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/login');
  });

  it('показывает страницу избранного авторизованному пользователю', async () => {
    renderAt('/favorites', {
      auth: authState(AuthorizationStatus.Auth),
      favorites: favoritesState(RequestStatus.Success),
    });

    expect(await screen.findByText('Nothing yet saved.')).toBeInTheDocument();
  });

  it('не пускает в избранное, пока статус авторизации неизвестен', () => {
    const { router } = renderAt('/favorites', { auth: authState(AuthorizationStatus.Unknown) });

    expect(router.state.location.pathname).toBe('/favorites');
    expect(screen.queryByRole('button', { name: 'Sign in' })).not.toBeInTheDocument();
    expect(screen.queryByText('Nothing yet saved.')).not.toBeInTheDocument();
  });

  it('открывает страницу 404 по адресу /404', async () => {
    renderAt('/404');

    expect(await screen.findByText('Not Found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go home' })).toBeInTheDocument();
  });

  it('показывает страницу 404 на неизвестном адресе', async () => {
    renderAt('/no-such-page');

    expect(await screen.findByText('Not Found')).toBeInTheDocument();
  });
});
