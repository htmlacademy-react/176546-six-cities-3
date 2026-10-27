import { createReducer } from '@reduxjs/toolkit/src';
import { changeCity, fillOffersList } from '@/store/action.ts';

const initialState = {
  city: 0,
  offers: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state) => {
      state.city = 1;
    })
    .addCase(fillOffersList, (state) => {
      state.offers = 1;
    });
});

export { reducer };
