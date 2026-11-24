import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import type { AxiosInstance } from 'axios';
import type { AnyAction } from 'redux';
import { rootReducer } from '@/store/root-reducer';
import { ApiRoute } from '@/const';
import { extractActionsTypes, makeFakeOfferPreview } from '@/test-utils/mocks';
import { fetchFavoritesAction } from './favorites-api-actions';

type State = ReturnType<typeof rootReducer>;
type AppThunkDispatch = ThunkDispatch<State, AxiosInstance, AnyAction>;

describe('favorites async actions', () => {
  const api = axios.create();
  const mockApi = new MockAdapter(api);
  const createMockStore = configureMockStore<State, AnyAction, AppThunkDispatch>([
    thunk.withExtraArgument(api),
  ]);

  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore({} as State);
  });

  afterEach(() => {
    mockApi.reset();
    store.clearActions();
  });

  describe('fetchFavoritesAction', () => {
    it('загружает избранные предложения', async () => {
      const favorites = [makeFakeOfferPreview('1'), makeFakeOfferPreview('2')];
      mockApi.onGet(ApiRoute.Favorite).reply(200, favorites);

      await store.dispatch(fetchFavoritesAction());
      const actions = store.getActions();

      expect(extractActionsTypes(actions)).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);
      expect(actions[1].payload).toEqual(favorites);
    });

    it('возвращает rejected, если список не удалось получить', async () => {
      mockApi.onGet(ApiRoute.Favorite).reply(401);

      await store.dispatch(fetchFavoritesAction());
      const actions = store.getActions();

      expect(extractActionsTypes(actions)).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });
  });
});
