import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import type { AxiosInstance } from 'axios';
import type { AnyAction } from 'redux';
import { rootReducer } from '@/store/root-reducer';
import { ApiRoute } from '@/const';
import { extractActionsTypes, makeFakeOfferPreview } from '@/utils/mocks';

type State = ReturnType<typeof rootReducer>;
type AppThunkDispatch = ThunkDispatch<State, AxiosInstance, AnyAction>;

import { fetchOffersAction, changeFavoriteAction } from './offers-api-actions';

describe('offers async actions', () => {
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

  describe('fetchOffersAction', () => {
    it('загружает предложения', async () => {
      const offers = [makeFakeOfferPreview('1'), makeFakeOfferPreview('2')];
      mockApi.onGet(ApiRoute.Offers).reply(200, offers);

      await store.dispatch(fetchOffersAction());
      const actions = store.getActions();

      expect(extractActionsTypes(actions)).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);
      expect(actions[1].payload).toEqual(offers);
    });

    it('возвращает rejected при ошибке сервера', async () => {
      mockApi.onGet(ApiRoute.Offers).reply(500, { message: 'Server error' });

      await store.dispatch(fetchOffersAction());
      const actions = store.getActions();

      expect(extractActionsTypes(actions)).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('changeFavoriteAction', () => {
    it('возвращает идентификатор и новое состояние избранного', async () => {
      mockApi.onPost(`${ApiRoute.Favorite}/1/1`).reply(201, { isFavorite: true });

      await store.dispatch(changeFavoriteAction({ offerId: '1', status: true }));
      const actions = store.getActions();

      expect(extractActionsTypes(actions)).toEqual([
        changeFavoriteAction.pending.type,
        changeFavoriteAction.fulfilled.type,
      ]);
      expect(actions[1].payload).toEqual({ offerId: '1', isFavorite: true });
    });

    it('берёт состояние из запроса, если сервер его не вернул', async () => {
      mockApi.onPost(`${ApiRoute.Favorite}/2/0`).reply(201, {});

      await store.dispatch(changeFavoriteAction({ offerId: '2', status: false }));
      const actions = store.getActions();

      expect(actions[1].payload).toEqual({ offerId: '2', isFavorite: false });
    });

    it('возвращает rejected при ошибке', async () => {
      mockApi.onPost(`${ApiRoute.Favorite}/3/1`).reply(400);

      await store.dispatch(changeFavoriteAction({ offerId: '3', status: true }));
      const actions = store.getActions();

      expect(extractActionsTypes(actions)).toEqual([
        changeFavoriteAction.pending.type,
        changeFavoriteAction.rejected.type,
      ]);
    });
  });
});
