import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchFavoritesAction,
  fetchNearbyAction,
  fetchOfferAction,
  fetchOffersAction,
} from './offers-api-actions';
import type { OfferDetails, OfferPreview } from '@/types/offer';

export type OffersEntitiesState = {
  byId: Record<string, OfferPreview>;
  details: Record<string, OfferDetails>;
};

const initialState: OffersEntitiesState = {
  byId: {},
  details: {},
};

export const offersEntitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    offersStored(state, action: PayloadAction<OfferPreview[]>) {
      action.payload.forEach((offer) => {
        state.byId[offer.id] = offer;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        action.payload.forEach((offer) => {
          state.byId[offer.id] = offer;
        });
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        action.payload.forEach((offer) => {
          state.byId[offer.id] = offer;
        });
      })
      .addCase(fetchNearbyAction.fulfilled, (state, action) => {
        action.payload.forEach((offer) => {
          state.byId[offer.id] = offer;
        });
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.details[action.payload.id] = action.payload;
      });
  },
});

export const { offersStored } = offersEntitiesSlice.actions;
