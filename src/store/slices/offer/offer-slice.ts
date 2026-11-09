import { createSlice } from '@reduxjs/toolkit';
import { fetchCommentsAction, fetchOfferAction } from '@/store/slices/offer/offer-api-actions';
import { RequestStatus } from '@/store/types';
import type { OfferState } from '@/store/types';

const initialState: OfferState = {
  offer: null,
  comments: [],
  offerStatus: RequestStatus.Idle,
};

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
  },
});
