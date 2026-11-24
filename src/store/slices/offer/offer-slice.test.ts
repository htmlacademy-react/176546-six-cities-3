import { offerSlice } from './offer-slice';
import {
  fetchCommentsAction,
  fetchNearbyAction,
  fetchOfferAction,
  postCommentAction,
} from './offer-api-actions';
import { RequestStatus } from '@/store/types';
import { makeFakeOfferDetails, makeFakeOfferPreview, makeFakeReview } from '@/utils/mocks';
import type { OfferState } from './offer-slice';

const { reducer } = offerSlice;

describe('offerSlice', () => {
  it('возвращает начальное состояние при пустом экшене', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      offer: null,
      nearby: [],
      comments: [],
      offerStatus: RequestStatus.Idle,
      isNotFound: false,
      commentStatus: RequestStatus.Idle,
      commentError: '',
    });
  });

  it('сбрасывает данные предложения при запросе нового', () => {
    const loadedState = reducer(
      undefined,
      fetchOfferAction.fulfilled(makeFakeOfferDetails('1'), '', '1')
    );
    const state = reducer(loadedState, fetchOfferAction.pending('', '2'));

    expect(state.offer).toBeNull();
    expect(state.comments).toEqual([]);
    expect(state.offerStatus).toBe(RequestStatus.Loading);
    expect(state.isNotFound).toBe(false);
  });

  it('записывает предложение при успешной загрузке', () => {
    const offer = makeFakeOfferDetails('1');
    const state = reducer(undefined, fetchOfferAction.fulfilled(offer, '', '1'));

    expect(state.offer).toEqual(offer);
    expect(state.offerStatus).toBe(RequestStatus.Success);
  });

  it('ставит признак «не найдено» при ответе 404', () => {
    const state = reducer(undefined, fetchOfferAction.rejected(null, '', '1', true));

    expect(state.offer).toBeNull();
    expect(state.nearby).toEqual([]);
    expect(state.offerStatus).toBe(RequestStatus.Failed);
    expect(state.isNotFound).toBe(true);
  });

  it('не ставит признак «не найдено» при прочих ошибках', () => {
    const rejectedState = reducer(undefined, fetchOfferAction.rejected(null, '', '1', true));
    const state = reducer(rejectedState, fetchOfferAction.rejected(null, '', '1'));

    expect(state.offerStatus).toBe(RequestStatus.Failed);
    expect(state.isNotFound).toBe(false);
  });

  it('записывает соседние предложения и очищает их при ошибке', () => {
    const nearby = [makeFakeOfferPreview('2'), makeFakeOfferPreview('3')];
    const loadedState = reducer(undefined, fetchNearbyAction.fulfilled(nearby, '', '1'));

    expect(loadedState.nearby).toEqual(nearby);
    expect(reducer(loadedState, fetchNearbyAction.rejected(null, '', '1')).nearby).toEqual([]);
  });

  it('записывает список отзывов', () => {
    const comments = [makeFakeReview('1', 'Первый'), makeFakeReview('2', 'Второй')];
    const state = reducer(undefined, fetchCommentsAction.fulfilled(comments, '', '1'));

    expect(state.comments).toEqual(comments);
  });

  it('переводит статус отзыва в Loading и очищает ошибку', () => {
    const failedState: OfferState = reducer(
      undefined,
      postCommentAction.rejected(null, '', { offerId: '1', comment: 'Текст', rating: 5 }, 'Ошибка')
    );
    const state = reducer(
      failedState,
      postCommentAction.pending('', { offerId: '1', comment: 'Текст', rating: 5 })
    );

    expect(state.commentStatus).toBe(RequestStatus.Loading);
    expect(state.commentError).toBe('');
  });

  it('добавляет новый отзыв в начало списка', () => {
    const existing = [makeFakeReview('1', 'Был раньше')];
    const newReview = makeFakeReview('2', 'Только что');
    const loadedState = reducer(undefined, fetchCommentsAction.fulfilled(existing, '', '1'));
    const state = reducer(
      loadedState,
      postCommentAction.fulfilled(newReview, '', { offerId: '1', comment: 'Только что', rating: 4 })
    );

    expect(state.comments).toEqual([newReview, ...existing]);
    expect(state.commentStatus).toBe(RequestStatus.Success);
  });

  it('пишет текст ошибки отзыва из payload', () => {
    const state = reducer(
      undefined,
      postCommentAction.rejected(
        null,
        '',
        { offerId: '1', comment: 'Текст', rating: 5 },
        'Не сохранилось'
      )
    );

    expect(state.commentStatus).toBe(RequestStatus.Failed);
    expect(state.commentError).toBe('Не сохранилось');
  });

  it('подставляет текст ошибки по умолчанию', () => {
    const state = reducer(
      undefined,
      postCommentAction.rejected(null, '', { offerId: '1', comment: 'Текст', rating: 5 })
    );

    expect(state.commentError).toBe('Could not send the review. Please try again.');
  });

  it('не меняет состояние при неизвестном экшене', () => {
    const initialState: OfferState = reducer(undefined, { type: '' });

    expect(reducer(initialState, { type: 'unknown/action' })).toEqual(initialState);
  });
});
