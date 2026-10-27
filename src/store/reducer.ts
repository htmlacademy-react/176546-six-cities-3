import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffersList } from '@/store/action';
import { CITIES } from '@/const';
import { CityName } from '@/types/city';
import { OfferPreview } from '@/types/offer';

type State = {
  city: CityName;
  offers: OfferPreview[];
};

const initialState: State = {
  city: CITIES[0].name,
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
