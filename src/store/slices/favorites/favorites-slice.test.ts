import { favoritesSlice } from './favorites-slice';
import { fetchFavoritesAction } from './favorites-api-actions';
import { changeFavoriteAction } from '@/store/slices/offers';
import { logoutAction } from '@/store/slices/auth';
import { RequestStatus } from '@/store/types';
import { makeFakeOfferPreview } from '@/test-utils/mocks';
import type { FavoritesState } from './favorites-slice';

const { reducer } = favoritesSlice;

describe('favoritesSlice', () => {
  it('возвращает начальное состояние при пустом экшене', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      favorites: [],
      favoriteIds: [],
      pendingIds: [],
      favoritesStatus: RequestStatus.Idle,
    });
  });

  it('переводит статус в Loading при запросе избранного', () => {
    const state = reducer(undefined, fetchFavoritesAction.pending('', undefined));

    expect(state.favoritesStatus).toBe(RequestStatus.Loading);
  });

  it('записывает избранное и его идентификаторы', () => {
    const favorites = [makeFakeOfferPreview('1'), makeFakeOfferPreview('2')];
    const state = reducer(undefined, fetchFavoritesAction.fulfilled(favorites, '', undefined));

    expect(state.favorites).toEqual(favorites);
    expect(state.favoriteIds).toEqual(['1', '2']);
    expect(state.favoritesStatus).toBe(RequestStatus.Success);
  });

  it('очищает избранное при ошибке загрузки', () => {
    const loadedState = reducer(
      undefined,
      fetchFavoritesAction.fulfilled([makeFakeOfferPreview('1')], '', undefined)
    );
    const state = reducer(loadedState, fetchFavoritesAction.rejected(null, '', undefined));

    expect(state.favorites).toEqual([]);
    expect(state.favoriteIds).toEqual([]);
    expect(state.favoritesStatus).toBe(RequestStatus.Failed);
  });

  it('помечает предложение как ожидающее при переключении избранного', () => {
    const state = reducer(
      undefined,
      changeFavoriteAction.pending('', { offerId: '1', status: true })
    );

    expect(state.pendingIds).toEqual(['1']);
  });

  it('добавляет предложение в избранное и снимает ожидание', () => {
    const pendingState = reducer(
      undefined,
      changeFavoriteAction.pending('', { offerId: '1', status: true })
    );
    const state = reducer(
      pendingState,
      changeFavoriteAction.fulfilled({ offerId: '1', isFavorite: true }, '', {
        offerId: '1',
        status: true,
      })
    );

    expect(state.favoriteIds).toEqual(['1']);
    expect(state.pendingIds).toEqual([]);
  });

  it('не дублирует идентификатор, если предложение уже в избранном', () => {
    const loadedState = reducer(
      undefined,
      fetchFavoritesAction.fulfilled([makeFakeOfferPreview('1')], '', undefined)
    );
    const state = reducer(
      loadedState,
      changeFavoriteAction.fulfilled({ offerId: '1', isFavorite: true }, '', {
        offerId: '1',
        status: true,
      })
    );

    expect(state.favoriteIds).toEqual(['1']);
  });

  it('удаляет предложение из избранного и снимает ожидание', () => {
    const loadedState = reducer(
      undefined,
      fetchFavoritesAction.fulfilled(
        [makeFakeOfferPreview('1'), makeFakeOfferPreview('2')],
        '',
        undefined
      )
    );
    const state = reducer(
      loadedState,
      changeFavoriteAction.fulfilled({ offerId: '1', isFavorite: false }, '', {
        offerId: '1',
        status: false,
      })
    );

    expect(state.favoriteIds).toEqual(['2']);
    expect(state.favorites.map((offer) => offer.id)).toEqual(['2']);
    expect(state.pendingIds).toEqual([]);
  });

  it('снимает ожидание при ошибке переключения', () => {
    const pendingState = reducer(
      undefined,
      changeFavoriteAction.pending('', { offerId: '1', status: true })
    );
    const state = reducer(
      pendingState,
      changeFavoriteAction.rejected(null, '', { offerId: '1', status: true })
    );

    expect(state.pendingIds).toEqual([]);
  });

  it('сбрасывает избранное при выходе из аккаунта', () => {
    const loadedState = reducer(
      undefined,
      fetchFavoritesAction.fulfilled([makeFakeOfferPreview('1')], '', undefined)
    );
    const state = reducer(loadedState, logoutAction.fulfilled(undefined, '', undefined));

    expect(state.favorites).toEqual([]);
    expect(state.favoriteIds).toEqual([]);
    expect(state.favoritesStatus).toBe(RequestStatus.Idle);
  });

  it('не меняет состояние при неизвестном экшене', () => {
    const initialState: FavoritesState = reducer(undefined, { type: '' });

    expect(reducer(initialState, { type: 'unknown/action' })).toEqual(initialState);
  });
});
