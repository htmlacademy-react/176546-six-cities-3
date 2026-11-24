import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createRoutes } from '@/router';
import { makeFakeStore } from '@/utils/mocks';
import type { AnyAction } from 'redux';
import type { AxiosInstance } from 'axios';
import type { RootState } from '@/store';

type AppThunkDispatch = ThunkDispatch<RootState, AxiosInstance, AnyAction>;

type RenderWrapperOptions = {
  initialState?: Partial<RootState>;
  route?: string;
};

const createMockStore = (initialState: Partial<RootState>) => {
  const api = axios.create();
  const mockAxiosAdapter = new MockAdapter(api);
  const configureStore = configureMockStore<RootState, AnyAction, AppThunkDispatch>([
    thunk.withExtraArgument(api),
  ]);

  return { mockStore: configureStore(makeFakeStore(initialState)), mockAxiosAdapter };
};

const withHelmet = (node: JSX.Element) => <HelmetProvider>{node}</HelmetProvider>;

export const renderWrapper = (
  component: JSX.Element,
  { initialState = {}, route = '/' }: RenderWrapperOptions = {}
) => {
  const { mockStore, mockAxiosAdapter } = createMockStore(initialState);

  const buildTree = (child: JSX.Element) => (
    <Provider store={mockStore}>
      <MemoryRouter initialEntries={[route]}>{withHelmet(child)}</MemoryRouter>
    </Provider>
  );

  const result = render(buildTree(component));

  return {
    ...result,
    rerender: (next: JSX.Element) => result.rerender(buildTree(next)),
    mockStore,
    mockAxiosAdapter,
  };
};

export const renderRoute = (path: string, initialState: Partial<RootState> = {}) => {
  const { mockStore, mockAxiosAdapter } = createMockStore(initialState);
  const router = createMemoryRouter(createRoutes(), { initialEntries: [path] });

  const result = render(
    <Provider store={mockStore}>{withHelmet(<RouterProvider router={router} />)}</Provider>
  );

  return { ...result, router, mockStore, mockAxiosAdapter };
};
