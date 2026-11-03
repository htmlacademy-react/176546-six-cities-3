import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortType } from '@/store/action';
import { fetchCommentsAction, fetchOfferAction, fetchOffersAction } from '@/store/api-actions';
import { CITIES } from '@/const';
import type { SortType } from '@/const';
import type { CityName } from '@/types/city';
import type { OfferDetails, OfferPreview } from '@/types/offer';
import type { Review } from '@/types/review';

export type State = {
  city: CityName;
  offers: OfferPreview[];
  sortType: SortType;
  offer: OfferDetails | null;
  comments: Review[];
  isOfferLoading: boolean;
};

const initialState: State = {
  city: CITIES[0].name,
  offers: [],
  sortType: 'Popular',
  offer: null,
  comments: [],
  isOfferLoading: false,
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
    })
    .addCase(fetchOfferAction.pending, (state) => {
      state.isOfferLoading = true;
    })
    .addCase(fetchOfferAction.fulfilled, (state, action) => {
      state.offer = action.payload;
      state.isOfferLoading = false;
    })
    .addCase(fetchOfferAction.rejected, (state) => {
      state.offer = null;
      state.isOfferLoading = false;
    })
    .addCase(fetchCommentsAction.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
});
