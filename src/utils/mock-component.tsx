import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { makeFakeStore } from './mocks';
import type { AxiosInstance } from 'axios';
import type { AnyAction } from 'redux';
import type { RootState } from '@/store';

type AppThunkDispatch = ThunkDispatch<RootState, AxiosInstance, AnyAction>;

export const withStore = (component: JSX.Element, initialState: Partial<RootState> = {}) => {
  const api = axios.create();
  const mockAxiosAdapter = new MockAdapter(api);
  const createMockStore = configureMockStore<RootState, AnyAction, AppThunkDispatch>([
    thunk.withExtraArgument(api),
  ]);
  const mockStore = createMockStore(makeFakeStore(initialState));

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
};
