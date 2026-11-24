import { authSlice, changeAuthorizationStatus } from './auth-slice';
import { checkAuthAction, loginAction, logoutAction } from './auth-api-actions';
import { AuthorizationStatus } from '@/const';
import { RequestStatus } from '@/store/types';
import { makeFakeAuthInfo } from '@/utils/mocks';
import type { AuthState } from './auth-slice';

const { reducer } = authSlice;

const credentials = { email: 'user@example.com', password: 'secret' };

describe('authSlice', () => {
  it('возвращает начальное состояние при пустом экшене', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      loginStatus: RequestStatus.Idle,
      loginError: '',
    });
  });

  it('меняет статус авторизации по экшену changeAuthorizationStatus', () => {
    const state = reducer(undefined, changeAuthorizationStatus(AuthorizationStatus.Auth));

    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('авторизует пользователя при успешной проверке', () => {
    const user = makeFakeAuthInfo();
    const state = reducer(undefined, checkAuthAction.fulfilled(user, '', undefined));

    expect(state.user).toEqual(user);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('переводит в NoAuth, если проверка не прошла', () => {
    const authorizedState = reducer(
      undefined,
      checkAuthAction.fulfilled(makeFakeAuthInfo(), '', undefined)
    );
    const state = reducer(authorizedState, checkAuthAction.rejected(null, '', undefined));

    expect(state.user).toBeNull();
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('переводит статус входа в Loading и очищает ошибку', () => {
    const failedState = reducer(
      undefined,
      loginAction.rejected(null, '', credentials, 'Ошибка')
    );
    const state = reducer(failedState, loginAction.pending('', credentials));

    expect(state.loginStatus).toBe(RequestStatus.Loading);
    expect(state.loginError).toBe('');
  });

  it('авторизует пользователя после успешного входа', () => {
    const user = makeFakeAuthInfo({ isPro: true });
    const state = reducer(undefined, loginAction.fulfilled(user, '', credentials));

    expect(state.user).toEqual(user);
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.loginStatus).toBe(RequestStatus.Success);
  });

  it('пишет текст ошибки входа из payload', () => {
    const state = reducer(undefined, loginAction.rejected(null, '', credentials, 'Неверный пароль'));

    expect(state.loginStatus).toBe(RequestStatus.Failed);
    expect(state.loginError).toBe('Неверный пароль');
  });

  it('подставляет текст ошибки входа по умолчанию', () => {
    const state = reducer(undefined, loginAction.rejected(null, '', credentials));

    expect(state.loginError).toBe('Sign in failed. Please try again.');
  });

  it('сбрасывает пользователя при выходе', () => {
    const authorizedState = reducer(
      undefined,
      loginAction.fulfilled(makeFakeAuthInfo(), '', credentials)
    );
    const state = reducer(authorizedState, logoutAction.fulfilled(undefined, '', undefined));

    expect(state.user).toBeNull();
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(state.loginStatus).toBe(RequestStatus.Idle);
    expect(state.loginError).toBe('');
  });

  it('не меняет состояние при неизвестном экшене', () => {
    const initialState: AuthState = reducer(undefined, { type: '' });

    expect(reducer(initialState, { type: 'unknown/action' })).toEqual(initialState);
  });
});
