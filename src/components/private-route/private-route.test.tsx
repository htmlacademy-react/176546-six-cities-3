import { Route, Routes } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { renderWrapper } from '@/test-utils/render';
import { makeAuthState } from '@/test-utils/mocks';
import { AppRoute, AuthorizationStatus } from '@/const';
import PrivateRoute from './private-route';

const SECRET_TEXT = 'Содержимое избранного';
const LOGIN_TEXT = 'Страница входа';

const renderFavoritesRoute = (authorizationStatus: AuthorizationStatus) =>
  renderWrapper(
    <Routes>
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute>
            <div>{SECRET_TEXT}</div>
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.Login} element={<div>{LOGIN_TEXT}</div>} />
    </Routes>,
    {
      initialState: { auth: makeAuthState(authorizationStatus) },
      route: AppRoute.Favorites,
    }
  );

describe('PrivateRoute', () => {
  it('показывает защищённый контент авторизованному пользователю', () => {
    renderFavoritesRoute(AuthorizationStatus.Auth);

    expect(screen.getByText(SECRET_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(LOGIN_TEXT)).not.toBeInTheDocument();
  });

  it('перенаправляет неавторизованного пользователя на страницу входа', () => {
    renderFavoritesRoute(AuthorizationStatus.NoAuth);

    expect(screen.getByText(LOGIN_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(SECRET_TEXT)).not.toBeInTheDocument();
  });

  it('ничего не рендерит, пока статус авторизации неизвестен', () => {
    const { container } = renderFavoritesRoute(AuthorizationStatus.Unknown);

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByText(SECRET_TEXT)).not.toBeInTheDocument();
    expect(screen.queryByText(LOGIN_TEXT)).not.toBeInTheDocument();
  });
});
