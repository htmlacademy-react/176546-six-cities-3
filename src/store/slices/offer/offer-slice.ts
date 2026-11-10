import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCommentsAction,
  fetchNearbyAction,
  fetchOfferAction,
} from '@/store/slices/offer/offer-api-actions';
import { RequestStatus } from '@/store/types';
import type { OfferState } from '@/store/types';

const initialState: OfferState = {
  offer: null,
  nearby: [],
  comments: [],
  offerStatus: RequestStatus.Idle,
  nearbyStatus: RequestStatus.Idle,
  isNotFound: false,
};

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.offer = null;
        state.isNotFound = false;
        state.offerStatus = RequestStatus.Loading;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.offerStatus = RequestStatus.Success;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        state.offer = null;
        state.nearby = [];
        state.comments = [];
        state.offerStatus = RequestStatus.Failed;
        state.isNotFound = action.payload === true;
      })
      .addCase(fetchNearbyAction.pending, (state) => {
        state.nearby = [];
        state.nearbyStatus = RequestStatus.Loading;
      })
      .addCase(fetchNearbyAction.fulfilled, (state, action) => {
        state.nearby = action.payload;
        state.nearbyStatus = RequestStatus.Success;
      })
      .addCase(fetchNearbyAction.rejected, (state) => {
        state.nearby = [];
        state.nearbyStatus = RequestStatus.Failed;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.comments = [];
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  },
});
