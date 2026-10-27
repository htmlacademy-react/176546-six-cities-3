import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffersList } from '@/store/action';
import { CITIES } from '@/const';
import type { CityName } from '@/types/city';
import type { OfferPreview } from '@/types/offer';

export type State = {
  city: CityName;
  offers: OfferPreview[];
};

const initialState: State = {
  city: CITIES[0].name,
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload;
    });
});
