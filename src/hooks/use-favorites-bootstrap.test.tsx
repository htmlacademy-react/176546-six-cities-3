import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { useFavoritesBootstrap } from './use-favorites-bootstrap';
import { AuthorizationStatus } from '@/const';
import { ApiRoute } from '@/const';
import { RequestStatus } from '@/store/types';
import { makeAuthState, makeFakeStore } from '@/test-utils/mocks';
import type { ReactNode } from 'react';
import type { AnyAction } from 'redux';
import type { AxiosInstance } from 'axios';
import type { RootState } from '@/store';

const api = axios.create();
const mockApi = new MockAdapter(api);
const createMockStore = configureMockStore<
  RootState,
  AnyAction,
  ThunkDispatch<RootState, AxiosInstance, AnyAction>
>([thunk.withExtraArgument(api)]);

const makeStore = (authorizationStatus: AuthorizationStatus, favoritesStatus: RequestStatus) => {
  const base = makeFakeStore();

  return createMockStore({
    ...base,
    auth: makeAuthState(authorizationStatus),
    favorites: { ...base.favorites, favoritesStatus },
  });
};

const makeWrapper = (store: ReturnType<typeof makeStore>) => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return wrapper;
};

const requestedFavorites = (store: ReturnType<typeof makeStore>) =>
  store.getActions().some(({ type }) => type === 'data/fetchFavorites/pending');

describe('useFavoritesBootstrap', () => {
  beforeEach(() => {
    mockApi.reset();
    mockApi.onGet(ApiRoute.Favorite).reply(200, []);
  });

  it('запрашивает избранное для авторизованного пользователя', () => {
    const store = makeStore(AuthorizationStatus.Auth, RequestStatus.Idle);

    renderHook(() => useFavoritesBootstrap(), { wrapper: makeWrapper(store) });

    expect(requestedFavorites(store)).toBe(true);
  });

  it('не запрашивает избранное для гостя', () => {
    const store = makeStore(AuthorizationStatus.NoAuth, RequestStatus.Idle);

    renderHook(() => useFavoritesBootstrap(), { wrapper: makeWrapper(store) });

    expect(requestedFavorites(store)).toBe(false);
  });

  it('не запрашивает избранное, пока статус авторизации неизвестен', () => {
    const store = makeStore(AuthorizationStatus.Unknown, RequestStatus.Idle);

    renderHook(() => useFavoritesBootstrap(), { wrapper: makeWrapper(store) });

    expect(requestedFavorites(store)).toBe(false);
  });

  it('не повторяет запрос, если избранное уже загружается', () => {
    const store = makeStore(AuthorizationStatus.Auth, RequestStatus.Loading);

    renderHook(() => useFavoritesBootstrap(), { wrapper: makeWrapper(store) });

    expect(requestedFavorites(store)).toBe(false);
  });

  it('не повторяет запрос при повторном рендере', () => {
    const store = makeStore(AuthorizationStatus.Auth, RequestStatus.Idle);

    const { rerender } = renderHook(() => useFavoritesBootstrap(), {
      wrapper: makeWrapper(store),
    });

    rerender();

    expect(
      store.getActions().filter(({ type }) => type === 'data/fetchFavorites/pending')
    ).toHaveLength(1);
  });
});
