import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortType } from '@/store/action';
import { fetchOffersAction } from '@/store/api-actions';
import { CITIES } from '@/const';
import type { SortType } from '@/const';
import type { CityName } from '@/types/city';
import type { OfferPreview } from '@/types/offer';

export type State = {
  city: CityName;
  offers: OfferPreview[];
  sortType: SortType;
};

const initialState: State = {
  city: CITIES[0].name,
  offers: [],
  sortType: 'Popular',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
    });
});
