import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortType } from '@/store/action';
import { fetchCommentsAction, fetchOfferAction, fetchOffersAction } from '@/store/api-actions';
import { CITIES, SORT_OPTIONS } from '@/const';
import type { SortType } from '@/const';
import type { CityName } from '@/types/city';
import type { OfferDetails, OfferPreview } from '@/types/offer';
import type { Review } from '@/types/review';

export enum RequestStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed',
}

export type State = {
  city: CityName;
  offers: OfferPreview[];
  sortType: SortType;
  offer: OfferDetails | null;
  comments: Review[];
  offersStatus: RequestStatus;
  offerStatus: RequestStatus;
};

const initialState: State = {
  city: CITIES[0].name,
  offers: [],
  sortType: SORT_OPTIONS.Popular,
  offer: null,
  comments: [],
  offersStatus: RequestStatus.Idle,
  offerStatus: RequestStatus.Idle,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(fetchOffersAction.pending, (state) => {
      state.offersStatus = RequestStatus.Loading;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.offersStatus = RequestStatus.Success;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.offersStatus = RequestStatus.Failed;
    })
    .addCase(fetchOfferAction.pending, (state) => {
      state.offerStatus = RequestStatus.Loading;
    })
    .addCase(fetchOfferAction.fulfilled, (state, action) => {
      state.offer = action.payload;
      state.offerStatus = RequestStatus.Success;
    })
    .addCase(fetchOfferAction.rejected, (state) => {
      state.offer = null;
      state.offerStatus = RequestStatus.Failed;
    })
    .addCase(fetchCommentsAction.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
});
