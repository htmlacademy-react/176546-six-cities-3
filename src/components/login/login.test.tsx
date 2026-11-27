import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApiRoute, AuthorizationStatus } from '@/const';
import { renderWrapper } from '@/test-utils/render';
import { makeAuthState, makeFakeAuthInfo } from '@/test-utils/mocks';
import Login from './login';

const EMAIL = 'user@example.com';

const fillAndSubmit = async (password: string) => {
  await userEvent.type(screen.getByLabelText('E-mail'), EMAIL);
  await userEvent.type(screen.getByLabelText('Password'), password);
  await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
};

const renderLogin = () =>
  renderWrapper(<Login />, {
    initialState: { auth: makeAuthState(AuthorizationStatus.NoAuth) },
    route: '/login',
  });

describe('Login', () => {
  it('не отправляет запрос, если в пароле нет цифры', async () => {
    const { mockAxiosAdapter } = renderLogin();

    await fillAndSubmit('password');

    expect(
      await screen.findByText('Password must contain at least one letter and one digit.')
    ).toBeInTheDocument();
    expect(mockAxiosAdapter.history.post).toHaveLength(0);
  });

  it('не отправляет запрос, если в пароле нет буквы', async () => {
    const { mockAxiosAdapter } = renderLogin();

    await fillAndSubmit('12345678');

    expect(
      await screen.findByText('Password must contain at least one letter and one digit.')
    ).toBeInTheDocument();
    expect(mockAxiosAdapter.history.post).toHaveLength(0);
  });

  it('отправляет запрос, когда пароль содержит букву и цифру', async () => {
    const { mockAxiosAdapter } = renderLogin();
    mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, {
      ...makeFakeAuthInfo(),
      token: 'token',
    });

    await fillAndSubmit('password1');

    expect(mockAxiosAdapter.history.post).toHaveLength(1);
    expect(mockAxiosAdapter.history.post[0].url).toBe(ApiRoute.Login);
    expect(
      screen.queryByText('Password must contain at least one letter and one digit.')
    ).not.toBeInTheDocument();
  });
});
