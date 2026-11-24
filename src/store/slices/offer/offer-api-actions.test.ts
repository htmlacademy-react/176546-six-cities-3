import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import type { AxiosInstance } from 'axios';
import type { AnyAction } from 'redux';
import { rootReducer } from '@/store/root-reducer';
import { ApiRoute } from '@/const';
import { extractActionsTypes, makeFakeOfferDetails, makeFakeOfferPreview, makeFakeReview } from '@/utils/mocks';

type State = ReturnType<typeof rootReducer>;
type AppThunkDispatch = ThunkDispatch<State, AxiosInstance, AnyAction>;

import {
  fetchCommentsAction,
  fetchNearbyAction,
  fetchOfferAction,
  postCommentAction,
} from './offer-api-actions';

describe('offer async actions', () => {
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

  describe('fetchOfferAction', () => {
    it('загружает карточку предложения', async () => {
      const offer = makeFakeOfferDetails('1');
      mockApi.onGet(`${ApiRoute.Offers}/1`).reply(200, offer);

      await store.dispatch(fetchOfferAction('1'));
      const actions = store.getActions();

      expect(extractActionsTypes(actions)).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);
      expect(actions[1].payload).toEqual(offer);
    });

    it('передаёт в rejected признак «не найдено» при ответе 404', async () => {
      mockApi.onGet(`${ApiRoute.Offers}/missing`).reply(404);

      await store.dispatch(fetchOfferAction('missing'));
      const actions = store.getActions();

      expect(extractActionsTypes(actions)).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
      expect(actions[1].payload).toBe(true);
    });

    it('возвращает rejected без признака «не найдено» при прочих ошибках', async () => {
      mockApi.onGet(`${ApiRoute.Offers}/1`).reply(500);

      await store.dispatch(fetchOfferAction('1'));
      const actions = store.getActions();

      expect(actions[1].payload).toBeUndefined();
    });
  });

  describe('fetchNearbyAction', () => {
    it('загружает соседние предложения', async () => {
      const nearby = [makeFakeOfferPreview('2'), makeFakeOfferPreview('3')];
      mockApi.onGet(`${ApiRoute.Offers}/1${ApiRoute.Nearby}`).reply(200, nearby);

      await store.dispatch(fetchNearbyAction('1'));
      const actions = store.getActions();

      expect(extractActionsTypes(actions)).toEqual([
        fetchNearbyAction.pending.type,
        fetchNearbyAction.fulfilled.type,
      ]);
      expect(actions[1].payload).toEqual(nearby);
    });
  });

  describe('fetchCommentsAction', () => {
    it('загружает отзывы', async () => {
      const comments = [makeFakeReview('1'), makeFakeReview('2', 'Тоже понравилось')];
      mockApi.onGet(`${ApiRoute.Comments}/1`).reply(200, comments);

      await store.dispatch(fetchCommentsAction('1'));
      const actions = store.getActions();

      expect(extractActionsTypes(actions)).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type,
      ]);
      expect(actions[1].payload).toEqual(comments);
    });
  });

  describe('postCommentAction', () => {
    const payload = { offerId: '1', comment: 'Всё понравилось', rating: 4 };

    it('отправляет отзыв и возвращает его', async () => {
      const review = makeFakeReview('10');
      mockApi.onPost(`${ApiRoute.Comments}/1`).reply(201, review);

      await store.dispatch(postCommentAction(payload));
      const actions = store.getActions();

      expect(extractActionsTypes(actions)).toEqual([
        postCommentAction.pending.type,
        postCommentAction.fulfilled.type,
      ]);
      expect(actions[1].payload).toEqual(review);
    });

    it('передаёт в rejected текст ошибки из message', async () => {
      mockApi
        .onPost(`${ApiRoute.Comments}/1`)
        .reply(400, { message: 'Комментарий слишком короткий' });

      await store.dispatch(postCommentAction(payload));
      const actions = store.getActions();

      expect(actions[1].payload).toBe('Комментарий слишком короткий');
    });

    it('передаёт в rejected текст ошибки из details', async () => {
      mockApi.onPost(`${ApiRoute.Comments}/1`).reply(400, {
        details: [{ messages: ['Rating must be between 1 and 5'] }],
      });

      await store.dispatch(postCommentAction(payload));
      const actions = store.getActions();

      expect(actions[1].payload).toBe('Rating must be between 1 and 5');
    });

    it('подставляет текст ошибки по умолчанию, если сервер ничего не прислал', async () => {
      mockApi.onPost(`${ApiRoute.Comments}/1`).reply(500);

      await store.dispatch(postCommentAction(payload));
      const actions = store.getActions();

      expect(actions[1].payload).toBe('Could not send the review. Please try again.');
    });
  });
});
