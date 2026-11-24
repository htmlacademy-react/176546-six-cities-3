import { offersSlice, changeCity, changeSortType } from './offers-slice';
import { fetchOffersAction } from './offers-api-actions';
import { CITIES, SORT_OPTIONS } from '@/const';
import { RequestStatus } from '@/store/types';
import type { OffersState } from './offers-slice';
import type { OfferPreview } from '@/types/offer';

const { reducer } = offersSlice;

const makeFakeOffer = (id: string): OfferPreview => ({
  id,
  title: 'Уютная студия',
  type: 'apartment',
  price: 120,
  city: CITIES[0],
  location: CITIES[0].location,
  isFavorite: false,
  isPremium: false,
  rating: 4.8,
  previewImage: 'img/studio-01.jpg',
});

describe('offersSlice', () => {
  it('возвращает начальное состояние при пустом экшене', () => {
    const state = reducer(undefined, { type: '' });

    expect(state).toEqual({
      city: CITIES[0].name,
      offers: [],
      sortType: SORT_OPTIONS.Popular,
      offersStatus: RequestStatus.Idle,
    });
  });

  it('меняет город по экшену changeCity', () => {
    const initialState = reducer(undefined, { type: '' });
    const state = reducer(initialState, changeCity(CITIES[1].name));

    expect(state.city).toBe(CITIES[1].name);
  });

  it('меняет тип сортировки по экшену changeSortType', () => {
    const initialState = reducer(undefined, { type: '' });
    const state = reducer(initialState, changeSortType(SORT_OPTIONS.PriceAsc));

    expect(state.sortType).toBe(SORT_OPTIONS.PriceAsc);
  });

  it('переводит статус в Loading при запросе предложений', () => {
    const state = reducer(undefined, fetchOffersAction.pending('', undefined));

    expect(state.offersStatus).toBe(RequestStatus.Loading);
  });

  it('записывает предложения и статус Success при успешном запросе', () => {
    const offers = [makeFakeOffer('1'), makeFakeOffer('2')];
    const state = reducer(undefined, fetchOffersAction.fulfilled(offers, '', undefined));

    expect(state.offers).toEqual(offers);
    expect(state.offersStatus).toBe(RequestStatus.Success);
  });

  it('переводит статус в Failed при ошибке запроса', () => {
    const state = reducer(
      undefined,
      fetchOffersAction.rejected(new Error('Network error'), '', undefined)
    );

    expect(state.offersStatus).toBe(RequestStatus.Failed);
  });

  it('не меняет состояние при неизвестном экшене', () => {
    const initialState: OffersState = reducer(undefined, { type: '' });
    const state = reducer(initialState, { type: 'unknown/action' });

    expect(state).toEqual(initialState);
  });
});
