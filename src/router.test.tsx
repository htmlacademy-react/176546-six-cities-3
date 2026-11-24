import { screen } from '@testing-library/react';
import { AuthorizationStatus } from '@/const';
import { RequestStatus } from '@/store/types';
import { renderRoute } from '@/test-utils/render';
import { makeAuthState, makeFavoritesState, makeOffersState } from '@/utils/mocks';

describe('маршрутизация', () => {
  it('открывает главную страницу по адресу /', async () => {
    renderRoute('/', { offers: makeOffersState(RequestStatus.Success) });

    expect(await screen.findByText('No places to stay available')).toBeInTheDocument();
  });

  it('открывает страницу входа по адресу /login', async () => {
    renderRoute('/login');

    expect(await screen.findByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('перенаправляет неавторизованного пользователя с /favorites на /login', async () => {
    const { router } = renderRoute('/favorites', {
      auth: makeAuthState(AuthorizationStatus.NoAuth),
    });

    expect(await screen.findByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/login');
  });

  it('показывает страницу избранного авторизованному пользователю', async () => {
    renderRoute('/favorites', {
      auth: makeAuthState(AuthorizationStatus.Auth),
      favorites: makeFavoritesState(RequestStatus.Success),
    });

    expect(await screen.findByText('Nothing yet saved.')).toBeInTheDocument();
  });

  it('не пускает в избранное, пока статус авторизации неизвестен', () => {
    const { router } = renderRoute('/favorites', {
      auth: makeAuthState(AuthorizationStatus.Unknown),
    });

    expect(router.state.location.pathname).toBe('/favorites');
    expect(screen.queryByRole('button', { name: 'Sign in' })).not.toBeInTheDocument();
    expect(screen.queryByText('Nothing yet saved.')).not.toBeInTheDocument();
  });

  it('открывает страницу 404 по адресу /404', async () => {
    renderRoute('/404');

    expect(await screen.findByText('Not Found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go home' })).toBeInTheDocument();
  });

  it('показывает страницу 404 на неизвестном адресе', async () => {
    renderRoute('/no-such-page');

    expect(await screen.findByText('Not Found')).toBeInTheDocument();
  });
});
