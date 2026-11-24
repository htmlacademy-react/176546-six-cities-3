import { offersSlice, changeCity, changeSortType } from './offers-slice';
import { fetchOffersAction } from './offers-api-actions';
import { CITIES, SORT_OPTIONS } from '@/const';
import { RequestStatus } from '@/store/types';
import { makeFakeOfferPreview } from '@/test-utils/mocks';
import type { OffersState } from './offers-slice';

const { reducer } = offersSlice;

describe('offersSlice', () => {
  it('возвращает начальное состояние при пустом экшене', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
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
    const offers = [makeFakeOfferPreview('1'), makeFakeOfferPreview('2')];
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
